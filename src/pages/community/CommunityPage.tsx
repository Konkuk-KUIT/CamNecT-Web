import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { Tabs, type TabItem } from '../../components/Tabs';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import InfoTab from './tabs/InfoTab';
import MainTab from './tabs/MainTab';
import QuestionTab from './tabs/QuestionTab';
import { infoPosts, loggedInUserMajor, questionPosts } from '../../mock/community';

const tabItems: TabItem[] = [
  { id: 'all', label: '전체' },
  { id: 'info', label: '정보' },
  { id: 'question', label: '질문' },
];

export const CommunityPage = () => {
  const navigate = useNavigate();
  // 탭 선택 및 검색 UI 상태
  const [activeTab, setActiveTab] = useState<string>(() => {
    const stored = sessionStorage.getItem('communityActiveTab');
    return stored ?? tabItems[0].id;
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 검색어 정규화
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // 미리 가공된 파생 데이터 (동문 정보, 미답변 질문)을 메모이즈
  const alumniInfos = useMemo(
    () =>
      infoPosts.filter(
        (post) => post.author.isAlumni && post.author.major === loggedInUserMajor,
      ),
    [],
  );

  const unansweredQuestions = useMemo(
    () => questionPosts.filter((post) => post.answers === 0),
    [],
  );

  const filteredInfoPosts = useMemo(() => {
    if (!normalizedQuery) return infoPosts;
    return infoPosts.filter((post) => {
      const title = post.title.toLowerCase();
      const content = post.content.toLowerCase();
      const categories = post.categories.some((category) =>
        category.toLowerCase().includes(normalizedQuery),
      );
      return (
        title.includes(normalizedQuery) ||
        content.includes(normalizedQuery) ||
        categories
      );
    });
  }, [normalizedQuery]);

  const filteredQuestionPosts = useMemo(() => {
    if (!normalizedQuery) return questionPosts;
    return questionPosts.filter((post) => {
      const title = post.title.toLowerCase();
      const content = post.content.toLowerCase();
      const categories = post.categories.some((category) =>
        category.toLowerCase().includes(normalizedQuery),
      );
      return (
        title.includes(normalizedQuery) ||
        content.includes(normalizedQuery) ||
        categories
      );
    });
  }, [normalizedQuery]);

  useEffect(() => {
    sessionStorage.setItem('communityActiveTab', activeTab);
  }, [activeTab]);

  // 현재 탭에 맞는 화면 반환
  const renderTab = () => {
    if (activeTab === 'info') return <InfoTab posts={filteredInfoPosts} />;
    if (activeTab === 'question') return <QuestionTab posts={filteredQuestionPosts} />;
    return (
      <MainTab
        userMajor={loggedInUserMajor}
        alumniInfos={alumniInfos}
        unansweredQuestions={unansweredQuestions}
      />
    );
  };

  return (
    <HeaderLayout
      headerSlot={
        isSearchOpen && activeTab !== 'all' ? (
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
            title='커뮤니티'
            leftAction={{
              onClick: () => navigate('/home', { replace: true }),
              ariaLabel: '홈으로 이동',
            }}
            rightActions={
              activeTab === 'all'
                ? []
                : [
                  {
                    icon: 'search',
                    onClick: () => setIsSearchOpen(true),
                    ariaLabel: '검색 열기',
                  },
                ]
            }
          />
        )
      }
    >
      <div className='bg-white'>
        <Tabs tabs={tabItems} activeId={activeTab} onChange={setActiveTab} />
      </div>
      <div>{renderTab()}</div>
    </HeaderLayout>
  );
};
