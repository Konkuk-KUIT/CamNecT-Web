import type { UserProfileDetail } from "../types/mypage/mypageTypes";

export const MOCK_SESSION = {
  meUid: "user_002" as string, //현재 로그인되어 있는 유저id
};

export const MOCK_PROFILE_DETAIL_BY_UID: Record<string, UserProfileDetail> = {
  user_001: {
    user: {
      uid: "user_001",
      name: "박익명",
      profileImg: "https://picsum.photos/seed/user_001/100/100",

      univ: "세종대학교",
      major: "컴퓨터공학과",
      gradeNumber: "23",
      introduction: "프론트엔드로 UI 구현 중입니다.",

      userTags: [],

      follower: 3,
      following: 10,

      point: 200,
    },
    visibility: {
      isFollowerVisible: true,
      educationVisibility: true,
      careerVisibility: true,
      certificateVisibility: true,
    },
    educations: [{ id: "edu_001_1", school: "가나다대학교", status: "ATTENDING", startYear: 2024, endYear: 2026 }],
    careers: [],
    certificates: [{ id: "cert_001_1", name: "정보처리기사", acquiredYear: 2025, acquiredMonth: 11 }],
  },

  user_002: {
    user: {
      uid: "user_002",
      name: "박원빈",
      profileImg: "https://picsum.photos/seed/user_002/100/100",

      univ: "건국대학교",
      major: "시각디자인학과",
      gradeNumber: "19",
      introduction: "현재 UX&UI 분야에서 일하고있습니다!\n관심있으신분들은 커피챗 주세요!",

      userTags: [],

      follower: 1,
      following: 2,

      point: 1230,
    },
    visibility: {
        isFollowerVisible: true,
        educationVisibility: true,
        careerVisibility: true,
        certificateVisibility: true,
    },
    educations: [
        { id: "edu_002_1", school: "이화여자대학교", status: "ATTENDING", startYear: 2019, endYear: 2020},
        { id: "edu_002_2", school: "동경미술대학", status: "TRANSFERRED", startYear: 2020, endYear: 2021 },
        { id: "edu_002_3", school: "이화여자대학교", status: "GRADUATED", startYear: 2024 , endYear: 2025},
    ],
    careers: [
        { id: "car_002_1", organization: "아모레퍼시픽", positions: ["디자인 총괄", "OO 프로젝트 참여"], startYear: 2015, startMonth: 1, endYear: 2020, endMonth: 4 },
        { id: "car_002_2", organization: "어플라이드 머티리얼즈 코리아", positions: ["컨텐츠 디렉터"], startYear: 2017, startMonth: 3, endYear: undefined, endMonth: undefined }
    ],
    certificates: [{ id: "cert_002_1", name: "전기기사", acquiredYear: 2025, acquiredMonth: 2 }],
  },

  user_003: {
    user: {
      uid: "user_003",
      name: "김익명",
      profileImg: "https://picsum.photos/seed/user_003/100/100",

      univ: "한양대학교",
      major: "산업디자인학과",
      gradeNumber: "20",
      introduction: "브랜딩과 서비스 디자인에 관심이 많아요.",

      userTags: [],

      follower: 0,
      following: 1,
      
      point: 530,
    },
    visibility: {
      isFollowerVisible: true,
      educationVisibility: true,
      careerVisibility: true,
      certificateVisibility: true,
    },
    educations: [{ id: "edu_003_1", school: "건국대학교", status: "ATTENDING", startYear: 2020, endYear: 2022 }],
    careers: [],
    certificates: [{ id: "cert_003_1", name: "컴활 1급", acquiredYear: 2021, acquiredMonth: 6 }],
  },

  user_004: {
    user: {
      uid: "user_004",
      name: "정민호",
      profileImg: "https://picsum.photos/seed/user_004/100/100",
      univ: "한양대학교",
      major: "미디어디자인학부",
      gradeNumber: "15",
      introduction: "영상 콘텐츠 기획과 연출을 담당하고 있습니다.",
      userTags: [],
      follower: 0,
      following: 0,
      point: 420,
    },
    visibility: {
      isFollowerVisible: true,
      educationVisibility: false,
      careerVisibility: true,
      certificateVisibility: false,
    },
    educations: [{ id: "edu_004_1", school: "건국대학교", status: "GRADUATED", startYear: 2012, endYear: 2016 }],
    careers: [
      { id: "car_004_1", organization: "비주얼하우스", positions: ["영상 기획", "콘텐츠 연출"], startYear: 2016, startMonth: 2, endYear: 2019, endMonth: 12 }
    ],
    certificates: [{ id: "cert_004_1", name: "영상편집 전문가", acquiredYear: 2016, acquiredMonth: 7 }],
  },
};
