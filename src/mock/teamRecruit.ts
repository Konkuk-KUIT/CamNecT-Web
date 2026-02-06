import type { TeamRecruitPost, TeamRecruitDetail } from '../types/activityPage/activityPageTypes';

// 팀원 모집 게시글 목록
export const teamRecruitPosts: TeamRecruitPost[] = [
  {
    id: 'team-recruit-1',
    activityId: 'external-1',
    title: '기획 포지션 한 분 구합니다. 같이 성장하실 분!',
    authorId: 'user-park-wonbin-20',
    authorName: '박원빈',
    contestName: '2025 공공기관 데이터 아이디어 공모전',
    recruitNow: true,
    bookmarkCount: 12,
    createdAt: '2026-02-03T10:00:00.000Z',
  },
  {
    id: 'team-recruit-2',
    activityId: 'external-1',
    title: '두 분 구합니다. 열심히 하실 분!',
    authorId: 'user-2',
    authorName: '박영희',
    contestName: '2025 공공기관 데이터 아이디어 공모전',
    recruitNow: false,
    bookmarkCount: 3,
    createdAt: '2026-02-01T15:30:00.000Z',
  },
  {
    id: 'team-recruit-3',
    activityId: 'external-2',
    title: '영상 편집 가능하신 분 찾습니다!',
    authorId: 'user-3',
    authorName: '이지은',
    contestName: '브랜드 숏폼 콘텐츠 서포터즈 모집',
    recruitNow: true,
    bookmarkCount: 8,
    createdAt: '2026-01-25T09:00:00.000Z',
  },
];

// 팀원 모집 상세 데이터
export const teamRecruitDetails: Record<string, TeamRecruitDetail> = {
  'team-recruit-1': {
    id: 'team-recruit-1',
    activityId: 'external-1',
    title: '기획 포지션 한 분 구합니다. 같이 성장하실 분!',
    authorId: 'user-park-wonbin-20',
    authorName: '박원빈',
    authorMajor: '컴퓨터공학부',
    authorGrade: "20",
    authorProfile: "https://picsum.photos/seed/user-park-wonbin-20/100/100",
    contestName: '2025 공공기관 데이터 아이디어 공모전',
    activityTitle: '2025 공공기관 데이터 아이디어 공모전',
    activityUrl: '/activity/external/external-1',
    recruitNow: true,
    isBookmarked: false,
    bookmarkCount: 12,
    recruitDeadline: '2026-02-15T23:59:59.000Z',
    recruitTeamNumber: 1,
    createdAt: '2026-02-03T10:00:00.000Z',
    description: `공공데이터를 활용한 서비스 기획을 함께 진행하실 기획자 분을 찾고 있습니다.

저희 팀은 현재 개발 2명, 디자이너 1명이 구성되어 있으며, 서비스 기획 및 전략을 담당하실 분을 찾고 있습니다.

📌 모집 분야
- 서비스 기획 1명

✨ 우대 사항
- 공모전 경험이 있으신 분
- 데이터 분석에 관심이 있으신 분
- 적극적이고 책임감 있으신 분
`,
  },
  'team-recruit-2': {
    id: 'team-recruit-2',
    activityId: 'external-1',
    title: '두 분 구합니다. 열심히 하실 분!',
    authorId: 'user-2',
    authorName: '박영희',
    authorMajor: '컴퓨터공학과',
    authorGrade: "20",
    authorProfile: "https://picsum.photos/seed/user_002/100/100",
    contestName: '2025 공공기관 데이터 아이디어 공모전',
    activityTitle: '2025 공공기관 데이터 아이디어 공모전',
    activityUrl: '/activity/external/external-1',
    recruitNow: false,
    isBookmarked: true,
    bookmarkCount: 3,
    recruitDeadline: '2026-02-10T23:59:59.000Z',
    recruitTeamNumber: 2,
    createdAt: '2026-02-01T15:30:00.000Z',
    description: `데이터 아이디어 공모전에 함께 참가하실 팀원을 모집합니다!

현재 팀 구성: 개발자 1명

📌 모집 분야
- 기획자 1명
- 디자이너 1명

함께 성장하고 좋은 결과 만들어봐요!`,
  },
  'team-recruit-3': {
    id: 'team-recruit-3',
    activityId: 'external-2',
    title: '영상 편집 가능하신 분 찾습니다!',
    authorId: 'user-3',
    authorName: '이지은',
    authorMajor: '미디어커뮤니케이션학과',
    authorGrade: "21",
    authorProfile: "https://picsum.photos/seed/user_003/100/100",
    contestName: '브랜드 숏폼 콘텐츠 서포터즈 모집',
    activityTitle: '브랜드 숏폼 콘텐츠 서포터즈 모집',
    activityUrl: '/activity/external/external-2',
    recruitNow: true,
    isBookmarked: false,
    bookmarkCount: 8,
    recruitDeadline: '2026-02-20T23:59:59.000Z',
    recruitTeamNumber: 1,
    createdAt: '2026-01-25T09:00:00.000Z',
    description: `숏폼 콘텐츠 제작을 위한 영상 편집자를 찾습니다.

현재 기획 및 촬영은 준비되어 있으며, 편집만 함께 해주실 분을 찾고 있습니다.

📌 모집 분야
- 영상 편집 1명

✨ 우대 사항
- 프리미어 프로, 파이널컷 사용 가능하신 분
- 숏폼 콘텐츠 편집 경험 있으신 분
- 빠른 작업 가능하신 분

활동비 지급 및 포트폴리오 제작 가능합니다!`,
  isSubmited: true,
  },
};

// 특정 활동에 대한 팀원 모집 게시글 가져오기
export const getTeamRecruitsByActivityId = (activityId: string): TeamRecruitPost[] => {
  return teamRecruitPosts.filter((post) => post.activityId === activityId);
};

// 팀원 모집 상세 정보 가져오기
export const getTeamRecruitDetail = (recruitId: string): TeamRecruitDetail | undefined => {
  return teamRecruitDetails[recruitId];
};

// 특정 활동의 팀원 모집 개수 가져오기
export const getTeamRecruitCount = (activityId: string): number => {
  return teamRecruitPosts.filter((post) => post.activityId === activityId).length;
};