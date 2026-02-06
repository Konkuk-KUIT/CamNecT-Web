import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import SaveToggle from '../../layouts/BottomChat/components/SaveToggle';
import { getTeamRecruitDetail } from '../../mock/teamRecruit';
import { formatOnlyDate, formatTimeAgo } from '../../utils/formatDate';
import { activityLoggedInUser } from '../../mock/activityCommunity';
import { MainHeader } from '../../layouts/headers/MainHeader';
import BottomSheetModal from '../../components/BottomSheetModal/BottomSheetModal';
import BottomSheetIcon from '../../components/BottomSheetModal/Icon';
import PopUp from '../../components/Pop-up';
import Icon from '../../components/Icon';
import TeamApplyModal from './components/TeamApplyModal';

type OptionId = 'copy-url' | 'report-post' | 'edit-post' | 'delete-post';

type OptionItem = {
  id: OptionId;
  icon: 'edit' | 'delete' | 'url' | 'report';
  label: string;
};

export const RecruitDetailPage = () => {
    const { recruitId } = useParams();
    const navigate = useNavigate();
    const currentUser = activityLoggedInUser;
    const recruitDetail = useMemo(() => getTeamRecruitDetail(recruitId || ''), [recruitId]);

    const [isBookmarked, setIsBookmarked] = useState(recruitDetail?.isBookmarked ?? false);
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    if (!recruitDetail) {
        return (
        <div className='flex items-center justify-center min-h-screen'>
            <p className='text-[16px] text-[var(--ColorGray3,#646464)]'>
                팀원 모집 글을 찾을 수 없습니다.
            </p>
        </div>
        );
    }

    const isPostMine = recruitDetail.authorId === currentUser.id;

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
            const postUrl = `${window.location.origin}/activity/team-recruit/${recruitDetail.id}`;
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
            navigate(`/activity/recruit-write/${recruitDetail.id}`);
        }

        if (item.id === 'delete-post') {
            setIsDeletePopupOpen(true);
        }

        setIsOptionOpen(false);
    };

  const handleBookmarkToggle = (checked: boolean) => {
    setIsBookmarked(checked);
  };

  const statusLabel = recruitDetail.recruitNow ? '모집 중' : '모집 완료';

    return (
        <HeaderLayout
            headerSlot={
                <MainHeader
                    title='팀원 모집'
                    rightActions={[
                        { icon: 'option', onClick: () => setIsOptionOpen(true), ariaLabel: '게시글 옵션 열기' },
                    ]}
                />
            }
        >
        <div className='flex w-full justify-center bg-white pb-[60px]'>
            <div className='flex w-full flex-col'>
                <section className='flex flex-col gap-[30px] px-[25px] pt-[25px]'>
                    {/* 모집 상태 배지 & 제목 */}
                    <div className='flex flex-col items-start gap-[15px]'>
                        <div
                            className={`inline-flex min-w-[68px] items-center justify-center rounded-full border px-[12px] py-[4px] text-r-16-hn ${
                            recruitDetail.recruitNow
                                ? 'border-primary text-primary'
                                : 'border-gray-650 text-gray-650'
                            }`}
                        >
                            {statusLabel}
                        </div>
                        <div className='flex flex-col gap-[13px] w-full'>
                            <div className='text-b-24-hn text-gray-900'>
                                {recruitDetail.title}
                            </div>
                            <div className="flex items-center gap-[5px] text-r-12-hn text-gray-650">
                                <div className="flex items-center gap-[2px]">
                                    <Icon name='bookmark' className='w-[12px] h-[12px]'/>
                                    <span>{recruitDetail.bookmarkCount}</span>
                                </div>
                                <span>|</span>
                                <span>{formatTimeAgo(recruitDetail.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* 작성자 정보 */}
                    <div className='flex justify-between gap-[10px] border-b border-gray-150 pb-[15px]'>
                        <div className='flex items-center gap-[10px]'>
                            <div className='h-[32px] w-[32px] rounded-full overflow-hidden'>
                                <img 
                                    src={recruitDetail.authorProfile}
                                    alt={`${recruitDetail.authorName} 프로필`}
                                    className='h-full w-full object-cover'
                                />
                            </div>
                            <div className='flex flex-col gap-[3px]'>
                                <div className='text-b-14-hn text-gray-900'>
                                    {recruitDetail.authorName}
                                </div>
                                <div className='text-r-12-hn text-gray-750'>
                                    {recruitDetail.authorMajor} {recruitDetail.authorGrade}학번
                                </div>
                            </div>
                        </div>
                        <button
                            className='inline-flex items-center justify-center rounded-[10px] border border-primary p-[10px] text-m-12-hn text-primary break-keep'
                            onClick={() => {navigate("/alumni")}}
                        >
                            커피챗 보내기
                        </button>
                    </div>

                    <div className='flex flex-col gap-[12px] py-[10px]'>
                        <div className='flex'>
                            <span className='min-w-[100px] text-sb-16-hn text-gray-750'>공고</span>
                            <a
                                href={recruitDetail.activityUrl}
                                className='text-r-16-hn text-primary underline'
                            >
                                {recruitDetail.activityTitle}
                            </a>
                        </div>

                        {/* 모집 정보 */}
                        <div className='flex text-gray-750'>
                            <span className='min-w-[100px] text-sb-16-hn'>
                            모집 마감일
                            </span>
                            <span className='text-r-16-hn'>
                            {formatOnlyDate(recruitDetail.recruitDeadline)}
                            </span>
                        </div>
                        <div className='flex text-gray-750'>
                            <span className='min-w-[100px] text-sb-16-hn'>
                            모집 인원
                            </span>
                            <span className='text-r-16-hn'>
                            {recruitDetail.recruitTeamNumber}인
                            </span>
                        </div>
                    </div>

                    {/* 모집 내용 */}
                    <div className='flex py-[20px]'>
                        <p className='text-r-16 text-gray-750 whitespace-pre-line'>
                            {recruitDetail.description}
                        </p>
                    </div>
                </section>
            </div>
        </div>

        {/* 하단 버튼 */}
      <div className='fixed bottom-0 left-0 right-0 z-50 bg-white'>
        <div
          className='mx-auto flex w-full max-w-[720px] items-center gap-[15px] px-[25px] py-[15px] box-border'
          style={{ paddingBottom: 'calc(6px + env(safe-area-inset-bottom))' }}
        >
            {recruitDetail.recruitNow ? (
                <>
                    {recruitDetail.isSubmited ? (
                        <button
                            type='button'
                            disabled={true}
                            className='flex-1 py-[15px] rounded-[5px] bg-gray-650 text-white text-sb-16-hn'
                        >
                            팀원 신청 완료
                        </button>
                    ) : (
                        <button
                            type='button'
                            onClick={() => setIsApplyModalOpen(true)}
                            className='flex-1 py-[15px] rounded-[5px] bg-primary text-white text-sb-16-hn'
                        >
                            팀원 신청하기
                        </button>
                    )}
                </>
            ) : (
                <button
                    type='button'
                    disabled={true}
                    className='flex-1 py-[15px] rounded-[5px] bg-gray-650 text-white text-sb-16-hn'
                >
                    팀원 모집 종료
                </button>
            )}
            <div className='flex shrink-0 items-center'>
                <SaveToggle width={24} height={24} isActive={isBookmarked} onToggle={handleBookmarkToggle} />
            </div>
        </div>
      </div>

        <BottomSheetModal isOpen={isOptionOpen} onClose={() => setIsOptionOpen(false)} height='auto'>
            <div className='flex min-h-[200px] flex-col px-[clamp(16px,6vw,25px)] pt-[30px]'>
                <div className='flex flex-col divide-y divide-gray-150'>
                    {optionItems.map((item) => (
                    <button
                        key={item.id}
                        type='button'
                        onClick={() => handleOptionClick(item)}
                        className='flex items-center gap-[15px] py-[15px] text-left'
                    >
                        <BottomSheetIcon name={item.icon} />
                        <span className='text-m-16-hn text-gray-750'>
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

        <TeamApplyModal
            isOpen={isApplyModalOpen}
            onClose={() => setIsApplyModalOpen(false)}
            activityTitle={recruitDetail.activityTitle}
            onSubmit={async (payload) => {
                console.log('팀원 신청:', payload);
                // TODO: API 호출
                //isSumbited -> true로 변경
                return true;
            }}
        />
        </HeaderLayout>
    );
};