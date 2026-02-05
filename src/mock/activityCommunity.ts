import type {
  ActivityPost,
  ActivityPostAuthor,
  ActivityPostStatus,
  ActivityPostDetail,
} from '../types/activityPage/activityPageTypes';

export const activityLoggedInUser: ActivityPostAuthor = {
  id: 'user-park-wonbin-20',
  name: '박원빈',
  major: '컴퓨터공학부',
  studentId: '20',
  profileImageUrl: '',
};

const sampleProfileImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0OCIgY3k9IjQ4IiByPSI0OCIgZmlsbD0iI0UwRThFNSIvPjxwYXRoIGQ9Ik00OCAyNEM1Ni4yODQgMjQgNjMgMzAuNzE2IDYzIDM5QzYzIDQ3LjI4NCA1Ni4yODQgNTQgNDggNTRDMzkuNzE2IDU0IDMzIDQ3LjI4NCAzMyAzOUMzMyAzMC43MTYgMzkuNzE2IDI0IDQ4IDI0WiIgZmlsbD0iI0I0QkJCRiIvPjxwYXRoIGQ9Ik0yOCA3NEMzMiA2NS4zMzMgNDEuMzMzIDYwIDQ4IDYwQzU0LjY2NyA2MCA2NCA2NS4zMzMgNjggNzRIMjhaIiBmaWxsPSIjQjRCQkJGIi8+PC9zdmc+';

const samplePostImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDE2MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMjAiIHJ4PSIxMiIgZmlsbD0iI0U5RjdGMSIvPjxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjEzNiIgaGVpZ2h0PSI3MiIgcng9IjgiIGZpbGw9IiNDOUU5RDgiLz48Y2lyY2xlIGN4PSI0MCIgY3k9Ijg4IiByPSIxMCIgZmlsbD0iIzg2RDVCMCIvPjxyZWN0IHg9IjU2IiB5PSI4MCIgd2lkdGg9IjcyIiBoZWlnaHQ9IjE2IiByeD0iOCIgZmlsbD0iI0E1RTFDNCIvPjwvc3ZnPg==';

const samplePostImage2 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDE2MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMjAiIHJ4PSIxMiIgZmlsbD0iI0ZGRjRFNiIvPjxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjEzNiIgaGVpZ2h0PSI3MiIgcng9IjgiIGZpbGw9IiNGRkU0QjIiLz48Y2lyY2xlIGN4PSI0MCIgY3k9Ijg4IiByPSIxMCIgZmlsbD0iI0ZGQzg3QSIvPjxyZWN0IHg9IjU2IiB5PSI4MCIgd2lkdGg9IjcyIiBoZWlnaHQ9IjE2IiByeD0iOCIgZmlsbD0iI0ZGRDlBMyIvPjwvc3ZnPg==';

const samplePostImage3 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDE2MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMjAiIHJ4PSIxMiIgZmlsbD0iI0Y1RTZGRiIvPjxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjEzNiIgaGVpZ2h0PSI3MiIgcng9IjgiIGZpbGw9IiNFM0M4RjAiLz48Y2lyY2xlIGN4PSI0MCIgY3k9Ijg4IiByPSIxMCIgZmlsbD0iI0M5OUVFMCIvPjxyZWN0IHg9IjU2IiB5PSI4MCIgd2lkdGg9IjcyIiBoZWlnaHQ9IjE2IiByeD0iOCIgZmlsbD0iI0RBQjNFOCIvPjwvc3ZnPg==';

const sampleThumbnail1 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTUiIGhlaWdodD0iOTUiIHZpZXdCb3g9IjAgMCA5NSA5NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOTUiIGhlaWdodD0iOTUiIHJ4PSI1IiBmaWxsPSIjRTlGN0YxIi8+PGNpcmNsZSBjeD0iNDcuNSIgY3k9IjQ3LjUiIHI9IjIwIiBmaWxsPSIjQzlFOUQ4Ii8+PC9zdmc+';

const sampleThumbnail2 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTUiIGhlaWdodD0iOTUiIHZpZXdCb3g9IjAgMCA5NSA5NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOTUiIGhlaWdodD0iOTUiIHJ4PSI1IiBmaWxsPSIjRkZGNEU2Ii8+PGNpcmNsZSBjeD0iNDcuNSIgY3k9IjQ3LjUiIHI9IjIwIiBmaWxsPSIjRkZFNEIyIi8+PC9zdmc+';

const sampleThumbnail3 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTUiIGhlaWdodD0iOTUiIHZpZXdCb3g9IjAgMCA5NSA5NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOTUiIGhlaWdodD0iOTUiIHJ4PSI1IiBmaWxsPSIjRjVFNkZGIi8+PGNpcmNsZSBjeD0iNDcuNSIgY3k9IjQ3LjUiIHI9IjIwIiBmaWxsPSIjRTNDOEYwIi8+PC9zdmc+';

const buildPost = (
  overrides: Partial<ActivityPostDetail> & Pick<ActivityPost, 'id' | 'tab' | 'title' | 'content'>,
): ActivityPostDetail => ({
  id: overrides.id,
  tab: overrides.tab,
  title: overrides.title,
  content: overrides.content,
  categories: overrides.categories ?? ['기획', '모집'],
  likes: overrides.likes ?? 12,
  saveCount: overrides.saveCount ?? 6,
  createdAt: overrides.createdAt ?? new Date().toISOString(),
  author: overrides.author ?? {
    id: 'user-seo-jiyoon-17',
    name: '서지윤',
    major: '컴퓨터공학부',
    studentId: '17',
    profileImageUrl: sampleProfileImage,
  },
  status: overrides.status,
  postImages: overrides.postImages,
  thumbnailUrl: overrides.thumbnailUrl,
  isBookmarked: overrides.isBookmarked ?? false,
  isLiked: overrides.isLiked ?? false,
  // 대외활동 전용 필드
  organizer: overrides.organizer,
  deadline: overrides.deadline,
  location: overrides.location,
  target: overrides.target,
  applyPeriod: overrides.applyPeriod,
  announceDate: overrides.announceDate,
  applyUrl: overrides.applyUrl,
  descriptionBlocks: overrides.descriptionBlocks,
});

const baseActivityPosts: ActivityPostDetail[] = [
  buildPost({
    id: 'club-1',
    tab: 'club',
    title: 'UX/UI 연합 동아리 신규 부원 모집',
    content:
      '제품 기획과 UI 설계를 함께 경험할 동아리원을 모집합니다. 매주 스터디와 실전 프로젝트가 있어요.',
    categories: ['디자인', '기획', '동아리'],
    likes: 34,
    saveCount: 14,
    createdAt: '2026-02-05T01:00:00.000Z',
    status: 'OPEN',
    isLiked: true,
    isBookmarked: true,
    thumbnailUrl: sampleThumbnail1,
    postImages: [samplePostImage, samplePostImage2, samplePostImage3],
  }),
  buildPost({
    id: 'club-2',
    tab: 'club',
    title: '개발 동아리 서버팀 모집 (주 1회)',
    content:
      'Node.js 기반 백엔드 실습 위주로 진행합니다. 경험은 없어도 괜찮아요!',
    categories: ['개발', '동아리'],
    likes: 21,
    saveCount: 9,
    createdAt: '2026-01-31T10:00:00.000Z',
    status: 'CLOSED',
    thumbnailUrl: sampleThumbnail2,
  }),
  buildPost({
    id: 'club-mine-1',
    tab: 'club',
    title: '동아리 기획팀 모집합니다!',
    content:
      '프로젝트 기획 경험을 쌓고 싶은 분들을 모집합니다. 지원서 제출 후 간단한 인터뷰가 있어요.',
    categories: ['기획', '동아리'],
    likes: 6,
    saveCount: 2,
    createdAt: '2026-02-04T16:00:00.000Z',
    author: activityLoggedInUser,
    status: 'OPEN',
    postImages: [samplePostImage2, samplePostImage3],
  }),
  buildPost({
    id: 'study-1',
    tab: 'study',
    title: '프론트엔드 취업 스터디 (8주)',
    content:
      'React와 테스트 코드 중심으로 주 2회 오프라인 스터디를 진행합니다.',
    categories: ['개발', '스터디'],
    likes: 18,
    saveCount: 11,
    createdAt: '2026-02-04T10:00:00.000Z',
    status: 'OPEN',
    isBookmarked: true,
    thumbnailUrl: sampleThumbnail3,
    postImages: [samplePostImage],
  }),
  buildPost({
    id: 'study-2',
    tab: 'study',
    title: 'AI 논문 읽기 스터디 모집',
    content:
      '매주 1편 논문을 읽고 토론합니다. 최근 트렌드 위주로 진행해요.',
    categories: ['AI', '스터디'],
    likes: 12,
    saveCount: 4,
    createdAt: '2026-01-26T13:00:00.000Z',
    status: 'OPEN',
  }),
  buildPost({
    id: 'study-mine-1',
    tab: 'study',
    title: '알고리즘 스터디 추가 모집',
    content:
      '주 2회 문제풀이와 코드리뷰를 진행합니다. 백준/프로그래머스 위주로 진행해요.',
    categories: ['개발', '스터디'],
    likes: 9,
    saveCount: 3,
    createdAt: '2026-02-04T08:00:00.000Z',
    author: activityLoggedInUser,
    status: 'OPEN',
    thumbnailUrl: sampleThumbnail1,
  }),
  buildPost({
    id: 'external-1',
    tab: 'external',
    title: '2025 공공기관 데이터 아이디어 공모전',
    content:
      '데이터 분석 기반 서비스 아이디어를 모집합니다. 서류 심사 후 본선 발표가 예정되어 있습니다.',
    categories: ['대외활동', '기획'],
    likes: 29,
    saveCount: 16,
    createdAt: '2026-02-02T14:30:00.000Z',
    isBookmarked: true,
    // 대외활동 전용 필드
    organizer: '한국데이터산업진흥원',
    deadline: '2026-03-15T23:59:59.000Z',
    location: '온라인',
    target: '대학생 및 일반인',
    applyPeriod: {
      start: '2026-02-01T00:00:00.000Z',
      end: '2026-03-15T23:59:59.000Z',
    },
    announceDate: '2026-04-01T00:00:00.000Z',
    applyUrl: 'https://example.com/contest/data-2025',
    thumbnailUrl: sampleThumbnail2,
    postImages: [samplePostImage2, samplePostImage],
    descriptionBlocks: [
      {
        title: '공모 주제',
        body: '공공데이터를 활용한 혁신적인 서비스 아이디어',
      },
      {
        title: '시상 내역',
        body: '대상 500만원, 최우수상 300만원, 우수상 100만원',
      },
    ],
  }),
  buildPost({
    id: 'external-2',
    tab: 'external',
    title: '브랜드 숏폼 콘텐츠 서포터즈 모집',
    content:
      'SNS 숏폼 콘텐츠 제작 경험자를 모집합니다. 활동비 및 굿즈 제공.',
    categories: ['마케팅', '대외활동'],
    likes: 7,
    saveCount: 3,
    createdAt: '2026-01-21T09:00:00.000Z',
    organizer: '㈜브랜드컴퍼니',
    deadline: '2026-02-28T23:59:59.000Z',
    target: '대학생',
    applyPeriod: {
      start: '2026-02-01T00:00:00.000Z',
      end: '2026-02-28T23:59:59.000Z',
    },
    applyUrl: 'https://example.com/supporters/2025',
    thumbnailUrl: sampleThumbnail3,
  }),
  buildPost({
    id: 'external-3',
    tab: 'external',
    title: '로컬 브랜드 디자인 챌린지',
    content:
      '지역 브랜드와 협업하여 디자인 솔루션을 제안하는 챌린지입니다. 포트폴리오 제출이 필요합니다.',
    categories: ['디자인', '대외활동'],
    likes: 14,
    saveCount: 5,
    createdAt: '2026-02-04T04:00:00.000Z',
    organizer: '로컬크리에이터협회',
    deadline: '2026-03-31T23:59:59.000Z',
    location: '부산',
    target: '디자인 전공자',
    applyPeriod: {
      start: '2026-02-15T00:00:00.000Z',
      end: '2026-03-31T23:59:59.000Z',
    },
    announceDate: '2026-04-15T00:00:00.000Z',
    applyUrl: 'https://example.com/design-challenge',
    thumbnailUrl: sampleThumbnail1,
    postImages: [samplePostImage3, samplePostImage2, samplePostImage],
  }),
  buildPost({
    id: 'job-1',
    tab: 'job',
    title: '2025 상반기 채용 설명회 일정 공유',
    content:
      '대기업/중견기업 채용 설명회 일정과 준비 체크리스트를 공유합니다.',
    categories: ['취업', '설명회'],
    likes: 42,
    saveCount: 24,
    createdAt: '2026-02-04T22:00:00.000Z',
    isBookmarked: true,
    thumbnailUrl: sampleThumbnail2,
    postImages: [samplePostImage, samplePostImage3],
  }),
  buildPost({
    id: 'job-2',
    tab: 'job',
    title: '인턴 합격 자소서 공개 및 리뷰',
    content:
      '합격 자소서와 피드백 포인트를 정리했습니다. 필요한 분들은 참고하세요!',
    categories: ['취업', '자소서'],
    likes: 16,
    saveCount: 10,
    createdAt: '2026-01-29T15:30:00.000Z',
    thumbnailUrl: sampleThumbnail1,
  }),
];

const STORAGE_KEY = 'activityPosts';
let activityPostsCache: ActivityPostDetail[] = [...baseActivityPosts];

const readStorage = (): ActivityPostDetail[] => {
  if (typeof window === 'undefined') return activityPostsCache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return activityPostsCache;
    const parsed = JSON.parse(raw) as ActivityPostDetail[];
    if (!Array.isArray(parsed)) return activityPostsCache;
    activityPostsCache = parsed;
    return parsed;
  } catch {
    return activityPostsCache;
  }
};

const writeStorage = (next: ActivityPostDetail[]) => {
  activityPostsCache = next;
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable
  }
};

export const getActivityPosts = () => readStorage();

export const addActivityPost = (post: ActivityPostDetail) => {
  const next = [post, ...readStorage()];
  writeStorage(next);
  return post;
};

export const updateActivityPost = (postId: string, updated: ActivityPostDetail) => {
  const next = readStorage().map((post) => (post.id === postId ? updated : post));
  writeStorage(next);
  return updated;
};

export const getActivityPostStatusLabel = (status?: ActivityPostStatus) =>
  status === 'CLOSED' ? '모집 완료' : '모집 중';

export const mapToActivityPost = (postId?: string | null): ActivityPostDetail => {
  const posts = readStorage();
  if (!postId) return posts[0];
  return posts.find((post) => post.id === postId) ?? posts[0];
};


// import type {
//   ActivityComment,
//   ActivityPost,
//   ActivityPostAuthor,
//   ActivityPostStatus,
// } from '../types/activityPage/activityPageTypes';

// export const activityLoggedInUser: ActivityPostAuthor = {
//   id: 'user-park-wonbin-20',
//   name: '박원빈',
//   major: '컴퓨터공학부',
//   studentId: '20',
//   profileImageUrl: '',
// };

// const sampleProfileImage =
//   'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0OCIgY3k9IjQ4IiByPSI0OCIgZmlsbD0iI0UwRThFNSIvPjxwYXRoIGQ9Ik00OCAyNEM1Ni4yODQgMjQgNjMgMzAuNzE2IDYzIDM5QzYzIDQ3LjI4NCA1Ni4yODQgNTQgNDggNTRDMzkuNzE2IDU0IDMzIDQ3LjI4NCAzMyAzOUMzMyAzMC43MTYgMzkuNzE2IDI0IDQ4IDI0WiIgZmlsbD0iI0I0QkJCRiIvPjxwYXRoIGQ9Ik0yOCA3NEMzMiA2NS4zMzMgNDEuMzMzIDYwIDQ4IDYwQzU0LjY2NyA2MCA2NCA2NS4zMzMgNjggNzRIMjhaIiBmaWxsPSIjQjRCQkJGIi8+PC9zdmc+';

// const samplePostImage =
//   'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDE2MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMjAiIHJ4PSIxMiIgZmlsbD0iI0U5RjdGMSIvPjxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjEzNiIgaGVpZ2h0PSI3MiIgcng9IjgiIGZpbGw9IiNDOUU5RDgiLz48Y2lyY2xlIGN4PSI0MCIgY3k9Ijg4IiByPSIxMCIgZmlsbD0iIzg2RDVCMCIvPjxyZWN0IHg9IjU2IiB5PSI4MCIgd2lkdGg9IjcyIiBoZWlnaHQ9IjE2IiByeD0iOCIgZmlsbD0iI0E1RTFDNCIvPjwvc3ZnPg==';

// const buildPost = (
//   overrides: Partial<ActivityPost> & Pick<ActivityPost, 'id' | 'tab' | 'title' | 'content'>,
// ): ActivityPost => ({
//   id: overrides.id,
//   tab: overrides.tab,
//   title: overrides.title,
//   content: overrides.content,
//   categories: overrides.categories ?? ['기획', '모집'],
//   likes: overrides.likes ?? 12,
//   comments: overrides.comments ?? 3,
//   saveCount: overrides.saveCount ?? 6,
//   createdAt: overrides.createdAt ?? new Date().toISOString(),
//   author: overrides.author ?? {
//     id: 'user-seo-jiyoon-17',
//     name: '서지윤',
//     major: '컴퓨터공학부',
//     studentId: '17',
//     profileImageUrl: sampleProfileImage,
//   },
//   status: overrides.status,
//   postImages: overrides.postImages,
// });

// const baseActivityPosts: ActivityPost[] = [
//   buildPost({
//     id: 'club-1',
//     tab: 'club',
//     title: 'UX/UI 연합 동아리 신규 부원 모집',
//     content:
//       '제품 기획과 UI 설계를 함께 경험할 동아리원을 모집합니다. 매주 스터디와 실전 프로젝트가 있어요.',
//     categories: ['디자인', '기획', '동아리'],
//     likes: 34,
//     comments: 7,
//     saveCount: 14,
//     createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
//     status: 'OPEN',
//     postImages: [samplePostImage],
//   }),
//   buildPost({
//     id: 'club-2',
//     tab: 'club',
//     title: '개발 동아리 서버팀 모집 (주 1회)',
//     content:
//       'Node.js 기반 백엔드 실습 위주로 진행합니다. 경험은 없어도 괜찮아요!',
//     categories: ['개발', '동아리'],
//     likes: 21,
//     comments: 2,
//     saveCount: 9,
//     createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
//     status: 'CLOSED',
//   }),
//   buildPost({
//     id: 'club-mine-1',
//     tab: 'club',
//     title: '동아리 기획팀 모집합니다!',
//     content:
//       '프로젝트 기획 경험을 쌓고 싶은 분들을 모집합니다. 지원서 제출 후 간단한 인터뷰가 있어요.',
//     categories: ['기획', '동아리'],
//     likes: 6,
//     comments: 1,
//     saveCount: 2,
//     createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
//     author: activityLoggedInUser,
//     status: 'OPEN',
//   }),
//   buildPost({
//     id: 'study-1',
//     tab: 'study',
//     title: '프론트엔드 취업 스터디 (8주)',
//     content:
//       'React와 테스트 코드 중심으로 주 2회 오프라인 스터디를 진행합니다.',
//     categories: ['개발', '스터디'],
//     likes: 18,
//     comments: 5,
//     saveCount: 11,
//     createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
//     status: 'OPEN',
//   }),
//   buildPost({
//     id: 'study-2',
//     tab: 'study',
//     title: 'AI 논문 읽기 스터디 모집',
//     content:
//       '매주 1편 논문을 읽고 토론합니다. 최근 트렌드 위주로 진행해요.',
//     categories: ['AI', '스터디'],
//     likes: 12,
//     comments: 1,
//     saveCount: 4,
//     createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
//     status: 'OPEN',
//   }),
//   buildPost({
//     id: 'study-mine-1',
//     tab: 'study',
//     title: '알고리즘 스터디 추가 모집',
//     content:
//       '주 2회 문제풀이와 코드리뷰를 진행합니다. 백준/프로그래머스 위주로 진행해요.',
//     categories: ['개발', '스터디'],
//     likes: 9,
//     comments: 0,
//     saveCount: 3,
//     createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
//     author: activityLoggedInUser,
//     status: 'OPEN',
//   }),
//   buildPost({
//     id: 'external-1',
//     tab: 'external',
//     title: '2025 공공기관 데이터 아이디어 공모전',
//     content:
//       '데이터 분석 기반 서비스 아이디어를 모집합니다. 서류 심사 후 본선 발표가 예정되어 있습니다.',
//     categories: ['대외활동', '기획'],
//     likes: 29,
//     comments: 4,
//     saveCount: 16,
//     createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
//   }),
//   buildPost({
//     id: 'external-2',
//     tab: 'external',
//     title: '브랜드 숏폼 콘텐츠 서포터즈 모집',
//     content:
//       'SNS 숏폼 콘텐츠 제작 경험자를 모집합니다. 활동비 및 굿즈 제공.',
//     categories: ['마케팅', '대외활동'],
//     likes: 7,
//     comments: 0,
//     saveCount: 3,
//     createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
//   }),
//   buildPost({
//     id: 'external-3',
//     tab: 'external',
//     title: '로컬 브랜드 디자인 챌린지',
//     content:
//       '지역 브랜드와 협업하여 디자인 솔루션을 제안하는 챌린지입니다. 포트폴리오 제출이 필요합니다.',
//     categories: ['디자인', '대외활동'],
//     likes: 14,
//     comments: 2,
//     saveCount: 5,
//     createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
//   }),
//   buildPost({
//     id: 'job-1',
//     tab: 'job',
//     title: '2025 상반기 채용 설명회 일정 공유',
//     content:
//       '대기업/중견기업 채용 설명회 일정과 준비 체크리스트를 공유합니다.',
//     categories: ['취업', '설명회'],
//     likes: 42,
//     comments: 9,
//     saveCount: 24,
//     createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
//   }),
//   buildPost({
//     id: 'job-2',
//     tab: 'job',
//     title: '인턴 합격 자소서 공개 및 리뷰',
//     content:
//       '합격 자소서와 피드백 포인트를 정리했습니다. 필요한 분들은 참고하세요!',
//     categories: ['취업', '자소서'],
//     likes: 16,
//     comments: 3,
//     saveCount: 10,
//     createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
//   }),
// ];

// const STORAGE_KEY = 'activityPosts';
// let activityPostsCache: ActivityPost[] = [...baseActivityPosts];

// const readStorage = (): ActivityPost[] => {
//   if (typeof window === 'undefined') return activityPostsCache;
//   try {
//     const raw = window.localStorage.getItem(STORAGE_KEY);
//     if (!raw) return activityPostsCache;
//     const parsed = JSON.parse(raw) as ActivityPost[];
//     if (!Array.isArray(parsed)) return activityPostsCache;
//     activityPostsCache = parsed;
//     return parsed;
//   } catch {
//     return activityPostsCache;
//   }
// };

// const writeStorage = (next: ActivityPost[]) => {
//   activityPostsCache = next;
//   if (typeof window === 'undefined') return;
//   try {
//     window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
//   } catch {
//     // storage unavailable
//   }
// };

// export const getActivityPosts = () => readStorage();

// export const addActivityPost = (post: ActivityPost) => {
//   const next = [post, ...readStorage()];
//   writeStorage(next);
//   return post;
// };

// export const updateActivityPost = (postId: string, updated: ActivityPost) => {
//   const next = readStorage().map((post) => (post.id === postId ? updated : post));
//   writeStorage(next);
//   return updated;
// };

// export const activityPostCommentsById: Record<string, ActivityComment[]> = {
//   'club-1': [
//     {
//       id: 'club-1-c1',
//       author: {
//         id: 'user-kim-eunji-22',
//         name: '김은지',
//         major: '경영학부',
//         studentId: '22',
//       },
//       content: '활동 일정이 어떻게 되나요?',
//       createdAt: '25.01.31 06:12',
//       replies: [
//         {
//           id: 'club-1-c1-r1',
//           author: activityLoggedInUser,
//           content: '주 1회 오프라인 모임 예정이에요!',
//           createdAt: '25.01.31 07:05',
//         },
//       ],
//     },
//   ],
//   'study-1': [
//     {
//       id: 'study-1-c1',
//       author: {
//         id: 'user-jeong-gaeul-20',
//         name: '정가을',
//         major: '디자인컨버전스학부',
//         studentId: '20',
//       },
//       content: '온라인 참여도 가능한가요?',
//       createdAt: '25.02.01 10:40',
//     },
//   ],
// };

// export const getActivityPostStatusLabel = (status?: ActivityPostStatus) =>
//   status === 'CLOSED' ? '모집 완료' : '모집 중';

// export const mapToActivityPost = (postId?: string | null) => {
//   const posts = readStorage();
//   if (!postId) return posts[0];
//   return posts.find((post) => post.id === postId) ?? posts[0];
// };
