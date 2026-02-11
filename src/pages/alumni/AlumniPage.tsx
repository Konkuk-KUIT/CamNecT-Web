import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Category from '../../components/Category';
import CoffeeChatButton from './components/CoffeeChatButton';
import Icon from '../../components/Icon';
import {FullLayout} from '../../layouts/FullLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import FilterHeader from '../../components/FilterHeader';
import TagsFilterModal from '../../components/TagsFilterModal';
import { MOCK_ALL_TAGS, TAG_CATEGORIES } from '../../mock/tags';
import { getAlumniList } from '../../api/alumni';
import { mapAlumniApiListToProfiles } from '../../utils/alumniMapper';
import { mapTagNamesToIds } from '../../utils/tagMapper';
import PopUp from '../../components/Pop-up';

export const AlumniSearchPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [alumniItems, setAlumniItems] = useState<ReturnType<typeof mapAlumniApiListToProfiles> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const trimmedName = searchTerm.trim();
    let isActive = true;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timer = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        const response = await getAlumniList({
          name: trimmedName || undefined,
          tags: mapTagNamesToIds(selectedTags),
          signal: controller.signal,
        });
        if (isActive) {
          setAlumniItems(mapAlumniApiListToProfiles(response.data));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Failed to fetch alumni list:', error);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      isActive = false;
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [searchTerm, selectedTags]);

  // 선택된 태그만 만족하는 동문만 추립니다.
  const filteredList = useMemo(() => {
    if (!alumniItems) return [];
    if (selectedTags.length === 0) return alumniItems;
    return alumniItems.filter((alumni) =>
      selectedTags.every((tag) => alumni.categories.includes(tag)),
    );
  }, [selectedTags, alumniItems]);

  const visibleList = filteredList;


  return (
    <FullLayout 
      headerSlot={<MainHeader 
        title='동문 찾기'
        leftIcon='empty'
         />}
    >
      {/* 검색/필터/카드 리스트 영역 */}
      <div
        className='flex w-full flex-col bg-white [padding:clamp(16px,5cqw,20px)_clamp(18px,7cqw,25px)] [gap:clamp(14px,4cqw,20px)]'
        style={
          {
            '--bottom-sheet-safe-padding': 'calc(50px + env(safe-area-inset-bottom))',
          } as React.CSSProperties
        }
      >
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
        <div className='flex w-full flex-wrap items-center justify-between [gap:clamp(9px,3cqw,13px)]'>
          <FilterHeader
            activeFilters={selectedTags}
            onOpenFilter={() => setIsFilterOpen(true)}
            onRemoveFilter={(tag) =>
              setSelectedTags((prev) => prev.filter((item) => item !== tag))
            }
          />
        </div>

        {/* 동문 카드 리스트 */}
        <div className='flex flex-col gap-[5px]'>
          {visibleList.map((alumni) => (
            <div
              key={alumni.id}
              className='flex min-h-[161px] flex-col gap-[20px] bg-white border border-gray-150 rounded-[12px] opacity-100 [padding:clamp(12px,4cqw,15px)]'
            >
              {/* 카드 본문은 상세 페이지로 이동하는 링크 */}
              <Link to={`/alumni/profile/${alumni.id}`} className='flex flex-col gap-[20px]'>
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
                    {alumni.categories
                      .filter((category): category is string => Boolean(category))
                      .map((category) => (
                        <Category key={`${alumni.id}-${category}`} label={category} />
                      ))}
                  </div>

                  <p className='line-clamp-3 whitespace-pre-line text-r-14 text-[color:var(--ColorGray3,#646464)] tracking-[-0.56px]'>
                    {alumni.intro}
                  </p>
                </div>
              </Link>

              {/* 3그룹: 커피챗 요청 버튼 */}
              {alumni.privacy.openToCoffeeChat && (
                <CoffeeChatButton
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(`/alumni/profile/${alumni.id}?coffeeChat=1`);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      navigate(`/alumni/profile/${alumni.id}?coffeeChat=1`);
                    }
                  }}
                  aria-label={`${alumni.author.name} 커피챗 요청하기`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 필터 모달 */}
      <TagsFilterModal
        isOpen={isFilterOpen}
        tags={selectedTags}
        onClose={() => setIsFilterOpen(false)}
        onSave={(next) => {
          setSelectedTags(next);
          setIsFilterOpen(false);
        }}
        categories={TAG_CATEGORIES}
        allTags={MOCK_ALL_TAGS}
      />
      <PopUp isOpen={isLoading} type="loading" />
    </FullLayout>
  );
};
