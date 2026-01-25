import { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/Icon';
import type { Media, PortfolioDetail } from '../../../types/portfolio/portfolioTypes';
import { useImageUpload } from '../../../hooks/useImageUpload';

interface PortfolioEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: PortfolioDetail;
  onSave: (data: PortfolioDetail) => void;
}

interface ImageData {
  file: File;
  previewUrl: string;
  formData: FormData;
}

export default function PortfolioEditorModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: PortfolioEditorModalProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [startYear, setStartYear] = useState(initialData?.startYear || new Date().getFullYear());
  const [startMonth, setStartMonth] = useState(initialData?.startMonth || 1);
  const [endYear, setEndYear] = useState(initialData?.endYear || new Date().getFullYear());
  const [endMonth, setEndMonth] = useState(initialData?.endMonth || 1);
  const [role, setRole] = useState(initialData?.role || '');
  const [skills, setSkills] = useState(initialData?.skills || '');
  
  // 이미지는 별도로 관리 (미리보기 URL 포함)
  const [portfolioImages, setPortfolioImages] = useState<{
    media: Media;
    previewUrl: string;
  }[]>([]);
  
  const [portfolioPdf, setPortfolioPdf] = useState<Media[]>(initialData?.portfolioPdf || []);
  const [portfolioLink, setPortfolioLink] = useState<string[]>(initialData?.portfolioLink || []);
  const [problemSolution, setProblemSolution] = useState(initialData?.problemSolution || '');

  const { prepareImage } = useImageUpload();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // initialData 변경 시 state 업데이트
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content || '');
      setStartYear(initialData.startYear || new Date().getFullYear());
      setStartMonth(initialData.startMonth || 1);
      setEndYear(initialData.endYear || new Date().getFullYear());
      setEndMonth(initialData.endMonth || 1);
      setRole(initialData.role || '');
      setSkills(initialData.skills || '');
      
      // 기존 이미지 URL 처리
      const existingImages = (initialData.portfolioImage || []).map(img => ({
        media: img,
        previewUrl: typeof img === 'string' ? img : URL.createObjectURL(img)
      }));
      setPortfolioImages(existingImages);
      
      setPortfolioPdf(initialData.portfolioPdf || []);
      setPortfolioLink(initialData.portfolioLink || []);
      setProblemSolution(initialData.problemSolution || '');
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages: { media: Media; previewUrl: string }[] = [];

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

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // PDF는 File 객체를 직접 저장
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

  const addLink = () => {
    setPortfolioLink([...portfolioLink, '']);
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...portfolioLink];
    newLinks[index] = value;
    setPortfolioLink(newLinks);
  };

  const removeLink = (index: number) => {
    setPortfolioLink(portfolioLink.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const data: PortfolioDetail = {
      ...(initialData || {}),
      portfolioId: initialData?.portfolioId || `pf_${Date.now()}`,
      id: initialData?.id || 'user_001',
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
      portfolioThumbnail: portfolioImages[0]?.media || initialData?.portfolioThumbnail || '',
      updatedAt: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
      portfolioVisibility: initialData?.portfolioVisibility ?? true,
      isImportant: initialData?.isImportant ?? false,
    } as PortfolioDetail;

    // TODO: 실제 API 호출 시
    // 1. File 객체가 있으면 먼저 이미지 업로드 API 호출
    // const uploadedImages = await Promise.all(
    //   portfolioImages.map(async (img) => {
    //     if (typeof img.media === 'string') return img.media;
    //     const response = await uploadImage(img.formData);
    //     return response.url;
    //   })
    // );
    // 2. 반환된 URL로 portfolioImage 필드 업데이트
    // 3. 포트폴리오 생성/수정 API 호출

    onSave(data);
    onClose();
  };

  const hasChanges = title.trim() !== '';
  const contentLength = content.length;
  const problemLength = problemSolution.length;

  // 연도 옵션 생성
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="w-full max-w-screen-sm h-dvh bg-white animate-slide-up flex flex-col">
        {/* 헤더 */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-[56px] px-[20px]">
            <button
              onClick={onClose}
              className="text-M-14 text-gray-650 active:text-gray-900"
            >
              취소
            </button>

            <h1 className="text-M-16 text-gray-900">
              {initialData?.portfolioId ? '포트폴리오 수정' : '포트폴리오 추가'}
            </h1>

            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`text-M-14 ${
                hasChanges ? 'text-primary active:text-primary-dark' : 'text-gray-350'
              }`}
            >
              완료
            </button>
          </div>
        </header>

        {/* 스크롤 가능한 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-[20px] py-[20px] space-y-[24px]">
            {/* 포트폴리오 제목 */}
            <div>
              <label className="block text-M-14 text-gray-900 mb-[8px]">
                포트폴리오 제목 (필수)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="포트폴리오 이름을 입력해 주세요"
                className="w-full px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
            </div>

            {/* 포트폴리오 개요 */}
            <div>
              <div className="flex items-center justify-between mb-[8px]">
                <label className="text-M-14 text-gray-900">
                  포트폴리오 개요 (필수)
                </label>
                <span className="text-R-12-hn text-gray-500">{contentLength}/3000 바이트</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="프로젝트 개요를 간단히 입력해 주세요 (3000자 이내)"
                maxLength={3000}
                className="w-full px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary resize-none min-h-[120px]"
              />
            </div>

            {/* 프로젝트 기간 */}
            <div>
              <label className="block text-M-14 text-gray-900 mb-[8px]">
                프로젝트 기간 (필수)
              </label>
              <div className="space-y-[12px]">
                {/* 시작 */}
                <div className="flex items-center gap-[8px]">
                  <select
                    value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value))}
                    className="flex-1 px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-900 focus:outline-none focus:border-primary bg-white"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}년</option>
                    ))}
                  </select>
                  <select
                    value={startMonth}
                    onChange={(e) => setStartMonth(Number(e.target.value))}
                    className="flex-1 px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-900 focus:outline-none focus:border-primary bg-white"
                  >
                    {months.map(month => (
                      <option key={month} value={month}>{month}월</option>
                    ))}
                  </select>
                  <span className="text-R-14 text-gray-650">시작</span>
                </div>
                {/* 종료 */}
                <div className="flex items-center gap-[8px]">
                  <select
                    value={endYear}
                    onChange={(e) => setEndYear(Number(e.target.value))}
                    className="flex-1 px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-900 focus:outline-none focus:border-primary bg-white"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}년</option>
                    ))}
                  </select>
                  <select
                    value={endMonth}
                    onChange={(e) => setEndMonth(Number(e.target.value))}
                    className="flex-1 px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-900 focus:outline-none focus:border-primary bg-white"
                  >
                    {months.map(month => (
                      <option key={month} value={month}>{month}월</option>
                    ))}
                  </select>
                  <span className="text-R-14 text-gray-650">까지</span>
                </div>
              </div>
            </div>

            {/* 프로젝트 역할 */}
            <div>
              <label className="block text-M-14 text-gray-900 mb-[8px]">
                프로젝트 역할 (필수)
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="프로젝트 이름을 입력해 주세요"
                className="w-full px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
            </div>

            {/* 사용 기술 */}
            <div>
              <label className="block text-M-14 text-gray-900 mb-[8px]">
                사용 기술 (필수)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="프로젝트 이름을 입력해 주세요"
                className="w-full px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
            </div>

            {/* 대표 이미지 추가 */}
            <div>
              <label className="block text-M-14 text-gray-900 mb-[8px]">
                대표 이미지 추가 (필수)
              </label>
              <button
                onClick={() => imageInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-[8px] px-[16px] py-[32px] border border-dashed border-gray-300 rounded-[8px] text-R-14 text-gray-500 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13.3333 13.3333L10 10M10 10L6.66667 13.3333M10 10V17.5M16.6667 13.9524C17.6846 13.1117 18.3333 11.8399 18.3333 10.4167C18.3333 7.88536 16.2813 5.83333 13.75 5.83333C13.5679 5.83333 13.3975 5.73833 13.3051 5.58145C12.2184 3.73736 10.212 2.5 7.91667 2.5C4.46489 2.5 1.66667 5.29822 1.66667 8.75C1.66667 10.4718 2.36289 12.0309 3.48912 13.1613" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
                </svg>
                <span>대표 이미지 추가 (png, jpg, gif, pdf ...)</span>
              </button>
              {portfolioImages.length > 0 && (
                <div className="mt-[12px] space-y-[8px]">
                  {portfolioImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.previewUrl}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-auto rounded-[8px]"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-[8px] right-[8px] p-[6px] bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M12 4L4 12M4 4L12 12" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 포트폴리오 추가 */}
            <div>
              <label className="block text-M-14 text-gray-900 mb-[8px]">
                포트폴리오 추가
              </label>
              <button
                onClick={() => pdfInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-[8px] px-[16px] py-[32px] border border-dashed border-gray-300 rounded-[8px] text-R-14 text-gray-500 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 17V11L7 13M9 11L11 13M13 17V15M13 13.5V13.5C13 12.6716 13.6716 12 14.5 12V12C15.3284 12 16 12.6716 16 13.5V13.5C16 14.3284 15.3284 15 14.5 15V15M13 15H16M16 15V17M19 10V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H13L19 10Z" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
                </svg>
                <span>파일 추가</span>
                <span className="text-R-12-hn">(txt, html, pdf ...)</span>
              </button>
              {portfolioPdf.length > 0 && (
                <div className="mt-[12px] space-y-[8px]">
                  {portfolioPdf.map((pdf, index) => {
                    const fileName = typeof pdf === 'string' 
                      ? pdf.split('/').pop() || `파일 ${index + 1}`
                      : pdf.name;
                    return (
                      <div key={index} className="flex items-center justify-between p-[12px] bg-gray-50 rounded-[8px]">
                        <span className="text-R-14 text-gray-900 truncate flex-1">{fileName}</span>
                        <button
                          onClick={() => removePdf(index)}
                          className="p-[4px] hover:bg-gray-200 rounded-full"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12 4L4 12M4 4L12 12" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 포트폴리오 주소 */}
            <div>
              <label className="block text-M-14 text-gray-900 mb-[8px]">
                포트폴리오 주소
              </label>
              <div className="space-y-[8px]">
                {portfolioLink.map((link, index) => (
                  <div key={index} className="flex items-center gap-[8px]">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => updateLink(index, e.target.value)}
                      placeholder="https://example.com"
                      className="flex-1 px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => removeLink(index)}
                      className="p-[12px] hover:bg-gray-100 rounded-[8px]"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 5L5 15M5 5L15 15" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  onClick={addLink}
                  className="w-full px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-650 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  + 주소 추가
                </button>
              </div>
            </div>

            {/* Problem & Solution */}
            <div>
              <div className="flex items-center justify-between mb-[8px]">
                <label className="text-M-14 text-gray-900">
                  Problem & Solution (선택)
                </label>
                <span className="text-R-12-hn text-gray-500">{problemLength}/1000 바이트</span>
              </div>
              <textarea
                value={problemSolution}
                onChange={(e) => setProblemSolution(e.target.value)}
                placeholder="문제와 해결방법을 간단히 작성해 주세요 (1000자 이내)"
                maxLength={1000}
                className="w-full px-[16px] py-[12px] border border-gray-300 rounded-[8px] text-R-14 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary resize-none min-h-[120px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />
      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf,.txt,.html"
        multiple
        onChange={handlePdfUpload}
        className="hidden"
      />
    </div>
  );
}