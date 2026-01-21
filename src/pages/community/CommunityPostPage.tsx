import { Fragment, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Category from '../../components/Category';
import Icon from '../../components/Icon';
import PopUp from '../../components/Pop-up';
import Toast from '../../components/Toast';
import BottomSheetModalPost from '../../components/BottomSheetModal/BottomSheetModal-post';
import { BottomChat } from '../../layouts/BottomChat/BottomChat';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import {
  communityCommentList,
  communityPostData,
  communityPostSamples,
  infoPosts,
  questionPosts,
  type CommentItem,
  type CommunityPostDetail,
} from './data';

const CommunityPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const currentUserName = '박원빈';
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedIsMine, setSelectedIsMine] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<'post' | 'comment'>('comment');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isAdoptPopupOpen, setIsAdoptPopupOpen] = useState(false);
  const [isAdoptedPostPopupOpen, setIsAdoptedPostPopupOpen] = useState(false);
  const [isAdoptedCommentPopupOpen, setIsAdoptedCommentPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastFading, setIsToastFading] = useState(false);

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
  const isPostMine = selectedPost.author.name === currentUserName;
  const isAdopted = selectedPost.isAdopted;
  const showAdoptButton = isQuestionPost && isPostMine && !isAdopted;

  const sortedComments =
    isQuestionPost && isAdopted && selectedPost.adoptedCommentId
      ? [
          ...communityCommentList.filter(
            (comment) => comment.id === selectedPost.adoptedCommentId,
          ),
          ...communityCommentList.filter(
            (comment) => comment.id !== selectedPost.adoptedCommentId,
          ),
        ]
      : communityCommentList;

  const commentCount = communityCommentList.reduce(
    (count, comment) => count + 1 + (comment.replies?.length ?? 0),
    0,
  );

  const handleOpenCommentOptions = (comment: CommentItem) => {
    setSelectedIsMine(comment.author.name === currentUserName);
    setSelectedTarget('comment');
    setSelectedCommentId(comment.id);
    setIsOptionOpen(true);
  };

  const handleOpenPostOptions = () => {
    setSelectedIsMine(selectedPost.author.name === currentUserName);
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

    if (target === 'post' && item.label.includes('삭제') && selectedIsMine) {
      setIsDeletePopupOpen(true);
      setIsOptionOpen(false);
      return;
    }

    setIsOptionOpen(false);
  };

  const renderComment = (comment: CommentItem, isReply = false) => {
    if (isQuestionPost && isReply) return null;
    const isAdoptedComment =
      isQuestionPost && isAdopted && selectedPost.adoptedCommentId === comment.id;
    return (
      <Fragment key={comment.id}>
        <div
          className={`flex flex-col border-b border-[var(--ColorGray1,#ECECEC)] ${
            isReply
              ? 'bg-[var(--Color_Gray_B,#FCFCFC)]'
              : isAdoptedComment
                ? 'bg-[var(--ColorSub2,#F2FCF8)]'
                : ''
          }`}
        >
          <div
            className={`flex gap-[10px] ${
              isReply
                ? 'py-[15px] pl-[35px] pr-[25px]'
                : 'px-[25px] pb-[20px] pt-[17px]'
            }`}
          >
            {isReply ? <Icon name='reply' className='h-6 w-6 shrink-0' /> : null}
            <div className={`flex w-full flex-col ${isReply ? 'pt-1' : ''}`}>
              <div className='flex items-start justify-between gap-[12px]'>
                <div>
                  <div className='text-[14px] font-semibold text-[var(--ColorBlack,#202023)]'>
                    {comment.author.name}
                  </div>
                  <div className='text-[12px] text-[var(--ColorGray3,#646464)]'>
                    {comment.author.major} · {comment.author.studentId}학번
                  </div>
                </div>
                <button
                  type='button'
                  className='shrink-0'
                  onClick={() => handleOpenCommentOptions(comment)}
                  aria-label='댓글 옵션 열기'
                >
                  <Icon name='option' className='h-6 w-6' />
                </button>
              </div>

              <div className='mt-[5px] text-[16px] leading-[160%] text-[var(--ColorGray3,#646464)]'>
                {comment.content}
              </div>

              <div className='mt-[15px] flex items-center justify-between text-[12px] font-medium text-[var(--ColorGray2,#A1A1A1)]'>
                <div className='flex items-center gap-[10px]'>
                  {showAdoptButton ? (
                    <button
                      type='button'
                      className='inline-flex items-center justify-center gap-[7px] rounded-[5px] border border-[var(--ColorMain,#00C56C)] px-[8px] py-[4px] text-m-14 text-[var(--ColorMain,#00C56C)]'
                      onClick={handleOpenAdoptPopup}
                    >
                      <Icon name='checkCircle' className='h-5 w-5' />
                      채택하기
                    </button>
                  ) : null}
                  {isAdoptedComment ? (
                    <span className='inline-flex items-center gap-[7px] rounded-[5px] border border-[var(--ColorMain,#00C56C)] px-[10px] py-[4px] text-r-12 text-[var(--ColorMain,#00C56C)]'>
                      <Icon name='checkCircle' className='h-[16px] w-[16px]' />
                      채택된 댓글
                    </span>
                  ) : null}
                </div>
                <span>{comment.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
        {!isQuestionPost && comment.replies && comment.replies.length > 0
          ? comment.replies.map((reply) => renderComment(reply, true))
          : null}
      </Fragment>
    );
  };

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
            <div className='flex flex-col'>
              {sortedComments.map((comment) => renderComment(comment))}
            </div>
          </section>
        </div>
      </main>
      <BottomChat likeCount={selectedPost.likes} />
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
      <Toast
        isOpen={isToastOpen}
        isFading={isToastFading}
        message='URL 복사가 완료되었습니다'
      />
    </HeaderLayout>
  );
};

export default CommunityPostPage;
