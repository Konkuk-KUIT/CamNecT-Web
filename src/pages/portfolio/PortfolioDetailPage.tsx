import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortfolioEditModal from './component/PortfolioEditModal';
import type { PortfolioDetail } from '../../types/portfolio/portfolioTypes';
import { MOCK_PORTFOLIOS_BY_OWNER_ID } from '../../mock/portfolio';
import { MOCK_PROFILE_DETAIL_BY_UID, MOCK_SESSION } from "../../mock/mypages";
import BottomSheetModal from '../../components/BottomSheetModal/BottomSheetModal';
import ModalIcon from '../../components/BottomSheetModal/Icon'
import PopUp from '../../components/Pop-up';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';

export const PortfolioDetailPage = () => {
    const userId = MOCK_SESSION.meUid; // TODO: 실제로는 인증에서 가져오기
    const userDetail = MOCK_PROFILE_DETAIL_BY_UID[userId];
    const {user} = userDetail;
    const navigate = useNavigate();
    const { portfolioId } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [portfolio, setPortfolio] = useState<PortfolioDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    //URL에서 edit 파라미터 확인
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const shouldEdit = urlParams.get('edit') === 'true';
        
        if (shouldEdit && portfolio) {
            setIsModalOpen(true);
            // URL에서 edit 파라미터 제거
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, [portfolio]);

    // Mock 데이터에서 포트폴리오 가져오기
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // TODO: 실제로는 API 호출
                // const data = await fetchPortfolio(portfolioId);
                // setPortfolio(data);
                
                // Mock 데이터 시뮬레이션 (약간의 지연)
                await new Promise(resolve => setTimeout(resolve, 200));
                
                const userPortfolios = MOCK_PORTFOLIOS_BY_OWNER_ID[userId] || [];
                const found = userPortfolios.find(p => p.portfolioId === portfolioId);
                
                if (!found) {
                    // 데이터가 없는 경우 (404)
                    setPortfolio(null);
                } else {
                    setPortfolio(found);
                }
            } catch (err) {
                // 실제 에러 발생
                console.error('포트폴리오 로드 실패:', err);
                setError('포트폴리오를 불러오는 중 오류가 발생했습니다.');
                setPortfolio(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [portfolioId, userId]);

    const handleEdit = () => {
        setIsMenuOpen(false);
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        setIsMenuOpen(false);
        setShowDeleteWarning(true);
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
        // await updatePortfolioVisibility(portfolioId, newVisibility);
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
        // await togglePortfolioImportant(portfolioId);
    };

    const handleSave = (data: PortfolioDetail) => {
        console.log('저장할 데이터:', data);
        // TODO: API 호출
        setPortfolio(data);
    };

    // 로딩 중
    if (isLoading) {
        return (
            <PopUp
                type="loading"
                isOpen={true}
            />
        );
    }

    // 에러 발생
    if (error) {
        return (
            <PopUp
                type="error"
                title='일시적 오류로 인해\n포트폴리오 정보를 찾을 수 없습니다.'
                titleSecondary='잠시 후 다시 시도해주세요'
                isOpen={true}
                rightButtonText='확인'
                onClick={() => window.location.reload()}
            />
        );
    }

    // 데이터 없음
    if (!portfolio) {
        return (
            <PopUp
                type="error"
                title='포트폴리오를 찾을 수 없습니다.'
                titleSecondary='요청하신 포트폴리오가 존재하지 않습니다.'
                isOpen={true}
                rightButtonText='돌아가기'
                onClick={() => navigate(-1)}
            />
        );
    }

    return (
        <div className="min-h-dvh bg-white">
            <HeaderLayout
                headerSlot = {
                    <MainHeader
                        title={portfolio.title}
                        rightActions={[{icon: "menu", onClick: () => setIsMenuOpen(true), style: { width: 18, height: 18 },}]}
                    />
                }
            >
                <div className="max-w-screen-sm mx-auto">
                    {/* 콘텐츠 */}
                    <div className="border-t border-gray-150">
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
                                    <span className="flex-1 text-r-14-hn text-gray-750 truncate">
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
                    <div>
                        <div className="w-full h-[10px] mt-[40px] mb-[30px] bg-gray-300"/>
                        <div className="px-[25px] flex flex-col gap-[8px]">
                            <span className="text-m-14-hn text-gray-750">Problem & Solution</span>
                            <div className="text-r-12 text-gray-650 whitespace-pre-wrap break-keep">
                                {portfolio.problemSolution}
                            </div>
                        </div>
                    </div>
                    )}
                    </div>
                </div>
            </HeaderLayout>

            {/* 수정 모달 */}
            {isModalOpen && (
                <PortfolioEditModal
                    key={`edit-${portfolioId}`}
                    isOpen={true}
                    onClose={() => setIsModalOpen(false)}
                    userId={userId}
                    initialData={portfolio}
                    onSave={handleSave}
                />
            )}

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
                        className="w-full flex items-center gap-[15px] pl-[10px] py-[15px] border-b border-gray-150"
                        >
                            <ModalIcon name={portfolio?.portfolioVisibility ? "private" : "public"} />
                            <span className="text-m-16-hn text-gray-750">
                                {portfolio?.portfolioVisibility ? "프로젝트 비공개" : "프로젝트 공개"}
                            </span>
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
            {showDeleteWarning && (<PopUp
                type="warning"
                title='포트폴리오를 삭제하시겠습니까?'
                content='삭제할 시 복구할 수 없습니다.'
                isOpen={true}
                leftButtonText='삭제하기'
                onLeftClick={() => {
                    setShowDeleteWarning(false);
                    // TODO: API 호출
                    console.log('포트폴리오 삭제:', portfolioId);
                    navigate(-1); 
                }}
                onRightClick={() => setShowDeleteWarning(false)}
            />)}
        </div>
    );
}