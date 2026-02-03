import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Category from '../../components/Category';
import Icon from '../../components/Icon';
import PopUp from '../../components/Pop-up';
import Toast from '../../components/Toast';
import BottomSheetModalPost, {
  type ActionItem,
} from '../../components/BottomSheetModal/BottomSheetModal-post';
import { BottomChat } from '../../layouts/BottomChat/BottomChat';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import { useToast } from '../../hooks/useToast';
import CommentListItem from './components/CommentItem';
import LockedQuestionCard from './components/LockedQuestionCard';
import type { CommentItem } from '../../types/community';
import { loggedInUserProfile } from '../../mock/community';
import { useCommentActions } from './hooks/useCommentActions';
import { usePost } from './hooks/usePost';
import { formatPostDisplayDate } from './utils/post';
import { findCommentAuthorId } from './utils/comment';
import { isEditOption, type OptionItemId } from './utils/option';

const CommunityPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const currentUser = loggedInUserProfile;
  // 옵션/팝업/이미지 실패 등 화면 단일 상태
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedIsMine, setSelectedIsMine] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<'post' | 'comment'>('comment');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isAdoptPopupOpen, setIsAdoptPopupOpen] = useState(false);
  const [isAdoptedPostPopupOpen, setIsAdoptedPostPopupOpen] = useState(false);
  const [isAdoptedCommentPopupOpen, setIsAdoptedCommentPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isDeleteCommentPopupOpen, setIsDeleteCommentPopupOpen] = useState(false);
  const [isPurchasePopupOpen, setIsPurchasePopupOpen] = useState(false);
  const [isInsufficientPointsPopupOpen, setIsInsufficientPointsPopupOpen] = useState(false);
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('URL 복사가 완료되었습니다');
  const [accessStatusOverride, setAccessStatusOverride] = useState<
    'GRANTED' | 'LOCKED' | null
  >(null);
  const [myPoints, setMyPoints] = useState(0);
  // 토스트 표시 제어
  const { isOpen: isToastOpen, isFading: isToastFading, openToast } = useToast();
  // 게시글 파생 상태
  const {
    selectedPost,
    isQuestionPost,
    isInfoPost,
    isPostMine,
    isAdopted,
    showAdoptButton,
    requiredPoints,
    textCount,
    imageCount,
  } = usePost({ postId, currentUserId: currentUser.id });
  const accessStatus = accessStatusOverride ?? selectedPost.accessStatus ?? 'GRANTED';
  const isLockedQuestion = isQuestionPost && accessStatus !== 'GRANTED';

  useEffect(() => {
    const resetTimer = window.setTimeout(() => {
      setAccessStatusOverride(null);
      setMyPoints(selectedPost.myPoints ?? 0);
    }, 0);
    return () => window.clearTimeout(resetTimer);
  }, [selectedPost.id, selectedPost.myPoints]);

  // 댓글 상태/액션 묶음
  const {
    commentContent,
    setCommentContent,
    commentList,
    commentCount,
    sortedComments,
    editingCommentId,
    editingCommentContent,
    setEditingCommentContent,
    highlightedCommentId,
    replyTarget,
    replyFocusToken,
    handleReplyClick,
    handleSubmitComment,
    handleSaveEdit,
    handleCancelEdit,
    deleteComment,
    startEditingComment,
    formatCommentDisplayDate,
  } = useCommentActions({
    currentUser,
    resetKey: postId,
    isInfoPost,
    isLockedQuestion,
    isQuestionPost,
    isAdopted,
    adoptedCommentId: selectedPost.adoptedCommentId,
  });

  // 게시글/댓글 옵션 열기
  const handleOpenCommentOptions = (comment: CommentItem) => {
    setSelectedIsMine(comment.author.id === currentUser.id);
    setSelectedTarget('comment');
    setSelectedCommentId(comment.id);
    setIsOptionOpen(true);
  };

  const handleOpenPostOptions = () => {
    setSelectedIsMine(selectedPost.author.id === currentUser.id);
    setSelectedTarget('post');
    setSelectedCommentId(null);
    setIsOptionOpen(true);
  };

  // 채택/구매 팝업 제어
  const handleOpenAdoptPopup = () => setIsAdoptPopupOpen(true);
  const handleCloseAdoptPopup = () => setIsAdoptPopupOpen(false);
  const handleConfirmAdopt = () => {
    // TODO: 채택 이후 라우터 연결 예정
    setIsAdoptPopupOpen(false);
  };
  const handleOpenPurchasePopup = () => {
    setMyPoints(selectedPost.myPoints ?? 0);
    setIsPurchasePopupOpen(true);
  };
  const handleClosePurchasePopup = () => setIsPurchasePopupOpen(false);

  // URL 복사: 클립보드 실패 시 fallback 적용
  const copyPostUrl = async () => {
    const postUrl = `${window.location.origin}/community/post/${selectedPost.id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setToastMessage('URL 복사가 완료되었습니다');
      openToast();
      return;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = postUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setToastMessage('URL 복사가 완료되었습니다');
      openToast();
    }
  };

  // 옵션 id 기반 동작 매핑
  const optionHandlers: Record<OptionItemId, () => Promise<void> | void> = {
    'copy-url': async () => {
      await copyPostUrl();
    },
    'report-post': () => setIsReportPopupOpen(true),
    'report-comment': () => setIsReportPopupOpen(true),
    'view-author-profile': () => {
      if (!selectedCommentId) return;
      const authorId = findCommentAuthorId(commentList, selectedCommentId);
      if (!authorId) return;
      navigate(`/alumni/profile/${authorId}`);
    },
    'edit-post': () => {
      if (!selectedIsMine) return;
      navigate(`/community/edit/${selectedPost.id}`);
    },
    'edit-comment': () => {
      if (!selectedIsMine || !selectedCommentId) return;
      startEditingComment(selectedCommentId);
    },
    'delete-post': () => {
      if (!selectedIsMine) return;
      setIsDeletePopupOpen(true);
    },
    'delete-comment': () => {
      if (!selectedIsMine || !selectedCommentId) return;
      setIsDeleteCommentPopupOpen(true);
    },
  };

  // 옵션 선택 처리 (채택 완료 상태 예외 포함)
  const handleOptionItemClick = async (
    item: ActionItem,
    target: 'post' | 'comment',
  ) => {
    if (!isEditOption(item.id)) {
      await optionHandlers[item.id]();
      setIsOptionOpen(false);
      return;
    }

    if (target === 'post' && isQuestionPost && isAdopted && isPostMine) {
      setIsAdoptedPostPopupOpen(true);
      setIsOptionOpen(false);
      return;
    }

    if (
      target === 'comment' &&
      isQuestionPost &&
      isAdopted &&
      selectedIsMine &&
      selectedCommentId === selectedPost.adoptedCommentId
    ) {
      setIsAdoptedCommentPopupOpen(true);
      setIsOptionOpen(false);
      return;
    }

    await optionHandlers[item.id]();

    setIsOptionOpen(false);
  };

  // 댓글(답글) 렌더 헬퍼
  const renderComment = (comment: CommentItem, isReply = false) => (
    <CommentListItem
      key={comment.id}
      comment={comment}
      isReply={isReply}
      isQuestionPost={isQuestionPost}
      isAdopted={isAdopted}
      adoptedCommentId={selectedPost.adoptedCommentId}
      showAdoptButton={showAdoptButton}
      isInfoPost={isInfoPost}
      isHighlighted={highlightedCommentId === comment.id}
      isEditing={editingCommentId === comment.id}
      editingContent={editingCommentId === comment.id ? editingCommentContent : comment.content}
      onEditingChange={setEditingCommentContent}
      onSaveEdit={handleSaveEdit}
      onCancelEdit={handleCancelEdit}
      onOpenCommentOptions={handleOpenCommentOptions}
      onOpenAdoptPopup={handleOpenAdoptPopup}
      onReplyClick={handleReplyClick}
      formatDate={formatCommentDisplayDate}
      renderReply={(reply) => renderComment(reply, true)}
    />
  );

  return (
    <HeaderLayout
      headerSlot={
        <MainHeader
          title='커뮤니티'
          rightActions={[
            { icon: 'option', onClick: handleOpenPostOptions, ariaLabel: '게시글 옵션 열기' },
          ]}
        />
      }
    >
      <main
        className='flex w-full justify-center bg-white'
        style={{ paddingBottom: 'calc(90px + env(safe-area-inset-bottom))' }}
      >
        <div className='flex w-full max-w-[720px] flex-col sm:px-[25px]'>
          <section className='flex flex-col gap-[35px] border-b border-[#ECECEC] px-5 pb-[30px] pt-[22px] sm:px-[25px]'>
            <div className='flex flex-col items-start gap-[20px]'>
              {isQuestionPost ? (
                <div
                  className={`inline-flex min-w-[68px] items-center justify-center rounded-[30px] border px-[12px] py-[4px] text-r-16 ${
                    isAdopted
                      ? 'border-[var(--ColorGray2,#A1A1A1)] text-[var(--ColorGray2,#A1A1A1)]'
                      : 'border-[var(--ColorMain,#00C56C)] text-[var(--ColorMain,#00C56C)]'
                  }`}
                >
                  {isAdopted ? '채택 완료' : '채택 전'}
                </div>
              ) : (
                <div className='text-[12px] font-normal text-[var(--ColorMain,#00C56C)]'>
                  {selectedPost.boardType} 게시판 &gt;
                </div>
              )}
              <div className='flex flex-col gap-[13px]'>
                <div className='text-[24px] font-bold leading-[130%] text-black'>
                  {selectedPost.title}
                </div>
                <div className='flex flex-wrap items-center gap-[10px] text-[12px] text-[var(--ColorGray3,#646464)]'>
                  <div className='flex items-center gap-[5px]'>
                    <div className='flex items-center gap-[3px]'>
                      <Icon name='like' className='h-[14px] w-[14px]' />
                      <span>{selectedPost.likes}</span>
                    </div>
                    <div className='flex items-center gap-[3px]'>
                      <Icon name='comment' className='h-[14px] w-[14px]' />
                      <span>{commentCount}</span>
                    </div>
                  </div>
                  <span className='text-[var(--ColorGray2,#A1A1A1)]'>
                    {formatPostDisplayDate(selectedPost.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex justify-between gap-[12px] border-b border-[#ECECEC] pb-[15px] sm:flex-row sm:items-center '>
              <div className='flex items-center gap-[10px]'>
                {selectedPost.author.profileImageUrl ? (
                  <img
                    src={selectedPost.author.profileImageUrl}
                    alt={`${selectedPost.author.name} 프로필`}
                    className='h-[32px] w-[32px] rounded-full object-cover'
                  />
                ) : (
                  <div className='h-[32px] w-[32px] rounded-full bg-[#ECECEC]' aria-hidden='true' />
                )}
                <div className='flex flex-col gap-[4px]'>
                  <div className='text-[14px] font-semibold text-[var(--ColorBlack,#202023)]'>
                    {selectedPost.author.name}
                  </div>
                  <div className='text-[12px] text-[var(--ColorGray3,#646464)]'>
                    {selectedPost.author.major} {selectedPost.author.studentId}학번
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-[10px] border border-[var(--ColorMain,#00C56C)] px-[10px] py-[6px] text-[12px] font-normal text-[var(--ColorMain,#00C56C)]'
                onClick={() => navigate(`/alumni/profile/${selectedPost.author.id}`)}
              >
                커피챗 보내기
              </button>
            </div>

            <div className='flex flex-col gap-[20px]'>
              {isLockedQuestion ? (
                <LockedQuestionCard
                  requiredPoints={requiredPoints}
                  textCount={textCount}
                  imageCount={imageCount}
                  onPurchaseClick={handleOpenPurchasePopup}
                />
              ) : (
                <>
                  <div className='text-[16px] leading-[160%] text-[var(--ColorGray3,#646464)]'>
                    {selectedPost.content}
                  </div>
                  {selectedPost.postImages && selectedPost.postImages.length > 0 ? (
                    <div className='mt-[30px] -mr-5 overflow-x-auto sm:-mr-[25px]'>
                      <div className='flex w-max gap-[5px] pr-[20px]'>
                        {selectedPost.postImages.map((imageUrl: string, index: number) => {
                          const imageKey = `${selectedPost.id}-image-${index + 1}`;
                          if (failedImages[imageKey]) {
                            return (
                              <div
                                key={imageKey}
                                className='h-[150px] w-[150px] shrink-0 rounded-[5px] bg-[#D9D9D9]'
                                aria-label='이미지 불러오기 실패'
                              />
                            );
                          }
                          return (
                            <img
                              key={imageKey}
                              src={imageUrl}
                              alt={`${selectedPost.title} 이미지 ${index + 1}`}
                              className='h-[150px] w-[150px] shrink-0 rounded-[5px] object-cover'
                              onError={() =>
                                setFailedImages((prev) => ({ ...prev, [imageKey]: true }))
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </>
              )}
              <div className='flex flex-wrap gap-[5px]'>
                {selectedPost.categories.map((category: string) => (
                  <Category key={category} label={category} />
                ))}
              </div>
            </div>
          </section>

          <section className='flex flex-col'>
            <div className='px-[25px] pb-[15px] pt-[20px] text-[16px] font-semibold text-[var(--ColorBlack,#202023)]'>
              댓글 ({commentCount})
            </div>
            {isLockedQuestion ? (
              <div className='flex items-center justify-center px-[25px] py-[30px] text-m-14 text-[var(--ColorGray2,#A1A1A1)]'>
                질문 구매 후 열람이 가능합니다
              </div>
            ) : (
              <div className='flex flex-col'>
                {sortedComments.map((comment) => renderComment(comment))}
              </div>
            )}
          </section>
        </div>
      </main>
      <BottomChat
        likeCount={selectedPost.likes}
        placeholder={isLockedQuestion ? '구매 후 입력 가능' : '댓글을 입력해 주세요'}
        content={commentContent}
        onChange={setCommentContent}
        onSubmit={handleSubmitComment}
        disabled={isLockedQuestion}
        replyTargetName={replyTarget?.name}
        focusToken={replyFocusToken}
      />
      <BottomSheetModalPost
        isOpen={isOptionOpen}
        onClose={() => setIsOptionOpen(false)}
        target={selectedTarget}
        isMine={selectedIsMine}
        onItemClick={handleOptionItemClick}
      />
      <PopUp
        isOpen={isAdoptPopupOpen}
        type='info'
        title='정말 채택하시겠습니까?'
        content={'답변 채택 후 게시물의\n수정 및 삭제가 불가능 합니다.'}
        onLeftClick={handleCloseAdoptPopup}
        onRightClick={handleConfirmAdopt}
      />
      <PopUp
        isOpen={isAdoptedPostPopupOpen}
        type='confirm'
        title='이미 채택된 게시물입니다.'
        content={
          '채택이 완료된 게시물의\n수정 및 삭제를 원하실 경우,\n[문의하기]를 통해 접수 부탁드립니다'
        }
        onRightClick={() => setIsAdoptedPostPopupOpen(false)}
      />
      <PopUp
        isOpen={isAdoptedCommentPopupOpen}
        type='confirm'
        title='이미 채택된 댓글입니다.'
        content={
          '채택이 완료된 댓글의\n수정 및 삭제를 원하실 경우,\n[문의하기]를 통해 접수 부탁드립니다'
        }
        onRightClick={() => setIsAdoptedCommentPopupOpen(false)}
      />
      <PopUp
        isOpen={isDeletePopupOpen}
        type='warning'
        title='정말 삭제하시겠습니까?'
        content='삭제된 내용은 복구 불가능합니다.'
        onLeftClick={() => {
          // TODO: 삭제 API 요청 연결 예정
          setIsDeletePopupOpen(false);
        }}
        onRightClick={() => setIsDeletePopupOpen(false)}
      />
      <PopUp
        isOpen={isDeleteCommentPopupOpen}
        type='warning'
        title='정말 삭제하시겠습니까?'
        content='삭제된 내용은 복구 불가능합니다.'
        onLeftClick={() => {
          if (selectedCommentId) {
            deleteComment(selectedCommentId);
          }
          setIsDeleteCommentPopupOpen(false);
        }}
        onRightClick={() => setIsDeleteCommentPopupOpen(false)}
      />
      <PopUp
        isOpen={isPurchasePopupOpen}
        type='info'
        title='질문을 구매하시겠습니까?'
        content={'구매 시 포인트가 즉시 차감되며, \n결제 후에는 취소나 환불이 불가능합니다.'}
        onLeftClick={handleClosePurchasePopup}
        onRightClick={() => {
          const currentPoints = selectedPost.myPoints ?? myPoints;
          if (currentPoints < requiredPoints) {
            setIsPurchasePopupOpen(false);
            setIsInsufficientPointsPopupOpen(true);
            return;
          }
          // TODO: 결제 및 포인트 차감 API 연동 필요
          setMyPoints((prev) => {
            const basePoints = selectedPost.myPoints ?? prev;
            return basePoints - requiredPoints;
          });
          setAccessStatusOverride('GRANTED');
          // TODO: 구매 API 성공 시 상세/리스트 재조회로 accessStatus 갱신 필요
          // TODO: 서버 응답 remainingPoints로 전역 포인트 상태 동기화 필요
          setIsPurchasePopupOpen(false);
          setToastMessage('구매 성공! 이제 질문글을 열람할 수 있어요');
          openToast();
        }}
      />
      <PopUp
        isOpen={isInsufficientPointsPopupOpen}
        type='confirm'
        title='앗, 포인트가 조금 부족하네요!'
        content='다양한 활동으로 포인트를 채워보세요!'
        onClick={() => setIsInsufficientPointsPopupOpen(false)}
      />
      <PopUp
        isOpen={isReportPopupOpen}
        type='confirm'
        title='현재 제작 중이에요!'
        content={
          '유저분들이 더 즐겁게 소통할 수 있도록\n꼼꼼히 준비해서 돌아올게요!'
        }
        onClick={() => setIsReportPopupOpen(false)}
      />
      <Toast
        isOpen={isToastOpen}
        isFading={isToastFading}
        message={toastMessage}
      />
    </HeaderLayout>
  );
};

export default CommunityPostPage;
