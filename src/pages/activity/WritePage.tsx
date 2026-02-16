import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Icon from '../../components/Icon';
import PopUp from '../../components/Pop-up';
import { EmptyLayout } from '../../layouts/EmptyLayout';
import BoardTypeToggle from '../../components/BoardTypeToggle';
import FilterHeader from '../../components/FilterHeader';
import TagsFilterModal from '../../components/TagsFilterModal';
import { getTags } from '../../api/activityApi';
import { mapApiTagCategoryToUiTagCategory } from './utils/activityMapper';
import { useAuthStore } from '../../store/useAuthStore';
import {
  createActivity,
  updateActivity,
  getActivityDetail,
  //getActivityThumbnailPresignUrl,
  getActivityAttachmentsPresignUrl,
} from '../../api/activityApi';
import type { ActivityCategory } from '../../api-types/activityApiTypes';
import { uploadFileToS3 } from '../../utils/s3Upload';
import { useFileUpload } from '../../hooks/useFileUpload';

const MAX_SIZE_MB = 10;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/webp', 'image/png']);

const boardTypes = ['동아리', '스터디'] as const;
type BoardType = (typeof boardTypes)[number];

const boardTypeToCategory: Record<BoardType, ActivityCategory> = {
  동아리: 'CLUB',
  스터디: 'STUDY',
};

type PhotoPreview = {
  id: string;
  url: string;
  file?: File;
  isExisting?: boolean;
  key?: string;
}

export const ActivityWritePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const isEditMode = Boolean(postId);
  const activityId = postId ? parseInt(postId) : null;
  
  const authUser = useAuthStore((state) => state.user);
  const userId = authUser?.id ? parseInt(authUser.id) : null;

  const {prepareFile, revokeUrl} = useFileUpload({
    maxSizeMB: MAX_SIZE_MB,
    allowedTypes: ['image/jpeg, image/webp, image/png'],
  })

  //수정일 경우 기존 데이터 로드
  const { data: editDetailResponse, isLoading: isLoadingEdit } = useQuery({
    queryKey: ['activityDetail', activityId],
    queryFn: () => getActivityDetail(userId!, activityId!),
    enabled: isEditMode && !!userId && !!activityId,
  });

  const editPost = editDetailResponse?.data;

  //수정 모드 초기값 계산
  const initialValues = useMemo(() => {
    if (!editPost) return null;
    const { activity, attachment, tagIds } = editPost;
    const categoryToBoardType: Partial<Record<ActivityCategory, BoardType>> = {
      CLUB: '동아리',
      STUDY: '스터디',
    };
    return {
      boardType: categoryToBoardType[activity.category] ?? null,
      title: activity.title,
      content: activity.context,
      tags: tagIds,
      photos: (attachment ?? []).map((a) => ({
        id: `existing-${a.id}`,
        url: a.fileUrl,
        key: a.fileKey,
        isExisting: true,
      })),
    };
  }, [editPost]);

  //폼 상태
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [boardType, setBoardType] = useState<BoardType | null>(() => initialValues?.boardType ?? null);
  const [draftBoardType, setDraftBoardType] = useState<BoardType | null>(null);
  const [title, setTitle] = useState(() => initialValues?.title ?? '');
  const [content, setContent] = useState(() => initialValues?.content ?? '');
  const [selectedTags, setSelectedTags] = useState<number[]>(() => initialValues?.tags ?? []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCancelWarningOpen, setIsCancelWarningOpen] = useState(false);
  const [photoButtonOffset, setPhotoButtonOffset] = useState(0);
  const [photoPreviews, setPhotoPreviews] = useState<PhotoPreview[]>(() => initialValues?.photos ?? []);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFileErrorOpen, setIsFileErrorOpen] = useState(false);
  const [fileErrorMessage, setFileErrorMessage] = useState('');

  // 수정 모드 초기값 세팅
  const boardLabel = boardType ?? '게시판';
  const boardLabelColor = boardType ? 'var(--ColorMain, #00C56C)' : 'var(--ColorGray2, #A1A1A1)';
  const confirmTitle = isEditMode ? '게시글을 수정하시겠습니까?' : '게시글을 등록하시겠습니까?';
  const confirmContent = isEditMode ? '수정된 내용으로 저장됩니다.' : '등록 후에도 수정/삭제가 가능합니다.';
  const isSubmitEnabled =
    Boolean(boardType) && title.trim().length > 0 && content.trim().length > 0 && selectedTags.length > 0;
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
      const keyboardHeight = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
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
    const nextPreviews: PhotoPreview[] = [];
    let errorMsg: string | null = null;

    for (const file of Array.from(files)) {
      //타입 체크
      if (!ALLOWED_TYPES.has(file.type)) {
        errorMsg = '이미지는 jpg / jpeg / png 형식만 업로드 가능합니다.';
        continue;
      }

      //용량 체크
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        errorMsg = `이미지가 파일 용량 제한을 초과합니다. (최대 ${MAX_SIZE_MB}MB)`;
        continue;
      }

      const prepared = prepareFile(file);
      if (!prepared) {
        //prepareFile 내부 조건에 걸린 경우
        errorMsg = '파일을 업로드할 수 없어요. 형식/용량을 확인해주세요.';
        continue;
      }

      nextPreviews.push({
        id: `new-${prepared.id}`,
        url: prepared.previewUrl,
        file: prepared.file,
        isExisting: false,
      });
    }
    if (nextPreviews.length > 0) {
      setPhotoPreviews((prev) => [...prev, ...nextPreviews]);
    }
    if (errorMsg) {
      setFileErrorMessage(errorMsg);
      setIsFileErrorOpen(true);
    }
    event.target.value = '';
  };

  const handleRemovePhoto = (id: string) => {
    setPhotoPreviews((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target && !target.isExisting) revokeUrl(target.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const { data: tagData } = useQuery({
    queryKey: ['tags', 'DEFAULT'],
    queryFn: () => getTags('DEFAULT'),
    staleTime: 1000 * 60 * 10,
  });

  const tagNameToIdMap = useMemo(() => {
    const map = new Map<string, number>();
    tagData?.data.forEach((cat) => {
      cat.tags.forEach((tag) => map.set(tag.name, tag.id));
    });
    return map;
  }, [tagData]);

  const tagIdToNameMap = useMemo(() => {
    const map = new Map<number, string>();
    tagData?.data.forEach((cat) => {
      cat.tags.forEach((tag) => map.set(tag.id, tag.name));
    });
    return map;
  }, [tagData]);

  const tagCategories = useMemo(() => tagData?.data.map(mapApiTagCategoryToUiTagCategory) ?? [], [tagData]);

  const allTags = useMemo(() => tagCategories.flatMap((c) => c.tags), [tagCategories]);

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!boardType || !userId) throw new Error('필수 값 누락');

      const category: ActivityCategory = boardTypeToCategory[boardType];

      const tagIds = selectedTags;

      // 2) 신규 파일
      const newFilesInOrder: File[] = photoPreviews
        .filter((p) => !p.isExisting && p.file)
        .map((p) => p.file!) as File[];

      // 3) 신규 업로드: attachments presign
      let uploadedNewKeysInOrder: string[] = [];
      if (newFilesInOrder.length > 0) {
        const presignRes = await getActivityAttachmentsPresignUrl(userId, {
          items: newFilesInOrder.map((f) => ({
            contentType: f.type,
            size: f.size,
            originalFilename: f.name,
          })),
        });

        // 업로드 실행
        await Promise.all(
          presignRes.data.items.map((item, i) =>
            uploadFileToS3(item.uploadUrl, newFilesInOrder[i], item.requiredHeaders),
          ),
        );

        uploadedNewKeysInOrder = presignRes.data.items.map((item) => item.fileKey);
      }

      // 4) 최종 attachmentKey
      let newKeyCursor = 0;
      const finalAttachmentKeys: string[] = photoPreviews
        .map((p) => {
          if (p.isExisting) return p.key ?? null;
          // 신규는 업로드된 key를 순서대로 매칭
          const k = uploadedNewKeysInOrder[newKeyCursor] ?? null;
          newKeyCursor += 1;
          return k;
        })
        .filter((k): k is string => Boolean(k));
      const attachmentKey = finalAttachmentKeys.length > 0 ? finalAttachmentKeys : null;
      //썸네일=첫 번째 이미지
      const thumbnailKey = finalAttachmentKeys.length > 0 ? finalAttachmentKeys[0] : null;

      const payload = {
        category,
        title: title.trim(),
        tagIds,
        content: content.trim(),
        thumbnailKey,
        attachmentKey,
      };

      if (isEditMode && activityId) {
        return updateActivity(userId, activityId, payload);
      }
      return createActivity(userId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activityList'] });
      if (isEditMode && activityId) {
        queryClient.invalidateQueries({ queryKey: ['activityDetail', activityId] });
        navigate(`/activity/internal/${activityId}`);
      } else {
        navigate('/activity');
      }
    },
  });

    if (isEditMode && isLoadingEdit) {
    return (
      <PopUp
        type="loading"
        isOpen={true}
      />
    );
  }

  const openBoardSelector = () => {
    setDraftBoardType(boardType);
    setIsBoardOpen(true);
  };

  const closeBoardSelector = (shouldApply: boolean) => {
    if (shouldApply && draftBoardType) setBoardType(draftBoardType);
    setIsBoardOpen(false);
  };

  const handleSubmit = () => setIsConfirmOpen(true);
  const handleConfirm = () => {
    setIsConfirmOpen(false);
    submitMutation.mutate();
  };
  const handleCancelClick = () => {
    if (hasDraftContent) { setIsCancelWarningOpen(true); return; }
    navigate(-1);
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
              {submitMutation.isPending ? '저장 중..' : '완료'}
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
              activeFilters={selectedTags.map(id => tagIdToNameMap.get(id) ?? '').filter(Boolean)}
              onOpenFilter={() => setIsFilterOpen(true)}
              onRemoveFilter={(tagName) => {
                const tagId = tagNameToIdMap.get(tagName);
                if (tagId) setSelectedTags((prev) => prev.filter((id) => id !== tagId));
              }}
            />
          </div>

          <div className='flex w-full flex-1 flex-col' style={{ padding: '15px 10px 193px' }}>
            <textarea
              id='activity-content'
              name='content'
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder='내용을 적어주세요'
              className='min-h-[160px] w-full flex-1 border-none bg-transparent p-0 text-[16px] font-normal leading-[140%] tracking-[-0.64px] outline-none resize-none placeholder:text-gray-650'
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
              accept="image/png, image/webp, image/jpeg"
              multiple
              className='hidden'
              onChange={handlePhotoChange}
            />
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
        title={'작성을 취소하고 나가시겠습니까?'}
        content='취소된 내용은 복구할 수 없습니다.'
        leftButtonText='나가기'
        onLeftClick={() => {setIsCancelWarningOpen(false); navigate(-1);}}
        onRightClick={() => setIsCancelWarningOpen(false)}
      />

      <PopUp
        isOpen={isFileErrorOpen}
        type="error"
        title="업로드할 수 없는 파일입니다."
        content={fileErrorMessage}
        rightButtonText="확인"
        onClick={() => setIsFileErrorOpen(false)}
      />

      <TagsFilterModal
        isOpen={isFilterOpen}
        tags={selectedTags.map(id => tagIdToNameMap.get(id) ?? '').filter(Boolean)}
        onClose={() => setIsFilterOpen(false)}
        onSave={(tagNames) => {
          const tagIds = tagNames
            .map(name => tagNameToIdMap.get(name))
            .filter((id): id is number => id !== undefined);
          setSelectedTags(tagIds);
          setIsFilterOpen(false);
        }}
        categories={tagCategories}
        allTags={allTags}
      />
    </EmptyLayout>
  );
};
