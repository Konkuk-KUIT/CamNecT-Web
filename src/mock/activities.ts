import type {
  ActivityDetail,
  TeamRecruitDetail,
  ActivityListItem
} from "../types/activityPage/activityPageTypes";

export const MOCK_INTERNAL_ACTIVITY_POSTS: ActivityListItem[] = [
    {
        id: '3',
        tab: "club",
        authorId: 'user_002',
        title: '보드게임 소모임 NoJ 부원 모집합니다',
        content: '저 혼자 놀기 적적해 다른 사람들을 구해봅니다 소모임 목표는 저 혼자 놀기 적적해 다른 사람들을 구해봅니다 소모임 목표는',
        bookmarkCount: 5,
        isBookmarked: true,
        tags: ['모집중', '전공'],
        createdAt: '2026-01-31T00:00:00.000Z',
        posterImg: "https://picsum.photos/seed/post_003/900/700"
    }
];

//대외활동 및 취업 activity 세부사항 데이터
export const MOCK_EXTERNAL_ACTIVITY_DETAIL: ActivityDetail[] = [
  {
    id: "act_001",
    tab: "external",
    authorId: "user_master",
    title: "나라사랑 공모전",
    organizer: "부산광역시",
    location: "부산",
    tags: ["광고/마케팅", "기획/아이디어"],
    posterImg: "https://picsum.photos/seed/act_001_thumb/94/134",
    deadline: "2026-03-01T00:00:00.000Z",
    bookmarkCount: 12,
    isBookmarked: true,
    createdAt: "2025-10-01T00:00:00.000Z",
    target: "전국 대학생 및 대학원생 (팀 또는 개인)",
    applyPeriod: { start: "2026-02-01T00:00:00.000Z", end: "2026-03-01T00:00:00.000Z" },
    announceDate: "2026-11-30T00:00:00.000Z",
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
  {
    id: "act_002",
    tab: "external",
    authorId: "user_master",
    title: "경기도 브랜드 홍보 콘텐츠 공모전",
    location: "경기",
    organizer: "경기도",
    tags: ["광고/마케팅", "기획/아이디어"],
    posterImg: "https://picsum.photos/seed/act_002_thumb/94/134",
    deadline: "2026-09-25T00:00:00.000Z",
    bookmarkCount: 28,
    isBookmarked: true,
    createdAt: "2025-09-25T00:00:00.000Z",
    target: "모집 대상: 전국 누구나",
    applyPeriod: { start: "2025-09-25T00:00:00.000Z", end: "2026-09-25T00:00:00.000Z" },
    announceDate: "2026-11-30T00:00:00.000Z",
    applyUrl: "https://example.com/activities/act_002/apply",
    descriptionBlocks: [
      { title: "공모 주제", body: "경기도 브랜드를 홍보할 수 있는 콘텐츠(숏폼/이미지/카피 등)" },
    ],
  },
  {
    id: "act_003",
    tab: "external",
    authorId: "user_master",
    title: "우리시장 홍보 콘텐츠 공모전",
    location: "전국",
    organizer: "시장상인회",
    tags: ["기획/아이디어", "디자인"],
    posterImg: "https://picsum.photos/seed/act_003_thumb/94/134",
    deadline: "2026-09-30T00:00:00.000Z",
    bookmarkCount: 5,
    isBookmarked: false,
    createdAt: "2025-09-10T00:00:00.000Z",
    target: "모집 대상: 대학생/일반인 누구나",
    applyPeriod: { start: "2026-09-10T00:00:00.000Z", end: "2026-09-30T00:00:00.000Z" },
    announceDate: "2026-11-30T00:00:00.000Z",
    applyUrl: "https://example.com/activities/act_003/apply",
    descriptionBlocks: [
      { title: "상세 안내", body: "지역 시장을 알릴 수 있는 영상/이미지 콘텐츠 제작 공모전입니다." },
    ],
  },
  {
        id: 'act_005',
        tab: "external",
        authorId: 'user_master',
        title: "나라사랑 공모전 나라사랑 공모전 나라사랑 공모전 공모전전전",
        organizer: "부산광역시",
        location: "부산",
        tags: ["광고/마케팅", "기획/아이디어"],
        posterImg: "https://picsum.photos/seed/act_001/94/134",
        deadline: "2026-09-30T00:00:00.000Z",
        bookmarkCount: 12,
        isBookmarked: false,
        createdAt: "2025-10-01T00:00:00.000Z",
        target: "모집 대상: 대학생/일반인 누구나",
        applyPeriod: { start: "2026-09-10T00:00:00.000Z", end: "2026-09-30T00:00:00.000Z" },
        announceDate: "2026-11-30T00:00:00.000Z",
        applyUrl: "https://example.com/activities/act_003/apply",
        descriptionBlocks: [
            { title: "상세 안내", body: "지역 시장을 알릴 수 있는 영상/이미지 콘텐츠 제작 공모전입니다." },
        ],
    },
    {
        id: "act_006",
        tab: "job",
        title: "현대 종합 금속",
        authorId: "user_master",
        content:"기계사업본부 신입/경력사원 모집",
        tags: ["개발", "기타"],
        posterImg: "https://picsum.photos/seed/act_006_thumb/94/134",
        deadline: "2026-02-15T00:00:00.000Z",
        bookmarkCount: 61,
        isBookmarked: true,
        createdAt: "2025-10-05T00:00:00.000Z",
        target: "모집 대상: 대학생/일반인 누구나",
        applyPeriod: { start: "2026-09-10T00:00:00.000Z", end: "2026-09-30T00:00:00.000Z" },
        announceDate: "2026-11-30T00:00:00.000Z",
        applyUrl: "https://example.com/activities/act_003/apply",
        descriptionBlocks: [
            { title: "상세 안내", body: "지역 시장을 알릴 수 있는 영상/이미지 콘텐츠 제작 공모전입니다." },
        ],
    },
];


//team recruit post 데이터
export const MOCK_TEAM_RECRUIT_DETAILS: TeamRecruitDetail[] = [
  {
    id: "trp_001",
    activityId: "act_2026_001",
    authorId: "u_1001",
    authorName: "김은지",
    activityName: "2026 창업 아이디어톤",
    recruitNow: true,
    bookmarkCount: 42,
    createdAt: "2026-01-31T01:12:00.000Z",
    title: "창업 아이디어톤 같이 나갈 디자이너/FE 구해요",

    isBookmarked: false,
    applyUrl: "https://example.com/activities/act_2026_001",
    authorMajor: "경영학부",
    authorGrade: "23",
    authorProfile:"https://picsum.photos/seed/temp/200/200",

    recruitDeadline: "2026-02-10T23:59:59.999Z",
    recruitTeamNumber: 4,

    description:
      "아이디어톤 참가 팀을 꾸리고 있어요. 현재 기획 1(저), BE 1이 있고 디자이너 1 + FE 1을 찾습니다.\n\n- 목표: 문제 정의 → MVP 프로토타입 → 발표 자료까지\n- 스택: Figma(필수), React(가능하면), 협업은 Notion/Slack\n- 일정: 마감 전까지 최소 3회(온라인 가능)\n\n관심 있으면 전공/학년/가능한 역할/연락 가능한 시간대 알려주세요!",
  },

  {
    id: "trp_002",
    activityId: "act_2026_002",
    authorId: "u_1002",
    authorName: "박원빈",
    activityName: "교내 해커톤 2026 Winter",
    recruitNow: true,
    bookmarkCount: 18,
    createdAt: "2026-02-01T12:40:00.000Z",
    title: "React + Spring 해커톤 팀원 모집 (BE 1, FE 1)",

    isBookmarked: false,
    applyUrl: "https://example.com/activities/act_2026_002",
    authorMajor: "컴퓨터공학부",
    authorGrade: "16",
    authorProfile:"https://picsum.photos/seed/temp/200/200",

    recruitDeadline: "2026-02-06T23:59:59.999Z",
    recruitTeamNumber: 5,

    description:
      "48시간 해커톤 팀원 모집합니다!\n\n- 아이디어: 학교/동아리 전용 익명 제보 + 처리상태 공개 플랫폼\n- FE: React + TS (Zustand, Tailwind) / BE: Spring Boot\n- 현재: 기획 1, FE 1(저) 있음 → BE 1, FE 1 추가 모집\n\n협업 경험 없어도 괜찮고, 커밋 컨벤션/이슈 관리 같이 맞춰가요. 가능하면 포트폴리오 링크도 같이 보내주면 좋아요.",
  },

  {
    id: "trp_003",
    activityId: "act_2026_003",
    authorId: "u_1003",
    authorName: "정태호",
    activityName: "AI 서비스 기획 공모전",
    recruitNow: false,
    bookmarkCount: 63,
    createdAt: "2026-01-20T04:05:00.000Z",
    title: "AI 서비스 기획 공모전 팀원 모집 (기획/데이터) — 모집 완료",

    isBookmarked: true,
    applyUrl: "https://example.com/activities/act_2026_003",
    authorMajor: "산업공학과",
    authorGrade: "21",
    authorProfile:"https://picsum.photos/seed/temp/200/200",

    recruitDeadline: "2026-01-25T23:59:59.999Z",
    recruitTeamNumber: 6,

    description:
      "모집 완료되었습니다. 관심 가져주셔서 감사합니다!\n\n추가로 다음 공모전 때도 비슷한 주제로 팀 꾸릴 예정이라, 네트워킹 희망하시면 메시지 남겨주세요.",
  },

  {
    id: "trp_004",
    activityId: "act_2026_004",
    authorId: "user_002",
    authorName: "박원빈",
    activityName: "UX 챌린지 2026",
    recruitNow: true,
    bookmarkCount: 9,
    createdAt: "2026-02-02T00:18:00.000Z",
    title: "UX 챌린지 같이 할 PM/리서처 구해요",

    isBookmarked: true,
    applyUrl: "https://example.com/activities/act_2026_004",
    authorMajor: "미디어디자인학부",
    authorGrade: "19",
    authorProfile:"https://picsum.photos/seed/temp/200/200",

    recruitDeadline: "2026-02-12T23:59:59.999Z",
    recruitTeamNumber: 3,

    description:
      "UX 챌린지 주제가 '일상 속 불편 개선'이라 사용자 리서치/문제정의 중심으로 진행하려고 합니다.\n\n- 찾는 역할: PM(프로세스 관리), 리서처(인터뷰/설문)\n- 산출물: 리서치 인사이트, 와이어프레임, 프로토타입\n- 미팅: 주 2회(온라인 가능)\n\n경험보다 책임감 있게 같이 해볼 분이면 좋아요!",
  },

  {
    id: "trp_005",
    activityId: "act_2026_005",
    authorId: "user_002",
    authorName: "박원빈",
    activityName: "교외 공모전 (브랜딩/콘텐츠)",
    recruitNow: true,
    bookmarkCount: 27,
    createdAt: "2026-02-02T08:55:00.000Z",
    title: "브랜딩 공모전: 콘텐츠 기획/디자인 팀원 구합니다",

    isBookmarked: false,
    applyUrl: "https://example.com/activities/act_2026_005",
    authorMajor: "미디어디자인학부",
    authorGrade: "20",
    authorProfile:"https://picsum.photos/seed/temp/200/200",

    recruitDeadline: "2026-02-15T23:59:59.999Z",
    recruitTeamNumber: 4,

    description:
      "브랜딩 공모전 팀을 꾸리고 있습니다.\n\n- 현재: 디자인 1(저), 기획 1\n- 모집: 콘텐츠 기획 1, 디자인 1(그래픽/편집), 필요시 영상 1\n- 방향: 타겟 정의 → 브랜드 메시지 → 콘텐츠 패키지 제작\n\n작업물 퀄리티를 중요하게 생각해서, 가능하면 이전 작업물(Behance/노션/드라이브) 공유 부탁드려요.",
  },
];