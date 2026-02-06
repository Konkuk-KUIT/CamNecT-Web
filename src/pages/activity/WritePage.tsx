import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import PopUp from '../../components/Pop-up';
import { EmptyLayout } from '../../layouts/EmptyLayout';
import BoardTypeToggle from '../../components/BoardTypeToggle';
import FilterHeader from '../../components/FilterHeader';
import TagsFilterModal from '../../components/TagsFilterModal';
import { MOCK_ALL_TAGS, TAG_CATEGORIES } from '../../mock/tags';
import { useImageUpload } from '../../hooks/useImageUpload';
import type { ActivityPost } from '../../types/activityPage/activityPageTypes';
import {
  activityLoggedInUser,
  addActivityPost,
  getActivityPosts,
  updateActivityPost,
} from '../../mock/activityCommunity';

const boardTypes = ['동아리', '스터디'] as const;
type BoardType = (typeof boardTypes)[number];

type BoardTypeMap = Record<ActivityPost['tab'], BoardType | null>;
const boardTypeByTab: BoardTypeMap = {
  club: '동아리',
  study: '스터디',
  external: null,
  job: null,
};

const tabByBoardType: Record<BoardType, ActivityPost['tab']> = {
  동아리: 'club',
  스터디: 'study',
};

export const ActivityWritePage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditMode = Boolean(postId);

  const editPost = useMemo<ActivityPost | null>(() => {
    if (!postId) return null;
    return getActivityPosts().find((post) => post.id === postId) ?? null;
  }, [postId]);

  const initialBoardType = editPost ? boardTypeByTab[editPost.tab] : null;
  const initialTitle = editPost?.title ?? '';
  const initialContent = editPost?.content ?? '';
  const initialPhotos =
    editPost?.postImages?.map((url, index) => ({
      id: `edit-${editPost.id}-${index}`,
      url,
    })) ?? [];

  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [boardType, setBoardType] = useState<BoardType | null>(initialBoardType);
  const [draftBoardType, setDraftBoardType] = useState<BoardType | null>(initialBoardType);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [photoButtonOffset, setPhotoButtonOffset] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCancelWarningOpen, setIsCancelWarningOpen] = useState(false);
  const [photoPreviews, setPhotoPreviews] = useState<{ id: string; url: string }[]>(
    initialPhotos,
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(editPost?.categories ?? []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { prepareImage } = useImageUpload();

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
  const confirmTitle = isEditMode
    ? `${boardType ?? '게시글'}을 수정하시겠습니까?`
    : '게시글을 등록하시겠습니까?';
  const confirmContent = isEditMode
    ? '수정된 내용으로 저장됩니다.'
    : '등록 후에도 수정/삭제가 가능합니다.';
  const isSubmitEnabled =
    Boolean(boardType) &&
    title.trim().length > 0 &&
    content.trim().length > 0 &&
    selectedTags.length > 0;
  const hasDraftContent =
    title.trim().length > 0 ||
    content.trim().length > 0 ||
    photoPreviews.length > 0 ||
    Boolean(boardType) ||
    selectedTags.length > 0;

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

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const nextPreviews = Array.from(files)
      .map((file, index) => {
        const result = prepareImage(file);
        if (!result) return null;
        return {
          id: `${file.name}-${file.lastModified}-${index}`,
          url: result.previewUrl,
        };
      })
      .filter((preview): preview is { id: string; url: string } => preview !== null);

    setPhotoPreviews((prev) => [...prev, ...nextPreviews]);
    event.target.value = '';
  };

  const handleRemovePhoto = (id: string) => {
    setPhotoPreviews((prev) => {
      const target = prev.find((preview) => preview.id === id);
      if (target) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((preview) => preview.id !== id);
    });
  };

  const handleSubmit = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!boardType) return;
    const tab = tabByBoardType[boardType];
    const nextPost: ActivityPost = {
      id: isEditMode && postId ? postId : `${tab}-${Date.now()}`,
      tab,
      title: title.trim(),
      content: content.trim(),
      categories: selectedTags,
      likes: editPost?.likes ?? 0,
      saveCount: editPost?.saveCount ?? 0,
      createdAt: editPost?.createdAt ?? new Date().toISOString(),
      author: editPost?.author ?? activityLoggedInUser,
      status: editPost?.status ?? 'OPEN',
      postImages: photoPreviews.map((preview) => preview.url),
    };

    if (isEditMode && postId) {
      updateActivityPost(postId, nextPost);
      navigate(`/activity/post/${postId}`);
      return;
    }

    addActivityPost(nextPost);
    navigate('/activity');
  };

  const handleCancelClick = () => {
    if (hasDraftContent) {
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
    <EmptyLayout>
      <div className='flex min-h-screen w-full flex-col bg-white'>
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
            onClick={handleCancelClick}
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
              <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none'>
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
              onClick={handleSubmit}
              disabled={!isSubmitEnabled}
            >
              완료
            </button>
          </div>
        </header>

        <section className='flex w-full flex-1 flex-col px-[25px]'>
          <div
            className='flex w-full flex-col'
            style={{
              padding: '10px 10px',
              borderBottom: '1px solid var(--ColorGray2, #A1A1A1)',
            }}
          >
            <input
              id='activity-title'
              name='title'
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

          <div
            className='flex w-full flex-col'
            style={{
              padding: '6px 10px',
              borderBottom: '1px solid var(--ColorGray2, #A1A1A1)',
            }}
          >
            <FilterHeader
              activeFilters={selectedTags}
              onOpenFilter={() => setIsFilterOpen(true)}
              onRemoveFilter={(tag) =>
                setSelectedTags((prev) => prev.filter((item) => item !== tag))
              }
            />
          </div>

          <div className='flex w-full flex-1 flex-col' style={{ padding: '15px 10px 193px' }}>
            <textarea
              id='activity-content'
              name='content'
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

      <div
        className='fixed left-1/2 z-40 w-[clamp(320px,100vw,540px)] -translate-x-1/2'
        style={{
          bottom: `calc(${photoButtonOffset}px + env(safe-area-inset-bottom, 0px))`,
        }}
      >
        <div className='flex w-full px-[25px] pb-[25px]'>
          <div className='flex w-full items-center overflow-x-auto' style={{ gap: '12px' }}>
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
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
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
            <button
              type='button'
              className='flex h-[128px] w-[128px] flex-col items-center justify-center rounded-[12px] flex-shrink-0'
              style={{ background: 'var(--ColorGray1, #ECECEC)', gap: '10px' }}
              onClick={() => fileInputRef.current?.click()}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30' fill='none'>
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
            <input
              ref={fileInputRef}
              id='activity-photos'
              name='photos'
              type='file'
              accept="image/png, image/jpg, image/jpeg"
              multiple
              className='hidden'
              onChange={handlePhotoChange}
            />
          </div>
        </div>
      </div>

      {isBoardOpen && (
        <div
          className='fixed inset-0 z-50 flex items-end justify-center'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
          onClick={() => closeBoardSelector(true)}
        >
          <div
            className='flex w-[clamp(320px,100vw,540px)] flex-col'
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

      <PopUp
        isOpen={isConfirmOpen}
        type='info'
        title={confirmTitle}
        content={confirmContent}
        onLeftClick={() => setIsConfirmOpen(false)}
        onRightClick={handleConfirm}
      />

      <PopUp
        isOpen={isCancelWarningOpen}
        type='warning'
        title={'작성된 내용이 있습니다.\n삭제하시겠습니까?'}
        content='삭제된 내용은 복구 불가능 합니다.'
        onLeftClick={handleCancelConfirm}
        onRightClick={handleCancelDismiss}
      />

      <TagsFilterModal
        isOpen={isFilterOpen}
        tags={selectedTags}
        onClose={() => setIsFilterOpen(false)}
        onSave={(next) => {
          setSelectedTags(next);
          setIsFilterOpen(false);
        }}
        categories={TAG_CATEGORIES}
        allTags={MOCK_ALL_TAGS}
      />
    </EmptyLayout>
  );
};
