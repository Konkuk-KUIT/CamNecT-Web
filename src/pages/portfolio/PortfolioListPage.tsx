import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import type { PortfolioDetail } from '../../types/portfolio/portfolioTypes';
import PortfolioEditModal from './component/PortfolioEditModal';
import { MOCK_PORTFOLIOS_BY_OWNER_ID } from '../../mock/portfolio';
import { MOCK_SESSION } from "../../mock/mypages";



export const  PortfolioListPage = () => {
    const userId = MOCK_SESSION.meUid; // TODO: 실제로는 인증에서 가져오기
    const navigate = useNavigate();
    const [showPublic, setShowPublic] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [portfolios, setPortfolios] = useState<PortfolioDetail[]>(
        MOCK_PORTFOLIOS_BY_OWNER_ID[userId] || []
    );

    const handlePortfolioClick = (portfolioId: string) => {
        navigate(`/me/portfolio/${portfolioId}`);
    };

    const handleAddPortfolio = () => {
        setIsModalOpen(true);
    };

    const handleSavePortfolio = (data: PortfolioDetail) => {
        console.log('저장할 데이터:', data);
        
        // 새 포트폴리오인 경우 추가
        if (!data.portfolioId || !portfolios.find(p => p.portfolioId === data.portfolioId)) {
        const newPortfolio: PortfolioDetail = {
            ...data,
            portfolioId: `pf_${userId}_${Date.now()}`,
            id: userId,
            updatedAt: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
        };
        setPortfolios([...portfolios, newPortfolio]);
        } else {
        // 기존 포트폴리오 수정
        setPortfolios(portfolios.map(p => 
            p.portfolioId === data.portfolioId ? data : p
        ));
        }
        
        // TODO: API 호출
        // await createPortfolio(data) or updatePortfolio(data)
    };

    const togglePrivacy = () => {
        const newPrivacyState = !showPublic;
        setShowPublic(newPrivacyState);
        
        // 전체 포트폴리오 비공개 설정 업데이트
        setPortfolios(portfolios.map(p => ({
        ...p,
        portfolioVisibility: !newPrivacyState
        })));
        
        // TODO: API 호출
        // await updateAllPortfoliosPrivacy(!newPrivacyState)
    };

    return (
        <div className="min-h-dvh bg-white">
            <div className="max-w-screen-sm mx-auto">
                {/* 헤더 */}
                <header className="sticky top-0 z-20 bg-white">
                    <div className="flex items-center justify-between h-[56px] px-[20px]">
                        <button
                        onClick={() => navigate(-1)}
                        className="p-[8px] -ml-[8px] active:bg-gray-100 rounded-full transition-colors"
                        >
                        <Icon name="cancel" />
                        </button>

                        <h1 className="text-M-16 text-gray-900">포트폴리오</h1>

                        <div className="w-[40px]" /> {/* 중앙 정렬용 */}
                    </div>
                </header>

                {/* 콘텐츠 */}
                <div className="">
                    {/* 전체 비공개 토글 */}
                    <div className="flex items-center justify-between px-[25px] py-[15px] border-t border-b border-gray-150">
                        <div className="text-sb-14-hn text-gray-900">포트폴리오 전체 비공개</div>
                        <button
                        onClick={togglePrivacy}
                        className={`relative w-[50px] h-[24px] rounded-full transition-colors ${
                            showPublic ? "bg-gray-300" : "bg-primary"
                        }`}
                        >
                        <div
                            className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-transform ${
                            showPublic ? "translate-x-[2px]" : "translate-x-[28px]"
                            }`}
                        />
                        </button>
                    </div>

                    {/* 포트폴리오 그리드 */}
                    <div className="px-[25px] py-[20px] grid grid-cols-2 gap-[10px]">
                        {portfolios.map((portfolio) => (
                        <button
                            key={portfolio.portfolioId}
                            onClick={() => handlePortfolioClick(portfolio.portfolioId)}
                            className="h-[200px] flex flex-col items-start rounded-[10px] overflow-hidden border border-gray-150"
                        >
                            {/* 썸네일 */}
                            <div className="h-[128px] relative w-full bg-gray-200">
                                {portfolio.portfolioThumbnail ? (
                                    <img
                                    src={typeof portfolio.portfolioThumbnail === 'string' ? portfolio.portfolioThumbnail : URL.createObjectURL(portfolio.portfolioThumbnail)}
                                    alt={portfolio.title}
                                    className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full text-gray-400 text-R-12-hn">
                                    No Image
                                    </div>
                                )}
                            
                                {/* 중요 표시 */}
                                {portfolio.isImportant && (
                                <svg viewBox="0 0 24 24" className="absolute top-[10px] right-[10px] z-10 h-[20px] w-[20px] fill-primary drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]">
                                    <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21597L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21597L10.788 3.20997Z"
                                    />
                                </svg>
                                )}
                            </div>

                            {/* 제목 및 날짜 */}
                            <div className="w-full p-[15px] flex flex-col gap-[3px] justify-center items-start">
                                <div className="text-left w-full text-m-16 text-gray-900 truncate">{portfolio.title}</div>
                                <div className="text-R-12-hn text-gray-650">{portfolio.updatedAt}</div>
                            </div>
                        </button>
                        ))}

                        {/* 추가하기 버튼 */}
                        <button
                        onClick={handleAddPortfolio}
                        className="relative flex flex-col items-center justify-center gap-[8px] w-full h-[200px] bg-gray-750 rounded-[12px] active:bg-gray-700 transition-colors"
                        >
                            <svg viewBox="0 0 48 48" fill="none" className="w-[48px] h-[48px] block shrink-0">
                                <path d="M24.5 8V39M40 23.5H9" stroke="#ECECEC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-sb-16-hn text-gray-150">포트폴리오 추가</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 포트폴리오 추가/수정 모달 */}
            <PortfolioEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSavePortfolio}
            />
        </div>
    );
}