import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import { Tabs, type TabItem } from '../../components/Tabs';
import { FullLayout } from '../../layouts/FullLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import { getActivityPosts } from '../../mock/activityCommunity';
import ClubTab from './tabs/ClubTab';
import ExternalTab from './tabs/ExternalTab';
import JobTab from './tabs/JobTab';
import StudyTab from './tabs/StudyTab';
import type { ActivityPost, ActivityPostTab } from '../../types/activityPost';

const tabItems: TabItem[] = [
  { id: 'club', label: '동아리' },
  { id: 'study', label: '스터디' },
  { id: 'external', label: '대외활동' },
  { id: 'job', label: '취업정보' },
];

const filterByQuery = (posts: ActivityPost[], query: string) => {
  if (!query) return posts;
  return posts.filter((post) => {
    const title = post.title.toLowerCase();
    const content = post.content.toLowerCase();
    const categories = post.categories.some((category) =>
      category.toLowerCase().includes(query),
    );
    return title.includes(query) || content.includes(query) || categories;
  });
};

export const ActivityPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<ActivityPostTab>(() => {
    const queryTab = searchParams.get('tab') as ActivityPostTab | null;
    if (queryTab && ['club', 'study', 'external', 'job'].includes(queryTab)) {
      return queryTab;
    }
    const stored = sessionStorage.getItem('activityActiveTab') as ActivityPostTab | null;
    return stored ?? 'club';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const [posts, setPosts] = useState<ActivityPost[]>(() => getActivityPosts());

  useEffect(() => {
    setPosts(getActivityPosts());
  }, []);

  const postsByTab = useMemo(() => {
    return posts.reduce<Record<ActivityPostTab, ActivityPost[]>>(
      (acc, post) => {
        acc[post.tab].push(post);
        return acc;
      },
      {
        club: [],
        study: [],
        external: [],
        job: [],
      },
    );
  }, [posts]);

  const filteredClubPosts = useMemo(
    () => filterByQuery(postsByTab.club, normalizedQuery),
    [postsByTab.club, normalizedQuery],
  );
  const filteredStudyPosts = useMemo(
    () => filterByQuery(postsByTab.study, normalizedQuery),
    [postsByTab.study, normalizedQuery],
  );
  const filteredExternalPosts = useMemo(
    () => filterByQuery(postsByTab.external, normalizedQuery),
    [postsByTab.external, normalizedQuery],
  );
  const filteredJobPosts = useMemo(
    () => filterByQuery(postsByTab.job, normalizedQuery),
    [postsByTab.job, normalizedQuery],
  );

  useEffect(() => {
    const queryTab = searchParams.get('tab') as ActivityPostTab | null;
    if (queryTab && ['club', 'study', 'external', 'job'].includes(queryTab)) {
      setActiveTab(queryTab);
      return;
    }
    sessionStorage.setItem('activityActiveTab', activeTab);
  }, [activeTab, searchParams]);

  const renderTab = () => {
    if (activeTab === 'club') return <ClubTab posts={filteredClubPosts} />;
    if (activeTab === 'study') return <StudyTab posts={filteredStudyPosts} />;
    if (activeTab === 'external') return <ExternalTab posts={filteredExternalPosts} />;
    return <JobTab posts={filteredJobPosts} />;
  };

  return (
    <FullLayout
      headerSlot={
        isSearchOpen ? (
          <div className='bg-white'>
            <div className='px-[25px]'>
              <div className='mx-auto flex w-full max-w-[720px] items-center gap-[15px] py-[10px]'>
                <button
                  type='button'
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                  aria-label='검색 닫기'
                >
                  <Icon name='search' className='h-[28px] w-[28px]' />
                </button>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder='제목, 내용, 태그, 검색'
                  className='flex-1 bg-transparent text-r-16 text-[var(--ColorBlack,#202023)] placeholder:text-[var(--ColorGray2,#A1A1A1)] focus:outline-none'
                />
              </div>
            </div>
          </div>
        ) : (
          <MainHeader
            title='대외활동'
            leftIcon='empty'
            rightActions={[
              {
                icon: 'search',
                onClick: () => setIsSearchOpen(true),
                ariaLabel: '검색 열기',
              },
            ]}
          />
        )
      }
    >
      <div className='bg-white'>
        <Tabs tabs={tabItems} activeId={activeTab} onChange={(id) => setActiveTab(id as ActivityPostTab)} />
      </div>
      <div>{renderTab()}</div>
    </FullLayout>
  );
};
