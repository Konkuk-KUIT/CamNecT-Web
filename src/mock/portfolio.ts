import type { Portfolio, UserId } from "../types/portfolio/portfolioTypes";

export const MOCK_PORTFOLIOS_BY_OWNER_ID: Record<UserId["id"], Portfolio[]> = {
  user_001: [
    {
      portfolioId: "pf_001_1",
      id: "user_001",
      title: "나의 프로젝트 1",
      content:
        "UI 구현 + 폼 설계 중심의 작업입니다.\n" +
        "react-hook-form을 적용했고, mock 데이터를 기반으로 화면을 구성했습니다.",
      thumbnailUrl: "https://picsum.photos/seed/pf_001_1/600/400",
      images: [{ portfolioImgId: "img_001_1", url: "https://picsum.photos/seed/pf_001_1_img1/900/700" }],
      createdAt: "2025.11.11",
      updatedAt: "2025.11.11",
      viewCount: 5,
      portfolioVisibility: true,
    },
  ],

  user_002: [
    {
      portfolioId: "pf_002_1",
      id: "user_002",
      title: "프로젝트 1",
      content:
        "프로젝트 설명을 길게 적는 영역입니다.\n" +
        "1) 문제 정의\n2) 해결 과정\n3) 결과/배운 점",
      thumbnailUrl: "https://picsum.photos/seed/pf_002_1/600/400",
      images: [
        { portfolioImgId: "img_002_1_1", url: "https://picsum.photos/seed/pf_002_1_img1/900/700" },
        { portfolioImgId: "img_002_1_2", url: "https://picsum.photos/seed/pf_002_1_img2/900/700" },
      ],
      createdAt: "2025.11.11",
      updatedAt: "2025.11.11",
      viewCount: 27,
      portfolioVisibility: true,
    },
    {
      portfolioId: "pf_002_2",
      id: "user_002",
      title: "프로젝트 2",
      content:
        "브랜딩 프로젝트 소개\n" +
        "- 로고 컨셉\n- 컬러 시스템\n- 응용 디자인\n" +
        "케이스 스터디를 정리했습니다.",
      thumbnailUrl: "https://picsum.photos/seed/pf_002_2/600/400",
      images: [{ portfolioImgId: "img_002_2_1", url: "https://picsum.photos/seed/pf_002_2_img1/900/700" }],
      createdAt: "2025.10.28",
      updatedAt: "2025.10.30",
      viewCount: 9,
      portfolioVisibility: true,
    },
    {
      portfolioId: "pf_002_3",
      id: "user_002",
      title: "프로젝트 3",
      content:
        "브랜딩 프로젝트 소개\n" +
        "- 로고 컨셉\n- 컬러 시스템\n- 응용 디자인\n" +
        "케이스 스터디를 정리했습니다.",
      thumbnailUrl: "https://picsum.photos/seed/pf_002_4/600/400",
      images: [{ portfolioImgId: "img_002_3_1", url: "https://picsum.photos/seed/pf_002_3_img1/900/700" }],
      createdAt: "2025.01.28",
      updatedAt: "2025.01.30",
      viewCount: 9,
      portfolioVisibility: false,
    },
  ],
};

