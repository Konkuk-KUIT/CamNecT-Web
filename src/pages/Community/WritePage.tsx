import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import EmptyLayout from '../../layouts/EmptyLayout';
import BoardTypeToggle from './components/BoardTypeToggle';
import FilterHeader from './components/FilterHeader';
import FilterModal from './components/FilterModal';
import useCommunityFilters from './hooks/useCommunityFilters';

//TODO: 사진 미리보기 개수 제한이나 파일 크기 제한을 정책으로 추가할지 결정 필요
const boardTypes = ['정보', '질문'] as const;
type BoardType = (typeof boardTypes)[number];

const WritePage = () => {
    const navigate = useNavigate();
    // 게시판 선택 모달 상태
    const [isBoardOpen, setIsBoardOpen] = useState(false);
    // 게시판 타입: 확정/임시 선택
    const [boardType, setBoardType] = useState<BoardType | null>(null);
    const [draftBoardType, setDraftBoardType] = useState<BoardType | null>(null);
    // 입력 폼 상태
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // 키보드가 올라올 때 하단 사진 버튼 위치 보정
    const [photoButtonOffset, setPhotoButtonOffset] = useState(0);
    // 완료 확인 모달 상태
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    // 사진 미리보기 목록과 object URL 정리용 ref
    const [photoPreviews, setPhotoPreviews] = useState<{ id: string; url: string }[]>([]);
    const photoPreviewsRef = useRef<{ id: string; url: string }[]>([]);
    // 숨김 파일 input 제어
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 필터 관련 상태/핸들러 (전공/관심분야)
    const filterSource = useMemo(() => [], []);
    const {
        activeFilters,
        isFilterOpen,
        activeTab,
        setActiveTab,
        openFilterModal,
        handleCancel,
        handleApply,
        handleRemoveFilter,
        draftMajor,
        draftInterests,
        toggleDraftMajor,
        toggleDraftInterest,
        hasDraftSelection,
    } = useCommunityFilters<{ author: { major: string }; categories: string[] }>(filterSource);

    const openBoardSelector = () => {
        setDraftBoardType(boardType);
        setIsBoardOpen(true);
    };

    const closeBoardSelector = (shouldApply: boolean) => {
        if (shouldApply && draftBoardType) {
            setBoardType(draftBoardType);
        }
        setIsBoardOpen(false);
    };

    const boardLabel = boardType ?? '게시판';
    const boardLabelColor = boardType
        ? 'var(--ColorMain, #00C56C)'
        : 'var(--ColorGray2, #A1A1A1)';
    const isSubmitEnabled =
        Boolean(boardType) &&
        title.trim().length > 0 &&
        content.trim().length > 0 &&
        activeFilters.length > 0;

    // 모바일 키보드 높이에 맞춰 하단 사진 영역 위치 업데이트
    useEffect(() => {
        const viewport = window.visualViewport;
        if (!viewport) return;

        const updateOffset = () => {
            const keyboardHeight = Math.max(
                0,
                window.innerHeight - viewport.height - viewport.offsetTop,
            );
            setPhotoButtonOffset(keyboardHeight > 0 ? keyboardHeight + 16 : 0);
        };

        updateOffset();
        viewport.addEventListener('resize', updateOffset);
        viewport.addEventListener('scroll', updateOffset);
        window.addEventListener('resize', updateOffset);

        return () => {
            viewport.removeEventListener('resize', updateOffset);
            viewport.removeEventListener('scroll', updateOffset);
            window.removeEventListener('resize', updateOffset);
        };
    }, []);

    // 현재 미리보기 URL 목록을 ref에 동기화
    useEffect(() => {
        photoPreviewsRef.current = photoPreviews;
    }, [photoPreviews]);

    // unmount 시 생성된 object URL 해제
    useEffect(() => {
        return () => {
            photoPreviewsRef.current.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, []);

    // 파일 선택 -> object URL 생성 -> 미리보기 상태에 추가
    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const nextPreviews = Array.from(files).map((file, index) => ({
            id: `${file.name}-${file.lastModified}-${index}`,
            url: URL.createObjectURL(file),
        }));

        setPhotoPreviews((prev) => [...prev, ...nextPreviews]);
        event.target.value = '';
    };

    // 개별 미리보기 삭제 + object URL 해제
    const handleRemovePhoto = (id: string) => {
        setPhotoPreviews((prev) => {
            const target = prev.find((preview) => preview.id === id);
            if (target) {
                URL.revokeObjectURL(target.url);
            }
            return prev.filter((preview) => preview.id !== id);
        });
    };

    // 완료 버튼 -> 확인 모달 오픈
    const handleSubmit = () => {
        setIsConfirmOpen(true);
    };

    // 확인 모달에서 "네" 클릭 시 메인으로 이동
    const handleConfirm = () => {
        // TODO: api 전송(게시판 종류, 제목, 필터 배열, 내용, 사진), 글쓰기 완료 팝업 추가
        navigate('/community');
    };

    return (
        <EmptyLayout>
            <div className='flex min-h-screen w-full flex-col bg-white'>
                {/* 상단 헤더: 뒤로가기, 게시판 선택, 완료 버튼 */}
                <header
                    className='flex w-full items-center justify-between bg-white'
                    style={{
                        padding: '10px 25px',
                        paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
                    }}
                >
                    <button
                        type='button'
                        aria-label='작성 취소'
                        onClick={() => navigate(-1)}
                        className='flex items-center'
                    >
                        <Icon name='cancel' />
                    </button>

                    <div className='flex items-center' style={{ gap: '13px' }}>
                        <button
                            type='button'
                            onClick={openBoardSelector}
                            className='flex text-r-16'
                            style={{ color: boardLabelColor }}
                        >
                            {boardLabel}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='22'
                                height='22'
                                viewBox='0 0 22 22'
                                fill='none'
                            >
                                <path
                                    d='M17.875 7.5625L11 14.4375L4.125 7.5625'
                                    stroke='#A1A1A1'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </button>
                        <button
                            type='button'
                            className='text-b-16-hn'
                            style={{
                                color: isSubmitEnabled
                                    ? 'var(--ColorMain, #00C56C)'
                                    : 'var(--ColorGray2, #A1A1A1)',
                            }}
                            onClick={isSubmitEnabled ? handleSubmit : undefined}
                            disabled={!isSubmitEnabled}
                        >
                            완료
                        </button>
                    </div>
                </header>

                {/* 글쓰기 본문 영역 */}
                <section className='flex w-full flex-1 flex-col px-[25px]'>
                    {/* 제목 입력 */}
                    <div
                        className='flex w-full flex-col'
                        style={{
                            padding: '10px 10px',
                            borderBottom: '1px solid var(--ColorGray2, #A1A1A1)',
                        }}
                    >
                        <input
                            type='text'
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder='제목'
                            className='w-full border-none bg-transparent p-0 text-b-18 outline-none placeholder:text-gray-650'
                            style={{
                                color: title ? 'var(--ColorBlack, #202023)' : 'var(--ColorGray2, #A1A1A1)',
                            }}
                        />
                    </div>

                    {/* 필터 선택 */}
                    <div
                        className='flex w-full flex-col'
                        style={{
                            padding: '6px 10px',
                            borderBottom: '1px solid var(--ColorGray2, #A1A1A1)',
                        }}
                    >
                        <FilterHeader
                            activeFilters={activeFilters}
                            onOpenFilter={openFilterModal}
                            onRemoveFilter={handleRemoveFilter}
                        />
                    </div>

                    {/* 내용 입력 */}
                    <div className='flex w-full flex-1 flex-col' style={{ padding: '15px 10px 193px' }}>
                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            placeholder='내용을 적어주세요'
                            className='min-h-[160px] w-full flex-1 border-none bg-transparent p-0 text-[16px] font-normal leading-[140%] tracking-[-0.64px] outline-none placeholder:text-gray-650'
                            style={{
                                fontWeight: 400,
                                color: content
                                    ? 'var(--ColorGray3, #646464)'
                                    : 'var(--ColorGray2, #A1A1A1)',
                            }}
                        />
                    </div>
                </section>
            </div>

            {/* 하단 사진 추가/미리보기 영역 */}
            <div
                className='fixed left-1/2 z-40 w-[375px] -translate-x-1/2'
                style={{
                    bottom: `calc(${photoButtonOffset}px + env(safe-area-inset-bottom, 0px))`,
                }}
            >
                <div className='flex w-full px-[25px] pb-[50px]'>
                    <div className='flex w-full items-center overflow-x-auto' style={{ gap: '12px' }}>
                        {/* 사진 미리보기 카드 */}
                        {photoPreviews.map((preview) => (
                            <div
                                key={preview.id}
                                className='relative flex-shrink-0'
                                style={{ width: '170px', height: '128px' }}
                            >
                                <img
                                    src={preview.url}
                                    alt='preview'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '12px',
                                        objectFit: 'cover',
                                    }}
                                />
                                <button
                                    type='button'
                                    aria-label='사진 삭제'
                                    className='absolute'
                                    style={{ top: '10px', right: '10px' }}
                                    onClick={() => handleRemovePhoto(preview.id)}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                    >
                                        <path
                                            d='M6 18L18 6M6 6L18 18'
                                            stroke='#646464'
                                            strokeWidth='1.5'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        {/* 사진 추가 버튼 */}
                        <button
                            type='button'
                            className='flex h-[128px] w-[128px] flex-col items-center justify-center rounded-[12px] flex-shrink-0'
                            style={{ background: 'var(--ColorGray1, #ECECEC)', gap: '10px' }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='30'
                                height='30'
                                viewBox='0 0 30 30'
                                fill='none'
                            >
                                <path
                                    d='M8.53375 7.71852C8.30874 8.07466 8.00852 8.37725 7.65417 8.60506C7.29982 8.83287 6.89991 8.98039 6.4825 9.03727C6.0075 9.10477 5.53625 9.17727 5.065 9.25602C3.74875 9.47477 2.8125 10.6335 2.8125 11.9673V22.4998C2.8125 23.2457 3.10882 23.9611 3.63626 24.4885C4.16371 25.016 4.87908 25.3123 5.625 25.3123H24.375C25.1209 25.3123 25.8363 25.016 26.3637 24.4885C26.8912 23.9611 27.1875 23.2457 27.1875 22.4998V11.9673C27.1875 10.6335 26.25 9.47477 24.935 9.25602C24.4634 9.17744 23.9909 9.10452 23.5175 9.03727C23.1003 8.98022 22.7006 8.83262 22.3465 8.60481C21.9924 8.37701 21.6924 8.07451 21.4675 7.71852L20.44 6.07352C20.2092 5.69864 19.8915 5.38489 19.5138 5.15881C19.1361 4.93274 18.7094 4.80101 18.27 4.77477C16.0916 4.65776 13.9084 4.65776 11.73 4.77477C11.2906 4.80101 10.8639 4.93274 10.4862 5.15881C10.1085 5.38489 9.79077 5.69864 9.56 6.07352L8.53375 7.71852Z'
                                    stroke='#A1A1A1'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M20.625 15.9375C20.625 17.4293 20.0324 18.8601 18.9775 19.915C17.9226 20.9699 16.4918 21.5625 15 21.5625C13.5082 21.5625 12.0774 20.9699 11.0225 19.915C9.96763 18.8601 9.375 17.4293 9.375 15.9375C9.375 14.4457 9.96763 13.0149 11.0225 11.96C12.0774 10.9051 13.5082 10.3125 15 10.3125C16.4918 10.3125 17.9226 10.9051 18.9775 11.96C20.0324 13.0149 20.625 14.4457 20.625 15.9375ZM23.4375 13.125H23.4475V13.135H23.4375V13.125Z'
                                    stroke='#A1A1A1'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                            <span
                                className='text-[16px] font-normal leading-[140%] tracking-[-0.64px]'
                                style={{ color: 'var(--ColorGray2, #A1A1A1)' }}
                            >
                                사진추가
                            </span>
                        </button>
                        {/* 숨김 파일 input */}
                        <input
                            ref={fileInputRef}
                            type='file'
                            accept='image/*'
                            multiple
                            className='hidden'
                            onChange={handlePhotoChange}
                        />
                    </div>
                </div>
            </div>

            {/* 게시판 선택 모달 */}
            {isBoardOpen && (
                <div
                    className='fixed inset-0 z-50 flex items-end justify-center'
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                    onClick={() => closeBoardSelector(true)}
                >
                    <div
                        className='flex w-[375px] flex-col'
                        style={{
                            height: '235px',
                            padding: '10px 24px 56px',
                            borderRadius: '10px 10px 0 0',
                            background: 'var(--Color_Gray_B, #FCFCFC)',
                            boxShadow: '0 -1px 9.6px 0 rgba(32, 32, 35, 0.10)',
                            gap: '20px',
                        }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className='flex justify-center'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='78' height='5' viewBox='0 0 78 5' fill='none'>
                                <path d='M2.5 2.5H75.5' stroke='#A1A1A1' strokeWidth='5' strokeLinecap='round' />
                            </svg>
                        </div>

                        <div className='flex flex-col' style={{ gap: '20px' }}>
                            <span className='text-b-18' style={{ color: 'var(--ColorBlack, #202023)' }}>
                                게시판 선택
                            </span>

                            <div className='flex flex-col' style={{ gap: '20px' }}>
                                {boardTypes.map((type) => (
                                    <div
                                        key={type}
                                        className='flex items-center justify-between'
                                        style={{ padding: '0 12px' }}
                                    >
                                        <span className='text-m-16' style={{ color: 'var(--ColorGray3, #646464)' }}>
                                            {type}
                                        </span>
                                        <BoardTypeToggle
                                            label={type}
                                            selected={draftBoardType === type}
                                            onClick={() => setDraftBoardType(type)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 완료 확인 모달 */}
            {isConfirmOpen && (
                <div
                    className='fixed inset-0 z-50 flex items-center justify-center'
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                    onClick={() => setIsConfirmOpen(false)}
                >
                    <div
                        className='flex flex-col bg-white'
                        style={{ width: '324px', height: '200px', borderRadius: '20px' }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div
                            className='flex flex-col'
                            style={{ padding: '30px 35px 0', gap: '15px' }}
                        >
                            <span className='text-b-18' style={{ color: 'var(--ColorBlack, #202023)' }}>
                                게시글을 등록하시겠습니까?
                            </span>
                            <span className='text-r-14' style={{ color: 'var(--ColorGray3, #646464)' }}>
                                답변 채택 후 게시물의
                                <br />
                                <span className='text-sb-14' style={{ color: 'var(--ColorBlack, #202023)' }}>
                                    수정 및 삭제
                                </span>{' '}
                                <span className='text-sb-14' style={{ color: 'var(--ColorBlack, #202023)' }}>
                                    불가능
                                </span>
                                합니다
                            </span>
                        </div>

                        <div
                            className='mt-auto flex'
                            style={{ padding: '25px 20px 20px', gap: '10px' }}
                        >
                            <button
                                type='button'
                                className='flex items-center justify-center text-sb-14'
                                style={{
                                    width: '137px',
                                    height: '45px',
                                    borderRadius: '10px',
                                    background: 'var(--ColorSub2, #F2FCF8)',
                                    color: 'var(--ColorMain, #00C56C)',
                                }}
                                onClick={() => setIsConfirmOpen(false)}
                            >
                                아니요
                            </button>
                            <button
                                type='button'
                                className='flex items-center justify-center text-b-14'
                                style={{
                                    width: '137px',
                                    height: '45px',
                                    borderRadius: '10px',
                                    background: 'var(--ColorMain, #00C56C)',
                                    color: 'var(--ColorWhite, #FFF)',
                                }}
                                onClick={handleConfirm}
                            >
                                네, 확인했습니다
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 필터 모달 */}
            <FilterModal
                isOpen={isFilterOpen}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                draftMajor={draftMajor}
                draftInterests={draftInterests}
                onToggleMajor={toggleDraftMajor}
                onToggleInterest={toggleDraftInterest}
                hasDraftSelection={hasDraftSelection}
                onCancel={handleCancel}
                onApply={handleApply}
            />
        </EmptyLayout>
    );
};

export default WritePage;
