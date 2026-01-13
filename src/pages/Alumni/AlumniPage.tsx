import { useDeferredValue, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Category from '../../components/Category';
import MainLayout from '../../layouts/MainLayout';
import { alumniList } from './data';
import FilterHeader from '../community/components/FilterHeader';
import FilterModal from '../community/components/FilterModal';
import useCommunityFilters from '../community/hooks/useCommunityFilters';

const AlumniSearchPage = () => {
  const navigate = useNavigate();
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
              className='flex items-start cursor-pointer'
              style={{
                minHeight: '161px',
                padding: 'clamp(12px, 4cqw, 15px)',
                gap: 'clamp(14px, 5cqw, 20px)',
              }}
              role='button'
              tabIndex={0}
              onClick={() => navigate(`/alumni/${alumni.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  navigate(`/alumni/${alumni.id}`);
                }
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
