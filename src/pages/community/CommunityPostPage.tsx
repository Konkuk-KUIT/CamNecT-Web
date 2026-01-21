import { Fragment, useState } from 'react';
import Category from '../../components/Category';
import Icon from '../../components/Icon';
import PopUp from '../../components/Pop-up';
import BottomSheetModalPost from '../../components/BottomSheetModal/BottomSheetModal-post';
import { BottomChat } from '../../layouts/BottomChat/BottomChat';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import { communityCommentList, communityPostData, type CommentItem } from './data';

const CommunityPostPage = () => {
  const currentUserName = '박원빈';
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedIsMine, setSelectedIsMine] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<'post' | 'comment'>('comment');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isAdoptPopupOpen, setIsAdoptPopupOpen] = useState(false);
  const [isAdoptedPostPopupOpen, setIsAdoptedPostPopupOpen] = useState(false);
  const [isAdoptedCommentPopupOpen, setIsAdoptedCommentPopupOpen] = useState(false);

  const isQuestionPost = communityPostData.boardType === '질문';
  const isPostMine = communityPostData.author.name === currentUserName;
  const isAdopted = communityPostData.isAdopted;
  const showAdoptButton = isQuestionPost && isPostMine && !isAdopted;

  const sortedComments =
    isQuestionPost && isAdopted && communityPostData.adoptedCommentId
      ? [
          ...communityCommentList.filter(
            (comment) => comment.id === communityPostData.adoptedCommentId,
          ),
          ...communityCommentList.filter(
            (comment) => comment.id !== communityPostData.adoptedCommentId,
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
    setSelectedIsMine(communityPostData.author.name === currentUserName);
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

  const handleOptionItemClick = (
    item: { label: string },
    target: 'post' | 'comment',
  ) => {
    const isEditOrDelete = item.label.includes('수정') || item.label.includes('삭제');
    if (!isEditOrDelete) {
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
      selectedCommentId === communityPostData.adoptedCommentId
    ) {
      setIsAdoptedCommentPopupOpen(true);
      setIsOptionOpen(false);
      return;
    }

    setIsOptionOpen(false);
  };

  const renderComment = (comment: CommentItem, isReply = false) => {
    if (isQuestionPost && isReply) return null;
    const isAdoptedComment =
      isQuestionPost && isAdopted && communityPostData.adoptedCommentId === comment.id;
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
                  {communityPostData.boardType} 게시판 &gt;
                </div>
              )}
              <div className='flex flex-col gap-[13px]'>
                <div className='text-[24px] font-bold leading-[130%] text-black'>
                  {communityPostData.title}
                </div>
                <div className='flex flex-wrap items-center gap-[10px] text-[12px] text-[var(--ColorGray3,#646464)]'>
                  <div className='flex items-center gap-[5px]'>
                    <div className='flex items-center gap-[3px]'>
                      <Icon name='like' className='h-[14px] w-[14px]' />
                      <span>{communityPostData.likes}</span>
                    </div>
                    <div className='flex items-center gap-[3px]'>
                      <Icon name='comment' className='h-[14px] w-[14px]' />
                      <span>{communityPostData.comments}</span>
                    </div>
                  </div>
                  <span className='text-[var(--ColorGray2,#A1A1A1)]'>
                    {communityPostData.createdAt}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex justify-between gap-[12px] border-b border-[#ECECEC] pb-[15px] sm:flex-row sm:items-center '>
              <div className='flex items-center gap-[10px]'>
                {communityPostData.author.profileImageUrl ? (
                  <img
                    src={communityPostData.author.profileImageUrl}
                    alt={`${communityPostData.author.name} 프로필`}
                    className='h-[32px] w-[32px] rounded-full object-cover'
                  />
                ) : (
                  <div className='h-[32px] w-[32px] rounded-full bg-[#ECECEC]' aria-hidden='true' />
                )}
                <div className='flex flex-col gap-[4px]'>
                  <div className='text-[14px] font-semibold text-[var(--ColorBlack,#202023)]'>
                    {communityPostData.author.name}
                  </div>
                  <div className='text-[12px] text-[var(--ColorGray3,#646464)]'>
                    {communityPostData.author.major} {communityPostData.author.studentId}학번
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
                {communityPostData.content}
              </div>
              {communityPostData.postImages && communityPostData.postImages.length > 0 ? (
                <div className='mt-[30px] -mr-5 overflow-x-auto sm:-mr-[25px]'>
                  <div className='flex w-max gap-[5px] pr-[20px]'>
                    {communityPostData.postImages.map((imageUrl, index) => {
                      const imageKey = `${communityPostData.id}-image-${index + 1}`;
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
                          alt={`${communityPostData.title} 이미지 ${index + 1}`}
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
                {communityPostData.categories.map((category) => (
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
      <BottomChat likeCount={communityPostData.likes} />
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
    </HeaderLayout>
  );
};

export default CommunityPostPage;
