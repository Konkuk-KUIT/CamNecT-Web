import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../components/Icon';
import PopUp from '../../../components/Pop-up';
import Card from '../../../components/Card';
import { HeaderLayout } from '../../../layouts/HeaderLayout';
import { EditHeader } from '../../../layouts/headers/EditHeader';
import FilterHeader from '../../../components/FilterHeader';
import TagsFilterModal from '../../../components/TagsFilterModal';
import { MOCK_ALL_TAGS, TAG_CATEGORIES } from '../../../mock/tags';
import { useImageUpload } from '../../../hooks/useImageUpload';
import { mapToActivityPost } from '../../../mock/activityCommunity';

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
const clampDay = (day: number, year: number, month: number) => Math.min(day, daysInMonth(year, month));


type PostType = 'external' | 'job';

interface ExternalJobWritePageProps {
    type: PostType;
}

export const ExternalJobWrite = ({ type }: ExternalJobWritePageProps) => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const isEditMode = Boolean(postId);

    // TODO: postId로 기존 데이터 가져오기
    const editPost = useMemo(() => {
        if (!postId) return null;
        return mapToActivityPost(postId);
    }, [postId]);

    const initial = useMemo(() => {
  const currentYear = new Date().getFullYear();

  const startDate = editPost?.applyPeriod?.start ? new Date(editPost.applyPeriod.start) : null;
  const endDate = editPost?.applyPeriod?.end ? new Date(editPost.applyPeriod.end) : null;
  const announceDate = editPost?.announceDate ? new Date(editPost.announceDate) : null;

  const startY = startDate?.getFullYear() ?? currentYear;
  const startM = startDate ? startDate.getMonth() + 1 : 1;
  const startD = startDate?.getDate() ?? 1;

  const endY = endDate?.getFullYear() ?? currentYear;
  const endM = endDate ? endDate.getMonth() + 1 : 12;
  const endD = endDate?.getDate() ?? 31;

  const announceY = announceDate?.getFullYear() ?? currentYear;
  const announceM = announceDate ? announceDate.getMonth() + 1 : 1;
  const announceD = announceDate?.getDate() ?? 1;

  return {
    currentYear,

    title: editPost?.title ?? '',
    selectedTags: editPost?.categories ?? [],
    organizer: editPost?.organizer ?? '',
    applyUrl: editPost?.applyUrl ?? '',
    descriptionTitle: editPost?.descriptionBlocks?.title ?? '',
    descriptionBody: editPost?.descriptionBlocks?.body ?? '',

    target: editPost?.target ?? '',
    employType: editPost?.employType ?? '',
    payment: editPost?.payment ?? '',

    startYear: startY,
    startMonth: startM,
    startDay: clampDay(startD, startY, startM),

    endYear: endY,
    endMonth: endM,
    endDay: clampDay(endD, endY, endM),

    announceYear: announceY,
    announceMonth: announceM,
    announceDay: clampDay(announceD, announceY, announceM),

    thumbnailUrl: editPost?.thumbnailUrl
      ? { id: 'existing-thumbnail', url: editPost.thumbnailUrl }
      : null,
  };
}, [editPost]);


    const currentYear = initial.currentYear;

    const [title, setTitle] = useState(() => initial.title);
    // external 전용
    const [target, setTarget] = useState(() => initial.target);
    const [announceYear, setAnnounceYear] = useState(() => initial.announceYear);
    const [announceMonth, setAnnounceMonth] = useState(() => initial.announceMonth);
    const [announceDay, setAnnounceDay] = useState(() => initial.announceDay);
    const [showAnnounceYearDropdown, setShowAnnounceYearDropdown] = useState(false);
    const [showAnnounceMonthDropdown, setShowAnnounceMonthDropdown] = useState(false);
    const [showAnnounceDayDropdown, setShowAnnounceDayDropdown] = useState(false);
    
    // job 전용
    const [employType, setEmployType] = useState(() => initial.employType);
    const [payment, setPayment] = useState(() => initial.payment);  
    
    // 공통
    const [startYear, setStartYear] = useState(() => initial.startYear);
    const [startMonth, setStartMonth] = useState(() => initial.startMonth);
    const [startDay, setStartDay] = useState(() => initial.startDay);

    const [endYear, setEndYear] = useState(() => initial.endYear);
    const [endMonth, setEndMonth] = useState(() => initial.endMonth);
    const [endDay, setEndDay] = useState(() => initial.endDay);

    const [organizer, setOrganizer] = useState(() => initial.organizer);
    const [applyUrl, setApplyUrl] = useState(() => initial.applyUrl);
    const [descriptionTitle, setDescriptionTitle] = useState(() => initial.descriptionTitle);
    const [descriptionBody, setDescriptionBody] = useState(() => initial.descriptionBody);

    const [thumbnailUrl, setThumbnailUrl] = useState<{ id: string; url: string } | null>(
        () => initial.thumbnailUrl
    );

    const [selectedTags, setSelectedTags] = useState<string[]>(
        () => initial.selectedTags
    );

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isCancelWarningOpen, setIsCancelWarningOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [showStartYearDropdown, setShowStartYearDropdown] = useState(false);
    const [showStartMonthDropdown, setShowStartMonthDropdown] = useState(false);
    const [showStartDayDropdown, setShowStartDayDropdown] = useState(false);
    const [showEndYearDropdown, setShowEndYearDropdown] = useState(false);
    const [showEndMonthDropdown, setShowEndMonthDropdown] = useState(false);
    const [showEndDayDropdown, setShowEndDayDropdown] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { prepareImage } = useImageUpload();

    const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

    const startDaysInMonth = useMemo(() => new Date(startYear, startMonth, 0).getDate(), [startYear, startMonth]);
    const endDaysInMonth = useMemo(() => new Date(endYear, endMonth, 0).getDate(), [endYear, endMonth]);
    const announceDaysInMonth = useMemo(() => new Date(announceYear, announceMonth, 0).getDate(), [announceYear, announceMonth]);

    const startDays = Array.from({ length: startDaysInMonth }, (_, i) => i + 1);
    const endDays = Array.from({ length: endDaysInMonth }, (_, i) => i + 1);
    const announceDays = Array.from({ length: announceDaysInMonth }, (_, i) => i + 1);

    // 타입별 설정
    const config = useMemo(() => {
        if (type === 'external') {
        return {
            title: '대외활동',
            field1Label: '모집 대상',
            field1Placeholder: '내용 입력',
            field2Label: '수상 발표',
            imageLabel: '대표 이미지',
            contentLabel: '공모전 개요',
            contentPlaceholder: '공모전 개요 입력',
            detailLabel: '공모전 상세 정보',
            detailPlaceholder: '공모전 상세 입력',
        };
        } else {
        return {
            title: '취업정보',
            field1Label: '채용 형태',
            field1Placeholder: '내용 입력',
            field2Label: '급여',
            imageLabel: '대표 이미지',
            contentLabel: '취업 정보 개요',
            contentPlaceholder: '취업 정보 개요 입력',
            detailLabel: '취업 정보 상세',
            detailPlaceholder: '취업 정보 상세 입력',
        };
        }
    }, [type]);

    // 초기값 저장
    const initialBase = useMemo(() => ({
        title: initial.title,
        organizer: initial.organizer,
        applyUrl: initial.applyUrl,
        descriptionTitle: initial.descriptionTitle,
        descriptionBody: initial.descriptionBody,
        startYear: initial.startYear,
        startMonth: initial.startMonth,
        startDay: initial.startDay,
        endYear: initial.endYear,
        endMonth: initial.endMonth,
        endDay: initial.endDay,
        selectedTags: initial.selectedTags,
        thumbnailUrl: initial.thumbnailUrl?.url ?? null,
    }), [initial]);


    const initialDataExternal = useMemo(() => ({
        ...initialBase,
        target: initial.target,
        announceYear: initial.announceYear,
        announceMonth: initial.announceMonth,
        announceDay: initial.announceDay,
    }), [initialBase, initial]);

    const initialDataJob = useMemo(() => ({
        ...initialBase,
        employType: initial.employType,
        payment: initial.payment,
    }), [initialBase, initial]);



    // 변경사항 추적
    const hasChanges = useMemo(() => {
        const baseChanges =
        title !== initialBase.title ||
        organizer !== initialBase.organizer ||
        applyUrl !== initialBase.applyUrl ||
        descriptionTitle !== initialBase.descriptionTitle ||
        descriptionBody !== initialBase.descriptionBody ||
        startYear !== initialBase.startYear ||
        startMonth !== initialBase.startMonth ||
        startDay !== initialBase.startDay ||
        endYear !== initialBase.endYear ||
        endMonth !== initialBase.endMonth ||
        endDay !== initialBase.endDay ||
        JSON.stringify(selectedTags) !== JSON.stringify(initialBase.selectedTags) ||
        (thumbnailUrl?.url ?? null) !== (initialBase.thumbnailUrl ?? null)

        if (type === 'external') {
        return (
            baseChanges ||
            target !== initialDataExternal.target ||
            announceYear !== initialDataExternal.announceYear ||
            announceMonth !== initialDataExternal.announceMonth ||
            announceDay !== initialDataExternal.announceDay
        );
        } else {
        return (
            baseChanges ||
            employType !== initialDataJob.employType ||
            payment !== initialDataJob.payment
        );
        }
    }, [title, organizer, applyUrl, descriptionTitle, descriptionBody, startYear, startMonth, startDay, endYear, endMonth, endDay, selectedTags, thumbnailUrl,
        target, announceYear, announceMonth, announceDay, employType, payment, initialBase, initialDataExternal, initialDataJob, type]);

    const confirmTitle = isEditMode ? '게시글을 수정하시겠습니까?' : '게시글을 등록하시겠습니까?';
    const confirmContent = isEditMode ? '수정된 내용으로 저장됩니다.' : '등록 후에도 수정/삭제가 가능합니다.';

    const isSubmitEnabled = title.trim().length > 0 && selectedTags.length > 0;

    const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        const result = prepareImage(file);
        if (!result) return;

        if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl.url);
        }

        setThumbnailUrl({
        id: `${file.name}-${file.lastModified}`,
        url: result.previewUrl,
        });

        event.target.value = '';
    };

    const handleRemoveThumbnail = () => {
        if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl.url);
        setThumbnailUrl(null);
        }
    };

    const handleSubmit = () => {
        if (!isSubmitEnabled) return;
        setIsConfirmOpen(true);
    };

    const handleConfirm = () => {
        const baseData = {
        id: postId,
        title,
        organizer,
        applyUrl,
        descriptionBlocks: {
            title: descriptionTitle,
            body: descriptionBody,
        },
        applyPeriod: {
            start: `${startYear}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`,
            end: `${endYear}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`,
        },
        categories: selectedTags,
        thumbnailUrl: thumbnailUrl?.url,
        };

        if (type === 'external') {
        console.log({
            ...baseData,
            target,
            announceDate: `${announceYear}-${String(announceMonth).padStart(2, '0')}-${String(announceDay).padStart(2, '0')}`,
        });
        } else {
        console.log({
            ...baseData,
            employType,
            payment,
        });
        }
        
        navigate(-1);
    };

    const handleCancelClick = () => {
        if (hasChanges) {
        setIsCancelWarningOpen(true);
        return;
        }
        navigate(-1);
    };

    const handleCancelConfirm = () => {
        setIsCancelWarningOpen(false);
        navigate(-1);
    };

    const handleCancelDismiss = () => {
        setIsCancelWarningOpen(false);
    };

    return (
        <HeaderLayout
            headerSlot={
                <EditHeader
                    title={config.title}
                    leftAction={{ onClick: handleCancelClick }}
                    rightElement={
                        <button
                            type='button'
                            className={`text-b-16-hn transition-colors ${
                                    isSubmitEnabled ? 'text-primary' : 'text-gray-650'
                                    }`}
                            onClick={handleSubmit}
                            disabled={!isSubmitEnabled}
                            >
                        완료
                        </button>
                    }
                />
            }
            >
            <div className='flex h-full w-full flex-col bg-white border-t border-gray-150'>
                <section className='flex w-full flex-col px-[25px] py-[10px] gap-[30px] border-t border-gray-150'>
                    <div className='flex flex-col'>
                        {/* 제목 입력 */}
                        <div
                            className='flex w-full flex-col p-[10px]'
                        >
                            <input
                            id='activity-title'
                            name='title'
                            type='text'
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder='제목'
                            className='w-full text-b-18 text-gray-900 placeholder:text-gray-650 focus:outline-none'
                            />
                        </div>

                        {/* 태그 입력 */}
                        <div className='w-full flex flex-col px-[10px] py-[6px] border-t border-b border-gray-650'>
                            <FilterHeader
                                activeFilters={selectedTags}
                                onOpenFilter={() => setIsFilterOpen(true)}
                                onRemoveFilter={(tag) => setSelectedTags((prev) => prev.filter((item) => item !== tag))} />
                        </div>
                    </div>

                    {/* 주최 */}
                    <div className='flex flex-col gap-[10px]'>
                        <label className='text-sb-16-hn text-gray-900'>주최</label>
                        <input
                            type='text'
                            value={organizer}
                            onChange={(e) => setOrganizer(e.target.value)}
                            placeholder='주최 기관/단체 입력'
                            className='w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] text-r-16-hn text-gray-750 placeholder:text-gray-650 focus:outline-none' />
                    </div>

                    {/* Field 1 (모집 대상 or 채용 형태) */}
                    <div className='flex flex-col gap-[10px]'>
                        <label className='text-sb-16-hn text-gray-900'>{config.field1Label}</label>
                        <input
                        type='text'
                        value={type === 'external' ? target : employType}
                        onChange={(e) => type === 'external' ? setTarget(e.target.value) : setEmployType(e.target.value)}
                        placeholder={config.field1Placeholder}
                        className='w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] text-r-16-hn text-gray-750 placeholder:text-gray-650 focus:outline-none' />
                    </div>

                    <div className='flex flex-col gap-[20px]'>
                        {/* 접수 기간 - 시작일 */}
                        <div className='flex flex-col gap-[10px]'>
                            <label className='text-sb-16-hn text-gray-900'>접수 기간</label>
                            <span className='text-r-14-hn text-gray-650'>시작일</span>
                            <div className='flex gap-[10px] flex-wrap'>
                                <div className='flex-1 relative'>
                                    <button type='button' onClick={() => setShowStartYearDropdown(!showStartYearDropdown)}
                                    className='w-full min-w-[113px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'>
                                        <span className='text-r-16-hn text-gray-750'>{startYear}년</span>
                                        <Icon name='toggleDown' className={`w-[24px] h-[24px] transition-transform ${showStartYearDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showStartYearDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                        {years.map((y) => (
                                        <button key={y} type='button' onClick={() => { 
                                            setStartYear(y);
                                            setStartDay((d) => clampDay(d, y, startMonth));
                                            setShowStartYearDropdown(false);
                                         }}
                                            className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${startYear === y ? 'text-primary' : 'text-gray-650'}`}>
                                            {y}년
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>

                                <div className='flex-1 relative'>
                                    <button type='button' onClick={() => setShowStartMonthDropdown(!showStartMonthDropdown)}
                                    className='w-full min-w-[86px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'>
                                        <span className='text-r-16-hn text-gray-750'>{startMonth}월</span>
                                        <Icon name='toggleDown' className={`w-[24px] h-[24px] transition-transform ${showStartMonthDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showStartMonthDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                        {MONTHS.map((m) => (
                                        <button key={m} type='button'
                                            onClick={() => {
                                                setStartMonth(m);
                                                setStartDay((d) => clampDay(d, startYear, m));
                                                setShowStartMonthDropdown(false);
                                            }}
                                            className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${startMonth === m ? 'text-primary' : 'text-gray-650'}`}>
                                            {m}월
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>

                                <div className='flex-1 relative'>
                                    <button type='button' onClick={() => setShowStartDayDropdown(!showStartDayDropdown)}
                                    className='w-full min-w-[89px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'>
                                        <span className='text-r-16-hn text-gray-750'>{startDay}일</span>
                                        <Icon name='toggleDown' className={`w-[24px] h-[24px] transition-transform ${showStartDayDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showStartDayDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                        {startDays.map((d) => (
                                        <button key={d} type='button' 
                                        onClick={() => { 
                                            setStartDay(d); setShowStartDayDropdown(false); 
                                        }}
                                            className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${startDay === d ? 'text-primary' : 'text-gray-650'}`}>
                                            {d}일
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 접수 기간 - 마감일 */}
                        <div className='flex flex-col gap-[10px]'>
                            <span className='text-r-14-hn text-gray-650'>마감일</span>
                            <div className='flex gap-[10px] flex-wrap'>
                                <div className='flex-1 relative'>
                                    <button type='button' onClick={() => setShowEndYearDropdown(!showEndYearDropdown)}
                                    className='w-full min-w-[113px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'>
                                        <span className='text-r-16-hn text-gray-750'>{endYear}년</span>
                                        <Icon name='toggleDown' className={`w-[24px] h-[24px] transition-transform ${showEndYearDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showEndYearDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                        {years.map((y) => (
                                        <button key={y} type='button' 
                                        onClick={() => { 
                                            setEndYear(y);
                                            setEndDay(d => clampDay(d, y, endMonth));
                                            setShowEndYearDropdown(false); 
                                        }}
                                            className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${endYear === y ? 'text-primary' : 'text-gray-650'}`}>
                                            {y}년
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>

                                <div className='flex-1 relative'>
                                    <button type='button' onClick={() => setShowEndMonthDropdown(!showEndMonthDropdown)}
                                    className='w-full min-w-[86px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'>
                                        <span className='text-r-16-hn text-gray-750'>{endMonth}월</span>
                                        <Icon name='toggleDown' className={`w-[24px] h-[24px] transition-transform ${showEndMonthDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showEndMonthDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                        {MONTHS.map((m) => (
                                        <button key={m} type='button' 
                                            onClick={() => { 
                                                setEndMonth(m); 
                                                setEndDay(d => clampDay(d, endYear, m));
                                                setShowEndMonthDropdown(false); 
                                            }}
                                            className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${endMonth === m ? 'text-primary' : 'text-gray-650'}`}>
                                            {m}월
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>

                                <div className='flex-1 relative'>
                                    <button type='button' onClick={() => setShowEndDayDropdown(!showEndDayDropdown)}
                                    className='w-full min-w-[89px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'>
                                        <span className='text-r-16-hn text-gray-750'>{endDay}일</span>
                                        <Icon name='toggleDown' className={`w-[24px] h-[24px] transition-transform ${showEndDayDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showEndDayDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                        {endDays.map((d) => (
                                        <button key={d} type='button' onClick={() => { setEndDay(d); setShowEndDayDropdown(false); }}
                                            className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${endDay === d ? 'text-primary' : 'text-gray-650'}`}>
                                            {d}일
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Field 2 (수상 발표 or 급여) */}
                    {type === 'external' ? (
                        <div className='flex flex-col gap-[10px]'>
                            <label className='text-sb-16-hn text-gray-900'>{config.field2Label}</label>
                            <div className='flex gap-[10px] flex-wrap'>
                                <div className='flex-1 relative'>
                                <button type='button' onClick={() => setShowAnnounceYearDropdown(!showAnnounceYearDropdown)}
                                    className='w-full min-w-[113px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'>
                                    <span className='text-r-16-hn text-gray-750'>{announceYear}년</span>
                                    <Icon name='toggleDown' className={`w-[24px] h-[24px] transition-transform ${showAnnounceYearDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {showAnnounceYearDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                    {years.map((y) => (
                                        <button key={y} type='button' 
                                        onClick={() => { 
                                            setAnnounceYear(y);
                                            setAnnounceDay(d => clampDay(d, y, announceMonth));
                                            setShowAnnounceYearDropdown(false); 
                                        }}
                                        className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${announceYear === y ? 'text-primary' : 'text-gray-650'}`}>
                                        {y}년
                                        </button>
                                    ))}
                                    </div>
                                )}
                            </div>

                            <div className='flex-1 relative'>
                                <button type='button' onClick={() => setShowAnnounceMonthDropdown(!showAnnounceMonthDropdown)}
                                    className='w-full min-w-[86px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'>
                                    <span className='text-r-16-hn text-gray-750'>{announceMonth}월</span>
                                    <Icon name='toggleDown' className={`w-[24px] h-[24px] transition-transform ${showAnnounceMonthDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {showAnnounceMonthDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                    {MONTHS.map((m) => (
                                        <button key={m} type='button' 
                                        onClick={() => { 
                                            setAnnounceMonth(m);
                                            setAnnounceDay(d => clampDay(d, announceYear, m));
                                            setShowAnnounceMonthDropdown(false); 
                                        }}
                                        className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${announceMonth === m ? 'text-primary' : 'text-gray-650'}`}>
                                        {m}월
                                        </button>
                                    ))}
                                    </div>
                                )}
                            </div>

                            <div className='flex-1 relative'>
                                <button type='button' onClick={() => setShowAnnounceDayDropdown(!showAnnounceDayDropdown)}
                                    className='w-full min-w-[89px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'>
                                    <span className='text-r-16-hn text-gray-750'>{announceDay}일</span>
                                    <Icon name='toggleDown' className={`w-[24px] h-[24px] transition-transform ${showAnnounceDayDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {showAnnounceDayDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                    {announceDays.map((d) => (
                                        <button key={d} type='button' onClick={() => { setAnnounceDay(d); setShowAnnounceDayDropdown(false); }}
                                        className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${announceDay === d ? 'text-primary' : 'text-gray-650'}`}>
                                        {d}일
                                        </button>
                                    ))}
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-[10px]'>
                        <label className='text-sb-16-hn text-gray-900'>{config.field2Label}</label>
                        <input type='text' value={payment} onChange={(e) => setPayment(e.target.value)}
                            placeholder='내용 입력'
                            className='w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] text-r-16-hn text-gray-750 placeholder:text-gray-650 focus:outline-none' />
                        </div>
                    )}

                    {/* 지원 URL */}
                    <div className='flex flex-col gap-[10px]'>
                        <label className='text-sb-16-hn text-gray-900'>공식 홈페이지 URL</label>
                        <input
                        type='text'
                        value={applyUrl}
                        onChange={(e) => setApplyUrl(e.target.value)}
                        placeholder='공식 홈페이지 링크 입력'
                        className='w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] text-r-16-hn text-gray-750 placeholder:text-gray-650 focus:outline-none' />
                    </div>

                    {/* 썸네일 */}
                    <div className='flex flex-col gap-[10px]'>
                        <label className='text-sb-16-hn text-gray-900'>{config.imageLabel}</label>
                        
                        {thumbnailUrl ? (
                        <div className='relative w-full h-[200px]'>
                            <img src={thumbnailUrl.url} alt='썸네일' className='w-full h-full rounded-[12px] object-cover' />
                            <button type='button' aria-label='사진 삭제'
                            className='absolute top-[10px] right-[10px] w-[32px] h-[32px] bg-black/50 rounded-full flex items-center justify-center'
                            onClick={handleRemoveThumbnail}>
                            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none'>
                                <path d='M6 18L18 6M6 6L18 18' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                            </button>
                        </div>
                        ) : (
                        <button type='button' className='w-full p-[15px] flex items-center justify-center rounded-[5px] bg-gray-150 gap-[10px]'
                            onClick={() => fileInputRef.current?.click()}>
                            <Icon name='album'/>
                            <span className='text-r-16 text-gray-650'>대표이미지 추가(png, jpg, jpeg)</span>
                        </button>
                        )}
                        
                        <input ref={fileInputRef} type='file' accept='image/png, image/jpg, image/jpeg'
                        className='hidden' onChange={handleThumbnailChange} />
                    </div>

                    {/* 개요 */}
                    <div className='flex flex-col gap-[10px]'>
                        <label className='text-sb-16-hn text-gray-900'>{config.contentLabel}</label>
                        <Card width='100%' height={100} className='px-[15px] py-[15px]'>
                        <textarea value={descriptionTitle} onChange={(e) => setDescriptionTitle(e.target.value)}
                            placeholder={config.contentPlaceholder}
                            className='h-full w-full resize-none bg-transparent outline-none text-r-16-hn text-gray-750 placeholder:text-gray-650' />
                        </Card>
                    </div>

                    {/* 상세 정보 */}
                    <div className='flex flex-col gap-[10px]'>
                        <label className='text-sb-16-hn text-gray-900'>{config.detailLabel}</label>
                        <Card width='100%' height={200} className='px-[15px] py-[15px]'>
                        <textarea value={descriptionBody} onChange={(e) => setDescriptionBody(e.target.value)}
                            placeholder={config.detailPlaceholder}
                            className='h-full w-full resize-none bg-transparent outline-none text-r-16-hn text-gray-750 placeholder:text-gray-650' />
                        </Card>
                    </div>
                </section>
            </div>

            <PopUp isOpen={isConfirmOpen} type='info' title={confirmTitle} content={confirmContent}
                onLeftClick={() => setIsConfirmOpen(false)} onRightClick={handleConfirm} />

            <PopUp isOpen={isCancelWarningOpen} type='warning'
                title='변경사항이 있습니다.\n나가시겠습니까?' content='저장하지 않을 시 변경사항이 삭제됩니다.'
                leftButtonText='나가기' onLeftClick={handleCancelConfirm} onRightClick={handleCancelDismiss} />

            <TagsFilterModal isOpen={isFilterOpen} tags={selectedTags} onClose={() => setIsFilterOpen(false)}
                onSave={(next) => { setSelectedTags(next); setIsFilterOpen(false); }}
                categories={TAG_CATEGORIES} allTags={MOCK_ALL_TAGS} />
        </HeaderLayout>
    );
};