import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PopUp from '../../../components/Pop-up';
import { HeaderLayout } from '../../../layouts/HeaderLayout';
import { EditHeader } from '../../../layouts/headers/EditHeader';
import { getAlumniPortfolioList } from '../../../api/alumni';
import { useAuthStore } from '../../../store/useAuthStore';
import FavoriteBadge from '../components/FavoriteBadge';

type AlumniPortfolioItem = {
  portfolioId: number;
  title: string;
  thumbnailUrl: string;
  isPublic: boolean;
  isFavorite: boolean;
};

export const AlumniPortfolioListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loginUserId = useAuthStore((state) => state.user?.id);
  const [items, setItems] = useState<AlumniPortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // URL의 alumni-{id} 형태를 숫자 id로 변환합니다.
  const portfolioUserId = useMemo(() => {
    if (!id) return undefined;
    const normalized = id.startsWith('alumni-') ? id.slice('alumni-'.length) : id;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : undefined;
  }, [id]);

  useEffect(() => {
    if (!portfolioUserId) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const parsedLoginUserId = loginUserId ? Number(loginUserId) : NaN;
    const loginUserIdValue = Number.isFinite(parsedLoginUserId) ? parsedLoginUserId : 0;

    let isActive = true;
    setIsLoading(true);
    setHasError(false);

    getAlumniPortfolioList({
      userId: loginUserIdValue,
      portfolioUserId,
    })
      .then((response) => {
        if (!isActive) return;
        setItems(response.data.data ?? []);
      })
      .catch((error) => {
        if (!isActive) return;
        console.error('Failed to fetch alumni portfolio list:', error);
        setHasError(true);
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [portfolioUserId, loginUserId]);

  const visibleItems = useMemo(
    () => items.filter((item) => item.isPublic),
    [items],
  );

  if (isLoading) {
    return <PopUp type="loading" isOpen={true} />;
  }

  if (hasError) {
    return (
      <PopUp
        type="error"
        title="일시적 오류로 인해\n포트폴리오 목록을 불러올 수 없습니다."
        titleSecondary="잠시 후 다시 시도해주세요"
        isOpen={true}
        rightButtonText="확인"
        onClick={() => navigate('/alumni', { replace: true })}
      />
    );
  }

  return (
    <div className="min-h-dvh bg-white">
      <HeaderLayout
        headerSlot={
          <EditHeader title="포트폴리오" />
        }
      >
        <div className="max-w-screen-sm mx-auto">
          <div className="px-[25px] py-[20px] grid grid-cols-2 gap-[10px]">
            {visibleItems.map((portfolio) => (
              <button
                key={portfolio.portfolioId}
                onClick={() => {
                  if (!id) return;
                  navigate(`/alumni/profile/${encodeURIComponent(id)}/portfolio/${portfolio.portfolioId}`);
                }}
                className="h-[200px] flex flex-col items-start rounded-[10px] overflow-hidden border border-gray-150"
              >
                <div className="h-[128px] relative w-full bg-gray-200">
                  {portfolio.thumbnailUrl ? (
                    <img
                      src={portfolio.thumbnailUrl}
                      alt={portfolio.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 text-R-12-hn">
                      No Image
                    </div>
                  )}

                  {portfolio.isFavorite && (
                    <div className="absolute top-0 right-0 p-[12px]">
                      <FavoriteBadge className="w-[24px] h-[24px]" />
                    </div>
                  )}
                </div>

                <div className="w-full p-[15px] flex flex-col gap-[3px] justify-center items-start">
                  <div className="text-left w-full text-m-16 text-gray-900 truncate">
                    {portfolio.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </HeaderLayout>
    </div>
  );
};
