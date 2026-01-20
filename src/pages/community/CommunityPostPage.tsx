import { Fragment, useState } from 'react';
import Category from '../../components/Category';
import Icon from '../../components/Icon';
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
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const commentCount = communityCommentList.reduce(
    (count, comment) => count + 1 + (comment.replies?.length ?? 0),
    0,
  );

  const handleOpenCommentOptions = (comment: CommentItem) => {
    setSelectedIsMine(comment.author.name === currentUserName);
    setSelectedTarget('comment');
    setIsOptionOpen(true);
  };

  const handleOpenPostOptions = () => {
    setSelectedIsMine(communityPostData.author.name === currentUserName);
    setSelectedTarget('post');
    setIsOptionOpen(true);
  };

  const renderComment = (comment: CommentItem, isReply = false) => {
    return (
      <Fragment key={comment.id}>
        <div
          className={`flex flex-col border-b border-[var(--ColorGray1,#ECECEC)] ${
            isReply ? 'bg-[var(--Color_Gray_B,#FCFCFC)]' : ''
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
                <button type='button'>답글 쓰기</button>
                <span>{comment.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
        {comment.replies && comment.replies.length > 0
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
            <div className='flex flex-col gap-[20px]'>
              <div className='text-[12px] font-normal text-[var(--ColorMain,#00C56C)]'>
                {communityPostData.boardType} 게시판 &gt;
              </div>
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
              {communityCommentList.map((comment) => renderComment(comment))}
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
      />
    </HeaderLayout>
  );
};

export default CommunityPostPage;
