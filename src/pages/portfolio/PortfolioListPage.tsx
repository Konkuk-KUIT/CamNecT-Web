import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PortfolioEditModal from './components/PortfolioEditModal';
import PopUp from '../../components/Pop-up';
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { EditHeader } from "../../layouts/headers/EditHeader";
import { useAuthStore } from '../../store/useAuthStore';
import { getPortfolioList, togglePortfolioPublic } from '../../api/portfolioApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { PortfolioPreview } from '../../api-types/portfolioApiTypes';

type PortfolioListPageProps = {
    ownerId?: string | number;
    isMine?: boolean;
    basePath?: string;
};

export const PortfolioListPage = ({
    ownerId: ownerIdProp,
    isMine: isMineProp,
    basePath = "/me/portfolio",
}: PortfolioListPageProps) => {
    const authUser = useAuthStore(state => state.user);
    const meUserId = authUser?.id ? parseInt(authUser.id) : null;

    const [searchParams] = useSearchParams();
    const ownerIdParam = searchParams.get('ownerId');
    const portfolioUserId: number = Number(ownerIdProp ?? ownerIdParam ?? meUserId ?? 0);

    const isMineParam = searchParams.get('isMine');
    const isMine = isMineProp ?? (isMineParam ? isMineParam === 'true' : portfolioUserId === meUserId);

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localPortfolios, setLocalPortfolios] = useState<PortfolioPreview[]>([]);

    // 포트폴리오 목록 조회
    const { data, isLoading, isError } = useQuery({
        queryKey: ['portfolioList', portfolioUserId],
        queryFn: () => getPortfolioList(meUserId!, portfolioUserId),
        enabled: !!meUserId,
    });

    // API 데이터 → 로컬 상태 동기화
    useEffect(() => {
        if (data?.data.data) {
            setLocalPortfolios(data.data.data);
        }
    }, [data]);

    const visiblePortfolios = useMemo(() => {
        if (isMine) return localPortfolios;
        return localPortfolios.filter(p => p.isPublic);
    }, [isMine, localPortfolios]);

    const allPublic = localPortfolios.every(p => p.isPublic);

    const handleToggleAllPublic = async () => {
        const nextPublic = !allPublic;

        // 로컬 상태 즉시 업데이트
        setLocalPortfolios(prev => prev.map(p => ({ ...p, isPublic: nextPublic })));

        // 변경이 필요한 항목만 API 호출
        const toToggle = localPortfolios.filter(p => p.isPublic !== nextPublic);
        await Promise.all(toToggle.map(p => togglePortfolioPublic(meUserId!, p.portfolioId)));
    };

    const handlePortfolioClick = (portfolioId: number) => {
        if (basePath === "/me/portfolio") {
            navigate(`${basePath}/${portfolioId}?ownerId=${portfolioUserId}&isMine=${String(isMine)}`);
            return;
        }
        navigate(`${basePath}/${portfolioId}`);
    };

    const handleSavePortfolio = () => {
        // 저장 후 목록 새로고침
        queryClient.invalidateQueries({ queryKey: ['portfolioList', portfolioUserId] });
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <PopUp type="loading" isOpen={true} />;
    }

    if (isError) {
        return (
            <PopUp
                type="error"
                title='일시적 오류로 인해\n사용자 정보를 찾을 수 없습니다.'
                titleSecondary='잠시 후 다시 시도해주세요'
                isOpen={true}
                rightButtonText='확인'
                onClick={() => window.location.reload()}
            />
        );
    }

    return (
        <div className="min-h-dvh bg-white">
            <HeaderLayout
                headerSlot = {
                    <EditHeader
                        title="포트폴리오"
                    />
                }
            >
                <div className="max-w-screen-sm mx-auto">
                    {/* 콘텐츠 */}
                    <div className="h-full w-full">
                        {/* 전체 비공개 토글 */}
                        {isMine && (
                            <div className="flex items-center justify-between px-[25px] py-[15px] border-t border-b border-gray-150">
                                <div className="text-sb-14-hn text-gray-900">포트폴리오 전체 비공개</div>
                                <button
                                onClick={handleToggleAllPublic}
                                className={`relative w-[50px] h-[24px] rounded-full transition-colors ${
                                    allPublic  ? "bg-gray-300" : "bg-primary"
                                }`}
                                >
                                <div
                                    className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-transform ${
                                    allPublic  ? "translate-x-[2px]" : "translate-x-[28px]"
                                    }`}
                                />
                                </button>
                            </div>
                        )}

                        {/* 포트폴리오 그리드 */}
                        <div className="px-[25px] py-[20px] grid grid-cols-2 gap-[10px]">
                            {visiblePortfolios.map((portfolio) => (
                            <button
                                key={portfolio.portfolioId}
                                onClick={() => handlePortfolioClick(portfolio.portfolioId)}
                                className="h-[200px] flex flex-col items-start rounded-[10px] overflow-hidden border border-gray-150"
                            >
                                {/* 썸네일 */}
                                <div className="h-[128px] relative w-full bg-gray-200">
                                    {portfolio.thumbnailUrl ? (
                                        <img
                                            src={portfolio.thumbnailUrl}
                                            alt={portfolio.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full bg-gray-150"/>
                                    )}
                                
                                    {/* 중요 표시 */}
                                    {portfolio.isFavorite && (
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
                                    <div className="text-R-12-hn text-gray-650">{portfolio.title}</div> {/*TODO: updatedAt으로 수정 필요*/}
                                </div>
                            </button>
                            ))}

                            {/* 추가하기 버튼 */}
                            {isMine && (
                                <button
                                onClick={() => setIsModalOpen(true)}
                                className="relative flex flex-col items-center justify-center gap-[8px] w-full h-[200px] bg-gray-750 rounded-[12px] active:bg-gray-700 transition-colors"
                                >
                                    <svg viewBox="0 0 48 48" fill="none" className="w-[48px] h-[48px] block shrink-0">
                                        <path d="M24.5 8V39M40 23.5H9" stroke="#ECECEC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="text-sb-16-hn text-gray-150">포트폴리오 추가</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </HeaderLayout>

            {/* 포트폴리오 추가/수정 모달 */}
            {isMine && isModalOpen && (
                <PortfolioEditModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    userId={String(portfolioUserId)}
                    onSave={handleSavePortfolio}
                />
            )}
        </div>
    );
}
