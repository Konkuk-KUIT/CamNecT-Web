import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PopUp from '../../../components/Pop-up';
import { PortfolioDetailPage } from '../../portfolio/PortfolioDetailPage';
import type { PortfolioDetail } from '../../../types/portfolio/portfolioTypes';
import { getAlumniPortfolioDetail } from '../../../api/alumni';
import { useAuthStore } from '../../../store/useAuthStore';
import type {
  AlumniPortfolioAsset,
  AlumniPortfolioDetailItem,
  AlumniPortfolioDetailPayload,
} from '../../../api-types/alumniApiTypes';

const parseYearMonth = (value?: string) => {
  if (!value) {
    return { year: 0, month: 0 };
  }
  const [yearRaw, monthRaw] = value.split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  return {
    year: Number.isFinite(year) ? year : 0,
    month: Number.isFinite(month) ? month : 0,
  };
};

const mapAssets = (assets: AlumniPortfolioAsset[]) => {
  const images: string[] = [];
  const pdfs: string[] = [];
  const links: string[] = [];

  assets
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .forEach((asset) => {
      const url = asset.fileUrl;
      if (!url) return;
      const type = asset.type?.toLowerCase() ?? '';
      if (type.includes('image')) {
        images.push(url);
      } else if (type.includes('pdf')) {
        pdfs.push(url);
      } else if (type.includes('link') || type.includes('url')) {
        links.push(url);
      }
    });

  return { images, pdfs, links };
};

const mapPortfolioDetail = (
  portfolio: AlumniPortfolioDetailItem,
  assets: AlumniPortfolioAsset[]
): PortfolioDetail => {
  const { year: startYear, month: startMonth } = parseYearMonth(portfolio.startDate);
  const { year: endYear, month: endMonth } = parseYearMonth(portfolio.endDate);
  const { images, pdfs, links } = mapAssets(assets);

  return {
    id: String(portfolio.userId),
    portfolioId: String(portfolio.portfolioId),
    title: portfolio.title,
    portfolioThumbnail: portfolio.thumbnailUrl,
    updatedAt: portfolio.updatedAt,
    portfolioVisibility: portfolio.isPublic,
    isImportant: portfolio.isFavorite,
    content: portfolio.description,
    startYear,
    startMonth,
    endYear,
    endMonth,
    role: portfolio.assignedRole?.join(', ') ?? '',
    skills: portfolio.techStack?.join(', ') ?? '',
    ...(portfolio.review ? { problemSolution: portfolio.review } : {}),
    ...(images.length ? { portfolioImage: images } : {}),
    ...(pdfs.length ? { portfolioPdf: pdfs } : {}),
    ...(links.length ? { portfolioLink: links } : {}),
  };
};

export const AlumniPortfolioDetailPage = () => {
  const { id, portfolioId } = useParams();
  const navigate = useNavigate();
  const loginUserId = useAuthStore((state) => state.user?.id);
  const [portfolio, setPortfolio] = useState<PortfolioDetail | null>(null);
  const [isMine, setIsMine] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const portfolioUserId = useMemo(() => {
    if (!id) return undefined;
    const normalized = id.startsWith('alumni-') ? id.slice('alumni-'.length) : id;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : undefined;
  }, [id]);

  const portfolioIdValue = useMemo(() => {
    if (!portfolioId) return undefined;
    const parsed = Number(portfolioId);
    return Number.isFinite(parsed) ? parsed : undefined;
  }, [portfolioId]);

  useEffect(() => {
    if (!portfolioUserId || !portfolioIdValue) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const parsedLoginUserId = loginUserId ? Number(loginUserId) : NaN;
    const loginUserIdValue = Number.isFinite(parsedLoginUserId) ? parsedLoginUserId : 0;

    let isActive = true;
    setIsLoading(true);
    setHasError(false);

    getAlumniPortfolioDetail({
      userId: loginUserIdValue,
      portfolioUserId,
      portfolioId: portfolioIdValue,
    })
      .then((response) => {
        if (!isActive) return;
        const payload: AlumniPortfolioDetailPayload = response.data;
        setIsMine(Boolean(payload.isMine));
        setPortfolio(mapPortfolioDetail(payload.data.portfolio, payload.data.portfolioAssets ?? []));
      })
      .catch((error) => {
        if (!isActive) return;
        console.error('Failed to fetch alumni portfolio detail:', error);
        setHasError(true);
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [portfolioUserId, portfolioIdValue, loginUserId]);

  if (isLoading) {
    return <PopUp type="loading" isOpen={true} />;
  }

  if (hasError || !portfolio) {
    return (
      <PopUp
        type="error"
        title="일시적 오류로 인해\n포트폴리오 정보를 찾을 수 없습니다."
        titleSecondary="잠시 후 다시 시도해주세요"
        isOpen={true}
        rightButtonText="돌아가기"
        onClick={() => navigate('/alumni', { replace: true })}
      />
    );
  }

  return (
    <PortfolioDetailPage
      ownerId={portfolio.id}
      isMine={isMine}
      portfolioId={portfolio.portfolioId}
      initialPortfolio={portfolio}
    />
  );
};
