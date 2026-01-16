import type { UserProfileDetail } from "../types/mypage/mypageTypes";

export const MOCK_SESSION = {
  meUid: "user_002" as string, //현재 로그인되어 있는 유저id
};

export const MOCK_PROFILE_DETAIL_BY_UID: Record<string, UserProfileDetail> = {
  user_001: {
    user: {
      id: "user_001",
      name: "박익명",
      profileImg: "https://picsum.photos/seed/user_001/100/100",

      major: "컴퓨터공학과",
      gradeNumber: "23",
      introduction: "프론트엔드로 UI 구현 중입니다.",

      userTags: ["React", "TypeScript", "UI"],

      follower: [
        {
          id: "user_002",
          name: "박원빈",
          profileImg: "https://picsum.photos/seed/user_002/100/100",

          major: "시각디자인학과",
          gradeNumber: "19",
        }
      ],
      following: [
        {
          id: "user_002",
          name: "박원빈",
          profileImg: "https://picsum.photos/seed/user_002/100/100",

          major: "시각디자인학과",
          gradeNumber: "19",
        }
      ],

      isFollowCountPublic: false,

      point: 200,
    },
    visibility: {
      portfolioVisibility: true,
      educationVisibility: true,
      careerVisibility: true,
      certificateVisibility: true,
    },
    educations: [{ id: "edu_001_1", school: "가나다대학교", status: "ENROLLED", startYear: 2024, endYear: 2026 }],
    careers: [],
    certificates: [{ id: "cert_001_1", name: "정보처리기사", acquiredYear: 2025, acquiredMonth: 11 }],
  },

  user_002: {
    user: {
      id: "user_002",
      name: "박원빈",
      profileImg: "https://picsum.photos/seed/user_002/100/100",

      major: "시각디자인학과",
      gradeNumber: "19",
      introduction: "현재 UX&UI 분야에서 일하고있습니다!\n관심있으신분들은 커피챗 주세요!",

      userTags: ["UX/UI", "취업", "포트폴리오", "피그마", "프로젝트"],

      follower: [
        {
          id: "user_001",
          name: "박익명",
          profileImg: "https://picsum.photos/seed/user_001/100/100",

          major: "컴퓨터공학과",
          gradeNumber: "23",
        },
        {
          id: "user_003",
          name: "김익명",
          profileImg: "https://picsum.photos/seed/user_003/100/100",

          major: "산업디자인학과",
          gradeNumber: "20",
        }
      ],
      following: [
        {
          id: "user_001",
          name: "박익명",
          profileImg: "https://picsum.photos/seed/user_001/100/100",

          major: "컴퓨터공학과",
          gradeNumber: "23",
        }
      ],

      isFollowCountPublic: true,
      point: 1230,
    },
    visibility: {
      portfolioVisibility: true,
      educationVisibility: true,
      careerVisibility: true,
      certificateVisibility: true,
    },
    educations: [
      { id: "edu_002_1", school: "이화여자대학교", status: "ENROLLED", startYear: 2019, endYear: 2020},
      { id: "edu_002_2", school: "동경미술대학", status: "EXCHANGED", startYear: 2020, endYear: 2021 },
      { id: "edu_002_3", school: "이화여자대학교", status: "GRADUATED", startYear: 2024 , endYear: 2025},
    ],
    careers: [{ id: "car_002_1", organization: "아모레퍼시픽", positions: ["디자인 총괄"], startYear: 2015, startMonth: 1, endYear: 2020, endMonth: 4 }],
    certificates: [{ id: "cert_002_1", name: "전기기사", acquiredYear: 2025, acquiredMonth: 2 }],
  },

  user_003: {
    user: {
      id: "user_003",
      name: "김익명",
      profileImg: "https://picsum.photos/seed/user_003/100/100",

      major: "산업디자인학과",
      gradeNumber: "20",
      introduction: "브랜딩과 서비스 디자인에 관심이 많아요.",

      userTags: ["브랜딩", "서비스디자인", "리서치"],

      follower: [],
      following: [
        {
          id: "user_002",
          name: "박원빈",
          profileImg: "https://picsum.photos/seed/user_002/100/100",

          major: "시각디자인학과",
          gradeNumber: "19",
        }
      ],

      isFollowCountPublic: true,
      
      point: 530,
    },
    visibility: {
      portfolioVisibility: true,
      educationVisibility: true,
      careerVisibility: true,
      certificateVisibility: true,
    },
    educations: [{ id: "edu_003_1", school: "건국대학교", status: "ENROLLED", startYear: 2020, endYear: 2022 }],
    careers: [],
    certificates: [{ id: "cert_003_1", name: "컴활 1급", acquiredYear: 2021, acquiredMonth: 6 }],
  },
};
