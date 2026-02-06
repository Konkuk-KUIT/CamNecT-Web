import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Category from '../../components/Category';
import Icon from '../../components/Icon';
import BottomSheetIcon from '../../components/BottomSheetModal/Icon';
import PopUp from '../../components/Pop-up';
import BottomSheetModal from '../../components/BottomSheetModal/BottomSheetModal';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import BottomReact from './components/BottomReact';
import {
  activityLoggedInUser,
  getActivityPostStatusLabel,
  mapToActivityPost,
} from '../../mock/activityCommunity';
import type { ActivityPostStatus } from '../../types/activityPage/activityPageTypes';
import { formatPostDisplayDate } from './utils/post';

type OptionId = 'copy-url' | 'report-post' | 'edit-post' | 'delete-post';

type OptionItem = {
  id: OptionId;
  icon: 'edit' | 'delete' | 'url' | 'report';
  label: string;
};

const ActivityPostPage = () => {
  const { postId } = useParams();
  const selectedPost = useMemo(() => mapToActivityPost(postId), [postId]);

  return <ActivityPostContent key={selectedPost.id} selectedPost={selectedPost} />;
};

type ActivityPostContentProps = {
  selectedPost: ReturnType<typeof mapToActivityPost>;
};

const ActivityPostContent = ({ selectedPost }: ActivityPostContentProps) => {
  const navigate = useNavigate();
  const currentUser = activityLoggedInUser;

  const [status, setStatus] = useState<ActivityPostStatus>(selectedPost.status ?? 'OPEN');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);
  const [isRecruitPopupOpen, setIsRecruitPopupOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(selectedPost.isLiked ?? false);
  const [isBookmarked, setIsBookmarked] = useState(selectedPost.isBookmarked ?? false);

  const handleLikeToggle = (checked: boolean) => {
    setIsLiked(checked);
  };

  const handleBookmarkToggle = (checked: boolean) => {
    setIsBookmarked(checked);
  };

  const isPostMine = selectedPost.author.id === currentUser.id;
  const statusLabel = getActivityPostStatusLabel(status);

  const optionItems: OptionItem[] = isPostMine
    ? [
        { id: 'edit-post', icon: 'edit', label: '게시글 수정' },
        { id: 'delete-post', icon: 'delete', label: '게시글 삭제' },
      ]
    : [
        { id: 'copy-url', icon: 'url', label: 'URL 복사' },
        { id: 'report-post', icon: 'report', label: '게시글 신고' },
      ];

  const handleOptionClick = async (item: OptionItem) => {
    if (item.id === 'copy-url') {
      const postUrl = `${window.location.origin}/activity/post/${selectedPost.id}`;
      try {
        await navigator.clipboard.writeText(postUrl);
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = postUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    }

    if (item.id === 'report-post') {
      setIsReportPopupOpen(true);
    }

    if (item.id === 'edit-post') {
      navigate(`/activity/edit/${selectedPost.id}`);
    }

    if (item.id === 'delete-post') {
      setIsDeletePopupOpen(true);
    }

    setIsOptionOpen(false);
  };

  return (
    <HeaderLayout
      headerSlot={
        <MainHeader
          title='대외활동'
          rightActions={[
            { icon: 'option', onClick: () => setIsOptionOpen(true), ariaLabel: '게시글 옵션 열기' },
          ]}
        />
      }
    >
      <main className='flex w-full justify-center bg-white'>
         <div className='flex w-full max-w-[720px] flex-col pb-[90px] sm:px-[25px]'>
           <section className='flex flex-col gap-[35px] border-b border-[#ECECEC] px-5 pb-[30px] pt-[22px] sm:px-[25px]'>
             <div className='flex flex-col items-start gap-[20px]'>
               <div
                className={`inline-flex min-w-[68px] items-center justify-center rounded-[30px] border px-[12px] py-[4px] text-r-16 ${
                  status === 'CLOSED'
                    ? 'border-[var(--ColorGray2,#A1A1A1)] text-[var(--ColorGray2,#A1A1A1)]'
                    : 'border-[var(--ColorMain,#00C56C)] text-[var(--ColorMain,#00C56C)]'
                }`}
              >
                {statusLabel}
              </div>
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
                      <svg viewBox='0 0 11 12' fill='none' className='w-[11px] h-[12px]'>
                        <path 
                          d='M9.22867 0.697692C9.962 0.775908 10.5 1.3558 10.5 2.03286V11.5L5.5 9.20853L0.5 11.5V2.03286C0.5 1.3558 1.03733 0.775908 1.77133 0.697692C4.24879 0.434103 6.75121 0.434103 9.22867 0.697692Z' 
                          stroke='#646464' 
                          strokeLinecap='round' 
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span>{selectedPost.saveCount}</span>
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
              <div className='flex flex-wrap gap-[5px]'>
                {selectedPost.categories.map((category: string) => (
                  <Category key={category} label={category} />
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>

      <BottomReact
        isMine={isPostMine}
        status={status}
        likeCount={selectedPost.likes}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        onLikeToggle={handleLikeToggle}
        onBookmarkToggle={handleBookmarkToggle}
        onOpenCompletePopup={() => setIsRecruitPopupOpen(true)}
      />

      <BottomSheetModal isOpen={isOptionOpen} onClose={() => setIsOptionOpen(false)} height='auto'>
        <div className='flex min-h-[200px] flex-col px-[clamp(16px,6vw,25px)] pt-[30px]'>
          <div className='flex flex-col divide-y divide-[var(--ColorGray1,#ECECEC)]'>
            {optionItems.map((item) => (
              <button
                key={item.id}
                type='button'
                onClick={() => handleOptionClick(item)}
                className='flex items-center gap-[15px] py-[15px] text-left'
              >
                <BottomSheetIcon name={item.icon} />
                <span className='text-[16px] font-medium text-[var(--ColorGray3,#646464)]'>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </BottomSheetModal>

      <PopUp
        isOpen={isRecruitPopupOpen}
        type='info'
        title='모집을 완료하시겠습니까?'
        content={'모집 완료 후에는 다시 모집 중 상태로\n변경할 수 없습니다.'}
        onLeftClick={() => setIsRecruitPopupOpen(false)}
        onRightClick={() => {
          setStatus('CLOSED');
          setIsRecruitPopupOpen(false);
        }}
      />

      <PopUp
        isOpen={isDeletePopupOpen}
        type='warning'
        title='정말 삭제하시겠습니까?'
        content='삭제된 내용은 복구 불가능합니다.'
        onLeftClick={() => setIsDeletePopupOpen(false)}
        onRightClick={() => setIsDeletePopupOpen(false)}
      />

      <PopUp
        isOpen={isReportPopupOpen}
        type='confirm'
        title='현재 제작 중이에요!'
        content='유저분들이 더 즐겁게 소통할 수 있도록\n꼼꼼히 준비해서 돌아올게요!'
        onClick={() => setIsReportPopupOpen(false)}
      />
    </HeaderLayout>
  );
};

export default ActivityPostPage;
