import type {
  ActivityDetail,
  ActivityListItem,
  ActivityListUiState,
  ActivityTab,
  SortKey,
  TeamRecruitPost,
  TeamRecruitDetail,
} from "../types/activityPage/activityPageTypes";

//대외활동 - 탭과 필터
export const MOCK_ACTIVITY_TABS: { key: ActivityTab; label: string }[] = [
  { key: "club", label: "동아리" },
  { key: "study", label: "스터디" },
  { key: "contest", label: "공모전" },
  { key: "external", label: "대외활동" },
  { key: "job", label: "취업 정보" },
  { key: "recruit", label: "팀원 모집" }
];

export const MOCK_ACTIVITY_FILTERS = {
  field: ["전체", "광고/마케팅", "기획/아이디어", "디자인", "개발", "기타"] as const,
  host: ["전체", "공공기관", "기업", "학교", "동아리/커뮤니티", "기타"] as const,
  region: ["전체", "서울", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "부산"] as const,
  sort: ["추천순", "최신순", "마감임박순"] as const,
};

//기본 UI 데이터(처음 대외활동 탭에 들어왔을 때)
export const MOCK_ACTIVITY_LIST_UI_STATE: ActivityListUiState = {
  activeTab: "contest",
  selectedField: "전체",
  selectedHost: "전체",
  selectedRegion: "전체",
  sort: "추천순" as SortKey,
};

//activity 데이터
export const MOCK_ACTIVITIES: ActivityListItem[] = [
  {
    id: "act_001",
    tab: "contest",
    title: "나라사랑 공모전",
    location: "부산",
    organizer: "부산광역시",
    tags: ["광고/마케팅", "기획/아이디어"],
    posterImg: "https://picsum.photos/seed/act_001_thumb/94/134",
    dDay: 34,
    deadline: "2025.10.30",
    bookmarkCount: 12,
    isBookmarked: false,
    createdAt: "2025-10-01T00:00:00.000Z",
  },
  {
    id: "act_002",
    tab: "contest",
    title: "경기도 브랜드 홍보 콘텐츠 공모전",
    location: "경기",
    organizer: "경기도",
    tags: ["광고/마케팅", "기획/아이디어"],
    posterImg: "https://picsum.photos/seed/act_002_thumb/94/134",
    dDay: 18,
    deadline: "2025.10.12",
    bookmarkCount: 28,
    isBookmarked: true,
    createdAt: "2025-09-25T00:00:00.000Z",
  },
  {
    id: "act_003",
    tab: "contest",
    title: "우리시장 홍보 콘텐츠 공모전",
    location: "전국",
    organizer: "시장상인회",
    tags: ["기획/아이디어", "디자인"],
    posterImg: "https://picsum.photos/seed/act_003_thumb/94/134",
    dDay: 7,
    deadline: "2025.09.30",
    bookmarkCount: 5,
    isBookmarked: false,
    createdAt: "2025-09-10T00:00:00.000Z",
  },
  {
    id: "act_004",
    tab: "study",
    title: "React 심화 스터디 6주 (주 2회)",
    location: "서울",
    organizer: "동아리/커뮤니티",
    tags: ["개발"],
    posterImg: "https://picsum.photos/seed/act_004_thumb/94/134",
    dDay: 12,
    deadline: "2025.10.05",
    bookmarkCount: 44,
    isBookmarked: true,
    createdAt: "2025-09-20T00:00:00.000Z",
  },
  {
    id: "act_005",
    tab: "club",
    title: "대학 연합 디자인 동아리 신규 모집",
    location: "서울",
    organizer: "학교",
    tags: ["디자인", "기타"],
    posterImg: "https://picsum.photos/seed/act_005_thumb/94/134",
    dDay: 21,
    deadline: "2025.10.15",
    bookmarkCount: 19,
    isBookmarked: false,
    createdAt: "2025-09-18T00:00:00.000Z",
  },
  {
    id: "act_006",
    tab: "job",
    title: "프론트엔드 인턴십 지원",
    location: "경기",
    organizer: "기업",
    tags: ["개발", "기타"],
    posterImg: "https://picsum.photos/seed/act_006_thumb/94/134",
    dDay: 40,
    deadline: "2025.11.05",
    bookmarkCount: 61,
    isBookmarked: false,
    createdAt: "2025-10-05T00:00:00.000Z",
  },
];

//activity 세부사항 데이터
export const MOCK_ACTIVITY_DETAIL_BY_ID: Record<string, ActivityDetail> = {
  act_001: {
    ...MOCK_ACTIVITIES.find((x) => x.id === "act_001")!,
    posterImg: "https://picsum.photos/seed/act_001_header/375/311",
    target: "전국 대학생 및 대학원생 (팀 또는 개인)",
    applyPeriod: { start: "2025.10.30", end: "2025.10.31" },
    announceDate: "2025.11.14",
    applyUrl: "https://example.com/activities/act_001/apply",
    descriptionBlocks: [
      {
        title: "공모 개요",
        body:
          "지역과 함께하는 나라사랑 캠페인 콘텐츠를 모집합니다.\n" +
          "기획서/카피/포스터/영상 등 다양한 형식으로 참여할 수 있습니다.",
      },
    ],
  },
  act_002: {
    ...MOCK_ACTIVITIES.find((x) => x.id === "act_002")!,
    posterImg: "https://picsum.photos/seed/act_002_header/900/700",
    target: "모집 대상: 전국 누구나",
    applyPeriod: { start: "2025.09.20", end: "2025.10.12" },
    announceDate: "2025.10.20",
    applyUrl: "https://example.com/activities/act_002/apply",
    descriptionBlocks: [
      { title: "공모 주제", body: "경기도 브랜드를 홍보할 수 있는 콘텐츠(숏폼/이미지/카피 등)" },
    ],
  },
  act_003: {
    ...MOCK_ACTIVITIES.find((x) => x.id === "act_003")!,
    posterImg: "https://picsum.photos/seed/act_003_header/900/700",
    target: "모집 대상: 대학생/일반인 누구나",
    applyPeriod: { start: "2025.09.01", end: "2025.09.30" },
    announceDate: "2025.10.07",
    applyUrl: "https://example.com/activities/act_003/apply",
    descriptionBlocks: [
      { title: "상세 안내", body: "지역 시장을 알릴 수 있는 영상/이미지 콘텐츠 제작 공모전입니다." },
    ],
  },
};


//team recurit post+comment 데이터
export const MOCK_TEAM_RECRUIT_POST_BY_ID: Record<string, TeamRecruitPost> = {
    tr_001: {
      id: "tr_001",
      activityId: "act_001",
      title: "기획 포지션 한 분 구합니다. 같이 성장하실 분!",
      authorName: "김갑수",
      status: "OPEN",
      pastDays: 2,
      bookmarkCount: 12,
      commentCount: 3,
      isBookmarked: true,
    },
    tr_002: {
      id: "tr_002",
      activityId: "act_001",
      title: "두 분 모십니다. 열심히 하실 분",
      authorName: "김삽수",
      status: "CLOSED",
      pastDays: 3,
      bookmarkCount: 7,
      commentCount: 1,
      isBookmarked: false,
    },
    tr_003: {
      id: "tr_003",
      activityId: "act_002",
      title: "숏폼 영상 편집 가능하신 분(프리미어/캡컷) 구해요",
      authorName: "박익명",
      status: "OPEN",
      pastDays: 1,
      bookmarkCount: 21,
      commentCount: 5,
      isBookmarked: false,
    },
    tr_004: {
      id: "tr_004",
      activityId: "act_004",
      title: "데이터/기획 함께 할 팀원 모집(2명)",
      authorName: "최익명",
      status: "OPEN",
      pastDays: 3,
      bookmarkCount: 18,
      commentCount: 2,
      isBookmarked: true,
    },
    tr_005: {
      id: "tr_005",
      activityId: "act_005",
      title: "UX 리서치+와이어프레임 같이 하실 분 구합니다",
      authorName: "김유저",
      status: "OPEN",
      pastDays: 5,
      bookmarkCount: 9,
      commentCount: 0,
      isBookmarked: false,
    },
};

export const MOCK_TEAM_RECRUITS_IDS_BY_ACTIVITY_ID: Record<string, string[]> = {
    act_001: ["tr_001", "tr_002"],
    act_002: ["tr_003"],
    act_003: [],
    act_004: ["tr_004"],
    act_005: ["tr_005"],
    act_006: [],
};

export const MOCK_TEAM_RECRUIT_DETAIL_EXTRA_BY_ID: Record<
  string,
  Omit<TeamRecruitDetail, keyof TeamRecruitPost> //TeamRecruitDetail에서 TeamRecruitPost를 제외한 데이터만을 다룸
> = {
  tr_001: {
    activityTitle: "나라사랑 공모전",
    activityUrl: "/activities/act_001",
    authorMajor: "컴퓨터공학부",
    authorGrade: 2,
    recruitDeadline: "2025.10.31",
    recruitTeamNumber: 4,
    genderLimit: "성별 무관",
    description: "미디어 컨텐츠 학과 2학년 재학 중입니다.\n~~한 팀원 모집 중입니다 편하게 연락 주세요",
    comments: [
      {
        id: "c_001",
        postId: "tr_001",
        authorName: "김삽수",
        content: "요청 보냈습니다. 확인 부탁드립니다!",
        createdAt: "2025.10.30",
        replies: [
            {
                id: "c_001_r1",
                postId: "tr_001",
                authorName: "김갑수",
                content: "거절합니다.",
                createdAt: "2025.10.30",
            }
        ]
      },
    ],
  },
  tr_002: {
    activityTitle: "나라사랑 공모전",
    activityUrl: "/activities/act_001",
    authorMajor: "컴퓨터공학부",
    authorGrade: 1,
    recruitDeadline: "2025.10.31",
    recruitTeamNumber: 3,
    genderLimit: "성별 무관",
    description: "...",
    comments: [],
  },
};
