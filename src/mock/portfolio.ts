import type { PortfolioDetail, UserId } from "../types/portfolio/portfolioTypes";

export const MOCK_PORTFOLIOS_BY_OWNER_ID: Record<UserId["id"], PortfolioDetail[]> = {
  user_001: [
    {
      portfolioId: "pf_001_1",
      id: "user_001",
      title: "나의 프로젝트 1",

      portfolioThumbnail: "https://picsum.photos/seed/pf_001_1_thumb/600/400",

      updatedAt: "2025.11.11",
      portfolioVisibility: true,
      isImportant: false,

      content:
        "UI 구현 + 폼 설계 중심의 작업입니다.\n" +
        "react-hook-form을 적용했고, mock 데이터를 기반으로 화면을 구성했습니다.",

      startYear: 2025,
      startMonth: 10,
      endYear: 2025,
      endMonth: 11,

      role: "프론트엔드 개발",
      skills: "React, TypeScript, react-hook-form",

      portfolioImage: [
        "https://picsum.photos/seed/pf_001_1_img1/900/700",
        "https://picsum.photos/seed/pf_001_1_img2/900/700",
      ],
      portfolioPdf: [
        "https://example.com/mock/pf_001_1.pdf",
      ],
      portfolioLink: [
        "https://github.com/example/pf_001_1",
        "https://example.com/pf_001_1",
      ],

      problemSolution:
        "문제: 입력 폼 상태가 복잡해지면서 검증/에러처리가 산발적으로 증가.\n" +
        "해결: react-hook-form으로 검증 규칙을 일원화.\n" +
        "결과: 코드 중복 감소 및 UX 개선.",
    },
  ],

  user_002: [
    {
      portfolioId: "pf_002_1",
      id: "user_002",
      title: "프로젝트 11111111111111111",
      portfolioThumbnail: "https://picsum.photos/seed/pf_002_1_thumb/600/400",
      updatedAt: "2025.11.11",
      portfolioVisibility: true,
      isImportant: false,

      content:
        "프로젝트 설명을 길게 적는 영역입니다.\n" +
        "1) 문제 정의\n2) 해결 과정\n3) 결과/배운 점",

      startYear: 2025,
      startMonth: 9,
      endYear: 2025,
      endMonth: 11,

      role: "기획/디자인/개발 협업",
      skills: "Figma, React, Zustand",

      portfolioImage: [
        "https://picsum.photos/seed/pf_002_1_img1/900/700",
        "https://picsum.photos/seed/pf_002_1_img2/900/700",
      ],
      portfolioPdf: [],
      portfolioLink: ["https://example.com/pf_002_1"],

      problemSolution:
        "문제: 요구사항 변경이 잦아 구조가 흔들림.\n" +
        "해결: 화면 단위 데이터 모델을 고정하고 mock 기반으로 빠르게 검증.\n" +
        "결과: 변경 영향 범위 축소 및 재사용성 증가.",
    },
    {
      portfolioId: "pf_002_2",
      id: "user_002",
      title: "프로젝트 2",
      portfolioThumbnail: "https://picsum.photos/seed/pf_002_2_thumb/600/400",
      updatedAt: "2025.10.30",
      portfolioVisibility: true,
      isImportant: true,

      content:
        "브랜딩 프로젝트 소개\n" +
        "- 로고 컨셉\n- 컬러 시스템\n- 응용 디자인\n" +
        "케이스 스터디를 정리했습니다.",

      startYear: 2025,
      startMonth: 8,
      endYear: 2025,
      endMonth: 10,

      role: "브랜딩/디자인",
      skills: "Branding, Logo, Color system",

      portfolioImage: ["https://picsum.photos/seed/pf_002_2_img1/900/700"],
      portfolioPdf: ["https://example.com/mock/pf_002_2.pdf"],
      portfolioLink: ["https://example.com/pf_002_2"],

      problemSolution:
        "문제: 브랜드 메시지와 시각 요소의 일관성이 낮음.\n" +
        "해결: 톤앤매너 정의 후 로고/컬러/컴포넌트 시스템화.\n" +
        "결과: 확장 디자인에서도 일관성 유지.",
    },
    {
      portfolioId: "pf_002_3",
      id: "user_002",
      title: "프로젝트 3",
      portfolioThumbnail: "https://picsum.photos/seed/pf_002_3_thumb/600/400",
      updatedAt: "2025.01.30",
      portfolioVisibility: false,
      isImportant: true,

      content:
        "브랜딩 프로젝트 소개\n" +
        "- 로고 컨셉\n- 컬러 시스템\n- 응용 디자인\n" +
        "케이스 스터디를 정리했습니다.",

      startYear: 2024,
      startMonth: 12,
      endYear: 2025,
      endMonth: 1,

      role: "디자인 리서치",
      skills: "Case study, Typography",

      portfolioImage: ["https://picsum.photos/seed/pf_002_3_img1/900/700"],
      portfolioPdf: [],
      portfolioLink: ["https://example.com/pf_002_3"],
    },
  ],
  user_003: [],
};
