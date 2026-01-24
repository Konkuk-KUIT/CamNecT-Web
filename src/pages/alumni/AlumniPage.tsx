import { useDeferredValue, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Category from '../../components/Category';
import CoffeeChatButton from '../Alumni/components/CoffeeChatButton';
import Icon from '../../components/Icon';
import MainLayout from '../../layouts/MainLayout';
import { alumniList } from '../Alumni/data';
import FilterHeader from '../../components/FilterHeader';
import FilterModal from '../../components/FilterModal';
import useCommunityFilters from '../../hooks/useCommunityFilters';

const AlumniSearchPage = () => {
  const navigate = useNavigate();
  // 검색 입력값과 지연된 검색값으로 필터링 부담을 줄입니다.
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  // 커뮤니티 필터 로직을 재사용해 동문 리스트를 필터링합니다.
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

  // 검색어와 필터 결과를 조합해 최종 리스트를 생성합니다.
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
      <div className='flex w-full flex-col bg-white [padding:clamp(16px,5cqw,20px)_clamp(18px,7cqw,25px)] [gap:clamp(14px,4cqw,20px)]'>
        {/* 검색 입력 영역 */}
        <div className='flex w-full items-center rounded-[30px] bg-[var(--ColorGray1,#ECECEC)] [padding:clamp(6px,2.2cqw,8px)_clamp(14px,5cqw,19px)] [gap:clamp(10px,3.2cqw,15px)]'>
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
            className='flex-1 bg-transparent outline-none placeholder:text-[#A1A1A1] text-r-16 text-[color: var(--ColorGray3, #646464)]'
          />
        </div>

        {/* 필터/정렬 컨트롤 영역 */}
        <div className='flex flex-wrap items-center [gap:clamp(9px,3cqw,13px)]'>
          <button
            type='button'
            className='inline-flex items-center gap-[3px] rounded-[20px] border border-[var(--ColorGray2,#A1A1A1)] px-[13px] py-[5px]'
          >
            <span className='font-[Pretendard] text-[clamp(12px,3.2cqw,14px)] font-medium leading-[140%] tracking-[-0.56px] text-[color:var(--ColorGray3,#646464)]'>
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

        <div className='flex flex-col gap-[5px]'>
          {visibleList.map((alumni) => (
            <Card
              key={alumni.id}
              width='100%'
              height='auto'
              className='flex min-h-[161px] cursor-pointer flex-col [padding:clamp(12px,4cqw,15px)] gap-[20px]'
              role='button'
              tabIndex={0}
              onClick={() => {
                // TODO: /alumni/:id 상세 라우터 연결 필요.
                navigate(`/alumni/${alumni.id}`);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  // TODO: /alumni/:id 상세 라우터 연결 필요.
                  navigate(`/alumni/${alumni.id}`);
                }
              }}
            >
              {/* 1그룹: 프로필/이름/학과/학번 + 더보기 아이콘 */}
              <section className='flex justify-between'>
                <div className='flex items-center'>
                  <div className='flex items-center gap-[13px]'>
                    {alumni.profileImage ? (
                      <img
                        src={alumni.profileImage}
                        alt={`${alumni.author.name} 프로필`}
                        className='h-[clamp(48px,14cqw,60px)] w-[clamp(48px,14cqw,60px)] shrink-0 rounded-full object-cover'
                      />
                    ) : (
                      <div
                        className='h-[clamp(48px,14cqw,60px)] w-[clamp(48px,14cqw,60px)] shrink-0 rounded-full bg-[#D5D5D5]'
                        aria-hidden
                      />
                    )}

                    <div className='flex min-w-0 flex-col gap-[3px]'>
                      <div className='text-sb-16-hn text-[color:var(--ColorBlack,#202023)]'>
                        {alumni.author.name}
                      </div>
                      <div className='text-r-14 text-[color:var(--ColorGray2,#A1A1A1)]'>
                        {alumni.author.major} {alumni.author.studentId}학번
                      </div>
                    </div>
                  </div>
                </div>
                <div className='py-[9px]'><Icon name='more' className='h-6 w-6' /></div> 
              </section>

              {/* 2그룹: 카테고리와 소개글 */}
              <div
                className='flex min-w-0 flex-col gap-[10px] pl-[7px]'
              >
                <div className='flex flex-wrap gap-[5px]'>
                  {alumni.categories.map((category) => (
                    <Category key={`${alumni.id}-${category}`} label={category} />
                  ))}
                </div>

                <p className='line-clamp-3 text-r-14 text-[color:var(--ColorGray3,#646464)] tracking-[-0.56px]'>
                  {alumni.intro}
                </p>
              </div>

              {/* 3그룹: 커피챗 요청 버튼 */}
              <CoffeeChatButton
                onClick={(event) => {
                  event.stopPropagation();
                  // TODO: 동문 리스트에서 커피챗 요청 모달/라우터 연결 필요.
                }}
                aria-label={`${alumni.author.name} 커피챗 요청하기`}
              />
            </Card>
          ))}
        </div>
      </div>

      {/* 필터 모달 */}
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
