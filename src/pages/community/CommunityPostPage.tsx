import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Category from '../../components/Category';
import Icon from '../../components/Icon';
import PopUp from '../../components/Pop-up';
import Toast from '../../components/Toast';
import BottomSheetModalPost from '../../components/BottomSheetModal/BottomSheetModal-post';
import { BottomChat } from '../../layouts/BottomChat/BottomChat';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import CommentListItem from './components/CommentItem';
import LockedQuestionCard from './components/LockedQuestionCard';
import {
  communityCommentList,
  communityPostData,
  communityPostSamples,
  infoPosts,
  loggedInUserProfile,
  questionPosts,
  type CommentItem,
  type CommunityPostDetail,
} from './data';

const CommunityPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const currentUser = loggedInUserProfile;
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedIsMine, setSelectedIsMine] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<'post' | 'comment'>('comment');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isAdoptPopupOpen, setIsAdoptPopupOpen] = useState(false);
  const [isAdoptedPostPopupOpen, setIsAdoptedPostPopupOpen] = useState(false);
  const [isAdoptedCommentPopupOpen, setIsAdoptedCommentPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isPurchasePopupOpen, setIsPurchasePopupOpen] = useState(false);
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastFading, setIsToastFading] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [commentList, setCommentList] = useState<CommentItem[]>(communityCommentList);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [replyTarget, setReplyTarget] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [highlightedCommentId, setHighlightedCommentId] = useState<string | null>(null);
  const [replyFocusToken, setReplyFocusToken] = useState(0);
  const highlightTimerRef = useRef<number | null>(null);

  const selectedPost = useMemo<CommunityPostDetail>(() => {
    if (!postId) return communityPostData;
    if (communityPostData.id === postId) return communityPostData;

    const infoMatch = infoPosts.find((post) => post.id === postId);
    if (infoMatch) {
      const post = {
        id: infoMatch.id,
        boardType: '정보',
        title: infoMatch.title,
        likes: infoMatch.likes,
        comments: infoMatch.comments,
        saveCount: infoMatch.saveCount,
        isAdopted: false,
        createdAt: infoMatch.createdAt,
        author: infoMatch.author,
        content: infoMatch.content,
        categories: infoMatch.categories,
        postImages: infoMatch.postImageUrl ? [infoMatch.postImageUrl] : undefined,
      };
      return post;
    }

    const questionMatch = questionPosts.find((post) => post.id === postId);
    if (questionMatch) {
      const post = {
        id: questionMatch.id,
        boardType: '질문',
        title: questionMatch.title,
        likes: questionMatch.likes,
        comments: questionMatch.answers,
        saveCount: questionMatch.saveCount,
        isAdopted: questionMatch.isAdopted,
        adoptedCommentId: questionMatch.isAdopted ? communityCommentList[0]?.id : undefined,
        createdAt: questionMatch.createdAt,
        accessStatus: questionMatch.accessStatus,
        requiredPoints: questionMatch.requiredPoints,
        myPoints: questionMatch.myPoints,
        author: questionMatch.author,
        content: questionMatch.content,
        categories: questionMatch.categories,
      };
      return post;
    }

    const sampleMatch = communityPostSamples.find((post) => post.id === postId);
    if (sampleMatch) {
      return {
        ...sampleMatch,
        adoptedCommentId:
          sampleMatch.isAdopted ? sampleMatch.adoptedCommentId ?? communityCommentList[0]?.id : undefined,
      };
    }

    return communityPostData;
  }, [postId]);

  const isQuestionPost = selectedPost.boardType === '질문';
  const isInfoPost = !isQuestionPost;
  const isPostMine = selectedPost.author.name === currentUser.name;
  const isAdopted = selectedPost.isAdopted;
  const showAdoptButton = isQuestionPost && isPostMine && !isAdopted;
  const isLockedQuestion = isQuestionPost && selectedPost.accessStatus !== 'GRANTED';
  const requiredPoints = selectedPost.requiredPoints ?? 100;
  const textCount = selectedPost.content.length;
  const imageCount = selectedPost.postImages?.length ?? 0;

  const sortedComments =
    isQuestionPost && isAdopted && selectedPost.adoptedCommentId
      ? [
          ...commentList.filter(
            (comment) => comment.id === selectedPost.adoptedCommentId,
          ),
          ...commentList.filter(
            (comment) => comment.id !== selectedPost.adoptedCommentId,
          ),
        ]
      : commentList;

  const commentCount = commentList.reduce(
    (count, comment) => count + 1 + (comment.replies?.length ?? 0),
    0,
  );

  const handleOpenCommentOptions = (comment: CommentItem) => {
    setSelectedIsMine(comment.author.name === currentUser.name);
    setSelectedTarget('comment');
    setSelectedCommentId(comment.id);
    setIsOptionOpen(true);
  };

  const handleOpenPostOptions = () => {
    setSelectedIsMine(selectedPost.author.name === currentUser.name);
    setSelectedTarget('post');
    setSelectedCommentId(null);
    setIsOptionOpen(true);
  };

  const handleOpenAdoptPopup = () => setIsAdoptPopupOpen(true);
  const handleCloseAdoptPopup = () => setIsAdoptPopupOpen(false);
  const handleConfirmAdopt = () => {
    // TODO: 채택 이후 라우터 연결 예정
    setIsAdoptPopupOpen(false);
  };
  const handleOpenPurchasePopup = () => setIsPurchasePopupOpen(true);
  const handleClosePurchasePopup = () => setIsPurchasePopupOpen(false);
  const findCommentContent = (comments: CommentItem[], commentId: string): string | null => {
    for (const comment of comments) {
      if (comment.id === commentId) return comment.content;
      if (comment.replies) {
        const replyContent = findCommentContent(comment.replies, commentId);
        if (replyContent) return replyContent;
      }
    }
    return null;
  };
  const updateCommentContent = (
    comments: CommentItem[],
    commentId: string,
    content: string,
  ): CommentItem[] =>
    comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, content };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: updateCommentContent(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  const handleReplyClick = (comment: CommentItem) => {
    if (!isInfoPost) return;
    if (replyTarget?.id === comment.id) {
      setReplyTarget(null);
      setHighlightedCommentId(null);
      return;
    }
    setReplyTarget({ id: comment.id, name: comment.author.name });
    setReplyFocusToken((prev) => prev + 1);
    setHighlightedCommentId(comment.id);
    if (highlightTimerRef.current) {
      window.clearTimeout(highlightTimerRef.current);
    }
    highlightTimerRef.current = window.setTimeout(() => {
      setHighlightedCommentId(null);
      highlightTimerRef.current = null;
    }, 3000);
  };
  const formatCommentDate = (date: Date) => {
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };
  const formatCommentDisplayDate = (value: string) => {
    if (!value) return value;
    if (/^\d{2}\.\d{2}\.\d{2}/.test(value)) {
      return value.split(' ')[0];
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return value.split(' ')[0];
    }
    return formatCommentDate(parsed);
  };
  const handleSubmitComment = (event?: SyntheticEvent) => {
    event?.preventDefault();
    if (isLockedQuestion) return;
    const trimmed = commentContent.trim();
    if (!trimmed) return;
    const now = new Date();
    const newComment: CommentItem = {
      id: `comment-${Date.now()}`,
      author: { ...currentUser },
      content: trimmed,
      createdAt: formatCommentDate(now),
    };
    if (replyTarget) {
      setCommentList((prev) =>
        prev.map((comment) =>
          comment.id === replyTarget.id
            ? { ...comment, replies: [...(comment.replies ?? []), newComment] }
            : comment,
        ),
      );
      setReplyTarget(null);
    } else {
      setCommentList((prev) => [...prev, newComment]);
    }
    setCommentContent('');
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentContent('');
  };

  const handleSaveEdit = () => {
    const trimmed = editingCommentContent.trim();
    if (!editingCommentId || !trimmed) {
      handleCancelEdit();
      return;
    }
    setCommentList((prev) =>
      updateCommentContent(prev, editingCommentId, trimmed),
    );
    handleCancelEdit();
  };

  useEffect(() => {
    if (!isToastOpen) return;
    const fadeTimer = window.setTimeout(() => setIsToastFading(true), 1500);
    const closeTimer = window.setTimeout(() => {
      setIsToastFading(false);
      setIsToastOpen(false);
    }, 3500);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(closeTimer);
    };
  }, [isToastOpen]);

  useEffect(
    () => () => {
      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current);
      }
    },
    [],
  );

  const copyPostUrl = async () => {
    const postUrl = `${window.location.origin}/community/post/${selectedPost.id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setIsToastFading(false);
      setIsToastOpen(true);
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
      setIsToastFading(false);
      setIsToastOpen(true);
    }
  };

  const handleOptionItemClick = async (
    item: { label: string },
    target: 'post' | 'comment',
  ) => {
    const isEditOrDelete = item.label.includes('수정') || item.label.includes('삭제');
    if (!isEditOrDelete) {
      if (item.label.includes('URL')) {
        await copyPostUrl();
        setIsOptionOpen(false);
        return;
      }
      if (item.label.includes('신고')) {
        setIsReportPopupOpen(true);
        setIsOptionOpen(false);
        return;
      }
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

    if (target === 'post' && item.label.includes('수정') && selectedIsMine) {
      navigate(`/community/edit/${selectedPost.id}`);
      setIsOptionOpen(false);
      return;
    }

    if (target === 'comment' && item.label.includes('수정') && selectedIsMine) {
      if (!selectedCommentId) {
        setIsOptionOpen(false);
        return;
      }
      const existingContent = findCommentContent(commentList, selectedCommentId);
      if (existingContent !== null) {
        setEditingCommentId(selectedCommentId);
        setEditingCommentContent(existingContent);
      }
      setIsOptionOpen(false);
      return;
    }

    if (target === 'post' && item.label.includes('삭제') && selectedIsMine) {
      setIsDeletePopupOpen(true);
      setIsOptionOpen(false);
      return;
    }

    setIsOptionOpen(false);
  };

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
      <main className='flex w-full justify-center bg-white'>
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
                      <span>{selectedPost.comments}</span>
                    </div>
                  </div>
                  <span className='text-[var(--ColorGray2,#A1A1A1)]'>
                    {selectedPost.createdAt}
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
                        {selectedPost.postImages.map((imageUrl, index) => {
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
                {selectedPost.categories.map((category) => (
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
          '채택이 완료된 댓글의\n수정 및 삭제을 원하실 경우,\n[문의하기]를 통해 접수 부탁드립니다'
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
        isOpen={isPurchasePopupOpen}
        type='info'
        title='질문을 구매하시겠습니까?'
        content={'구매 시 포인트가 즉시 차감되며, \n결제 후에는 취소나 환불이 불가능합니다.'}
        onLeftClick={handleClosePurchasePopup}
        onRightClick={handleClosePurchasePopup}
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
        message='URL 복사가 완료되었습니다'
      />
    </HeaderLayout>
  );
};

export default CommunityPostPage;
