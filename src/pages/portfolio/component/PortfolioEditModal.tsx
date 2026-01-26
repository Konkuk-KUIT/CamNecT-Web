import { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/Icon';
import type { PortfolioDetail, Media } from '../../../types/portfolio/portfolioTypes';
import { useImageUpload } from '../../../hooks/useImageUpload';
import ModalIcon from '../../../components/BottomSheetModal/Icon';
import BottomSheetModal from '../../../components/BottomSheetModal/BottomSheetModal';
import PopUp from '../../../components/Pop-up';
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { EditHeader } from "../../../layouts/headers/EditHeader";

interface PortfolioEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    initialData?: PortfolioDetail;
    onSave: (data: PortfolioDetail) => void;
}

interface ImageData {
    media: Media;
    previewUrl: string;
}

export default function PortfolioEditModal({
    isOpen,
    onClose,
    userId,
    initialData,
    onSave,
}: PortfolioEditModalProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [startYear, setStartYear] = useState(initialData?.startYear || new Date().getFullYear());
    const [startMonth, setStartMonth] = useState(initialData?.startMonth || 1);
    const [endYear, setEndYear] = useState(initialData?.endYear || new Date().getFullYear());
    const [endMonth, setEndMonth] = useState(initialData?.endMonth || 1);
    const [role, setRole] = useState(initialData?.role || '');
    const [skills, setSkills] = useState(initialData?.skills || '');
    
    // 이미지는 별도로 관리 (미리보기 URL 포함)
    const [thumbnailImage, setThumbnailImage] = useState<ImageData | null>(null);
    const [portfolioImages, setPortfolioImages] = useState<ImageData[]>([]);
    const [portfolioPdf, setPortfolioPdf] = useState<Media[]>(initialData?.portfolioPdf || []);
    const [portfolioLink, setPortfolioLink] = useState<string[]>(initialData?.portfolioLink || []);
    const [problemSolution, setProblemSolution] = useState(initialData?.problemSolution || '');
    
    // 모달 상태
    const [isFileAddModalOpen, setIsFileAddModalOpen] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkInput, setLinkInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showValidationPopup, setShowValidationPopup] = useState(false);
  

    const [showStartYearDropdown, setShowStartYearDropdown] = useState(false);
    const [showStartMonthDropdown, setShowStartMonthDropdown] = useState(false);
    const [showEndYearDropdown, setShowEndYearDropdown] = useState(false);
    const [showEndMonthDropdown, setShowEndMonthDropdown] = useState(false);

    const { prepareImage } = useImageUpload();
    const thumbnailInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

  // initialData 변경 시 state 업데이트
  useEffect(() => {
    const loadData = async () => {
      if (initialData) {
        setIsInitializing(true);
        setError(null);
        
        try {
          setTitle(initialData.title);
          setContent(initialData.content || '');
          setStartYear(initialData.startYear || new Date().getFullYear());
          setStartMonth(initialData.startMonth || 1);
          setEndYear(initialData.endYear || new Date().getFullYear());
          setEndMonth(initialData.endMonth || 1);
          setRole(initialData.role || '');
          setSkills(initialData.skills || '');
          
          // 썸네일 이미지 처리
          if (initialData.portfolioThumbnail) {
            setThumbnailImage({
              media: initialData.portfolioThumbnail,
              previewUrl: typeof initialData.portfolioThumbnail === 'string' 
                ? initialData.portfolioThumbnail 
                : URL.createObjectURL(initialData.portfolioThumbnail)
            });
          }
          
          // 추가 이미지 처리
          const additionalImages = (initialData.portfolioImage || []).map(img => ({
            media: img,
            previewUrl: typeof img === 'string' ? img : URL.createObjectURL(img)
          }));
          setPortfolioImages(additionalImages);
          
          setPortfolioPdf(initialData.portfolioPdf || []);
          setPortfolioLink(initialData.portfolioLink || []);
          setProblemSolution(initialData.problemSolution || '');
          
          // 약간의 지연 후 로딩 완료
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (err) {
          console.error('데이터 로드 실패:', err);
          setError('데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
          setIsInitializing(false);
        }
      } else {
        // 새 포트폴리오 작성
        setIsInitializing(false);
        setError(null);
      }
    };

    if (isOpen) {
      loadData();
    }
  }, [initialData, isOpen]);

  // 모달 열림/닫힘 시 body 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const file = files[0]; // 첫 번째 파일만
    const result = prepareImage(file);
    if (result) {
      setThumbnailImage({
        media: result.file,
        previewUrl: result.previewUrl
      });
    }

    // input 초기화
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages: ImageData[] = [];

    files.forEach(file => {
      const result = prepareImage(file);
      if (result) {
        newImages.push({
          media: result.file,
          previewUrl: result.previewUrl
        });
      }
    });

    setPortfolioImages([...portfolioImages, ...newImages]);
    
    // input 초기화
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

    const handleCameraUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const file = files[0]; // 카메라는 보통 한 장씩
        const result = prepareImage(file);
        if (result) {
            setPortfolioImages([...portfolioImages, {
            media: result.file,
            previewUrl: result.previewUrl
        }]);
    }
    
    // input 초기화
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setPortfolioPdf([...portfolioPdf, ...files]);
    }
    
    // input 초기화
    if (pdfInputRef.current) {
      pdfInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setPortfolioImages(portfolioImages.filter((_, i) => i !== index));
  };

  const removePdf = (index: number) => {
    setPortfolioPdf(portfolioPdf.filter((_, i) => i !== index));
  };

  const removeLink = (index: number) => {
    setPortfolioLink(portfolioLink.filter((_, i) => i !== index));
  };

  const handleLinkSave = () => {
    if (linkInput.trim()) {
      setPortfolioLink([...portfolioLink, linkInput.trim()]);
      setLinkInput('');
      setIsLinkModalOpen(false);
    }
  };

  const handleLinkModalClose = () => {
    setLinkInput('');
    setIsLinkModalOpen(false);
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

  const handleSaveClick = () => {
    if (!hasChanges) {
      setShowValidationPopup(true);
      return;
    }
    handleSave();
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      const data: PortfolioDetail = {
        ...(initialData || {}),
        portfolioId: initialData?.portfolioId || `pf_${Date.now()}`,
        id: initialData?.id || userId,
        title,
        content,
        startYear,
        startMonth,
        endYear,
        endMonth,
        role,
        skills,
        portfolioImage: portfolioImages.map(img => img.media),
        portfolioPdf,
        portfolioLink: portfolioLink.filter(link => link.trim() !== ''),
        problemSolution,
        portfolioThumbnail: thumbnailImage?.media || initialData?.portfolioThumbnail || '',
        updatedAt: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
        portfolioVisibility: initialData?.portfolioVisibility ?? true,
        isImportant: initialData?.isImportant ?? false,
      } as PortfolioDetail;

      // TODO: 실제로는 API 호출
      // await savePortfolio(data);
      await new Promise(resolve => setTimeout(resolve, 500));

      onSave(data);
      onClose();
    } catch (error) {
      console.error('저장 실패:', error);
      setError('포트폴리오 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

    const hasChanges = 
        title.trim() !== '' && 
        content.trim() !== '' && 
        role.trim() !== '' && 
        skills.trim() !== '' && 
        thumbnailImage !== null;
    const contentLength = content.length;
    const problemLength = problemSolution.length;

  // 연도 옵션 생성
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  if (!isOpen) return null;

    return (
        <div className='flex items-center justify-center fixed inset-0 z-50 bg-white'>
            <div className="w-full max-w-[430px] h-full bg-white flex flex-col">
                <HeaderLayout
                    headerSlot = {
                        <EditHeader
                            title={initialData?.portfolioId ? '프로젝트 수정' : '프로젝트 추가'}
                            leftAction = {{onClick: onClose}}
                            rightElement = {
                                <button
                                    onClick={handleSaveClick}
                                    className={`text-m-14-hn ${
                                        hasChanges && !isSaving && !isInitializing ? 'text-primary': 'text-gray-650'
                                    }`}
                                >
                                    완료
                                </button>
                            }
                        />
                    }
                >

                    <div className="w-full max-w-screen-sm h-dvh bg-white animate-slide-up flex flex-col pb-[50px]">
                        {/* 로딩 오버레이 */}
                        {(isInitializing || isSaving) && (
                            <div className="absolute inset-0 z-50">
                                <PopUp
                                    type="loading"
                                    isOpen={true}
                                />
                            </div>
                        )}

                        {/* 에러 오버레이 */}
                        {error && (
                            <div className="absolute inset-0 z-50">
                                <PopUp
                                    type="error"
                                    title='일시적 오류가 발생했습니다.'
                                    titleSecondary={error}
                                    isOpen={true}
                                    rightButtonText='확인'
                                    onClick={() => setError(null)}
                                />
                            </div>
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

                        {/* 스크롤 가능한 콘텐츠 영역 */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="px-[25px] py-[20px] flex flex-col gap-[20px]">
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
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="프로젝트 개요를 간단히 입력해 주세요 (300자 이내)"
                                            maxLength={300}
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
                                            src={thumbnailImage.previewUrl}
                                            alt="Thumbnail"
                                            className="w-full h-full object-cover rounded-[10px]"
                                        />
                                        <button
                                            onClick={() => setThumbnailImage(null)}
                                            className="absolute top-[4px] right-[4px] p-[4px]"
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
                                        <ModalIcon name="photo" className="w-[24px] h-[24px] text-gray-400" />
                                        <span className="text-r-12-hn text-gray-500">
                                            대표 이미지를 추가해 주세요<br/>(png, jpg, pdf ...)
                                        </span>
                                        </button>
                                    )}
                                </div>

                                {/* 프로젝트 파일 추가 */}
                                <div className="flex flex-col gap-[10px]">
                                    <span className="text-sb-16-hn text-gray-900">
                                        프로젝트 파일 추가 (필수)
                                    </span>
                                
                                    {/* 이미지 3x3 그리드 */}
                                    {portfolioImages.length > 0 && (
                                        <div className="grid grid-cols-3 gap-[10px]">
                                        {portfolioImages.map((image, index) => (
                                            <div key={index} className="relative aspect-square">
                                                <img
                                                    src={image.previewUrl}
                                                    alt={`Portfolio ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-[10px]"
                                                />
                                                <button
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-[4px] right-[4px] p-[4px]"
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
                                    {portfolioPdf.length > 0 && (
                                        <div className="flex flex-col gap-[8px]">
                                            {portfolioPdf.map((pdf, index) => {
                                                const fileName = typeof pdf === 'string' 
                                                ? pdf.split('/').pop() || `파일 ${index + 1}`
                                                : pdf.name;
                                                return (
                                                <div key={`pdf-${index}`} className="flex items-center gap-[10px] px-[15px] py-[12px] bg-gray-100 rounded-[10px]">
                                                    <ModalIcon name="file" className="w-[20px] h-[20px] text-gray-750" />
                                                    <span className="flex-1 text-r-14-hn text-gray-750 truncate">{fileName}</span>
                                                    <button
                                                    onClick={() => removePdf(index)}
                                                    className="p-[4px]"
                                                    >
                                                    <Icon name='cancel' className='w-[16px] h-[16px]'/>
                                                    </button>
                                                </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* 링크 리스트 */}
                                    {portfolioLink.length > 0 && (
                                        <div className="flex flex-col gap-[8px]">
                                            {portfolioLink.map((link, index) => (
                                                <div key={`link-${index}`} className="flex items-center gap-[10px] px-[15px] py-[12px] bg-gray-100 rounded-[10px]">
                                                    <ModalIcon name="url" className="w-[20px] h-[20px] text-gray-750" />
                                                    <span className="flex-1 text-r-14-hn text-primary truncate">{link}</span>
                                                    <button
                                                        onClick={() => removeLink(index)}
                                                        className="p-[4px]"
                                                    >
                                                        <Icon name='cancel' className='w-[16px] h-[16px]'/>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* 파일 추가 버튼 (단일) */}
                                    <button
                                        onClick={() => setIsFileAddModalOpen(true)}
                                        className="w-full px-[15px] py-[12px] rounded-[10px] text-gray-650 bg-gray-150 flex flex-col"
                                    >
                                        <span className='text-m-14-hn'>파일 추가</span>
                                        <span className='text-r-10-hn'>(링크, 이미지, pdf...)</span>
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
                                        onChange={(e) => setProblemSolution(e.target.value)}
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
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                />
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCameraUpload}
                    className="hidden"
                />
                <input
                    ref={pdfInputRef}
                    type="file"
                    accept=".pdf,.txt,.html" //TODO: 파일 제한을 얼마나 둘 것인가 정하기
                    multiple
                    onChange={handlePdfUpload}
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

                            {/* 링크 */}
                            <button
                                onClick={() => {
                                    setIsFileAddModalOpen(false);
                                    setIsLinkModalOpen(true);
                                }}
                                className="w-full flex items-center gap-[15px] p-[15px]"
                            >
                                <ModalIcon name="url" className="w-[24px] h-[24px] text-gray-750" />
                                <span className="text-r-16-hn text-gray-750">링크</span>
                            </button>
                        </div>
                    </div>
                </BottomSheetModal>
                
                {/* 링크 추가 모달 */}
                <BottomSheetModal 
                    isOpen={isLinkModalOpen} 
                    onClose={handleLinkModalClose} 
                    height="auto"
                >
                    <div className="px-[25px] pb-[30px]">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between mb-[20px]">
                        <button onClick={handleLinkModalClose} className="p-[8px] -ml-[8px]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </button>
                        <h2 className="text-m-16-hn text-gray-900">링크 추가</h2>
                        <button
                        onClick={handleLinkSave}
                        disabled={!linkInput.trim()}
                        className={`text-m-14-hn ${linkInput.trim() ? 'text-primary' : 'text-gray-400'}`}
                        >
                        완료
                        </button>
                    </div>

                    {/* URL 입력 */}
                    <input
                        type="url"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        placeholder="URL 입력..."
                        className="w-full px-[15px] py-[12px] border border-gray-300 rounded-[10px] text-r-14-hn text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary"
                    />
                    </div>
                </BottomSheetModal>

                {isSaving && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-[15px] px-[30px] py-[25px] flex flex-col items-center gap-[15px] shadow-lg">
                            <div className="w-[40px] h-[40px] border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
                            <div className="text-m-14-hn text-gray-900">저장 중...</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}