import { useState, useRef, useEffect, useMemo } from 'react';
import Icon from '../../../components/Icon';
import ModalIcon from '../../../components/BottomSheetModal/Icon';
import BottomSheetModal from '../../../components/BottomSheetModal/BottomSheetModal';
import PopUp from '../../../components/Pop-up';
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { EditHeader } from "../../../layouts/headers/EditHeader";
import { useModalHistory } from '../../../hooks/useModalHistory';
import { useQuery } from '@tanstack/react-query';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { uploadFileToS3 } from '../../../utils/s3Upload';
import { useAuthStore } from '../../../store/useAuthStore';
import { getPortfolioDetail, presignThumbnail, presignAssets, createPortfolio, updatePortfolio } from '../../../api/portfolioApi';
import type { PortfolioAsset } from '../../../api-types/portfolioApiTypes';
import replaceImg from "../../../assets/image/replaceImg.png"

const REPLACE_IMAGE = replaceImg;

const MAX_SIZE_MB = 10;
const THUMBNAIL_MAX_SIZE_MB = 5;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg'];
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf', 'image/jpg'];

interface PortfolioEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
    portfolioId?: number;
    onSave: () => void;
}

interface FileItem {
    id: string;
    file?: File;
    url?: string;
    fileKey?: string;
    type?: string;
    isExisting: boolean;
}

export default function PortfolioEditModal({
    isOpen,
    onClose,
    userId,
    portfolioId,
    onSave,
}: PortfolioEditModalProps) {
    const authUser = useAuthStore(state => state.user);
    const meUserId = authUser?.id ? parseInt(authUser.id) : null;
    const isEditMode = Boolean(portfolioId);

    const { prepareFile, revokeUrl } = useFileUpload({
        maxSizeMB: MAX_SIZE_MB,
        allowedTypes: ALLOWED_FILE_TYPES,
    });

    // 상세 조회 (수정 모드)
    const { data: detailData, isLoading: isLoadingDetail, isError: isErrorDetail} = useQuery({
        queryKey: ['portfolioDetail', userId, portfolioId],
        queryFn: () => getPortfolioDetail(meUserId!, userId, portfolioId!),
        enabled: isEditMode && !!meUserId && !!portfolioId,
    });

    const portfolioData = detailData?.data.data.portfolio;
    const assetsData = detailData?.data.data.portfolioAssets || [];

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [startYear, setStartYear] = useState(new Date().getFullYear());
    const [startMonth, setStartMonth] = useState(1);
    const [endYear, setEndYear] = useState(new Date().getFullYear());
    const [endMonth, setEndMonth] = useState(1);
    const [role, setRole] = useState('');
    const [skills, setSkills] = useState('');
    const [problemSolution, setProblemSolution] = useState('');

    const [thumbnailImage, setThumbnailImage] = useState<FileItem | null>(null);
    const [attachmentFiles, setAttachmentFiles] = useState<FileItem[]>([]);
    
    // 모달 상태
    const [isFileAddModalOpen, setIsFileAddModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showValidationPopup, setShowValidationPopup] = useState(false);
    const [showCloseWarning, setShowCloseWarning] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [showStartYearDropdown, setShowStartYearDropdown] = useState(false);
    const [showStartMonthDropdown, setShowStartMonthDropdown] = useState(false);
    const [showEndYearDropdown, setShowEndYearDropdown] = useState(false);
    const [showEndMonthDropdown, setShowEndMonthDropdown] = useState(false);

    const thumbnailInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    //초기 데이터 저장
    const initialDataRef = useRef<{
        title: string;
        content: string;
        role: string;
        skills: string;
        problemSolution: string;
        thumbnailImage: FileItem | null;
        attachmentFiles: FileItem[];
    } | null>(null);

    const initializedForRef = useRef<number | 'create' | null>(null);

    // 변경사항이 있는지 확인
    const hasUnsavedChanges = useMemo(() => {
        if (initialDataRef.current === null) return false;
        
        const initial = initialDataRef.current;
        
        return (
            title !== initial.title ||
            content !== initial.content ||
            role !== initial.role ||
            skills !== initial.skills ||
            problemSolution !== initial.problemSolution ||
            thumbnailImage?.url !== initial.thumbnailImage?.url ||
            attachmentFiles.length !== initial.attachmentFiles.length ||
            attachmentFiles.some((f, i) => f.url !== initial.attachmentFiles[i]?.url)
        );
    }, [title, content, role, skills, problemSolution, thumbnailImage, attachmentFiles]);

    // useModalHistory 훅 사용
    useModalHistory(onClose, hasUnsavedChanges, () => setShowCloseWarning(true));

    //초기 데이터 로딩
    useEffect(() => {
        if (!isOpen) return;

        if (!isEditMode) {
            // 생성 모드 - 한 번만 초기화
            if (initializedForRef.current !== 'create') return;
            
            setTitle('');
            setContent('');
            setStartYear(new Date().getFullYear());
            setStartMonth(1);
            setEndYear(new Date().getFullYear());
            setEndMonth(1);
            setRole('');
            setSkills('');
            setProblemSolution('');
            setThumbnailImage(null);
            setAttachmentFiles([]);

            initialDataRef.current = {
                title: '',
                content: '',
                role: '',
                skills: '',
                problemSolution: '',
                thumbnailImage: null,
                attachmentFiles: [],
            };
            initializedForRef.current = 'create';
            return;
        }

        // 수정 모드 - portfolioData가 로드되면 한 번만 실행
        if (!portfolioData) return;
        
        if (initializedForRef.current === portfolioData.portfolioId) return;

        setTitle(portfolioData.title);
        setContent(portfolioData.description);

        const [startY, startM] = portfolioData.startDate.split('-').map(Number);
        setStartYear(startY);
        setStartMonth(startM);

        const [endY, endM] = portfolioData.endDate.split('-').map(Number);
        setEndYear(endY);
        setEndMonth(endM);

        setRole(portfolioData.assignedRole[0] || '');
        setSkills(portfolioData.techStack[0] || '');
        setProblemSolution(portfolioData.review || '');

        // 썸네일
        let thumbnail: FileItem | null = null;
        if (portfolioData.thumbnailUrl) {
            thumbnail = {
                id: 'thumbnail-existing',
                url: portfolioData.thumbnailUrl,
                isExisting: true,
            };
            setThumbnailImage(thumbnail);
        } else {
            setThumbnailImage(null);
        }

        // 첨부파일
        const attachments: FileItem[] = assetsData.map((asset: PortfolioAsset) => ({
            id: `asset-${asset.assetId}`,
            url: asset.fileUrl,
            fileKey: asset.fileKey,
            type: asset.type,
            isExisting: true,
        }));
        setAttachmentFiles(attachments);

        initialDataRef.current = {
            title: portfolioData.title,
            content: portfolioData.description,
            role: portfolioData.assignedRole[0] || '',
            skills: portfolioData.techStack[0] || '',
            problemSolution: portfolioData.review || '',
            thumbnailImage: thumbnail,
            attachmentFiles: attachments,
        };
        initializedForRef.current = portfolioData.portfolioId;
    }, [isOpen, isEditMode, portfolioData, assetsData]);


    // 모달 열림/닫힘 시 body 스크롤 제어
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            initializedForRef.current = null;
            initialDataRef.current = null;
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    //컴포넌트가 unmount될 때 blob을 해제
    useEffect(() => {
        return () => {
            if (thumbnailImage?.url?.startsWith('blob:')) {
                URL.revokeObjectURL(thumbnailImage.url);
            }

            attachmentFiles.forEach(f => {
                if (f.url?.startsWith('blob:')) {
                    URL.revokeObjectURL(f.url);
                }
            });
        };
    }, [thumbnailImage, attachmentFiles]);

    const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            setError('이미지는 webp / jpeg / jpg / png 형식만 업로드 가능합니다.');
            e.target.value = '';
            return;
        }

        if (file.size > THUMBNAIL_MAX_SIZE_MB  * 1024 * 1024) {
            setError(`이미지가 파일 용량 제한을 초과합니다. (최대 ${THUMBNAIL_MAX_SIZE_MB }MB)`);
            e.target.value = '';
            return;
        }

        const prepared = prepareFile(file);
        if (!prepared) {
            setError('파일을 업로드할 수 없어요. 형식/용량을 확인해주세요.');
            e.target.value = '';
            return;
        }

        if (thumbnailImage?.url?.startsWith('blob:')) {
            revokeUrl(thumbnailImage.url);
        }

        setThumbnailImage({
            id: prepared.id,
            file: prepared.file,
            url: prepared.previewUrl,
            isExisting: false,
        });

        e.target.value = '';
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const newFiles: FileItem[] = [];
        let errorMsg: string | null = null;

        for (const file of files) {
            // PDF는 형식만 체크
            if (file.type === 'application/pdf') {
                if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                    errorMsg = `파일이 용량 제한을 초과합니다. (최대 ${MAX_SIZE_MB}MB)`;
                    continue;
                }
            } else if (file.type.startsWith('image/')) {
                if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                    errorMsg = '이미지는 webp / jpeg / jpg / png 형식만 업로드 가능합니다.';
                    continue;
                }
                if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                    errorMsg = `이미지가 파일 용량 제한을 초과합니다. (최대 ${MAX_SIZE_MB}MB)`;
                    continue;
                }
            } else {
                errorMsg = '지원하지 않는 파일 형식입니다.';
                continue;
            }

            const prepared = prepareFile(file);
            if (!prepared) {
                errorMsg = '파일을 업로드할 수 없어요.';
                continue;
            }

            newFiles.push({
                id: prepared.id,
                file: prepared.file,
                url: prepared.previewUrl,
                isExisting: false,
            });
        }

        if (newFiles.length > 0) {
            setAttachmentFiles(prev => [...prev, ...newFiles]);
        }

        if (errorMsg) {
            setError(errorMsg);
        }

        e.target.value = '';
    };

    const removeFile = (id: string) => {
        setAttachmentFiles(prev => {
            const target = prev.find(f => f.id === id);
            if (target && !target.isExisting && target.url) {
                revokeUrl(target.url);
            }
            return prev.filter(f => f.id !== id);
        });
    };

    const getMissingFields = () => {
        const missing: string[] = [];
        if (!title.trim()) missing.push('포트폴리오 제목');
        if (!content.trim()) missing.push('포트폴리오 개요');
        if (!role.trim()) missing.push('프로젝트 역할');
        if (!skills.trim()) missing.push('사용 기술');
        if (!thumbnailImage) missing.push('대표 이미지');
        return missing;
    };

    const handleClose = () => {
        if (hasUnsavedChanges) {
            setShowCloseWarning(true);
        } else {
            onClose();
        }
    }

    const handleSaveClick = () => {
        const missing = getMissingFields();
        if (missing.length > 0) {
            setShowValidationPopup(true);
        } else {
            setConfirm(true);
        }
    };

    const handleSave = async () => {
        if (isSaving) return;
        setIsSaving(true);
        setError(null);

        try {
            // 1. 썸네일 처리
            let thumbnailKey: string | null = null;

            if (isEditMode) {
                const originalThumbnail = initialDataRef.current?.thumbnailImage;

                if (!thumbnailImage && originalThumbnail) {
                    // 삭제됨
                    thumbnailKey = "";
                } else if (thumbnailImage && !thumbnailImage.isExisting) {
                    // 새로 업로드
                    const presignRes = await presignThumbnail(meUserId!, userId, {
                        contentType: thumbnailImage.file!.type,
                        size: thumbnailImage.file!.size,
                        originalFilename: thumbnailImage.file!.name,
                    });

                    await uploadFileToS3(
                        presignRes.data.uploadUrl,
                        thumbnailImage.file!,
                        presignRes.data.requiredHeaders
                    );

                    thumbnailKey = presignRes.data.fileKey;
                }
                // 유지: thumbnailKey = null
            } else {
                // 생성 모드
                if (thumbnailImage?.file) {
                    const presignRes = await presignThumbnail(meUserId!, userId, {
                        contentType: thumbnailImage.file.type,
                        size: thumbnailImage.file.size,
                        originalFilename: thumbnailImage.file.name,
                    });

                    await uploadFileToS3(
                        presignRes.data.uploadUrl,
                        thumbnailImage.file,
                        presignRes.data.requiredHeaders
                    );

                    thumbnailKey = presignRes.data.fileKey;
                }
            }

            // 2. 첨부파일 처리
            let attachmentKeys: string[] | null = null;

            const newFiles = attachmentFiles.filter(f => !f.isExisting && f.file);

            // 새 파일 업로드
            let uploadedKeys: string[] = [];
            if (newFiles.length > 0) {
                const presignRes = await presignAssets(meUserId!, userId, {
                    items: newFiles.map(f => ({
                        contentType: f.file!.type,
                        size: f.file!.size,
                        originalFilename: f.file!.name,
                    })),
                });

                await Promise.all(
                    presignRes.data.items.map((item, i) =>
                        uploadFileToS3(item.uploadUrl, newFiles[i].file!, item.requiredHeaders)
                    )
                );

                uploadedKeys = presignRes.data.items.map(item => item.fileKey);
            }

            if (isEditMode) {
                const originalCount = initialDataRef.current?.attachmentFiles.length || 0;
                const currentCount = attachmentFiles.length;

                if (currentCount === 0 && originalCount > 0) {
                    // 전체 삭제
                    attachmentKeys = [];
                } else if (currentCount > 0) {
                    // 기존 key + 새 key
                    const existingKeys = attachmentFiles
                        .filter(f => f.isExisting && f.fileKey)
                        .map(f => f.fileKey!);

                    attachmentKeys = [...existingKeys, ...uploadedKeys];
                }
                // 유지: attachmentKeys = null
            } else {
                // 생성 모드
                if (uploadedKeys.length > 0) {
                    attachmentKeys = uploadedKeys;
                }
            }

            // 3. API 호출
            const payload = {
                projectTitle: title.trim(),
                description: content.trim(),
                startedAt: `${startYear}-${String(startMonth).padStart(2, '0')}-01`,
                endedAt: `${endYear}-${String(endMonth).padStart(2, '0')}-01`,
                project_role: role.trim(),
                techStack: [skills.trim()],  // 단일 문자열을 배열로
                review: problemSolution.trim(),
                thumbnailKey,
                attachmentKeys,
            };

            console.log('=== Portfolio Save Request ===');  // 👈 여기!
console.log('Mode:', isEditMode ? 'UPDATE' : 'CREATE');
console.log('Payload:', JSON.stringify(payload, null, 2));
console.log('meUserId:', meUserId);
console.log('userId:', userId);
console.log('portfolioId:', portfolioId);

            if (isEditMode) {
                await updatePortfolio(meUserId!, userId, portfolioId!, payload);
            } else {
                await createPortfolio(meUserId!, userId, payload);
            }

            onSave();
            onClose();
        } catch (error) {
            console.error('저장 실패:', error);
            
            // 에러 세부 정보 로깅
            if (error instanceof Error) {
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
            }
            
            // Axios 에러인 경우
            if ((error as any)?.response) {
                console.error('API Error Response:', (error as any).response.data);
                console.error('API Error Status:', (error as any).response.status);
            }
            
            setError('포트폴리오 저장에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsSaving(false);
        }
    };

    const hasEssential = 
        title.trim() !== '' && 
        content.trim() !== '' && 
        role.trim() !== '' && 
        skills.trim() !== '' && 
        thumbnailImage !== null;

    const contentLength = content.length;
    const problemLength = problemSolution.length;

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // 파일 타입 구분
    const imageFiles = attachmentFiles.filter(f => 
        f.isExisting 
            ? f.type?.startsWith('image/') 
            : f.file?.type.startsWith('image/')
    );

    const pdfFiles = attachmentFiles.filter(f => 
        f.isExisting 
            ? f.type === 'application/pdf' 
            : f.file?.type === 'application/pdf'
    );

    if (!isOpen) return null;
    return (
        <div className='flex items-center justify-center fixed inset-0 z-50 bg-white'>
            <div className="w-full max-w-[430px] h-full bg-white flex flex-col">
                <HeaderLayout
                    headerSlot = {
                        <EditHeader
                            title={isEditMode ? '프로젝트 수정' : '프로젝트 추가'}
                            leftAction = {{onClick: handleClose}}
                            rightElement = {
                                <button
                                    onClick={handleSaveClick}
                                    className={`text-m-14-hn ${
                                        hasEssential && !isSaving && !isLoadingDetail  ? 'text-primary': 'text-gray-650'
                                    }`}
                                >
                                    {isSaving ? '저장중..' : '완료'}
                                </button>
                            }
                        />
                    }
                >

                    <div className="w-full max-w-screen-sm h-dvh bg-white animate-slide-up flex flex-col pb-[50px]">
                        {/* 로딩 오버레이 */}
                        {(isLoadingDetail  || isSaving) && (
                            <div className="absolute inset-0 z-50">
                                <PopUp
                                    type="loading"
                                    isOpen={true}
                                />
                            </div>
                        )}

                        {error && (
                            <div className="absolute inset-0 z-50">
                                <PopUp
                                    type="error"
                                    title='업로드할 수 없는 파일입니다.'
                                    titleSecondary={error}
                                    isOpen={true}
                                    rightButtonText='확인'
                                    onClick={() => setError(null)}
                                />
                            </div>
                        )}

                        {isErrorDetail && (
                            <PopUp
                                type="error"
                                title='포트폴리오를 불러올 수 없습니다.'
                                titleSecondary='일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.'
                                isOpen={true}
                                rightButtonText='닫기'
                                onClick={onClose}
                            />
                        )}

                        {showValidationPopup && (
                            <div className="absolute inset-0 z-50">
                                <PopUp
                                    type="error"
                                    title='필수 항목을 모두 입력해주세요'
                                    titleSecondary={`누락된 항목: ${getMissingFields().join(', ')}`}
                                    isOpen={true}
                                    rightButtonText='확인'
                                    onClick={() => setShowValidationPopup(false)}
                                />
                            </div>
                        )}

                        {showCloseWarning && (
                            <div className="absolute inset-0 z-50">
                                <PopUp
                                    type="warning"
                                    title='변경사항이 있습니다.\n나가시겠습니까?'
                                    content='저장하지 않을 시 변경사항이 삭제됩니다.'
                                    isOpen={true}
                                    leftButtonText='나가기'
                                    onLeftClick={() => {
                                        setShowCloseWarning(false);
                                        onClose();
                                    }}
                                    onRightClick={() => setShowCloseWarning(false)}
                                />
                            </div>
                        )}

                        {/* 스크롤 가능한 콘텐츠 영역 */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="px-[25px] py-[20px] flex flex-col gap-[20px] border-t border-gray-150">
                                {/* 포트폴리오 제목 */}
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-sb-16-hn text-gray-900">
                                        프로젝트 제목 (필수)
                                    </span>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="프로젝트 이름을 입력해 주세요"
                                        className="w-full p-[15px] border border-gray-150 rounded-[5px] text-r-16-hn text-gray-750 placeholder:text-gray-650 focus:outline-none focus:border-primary"
                                    />
                                </div>

                                {/* 포트폴리오 개요 */}
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-sb-16-hn text-gray-900">
                                            프로젝트 개요 (필수)
                                    </span>
                                    <div className="flex flex-col gap-[5px]">
                                        <textarea
                                            value={content}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 300) {
                                                    setContent(e.target.value);
                                                }
                                            }}
                                            placeholder="프로젝트 개요를 간단히 입력해 주세요 (300자 이내)"
                                            className="w-full p-[15px] border border-gray-150 rounded-[5px] text-r-16 text-gray-750 break-keep placeholder:text-gray-650 focus:outline-none focus:border-primary resize-none min-h-[130px]"
                                        />
                                        <span className="text-right text-r-12-hn text-gray-650">{contentLength}/300</span>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="w-full h-[10px] bg-gray-150"/>
                            
                            <div className="px-[25px] py-[20px] flex flex-col gap-[20px]">
                                {/* 프로젝트 기간 */}
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-sb-16-hn text-gray-900">
                                        프로젝트 기간 (필수)
                                    </span>
                                    
                                    {/* 시작 */}
                                    <div className="flex gap-[10px] items-center">
                                        <div className="flex-1 relative min-w-[110px]">
                                        <button
                                            onClick={() => setShowStartYearDropdown(!showStartYearDropdown)}
                                            className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                        >
                                            <span className="text-r-16-hn text-gray-750">{startYear}년</span>
                                            <Icon name="toggleDown" 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showStartYearDropdown ? 'rotate-180' : ''}`}/>
                                        </button>
                                        {showStartYearDropdown && (
                                            <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                            {years
                                                .filter(year => year <= endYear)
                                                .map((year) => (
                                                <button
                                                key={year}
                                                onClick={() => {
                                                    setStartYear(year);
                                                    setShowStartYearDropdown(false);
                                                }}
                                                className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                    startYear === year ? 'text-primary' : 'text-gray-650'
                                                }`}
                                                >
                                                {year}년
                                                </button>
                                            ))}
                                            </div>
                                        )}
                                        </div>

                                        <div className="flex-1 relative min-w-[110px]">
                                        <button
                                            onClick={() => setShowStartMonthDropdown(!showStartMonthDropdown)}
                                            className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                        >
                                            <span className="text-r-16-hn text-gray-750">{startMonth}월</span>
                                            <Icon name="toggleDown" 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showStartMonthDropdown ? 'rotate-180' : ''}`}/>
                                        </button>
                                        {showStartMonthDropdown && (
                                            <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                            {months
                                                .filter(month => {
                                                if (endYear === startYear) {
                                                    return month <= endMonth;
                                                }
                                                return true;
                                                })
                                                .map((month) => (
                                                <button
                                                key={month}
                                                onClick={() => {
                                                    setStartMonth(month);
                                                    setShowStartMonthDropdown(false);
                                                }}
                                                className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                    startMonth === month ? 'text-primary' : 'text-gray-650'
                                                }`}
                                                >
                                                {month}월
                                                </button>
                                            ))}
                                            </div>
                                        )}
                                        </div>

                                        <span className="flex-1 text-r-14-hn text-gray-650 min-w-[25px] max-w-[65px]">부터</span>
                                    </div>

                                    {/* 종료 */}
                                    <div className="flex gap-[10px] items-center">
                                        <div className="flex-1 relative min-w-[110px]">
                                        <button
                                            onClick={() => setShowEndYearDropdown(!showEndYearDropdown)}
                                            className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                        >
                                            <span className="text-r-16-hn text-gray-750">{endYear}년</span>
                                            <Icon name="toggleDown" 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showEndYearDropdown ? 'rotate-180' : ''}`}/>
                                        </button>
                                        {showEndYearDropdown && (
                                            <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                            {years
                                                .filter(year => year >= startYear)
                                                .map((year) => (
                                                <button
                                                key={year}
                                                onClick={() => {
                                                    setEndYear(year);
                                                    setShowEndYearDropdown(false);
                                                }}
                                                className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                    endYear === year ? 'text-primary' : 'text-gray-650'
                                                }`}
                                                >
                                                {year}년
                                                </button>
                                            ))}
                                            </div>
                                        )}
                                        </div>

                                        <div className="flex-1 relative min-w-[110px]">
                                        <button
                                            onClick={() => setShowEndMonthDropdown(!showEndMonthDropdown)}
                                            className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                        >
                                            <span className="text-r-16-hn text-gray-750">{endMonth}월</span>
                                            <Icon name="toggleDown" 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showEndMonthDropdown ? 'rotate-180' : ''}`}/>
                                        </button>
                                        {showEndMonthDropdown && (
                                            <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                            {months
                                                .filter(month => {
                                                if (endYear === startYear) {
                                                    return month >= startMonth;
                                                }
                                                return true;
                                                })
                                                .map((month) => (
                                                <button
                                                key={month}
                                                onClick={() => {
                                                    setEndMonth(month);
                                                    setShowEndMonthDropdown(false);
                                                }}
                                                className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                    endMonth === month ? 'text-primary' : 'text-gray-650'
                                                }`}
                                                >
                                                {month}월
                                                </button>
                                            ))}
                                            </div>
                                        )}
                                        </div>

                                        <span className="flex-1 text-r-14-hn text-gray-650 min-w-[25px] max-w-[65px]">까지</span>
                                    </div>
                                </div>

                                {/* 프로젝트 역할 */}
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-sb-16-hn text-gray-900">
                                        프로젝트 역할 (필수)
                                    </span>
                                    <input
                                        type="text"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="프로젝트에서 맡은 역할을 입력해 주세요"
                                        className="w-full p-[15px] border border-gray-150 rounded-[5px] text-r-16-hn text-gray-750 placeholder:text-gray-650 focus:outline-none focus:border-primary"
                                    />
                                </div>

                                {/* 사용 기술 */}
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-sb-16-hn text-gray-900">
                                        사용 기술 (필수)
                                    </span>
                                    <input
                                        type="text"
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                        placeholder="프로젝트에서 사용한 기술을 입력해 주세요"
                                        className="w-full p-[15px] border border-gray-150 rounded-[5px] text-r-16-hn text-gray-750 placeholder:text-gray-650 focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="w-full h-[10px] bg-gray-150"/>

                            <div className="p-[25px] flex flex-col gap-[25px]">
                                {/* 대표 이미지 추가 */}
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-sb-16-hn text-gray-900">
                                        대표 이미지 추가 (필수)
                                    </span>
                                
                                    {/* 썸네일 이미지 (1개만) */}
                                    {thumbnailImage ? (
                                        <div className="relative w-full aspect-[4/3]">
                                            <img
                                                src={thumbnailImage.url}
                                                alt="썸네일"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null; //이미지 깨짐 방지
                                                    e.currentTarget.src = REPLACE_IMAGE;
                                                }}
                                                className="w-full max-h-[500px] h-full object-cover rounded-[10px]"
                                            />
                                            <button
                                                onClick={() => setThumbnailImage(null)}
                                                className="absolute top-[4px] right-[4px] p-[4px] bg-black/30 rounded-full"
                                            >
                                                <svg width="25" height="25" viewBox="0 0 12 12" fill="none">
                                                    <path d="M9 3L3 9M3 3L9 9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className='shadow-sm'/>
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                        onClick={() => thumbnailInputRef.current?.click()}
                                        className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-[8px] border border-gray-300 rounded-[10px] bg-gray-50 hover:bg-gray-100"
                                        >
                                        <ModalIcon name="photo" className="w-[24px] h-[24px] text-gray-650" />
                                        <span className="text-r-12-hn text-gray-500">
                                            대표 이미지를 추가해 주세요<br/>(png, webp, jpg, jpeg)
                                        </span>
                                        </button>
                                    )}
                                </div>

                                {/* 프로젝트 파일 추가 */}
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-sb-16-hn text-gray-900">
                                        프로젝트 파일 추가 (선택)
                                    </span>
                                
                                    {/* 이미지 3x3 그리드 */}
                                    {imageFiles.length > 0 && (
                                        <div className="grid grid-cols-3 gap-[10px]">
                                        {imageFiles.map((image) => (
                                            <div key={image.id} className="relative aspect-square">
                                                <img
                                                    src={image.url}
                                                    alt={"포트폴리오 이미지"}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null; //이미지 깨짐 방지
                                                        e.currentTarget.src = REPLACE_IMAGE;
                                                    }}
                                                    className="w-full h-full object-cover rounded-[10px]"
                                                />
                                                <button
                                                    onClick={() => removeFile(image.id)}
                                                    className="absolute top-[4px] right-[4px] p-[4px] bg-black/20 rounded-full"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
                                                        <path d="M9 3L3 9M3 3L9 9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" className='drop-shadow-[0_0_4px_rgba(0,0,0,0.35)]'/>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                        </div>
                                    )}

                                    {/* PDF 파일 리스트 */}
                                    {pdfFiles.length > 0 && (
                                        <div className="flex flex-col gap-[8px]">
                                            {pdfFiles.map((pdf) => {
                                                const fileName = pdf.file?.name || pdf.fileKey?.split('/').pop() || '파일';
                                                return (
                                                    <div key={pdf.id} className="flex items-center gap-[10px] px-[15px] py-[12px] bg-gray-100 rounded-[10px]">
                                                        <ModalIcon name="file" className="w-[20px] h-[20px] text-gray-750" />
                                                        <span className="flex-1 text-r-14-hn text-gray-750 truncate">{fileName}</span>
                                                        <button
                                                            onClick={() => removeFile(pdf.id)}
                                                            className="p-[4px]"
                                                        >
                                                            <Icon name='cancel' className='w-[16px] h-[16px]'/>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* 파일 추가 버튼 (단일) */}
                                    <button
                                        onClick={() => setIsFileAddModalOpen(true)}
                                        className="w-full px-[15px] py-[12px] rounded-[10px] text-gray-650 bg-gray-150 flex flex-col"
                                    >
                                        <span className='text-m-14-hn'>파일 추가</span>
                                        <span className='text-r-10-hn'>(pdf, 이미지)</span>
                                    </button>
                                </div>
                            </div>

                            <div className="w-full h-[10px] bg-gray-150"/>

                            {/* Problem & Solution */}
                            <div className="px-[25px] py-[20px] flex flex-col gap-[10px]">
                                <span className="text-sb-16-hn text-gray-900">
                                Problem & Solution (선택)
                                </span>
                                <div className="flex flex-col gap-[5px]">
                                    <textarea
                                        value={problemSolution}
                                        onChange={(e) => {
                                                if (e.target.value.length <= 100) {
                                                    setProblemSolution(e.target.value);
                                                }
                                            }}
                                        placeholder="문제와 해결방법을 간단히 작성해 주세요 (100자 이내)"
                                        maxLength={100}
                                        className="w-full p-[15px] border border-gray-150 rounded-[5px] text-r-14-hn text-gray-750 placeholder:text-gray-650 focus:outline-none focus:border-primary resize-none min-h-[120px]"
                                    />
                                    <span className="text-right text-r-12-hn text-gray-650">{problemLength}/100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </HeaderLayout>

                {/* 숨겨진 파일 입력 */}
                <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/png, image/webp, image/jpeg, image/jpg"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                />
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/png, image/webp, image/jpeg, image/jpg"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                />
                <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/png, image/webp, image/jpeg, image/jpg"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                />
                <input
                    ref={pdfInputRef}
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                />
            
                {/* 파일 추가 모달 */}
                <BottomSheetModal 
                    isOpen={isFileAddModalOpen} 
                    onClose={() => setIsFileAddModalOpen(false)} 
                    height="auto"
                >
                    <div className="px-[25px] pt-[20px] pb-[40px]">
                        <div className="flex flex-col">
                            {/* 사진 */}
                            <button
                                onClick={() => {
                                    imageInputRef.current?.click();
                                    setIsFileAddModalOpen(false);
                                }}
                                className="w-full flex items-center gap-[15px] p-[15px] border-b border-gray-150"
                            >
                                <ModalIcon name="photo" className="w-[24px] h-[24px]" />
                                <span className="text-m-16-hn text-gray-750">사진</span>
                            </button>

                            {/* 카메라 */}
                            <button
                                onClick={() => {
                                    cameraInputRef.current?.click();
                                    setIsFileAddModalOpen(false);
                                }}
                                className="w-full flex items-center gap-[15px] p-[15px] border-b border-gray-150"
                            >
                                <ModalIcon name="camera" className="w-[24px] h-[24px]" />
                                <span className="text-r-16-hn text-gray-750">카메라</span>
                            </button>

                            {/* 파일 */}
                            <button
                                onClick={() => {
                                    pdfInputRef.current?.click();
                                    setIsFileAddModalOpen(false);
                                }}
                                className="w-full flex items-center gap-[15px] p-[15px] border-b border-gray-150"
                            >
                                <ModalIcon name="file" className="w-[24px] h-[24px]" />
                                <span className="text-m-16-hn text-gray-750">파일</span>
                            </button>
                        </div>
                    </div>
                </BottomSheetModal>
                
                <PopUp
                    isOpen={confirm}
                    type="info"
                    title={isEditMode ? '수정사항을 저장하시겠습니까?' : '포트폴리오를 생성하시겠습니까?'}
                    content={isEditMode ? '이전 내용으로 되돌릴 수 없습니다.' : '생성 후에도 수정/삭제가 가능합니다.'}
                    leftButtonText="아니오"
                    rightButtonText="네"
                    onLeftClick={() => setConfirm(false)}
                    onRightClick={() => {
                        setConfirm(false);
                        handleSave();
                    }}
                />
            </div>
        </div>
    );
}
