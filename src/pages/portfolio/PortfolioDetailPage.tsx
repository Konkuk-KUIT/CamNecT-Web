import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import PortfolioEditModal from './component/PortfolioEditModal';
import type { PortfolioDetail } from '../../types/portfolio/portfolioTypes';
import { MOCK_PORTFOLIOS_BY_OWNER_ID } from '../../mock/portfolio';
import { MOCK_PROFILE_DETAIL_BY_UID, MOCK_SESSION } from "../../mock/mypages";
import BottomSheetModal from '../../components/BottomSheetModal/BottomSheetModal';
import ModalIcon from '../../components/BottomSheetModal/Icon'
import PopUp from '../../components/Pop-up';


export const PortfolioDetailPage = () => {
    const userId = MOCK_SESSION.meUid; // TODO: 실제로는 인증에서 가져오기
    const userDetail = MOCK_PROFILE_DETAIL_BY_UID[userId];
    const {user} = userDetail;
    const navigate = useNavigate();
    const { portfolioId } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [portfolio, setPortfolio] = useState<PortfolioDetail | null>(null);

    // Mock 데이터에서 포트폴리오 가져오기
    useEffect(() => {
        const userPortfolios = MOCK_PORTFOLIOS_BY_OWNER_ID[userId] || [];
        const found = userPortfolios.find(p => p.portfolioId === portfolioId);
        setPortfolio(found || null);
        
        // TODO: 실제로는 API 호출
        // fetchPortfolio(portfolioId).then(setPortfolio);
    }, [portfolioId]);

    const handleEdit = () => {
        setIsMenuOpen(false);
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        setIsMenuOpen(false);
        if (confirm('포트폴리오를 삭제하시겠습니까?')) {
        // TODO: API 호출
        console.log('포트폴리오 삭제:', portfolioId);
        navigate(-1); 
        }
    };

    const toggleVisibility = () => {
        if (!portfolio) return;
        
        const newVisibility = !portfolio.portfolioVisibility;
        setPortfolio({
            ...portfolio,
            portfolioVisibility: newVisibility
        });
        setIsMenuOpen(false);
        
        // TODO: API 호출
        // await updatePortfolioVisibility(pid, newVisibility);
    };

    const toggleImportant = () => {
        if (!portfolio) return;
        
        const newImportant = !portfolio.isImportant;
        setPortfolio({
            ...portfolio,
            isImportant: newImportant
        });
        setIsMenuOpen(false);
        
        // TODO: API 호출
        // await togglePortfolioImportant(pid);
    };

    const handleSave = (data: PortfolioDetail) => {
        console.log('저장할 데이터:', data);
        // TODO: API 호출
        setPortfolio(data);
    };

    if (!portfolio) {
        return (
            <PopUp
                type="error"
                title='일시적 오류로 인해\n포트폴리오 정보를 찾을 수 없습니다.'
                titleSecondary='잠시 후 다시 시도해주세요'
                isOpen={true}
                rightButtonText='확인'
            />
        );
    }

    return (
        <div className="min-h-dvh bg-white">
            <div className="max-w-screen-sm mx-auto">
                {/* 헤더 */}
                <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between h-[56px] px-[20px]">
                        <button
                        onClick={() => navigate(-1)}
                        className="p-[8px] -ml-[8px] active:bg-gray-100 rounded-full transition-colors"
                        >
                        <Icon name="mainBack" />
                        </button>

                        <h1 className="text-M-16 text-gray-900">포트폴리오</h1>

                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="p-[8px] -mr-[8px] active:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 1.75C0 1.28587 0.184374 0.840752 0.512563 0.512563C0.840752 0.184374 1.28587 0 1.75 0C2.21413 0 2.65925 0.184374 2.98744 0.512563C3.31563 0.840752 3.5 1.28587 3.5 1.75C3.5 2.21413 3.31563 2.65925 2.98744 2.98744C2.65925 3.31563 2.21413 3.5 1.75 3.5C1.28587 3.5 0.840752 3.31563 0.512563 2.98744C0.184374 2.65925 0 2.21413 0 1.75ZM0 8.75C0 8.28587 0.184374 7.84075 0.512563 7.51256C0.840752 7.18437 1.28587 7 1.75 7C2.21413 7 2.65925 7.18437 2.98744 7.51256C3.31563 7.84075 3.5 8.28587 3.5 8.75C3.5 9.21413 3.31563 9.65925 2.98744 9.98744C2.65925 10.3156 2.21413 10.5 1.75 10.5C1.28587 10.5 0.840752 10.3156 0.512563 9.98744C0.184374 9.65925 0 9.21413 0 8.75ZM0 15.75C0 15.2859 0.184374 14.8408 0.512563 14.5126C0.840752 14.1844 1.28587 14 1.75 14C2.21413 14 2.65925 14.1844 2.98744 14.5126C3.31563 14.8408 3.5 15.2859 3.5 15.75C3.5 16.2141 3.31563 16.6592 2.98744 16.9874C2.65925 17.3156 2.21413 17.5 1.75 17.5C1.28587 17.5 0.840752 17.3156 0.512563 16.9874C0.184374 16.6592 0 16.2141 0 15.75Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                </header>

                {/* 콘텐츠 */}
                <div className="">
                    {/* 작성자 정보 */}
                        <div className="px-[25px] py-[20px] flex items-center gap-[15px]">
                            <img
                                src={user.profileImg}
                                alt={user.name}
                                className="w-[40px] h-[40px] rounded-full object-cover"
                            />
                            <div className = "flex flex-col gap-[6px] flex-1">
                                <div className="text-b-18-hn text-gray-900">{user.name}</div>
                                <div className="text-r-14-hn text-gray-750">{user.major} {user.gradeNumber}학번</div>
                            </div>
                        </div>

                        <div className="px-[25px] pb-[40px] flex flex-col gap-[20px]">
                            {/* 제목 및 내용 */}
                            <div className="flex flex-col gap-[15px]">
                                <span className="text-sb-16-hn text-gray-900">{portfolio.title}</span>
                                <div className="text-r-14 text-gray-750 whitespace-pre-wrap break-keep">
                                    {portfolio.content}
                                </div>
                            </div>

                            {/* 프로젝트 정보 */}
                            <div className="flex flex-col gap-[7px]">
                                {/* 프로젝트 기간 */}
                                <div className="flex items-center gap-[10px]">
                                    <span className="text-m-14-hn text-gray-750 min-w-[77px]">프로젝트 기간</span>
                                    <span className="text-r-12-hn text-gray-650">
                                        {portfolio.startYear}.{String(portfolio.startMonth).padStart(2, '0')} - {portfolio.endYear}.{String(portfolio.endMonth).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* 프로젝트 역할 */}
                                <div className="flex items-center gap-[10px]">
                                    <span className="text-m-14-hn text-gray-750 min-w-[77px]">프로젝트 역할</span>
                                    <span className="text-r-12-hn text-gray-650">{portfolio.role}</span>
                                </div>

                                {/* 사용 기술 */}
                                <div className="flex items-center gap-[10px]">
                                    <span className="text-m-14-hn text-gray-750 min-w-[77px]">사용 기술</span>
                                    <span className="text-r-12-hn text-gray-650">{portfolio.skills}</span>
                                </div>
                            </div>
                        </div>

                {/* 대표이미지 */}
                <div className="flex flex-col gap-[3px]">
                    <div>
                        <img
                            src={typeof portfolio.portfolioThumbnail === 'string' ? portfolio.portfolioThumbnail : URL.createObjectURL(portfolio.portfolioThumbnail)}
                            alt="Portfolio image 0"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {portfolio.portfolioImage && portfolio.portfolioImage.length > 0 && (
                    <div className="flex flex-col gap-[3px]">
                        {portfolio.portfolioImage.map((image, index) => (
                            <div key={`${portfolioId}-img-${index}`} className="relative w-full flex items-center justify-center">
                                <img
                                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                    alt={`Portfolio image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                    
                        ))}
                    </div>
                )}
                </div>

                <div className="w-full px-[10px] py-[10px] flex flex-col gap-[8px]">
                    {/* 링크 목록 */}
                    {portfolio.portfolioLink && portfolio.portfolioLink.length > 0 && (
                        <div className="w-full flex flex-col gap-[8px]">
                        {portfolio.portfolioLink.map((link, index) => (
                            <a
                            key={`${portfolioId}-link-${index}`}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-[10px] p-[15px] bg-gray-100 rounded-[10px] text-r-14-hn text-primary"
                            >
                                <ModalIcon name='url' className='w-[20px] h-[20px]'/>
                                <span className="flex-1 truncate">{link}</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M13.3333 8.88889V13.3333C13.3333 13.687 13.1929 14.0261 12.9428 14.2761C12.6928 14.5262 12.3536 14.6667 12 14.6667H2.66667C2.31304 14.6667 1.97391 14.5262 1.72386 14.2761C1.47381 14.0261 1.33333 13.687 1.33333 13.3333V4C1.33333 3.64638 1.47381 3.30724 1.72386 3.05719C1.97391 2.80714 2.31304 2.66667 2.66667 2.66667H7.11111M10.6667 1.33333H14.6667M14.6667 1.33333V5.33333M14.6667 1.33333L6.66667 9.33333" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"/>
                                </svg>
                            </a>
                        ))}
                        </div>
                    )}

                    {/* PDF 파일 목록 */}
                    {portfolio.portfolioPdf && portfolio.portfolioPdf.length > 0 && (
                        <div className="w-full flex flex-col gap-[8px]">
                        {portfolio.portfolioPdf.map((pdf, index) => (
                            <a
                                key={`${portfolioId}-pdf-${index}`}
                                href={typeof pdf === 'string' ? pdf : URL.createObjectURL(pdf)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-[10px] p-[15px] bg-gray-100 rounded-[10px] text-r-14-hn text-gray-750"
                            >
                                <ModalIcon name='file' className='w-[20px] h-[20px]'/>
                                <span className="flex-1 truncate">
                                    {typeof pdf === 'string' ? 
                                    pdf.split('/').pop() || `파일 ${index + 1}.pdf` : pdf.name}
                                </span>
                            </a>
                        ))}
                        </div>
                    )}
                </div>

                {/* Problem & Solution */}
                {portfolio.problemSolution && (
                    <div className="px-[25px] pt-[40px]">
                    <h2 className="text-SB-16 text-gray-900 mb-[12px]">Problem & Solution</h2>
                    <div className="text-R-14 text-gray-650 leading-[1.6] whitespace-pre-wrap">
                        {portfolio.problemSolution}
                    </div>
                    </div>
                )}
                </div>
            </div>

            {/* 수정 모달 */}
            <PortfolioEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={portfolio}
                onSave={handleSave}
            />

            {/* 메뉴 BottomModal */}
            <BottomSheetModal
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                height="auto"
            >
                <div className="px-[25px] pb-[40px]">
                    {/* 프로젝트 수정 */}
                    <button
                        onClick={handleEdit}
                        className="w-full flex items-center gap-[15px] pl-[10px] py-[15px] border-b border-gray-200"
                    >
                        <ModalIcon name='edit'/>
                        <span className="text-m-16-hn text-gray-750">프로젝트 수정</span>
                    </button>

                    {/* 프로젝트 비공개 */}
                    <button
                        onClick={toggleVisibility}
                        className="w-full flex items-center pl-[10px] py-[15px] border-b border-gray-150"
                    >
                        {portfolio?.portfolioVisibility ? (
                            <div className="flex gap-[15px]">
                                <ModalIcon name='private'/>
                                <span className="text-m-16-hn text-gray-750">프로젝트 비공개</span>
                            </div>
                        ) : (
                            <div className="flex gap-[15px]">
                                <ModalIcon name='public'/>
                                <span className="text-m-16-hn text-gray-750">프로젝트 공개</span>
                            </div>
                        )}
                        
                    </button>

                    {/* 주요 프로젝트 지정 및 해제 */}
                    <button
                        onClick={toggleImportant}
                        className="w-full flex items-center gap-[15px] pl-[10px] py-[15px] border-b border-gray-150"
                    >
                        <ModalIcon name='favorite'/>
                        <span className="text-m-16-hn text-gray-750">{portfolio.isImportant ? "주요 프로젝트 지정 해제" : "주요 프로젝트로 지정"}</span>
                    </button>

                    {/* 삭제 */}
                    <button
                        onClick={handleDelete}
                        className="w-full flex items-center gap-[17px] pl-[12px] py-[15px]"
                    >
                        <ModalIcon name='delete' className='w-[20px] h-[20px]'/>
                        <span className="text-m-16-hn text-red">삭제</span>
                    </button>
                </div>
            </BottomSheetModal>
        </div>
    );
}