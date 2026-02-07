import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Category from '../../components/Category';
import BottomSheetIcon from '../../components/BottomSheetModal/Icon';
import PopUp from '../../components/Pop-up';
import BottomSheetModal from '../../components/BottomSheetModal/BottomSheetModal';
import Icon from '../../components/Icon';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import SaveToggle from '../../layouts/BottomChat/components/SaveToggle';
import { activityLoggedInUser, mapToActivityPost } from '../../mock/activityCommunity';
import { getTeamRecruitsByActivityId } from '../../mock/teamRecruit';
import { formatOnlyDate } from '../../utils/formatDate';
import { RecruitPost } from '../../components/posts/RecruitPost';

type OptionId = 'copy-url' | 'report-post' | 'edit-post' | 'delete-post';

type OptionItem = {
  id: OptionId;
  icon: 'edit' | 'delete' | 'url' | 'report';
  label: string;
};

type TabType = 'detail' | 'team';

export const ExternalActivityPostPage = () => {
  const { postId } = useParams();
  const selectedPost = useMemo(() => mapToActivityPost(postId), [postId]);
  const navigate = useNavigate();
  const currentUser = activityLoggedInUser;

  const [activeTab, setActiveTab] = useState<TabType>('detail');
  const [isBookmarked, setIsBookmarked] = useState(selectedPost.isBookmarked ?? false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);

  const canControll = currentUser.id === "admin";
  const thumbnailUrl = selectedPost.thumbnailUrl ?? selectedPost.postImages?.[0];

  // 팀원 모집 데이터 가져오기
  const teamRecruits = useMemo(
    () => getTeamRecruitsByActivityId(selectedPost.id),
    [selectedPost.id]
  );

  const handleBookmarkToggle = (checked: boolean) => {
    setIsBookmarked(checked);
  };

  const optionItems: OptionItem[] = canControll
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
            if (selectedPost.tab === "external")
                navigate(`/admin/post/external/${selectedPost.id}`);
            else navigate(`/admin/post/job/${selectedPost.id}`);
        }

        if (item.id === 'delete-post') {
            setIsDeletePopupOpen(true);
        }

        setIsOptionOpen(false);
    };

    const renderDetailTab = () => (
        <div className='flex flex-col px-[25px] py-[30px]'>
        {/* 상세 정보 블록 */}
        {selectedPost.descriptionBlocks && (
            <div className='flex flex-col gap-[20px]'>
                <span className='text-b-16-hn text-gray-900'>
                    {selectedPost.descriptionBlocks.title}
                </span>
                <p className='text-r-14 text-gray-900 whitespace-pre-line'>
                    {selectedPost.descriptionBlocks.body}
                </p>
            </div>
        )}
        </div>
    );

    const renderTeamTab = () => (
        <div className='flex flex-col justify-center'>
            {teamRecruits.length === 0 ? (
                <span className='py-[40px] text-center text-r-14-hn text-gray-650'>
                    아직 팀원 모집 글이 없습니다.
                </span>
            ) : (
                <>
                    {teamRecruits.map((recruit) => (
                        <RecruitPost key={recruit.id} {...recruit} />
                    ))}
                </>
            )}

            {/* 팀원 모집하기 버튼 */}
            <div className='w-full flex justify-end px-[15px] py-[15px]'>
                <button
                    className='w-[150px] flex items-center justify-center gap-[7px] px-[15px] py-[10px] rounded-[3px] bg-primary text-white text-m-16-hn z-30'
                    onClick={() => navigate(`/activity/${selectedPost.id}/recruit-write`)}
                >
                    <Icon name='edit'/>
                    팀원 모집하기
                </button>
            </div>
        </div>
    );

    if (!selectedPost) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
            <p className='text-[16px] text-gray-650'>게시글을 찾을 수 없습니다.</p>
            </div>
        );
    }

    return (
        <HeaderLayout
            headerSlot={
                <header
                    className='sticky left-0 right-0 top-0 z-50 min-h-[48px] flex items-center justify-between bg-white pl-[25px] pr-[10px] py-[10px]'
                    style={{
                        paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
                        top: 'env(safe-area-inset-top, 0px)',
                    }}
                >
                    <button type='button' onClick={() => navigate(-1)} aria-label='뒤로 가기' className='z-10'>
                        <Icon name='mainBack'/>
                    </button>
                    <span className='absolute left-1/2 -translate-x-1/2 text-center text-sb-20 text-gray-900'>대외활동</span>
                    <div className='flex items-center gap-[10px] z-10'>
                        <SaveToggle 
                        width={24} 
                        height={24} 
                        isActive={isBookmarked} 
                        onToggle={handleBookmarkToggle}
                        />
                        <button type='button' onClick={() => setIsOptionOpen(true)} aria-label='게시글 옵션 열기'>
                            <Icon name='option'/>
                        </button>
                    </div>
                </header>
            }
        >
        <div className='flex w-full justify-center bg-white'>
            <div className='flex w-full max-w-[720px] flex-col'>
                {/* 썸네일 이미지 */}
                {thumbnailUrl && (
                    <div className='w-full relative'>
                        <img
                            src={thumbnailUrl}
                            alt={selectedPost.title}
                            className='w-full h-full object-cover rounded-none'
                        />
                    </div>
                )}

                {/* 헤더 정보 */}
                <section className='flex flex-col gap-[20px] px-[25px] py-[30px]'>
                    <div className='flex flex-col gap-[10px]'>
                        {/* 카테고리 태그 */}
                        <div className='flex flex-wrap gap-[5px]'>
                        {selectedPost.categories.map((category: string) => (
                            <Category key={category} label={category} />
                        ))}
                        </div>

                        {/* 제목 */}
                        <span className='text-b-28 text-gray-900'>
                            {selectedPost.title}
                        </span>

                        {/* 주최자 정보 */}
                        <div className='flex items-center'>
                            <span className='text-r-18 text-gray-750 pr-[5px]'>
                                {selectedPost.organizer || '주최자 정보 없음'}
                            </span>
                            <Icon name='bookmark' className='w-[15px] h-[15px]'/>
                            <span className='text-r-12 text-gray-650'>
                                {selectedPost.saveCount}
                            </span>
                        </div>
                    </div>

                    {/* 기본 정보 */}
                    <div className='pb-[10px] flex flex-col gap-[2px] text-r-14-hn text-gray-750'>
                    
                    {selectedPost.tab === "external" ? (
                        <>
                            {selectedPost.target && (
                                <span>
                                    모집 대상 : {selectedPost.target}
                                </span>
                            )}
                            {selectedPost.applyPeriod && (
                                <span>
                                    접수 기간 : {formatOnlyDate(selectedPost.applyPeriod.start)} ~ {formatOnlyDate(selectedPost.applyPeriod.end)}
                                </span>
                            )}
                            {selectedPost.announceDate && (
                                <span>
                                    결과 발표 : {formatOnlyDate(selectedPost.announceDate)}
                                </span>
                            )}
                        </>
                    ) : (
                        <>
                            {selectedPost.employType && (
                                <span>
                                    채용 형태 : {selectedPost.employType}
                                </span>
                            )}
                            {selectedPost.applyPeriod && (
                                <span>
                                    접수 기간 : {formatOnlyDate(selectedPost.applyPeriod.start)} ~ {formatOnlyDate(selectedPost.applyPeriod.end)}
                                </span>
                            )}
                            {selectedPost.payment && (
                                <span>
                                    급여 : {selectedPost.payment}
                                </span>
                            )}
                        </>
                    )}
                    </div>

                    {/* 공식 홈페이지 버튼 */}
                    {selectedPost.applyUrl && (
                    <a
                        href={selectedPost.applyUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-[40px] py-[15px] text-center flex items-center justify-center w-full rounded-full bg-primary text-white text-b-16-hn'
                    >
                        공식 홈페이지에서 신청하기
                    </a>
                    )}
                </section>

                {/* 탭 */}
                <div className='flex border-b border-[#ECECEC]'>
                    <button
                    type='button'
                    onClick={() => setActiveTab('detail')}
                    className={`flex-1 py-[15px] transition-colors border-b-2 ${
                        activeTab === 'detail'
                        ? 'border-gray-900 text-gray-900 text-b-16-hn'
                        : 'border-transparent text-gray-650 text-r-16-hn'
                    }`}
                    >
                    상세 정보
                    </button>
                    <button
                    type='button'
                    onClick={() => setActiveTab('team')}
                    className={`flex-1 py-[15px] transition-colors border-b-2 ${
                        activeTab === 'team'
                        ? 'border-gray-900 text-gray-900 text-b-16-hn'
                        : 'border-transparent text-gray-650 text-r-16-hn'
                    }`}
                    >
                    팀원 모집 ({teamRecruits.length})
                    </button>
                </div>

            {/* 탭 컨텐츠 */}
            {activeTab === 'detail' ? renderDetailTab() : renderTeamTab()}
            </div>
        </div>


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

export default ExternalActivityPostPage;