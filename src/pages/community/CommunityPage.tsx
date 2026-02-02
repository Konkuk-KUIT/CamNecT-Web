import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { Tabs, type TabItem } from '../../components/Tabs';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import InfoTab from './tabs/InfoTab';
import MainTab from './tabs/MainTab';
import QuestionTab from './tabs/QuestionTab';
import { loggedInUserMajor } from '../../mock/community';
import { getCommunityPosts } from '../../api/community';
import type { CommunityPostItem, Tab } from '../../api-types/communityApiTypes';
import type { InfoPost, QuestionPost } from '../../types/community';

const tabItems: TabItem[] = [
  { id: 'all', label: '전체' },
  { id: 'info', label: '정보' },
  { id: 'question', label: '질문' },
];

type CommunityListState = {
  items: CommunityPostItem[];
  nextCursorId: number | null;
  nextCursorValue: number | null;
  hasNext: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
};

const DEFAULT_PAGE_SIZE = 20;

const createInitialState = (): CommunityListState => ({
  items: [],
  nextCursorId: null,
  nextCursorValue: null,
  hasNext: false,
  isLoading: false,
  isLoadingMore: false,
  error: null,
});

const mapToInfoPost = (post: CommunityPostItem, major: string): InfoPost => ({
  id: String(post.postId),
  author: {
    id: 'unknown',
    name: '익명',
    major,
    studentId: '',
    isAlumni: true,
  },
  categories: post.tags,
  title: post.title,
  content: post.preview,
  likes: post.likeCount,
  saveCount: post.bookmarkCount,
  comments: post.commentCount,
  createdAt: post.createdAt,
});

const mapToQuestionPost = (post: CommunityPostItem, major: string): QuestionPost => ({
  id: String(post.postId),
  author: {
    id: 'unknown',
    name: '익명',
    major,
    studentId: '',
  },
  categories: post.tags,
  title: post.title,
  content: post.preview,
  likes: post.likeCount,
  saveCount: post.bookmarkCount,
  answers: post.answerCount,
  isAdopted: post.accepted,
  createdAt: post.createdAt,
  accessStatus: 'GRANTED',
  requiredPoints: 0,
  myPoints: 0,
});

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
  const normalizedQuery = searchQuery.trim();

  const [infoState, setInfoState] = useState<CommunityListState>(() =>
    createInitialState(),
  );
  const [questionState, setQuestionState] = useState<CommunityListState>(() =>
    createInitialState(),
  );
  const requestSeq = useRef({ INFO: 0, QUESTION: 0 });
  const lastQueryRef = useRef({ INFO: '', QUESTION: '' });
  const infoStateRef = useRef(infoState);
  const questionStateRef = useRef(questionState);

  useEffect(() => {
    infoStateRef.current = infoState;
  }, [infoState]);

  useEffect(() => {
    questionStateRef.current = questionState;
  }, [questionState]);

  const setTabState = useCallback(
    (
      tab: Tab,
      updater: (previous: CommunityListState) => CommunityListState,
    ) => {
      if (tab === 'INFO') {
        setInfoState(updater);
      }
      if (tab === 'QUESTION') {
        setQuestionState(updater);
      }
    },
    [],
  );

  const getTabState = useCallback(
    (tab: Tab) => (tab === 'INFO' ? infoStateRef.current : questionStateRef.current),
    [],
  );

  const fetchCommunityPosts = useCallback(
    async (
      tab: Tab,
      options: { append?: boolean; keyword?: string } = {},
    ) => {
      if (tab === 'ALL') return;

      const isAppend = options.append ?? false;
      const keyword = options.keyword ?? undefined;
      const state = getTabState(tab);

      if (isAppend && (!state.hasNext || state.isLoadingMore || state.isLoading)) {
        return;
      }

      if (!isAppend) {
        lastQueryRef.current[tab] = keyword ?? '';
      }

      const requestId = ++requestSeq.current[tab];

      setTabState(tab, (previous) => ({
        ...previous,
        isLoading: !isAppend,
        isLoadingMore: isAppend,
        error: null,
        items: isAppend ? previous.items : [],
      }));

      try {
        const response = await getCommunityPosts({
          tab,
          keyword,
          size: DEFAULT_PAGE_SIZE,
          cursorId: isAppend ? state.nextCursorId ?? undefined : undefined,
          cursorValue: isAppend ? state.nextCursorValue ?? undefined : undefined,
        });

        if (requestId !== requestSeq.current[tab]) return;

        const page = response.data;

        setTabState(tab, (previous) => ({
          items: isAppend ? [...previous.items, ...page.items] : page.items,
          nextCursorId: page.nextCursorId,
          nextCursorValue: page.nextCursorValue,
          hasNext: page.hasNext,
          isLoading: false,
          isLoadingMore: false,
          error: null,
        }));
      } catch (error) {
        if (requestId !== requestSeq.current[tab]) return;
        setTabState(tab, (previous) => ({
          ...previous,
          isLoading: false,
          isLoadingMore: false,
          error: '커뮤니티 글을 불러오지 못했어요.',
        }));
      }
    },
    [getTabState, setTabState],
  );

  const infoPostsFromApi = useMemo(
    () => infoState.items.map((post) => mapToInfoPost(post, loggedInUserMajor)),
    [infoState.items],
  );
  const questionPostsFromApi = useMemo(
    () =>
      questionState.items.map((post) => mapToQuestionPost(post, loggedInUserMajor)),
    [questionState.items],
  );

  // 미리 가공된 파생 데이터 (동문 정보, 미답변 질문)을 메모이즈
  const alumniInfos = useMemo(
    () =>
      infoPostsFromApi.filter(
        (post) => post.author.isAlumni && post.author.major === loggedInUserMajor,
      ),
    [infoPostsFromApi],
  );

  const unansweredQuestions = useMemo(
    () => questionPostsFromApi.filter((post) => post.answers === 0),
    [questionPostsFromApi],
  );

  useEffect(() => {
    sessionStorage.setItem('communityActiveTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'info') {
      const state = getTabState('INFO');
      const isNewQuery = lastQueryRef.current.INFO !== normalizedQuery;
      if (isNewQuery || (!state.isLoading && state.items.length === 0 && !state.error)) {
        fetchCommunityPosts('INFO', { keyword: normalizedQuery });
      }
    }
    if (activeTab === 'question') {
      const state = getTabState('QUESTION');
      const isNewQuery = lastQueryRef.current.QUESTION !== normalizedQuery;
      if (isNewQuery || (!state.isLoading && state.items.length === 0 && !state.error)) {
        fetchCommunityPosts('QUESTION', { keyword: normalizedQuery });
      }
    }
    if (activeTab === 'all') {
      const infoStateCurrent = infoStateRef.current;
      const questionStateCurrent = questionStateRef.current;
      if (
        !infoStateCurrent.isLoading &&
        infoStateCurrent.items.length === 0 &&
        !infoStateCurrent.error
      ) {
        fetchCommunityPosts('INFO');
      }
      if (
        !questionStateCurrent.isLoading &&
        questionStateCurrent.items.length === 0 &&
        !questionStateCurrent.error
      ) {
        fetchCommunityPosts('QUESTION');
      }
    }
  }, [activeTab, normalizedQuery, fetchCommunityPosts]);

  // 현재 탭에 맞는 화면 반환
  const renderTab = () => {
    if (activeTab === 'info') return <InfoTab posts={infoPostsFromApi} />;
    if (activeTab === 'question')
      return <QuestionTab posts={questionPostsFromApi} />;
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
