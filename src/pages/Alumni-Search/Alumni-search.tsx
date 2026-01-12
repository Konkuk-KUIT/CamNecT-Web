import { useDeferredValue, useMemo, useState } from 'react';
import Card from '../../components/Card';
import Category from '../../components/Category';
import MainLayout from '../../layouts/MainLayout';
import FilterHeader from '../Community/components/FilterHeader';
import FilterModal from '../Community/components/FilterModal';
import useCommunityFilters from '../Community/hooks/useCommunityFilters';

type AlumniProfile = {
  id: string;
  author: {
    name: string;
    major: string;
    studentId: string;
  };
  profileImage?: string;
  categories: string[];
  intro: string;
};

const profilePlaceholder =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><rect width='60' height='60' fill='%23D5D5D5'/></svg>";

const alumniList: AlumniProfile[] = [
  {
    id: 'alumni-1',
    author: { name: '김아린', major: '컴퓨터공학부', studentId: '18' },
    profileImage: profilePlaceholder,
    categories: ['백엔드', '커리어', '면접'],
    intro: '대기업 백엔드 엔지니어로 근무 중입니다. 이력서/면접 준비와 커리어 방향 고민 상담 가능합니다.',
  },
  {
    id: 'alumni-2',
    author: { name: '박지훈', major: '경영학부', studentId: '16' },
    categories: ['마케팅', '브랜딩', '포트폴리오'],
    intro: '브랜드 마케팅 실무 경험을 바탕으로 포트폴리오 피드백과 프로젝트 기획 조언 드립니다.',
  },
  {
    id: 'alumni-3',
    author: { name: '이서연', major: '디자인학부', studentId: '17' },
    profileImage: profilePlaceholder,
    categories: ['UI/UX', '포트폴리오', '디자인'],
    intro: '스타트업 UI/UX 디자이너입니다. 디자인 툴 팁과 포트폴리오 구조 피드백 가능해요.',
  },
  {
    id: 'alumni-4',
    author: { name: '정민호', major: '미디어디자인학부', studentId: '15' },
    categories: ['영상', '콘텐츠', '기획'],
    intro: '콘텐츠 기획 및 영상 제작 실무를 경험했습니다. 취업 준비와 포트폴리오 개선을 도와드릴게요.',
  },
];

const AlumniSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const {
    activeFilters,
    filteredPosts,
    isFilterOpen,
    activeTab,
    setActiveTab,
    openFilterModal,
    handleCancel,
    handleApply,
    handleRemoveFilter,
    draftMajor,
    draftInterests,
    toggleDraftMajor,
    toggleDraftInterest,
    hasDraftSelection,
  } = useCommunityFilters(alumniList);

  const visibleList = useMemo(() => {
    const keyword = deferredSearchTerm.trim();
    if (!keyword) return filteredPosts;
    return filteredPosts.filter((alumni) => {
      const nameMatch = alumni.author.name.includes(keyword);
      const tagMatch = alumni.categories.some((category) => category.includes(keyword));
      return nameMatch || tagMatch;
    });
  }, [deferredSearchTerm, filteredPosts]);

  return (
    <MainLayout title='동문 탐색'>
      <div
        className='flex w-full flex-col bg-white'
        style={{
          padding: 'clamp(16px, 5cqw, 20px) clamp(18px, 7cqw, 25px)',
          gap: 'clamp(14px, 4cqw, 20px)',
        }}
      >
        <div
          className='flex w-full items-center'
          style={{
            padding: 'clamp(6px, 2.2cqw, 8px) clamp(14px, 5cqw, 19px)',
            gap: 'clamp(10px, 3.2cqw, 15px)',
            borderRadius: '30px',
            background: 'var(--ColorGray1, #ECECEC)',
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            aria-hidden
          >
            <path
              d='M18.7508 18.7508L13.5538 13.5538M13.5538 13.5538C14.9604 12.1472 15.7506 10.2395 15.7506 8.25028C15.7506 6.26108 14.9604 4.35336 13.5538 2.94678C12.1472 1.54021 10.2395 0.75 8.25028 0.75C6.26108 0.75 4.35336 1.54021 2.94678 2.94678C1.54021 4.35336 0.75 6.26108 0.75 8.25028C0.75 10.2395 1.54021 12.1472 2.94678 13.5538C4.35336 14.9604 6.26108 15.7506 8.25028 15.7506C10.2395 15.7506 12.1472 14.9604 13.5538 13.5538Z'
              stroke='#646464'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <input
            type='text'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder='동문 이름, 태그로 검색'
            className='flex-1 bg-transparent outline-none placeholder:text-[#A1A1A1]'
            style={{
              color: 'var(--ColorBlack, #202023)',
              fontFamily: 'Pretendard',
              fontSize: 'clamp(14px, 4cqw, 16px)',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '140%',
              letterSpacing: '-0.64px',
            }}
          />
        </div>

        <div className='flex flex-wrap items-center' style={{ gap: 'clamp(9px, 3cqw, 13px)' }}>
          <button
            type='button'
            className='inline-flex items-center'
            style={{
              padding: '5px 13px',
              gap: '3px',
              borderRadius: '20px',
              border: '1px solid var(--ColorGray2, #A1A1A1)',
            }}
          >
            <span
              style={{
                color: 'var(--ColorGray3, #646464)',
                fontFamily: 'Pretendard',
                fontSize: 'clamp(12px, 3.2cqw, 14px)',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '140%',
                letterSpacing: '-0.56px',
              }}
            >
              추천순
            </span>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden
            >
              <path
                d='M6 8L10 12L14 8'
                stroke='#646464'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          <FilterHeader
            activeFilters={activeFilters}
            onOpenFilter={openFilterModal}
            onRemoveFilter={handleRemoveFilter}
          />
        </div>

        <div className='flex flex-col' style={{ gap: '5px' }}>
          {visibleList.map((alumni) => (
            <Card
              key={alumni.id}
              width='100%'
              height='auto'
              className='flex items-start'
              style={{
                minHeight: '161px',
                padding: 'clamp(12px, 4cqw, 15px)',
                gap: 'clamp(14px, 5cqw, 20px)',
              }}
            >
              {alumni.profileImage ? (
                <img
                  src={alumni.profileImage}
                  alt={`${alumni.author.name} 프로필`}
                  className='shrink-0 rounded-full object-cover'
                  style={{
                    width: 'clamp(48px, 14cqw, 60px)',
                    height: 'clamp(48px, 14cqw, 60px)',
                  }}
                />
              ) : (
                <div
                  className='shrink-0 rounded-full'
                  style={{
                    width: 'clamp(48px, 14cqw, 60px)',
                    height: 'clamp(48px, 14cqw, 60px)',
                    background: '#D5D5D5',
                  }}
                  aria-hidden
                />
              )}

              <div className='flex min-w-0 flex-1 flex-col' style={{ gap: 'clamp(8px, 3cqw, 10px)' }}>
                <div className='flex min-w-0 flex-col' style={{ gap: '6px' }}>
                  <div
                    className='text-gray-900'
                    style={{
                      fontSize: 'clamp(14px, 4cqw, 16px)',
                      fontWeight: 600,
                      lineHeight: '140%',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {alumni.author.name}
                  </div>
                  <div
                    className='text-gray-750'
                    style={{
                      fontSize: 'clamp(11px, 3.2cqw, 12px)',
                      fontWeight: 400,
                      lineHeight: '140%',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {alumni.author.major} {alumni.author.studentId}학번
                  </div>
                  <div className='flex flex-wrap' style={{ gap: '5px' }}>
                    {alumni.categories.map((category) => (
                      <Category key={`${alumni.id}-${category}`} label={category} />
                    ))}
                  </div>
                </div>

                <p
                  className='line-clamp-3 text-gray-750'
                  style={{
                    fontSize: 'clamp(11px, 3.2cqw, 12px)',
                    fontWeight: 400,
                    lineHeight: '140%',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {alumni.intro}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        draftMajor={draftMajor}
        draftInterests={draftInterests}
        onToggleMajor={toggleDraftMajor}
        onToggleInterest={toggleDraftInterest}
        hasDraftSelection={hasDraftSelection}
        onCancel={handleCancel}
        onApply={handleApply}
      />
    </MainLayout>
  );
};

export default AlumniSearchPage;
