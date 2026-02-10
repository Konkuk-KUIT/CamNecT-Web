import type { PortfolioDetail } from "../types/portfolio/portfolioTypes";

export const MOCK_PORTFOLIOS_BY_OWNER_ID: Record<PortfolioDetail["uid"], PortfolioDetail[]> = {
  user_001: [
    {
      portfolioId: "pf_001_1",
      uid: "user_001",
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
    {
      portfolioId: "pf_001_2",
      uid: "user_001",
      title: "서비스 모니터링 대시보드",
      portfolioThumbnail: "https://picsum.photos/seed/pf_001_2_thumb/600/400",
      updatedAt: "2025.09.12",
      portfolioVisibility: false,
      isImportant: false,
      content:
        "서비스 지표를 한 눈에 볼 수 있는 대시보드 프로젝트입니다.\n" +
        "에러 추적과 지표 시각화를 중심으로 구성했습니다.",
      startYear: 2025,
      startMonth: 6,
      endYear: 2025,
      endMonth: 9,
      role: "프론트엔드 개발",
      skills: "React, Recharts, REST API",
      portfolioImage: [
        "https://picsum.photos/seed/pf_001_2_img1/900/700",
      ],
      portfolioPdf: [],
      portfolioLink: ["https://example.com/pf_001_2"],
      problemSolution:
        "문제: 모니터링 지표가 흩어져 있어 빠른 대응이 어려움.\n" +
        "해결: 핵심 지표를 우선 순위별로 묶고 알림 흐름을 단순화.\n" +
        "결과: 장애 대응 시간 단축.",
    },
  ],

  user_002: [
    {
      portfolioId: "pf_002_1",
      uid: "user_002",
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
      uid: "user_002",
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
      uid: "user_002",
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
  user_003: [
    {
      portfolioId: "pf_003_1",
      uid: "user_003",
      title: "모바일 앱 리디자인",
      portfolioThumbnail: "https://picsum.photos/seed/pf_003_1_thumb/600/400",
      updatedAt: "2025.07.18",
      portfolioVisibility: true,
      isImportant: true,
      content:
        "기존 앱 UI를 재설계하여 사용성을 개선했습니다.\n" +
        "사용자 여정을 재정의하고 핵심 플로우를 단순화했습니다.",
      startYear: 2025,
      startMonth: 3,
      endYear: 2025,
      endMonth: 6,
      role: "UI/UX 디자인",
      skills: "Figma, UX Research, Prototyping",
      portfolioImage: [
        "https://picsum.photos/seed/pf_003_1_img1/900/700",
      ],
      portfolioPdf: ["https://example.com/mock/pf_003_1.pdf"],
      portfolioLink: ["https://example.com/pf_003_1"],
      problemSolution:
        "문제: 핵심 기능 도달 시간이 길어 이탈률이 높음.\n" +
        "해결: 주요 CTA를 상단에 배치하고 정보 구조 재정리.\n" +
        "결과: 온보딩 완료율 상승.",
    },
    {
      portfolioId: "pf_003_2",
      uid: "user_003",
      title: "UX 리서치 리포트",
      portfolioThumbnail: "https://picsum.photos/seed/pf_003_2_thumb/600/400",
      updatedAt: "2025.05.02",
      portfolioVisibility: false,
      isImportant: false,
      content:
        "사용자 인터뷰와 설문을 기반으로 리서치 리포트를 작성했습니다.",
      startYear: 2025,
      startMonth: 1,
      endYear: 2025,
      endMonth: 2,
      role: "리서처",
      skills: "Interview, Survey, Affinity mapping",
      portfolioImage: [
        "https://picsum.photos/seed/pf_003_2_img1/900/700",
      ],
      portfolioPdf: [],
      portfolioLink: ["https://example.com/pf_003_2"],
    },
  ],
  user_004: [
    {
      portfolioId: "pf_004_1",
      uid: "user_004",
      title: "브랜드 필름 제작",
      portfolioThumbnail: "https://picsum.photos/seed/pf_004_1_thumb/600/400",
      updatedAt: "2025.08.05",
      portfolioVisibility: true,
      isImportant: true,
      content:
        "브랜드 메시지를 영상으로 전달하는 필름을 기획/촬영/편집했습니다.\n" +
        "톤앤매너와 내러티브 구조를 설계했습니다.",
      startYear: 2025,
      startMonth: 4,
      endYear: 2025,
      endMonth: 7,
      role: "콘텐츠 기획/연출",
      skills: "Premiere Pro, After Effects, Storyboard",
      portfolioImage: [
        "https://picsum.photos/seed/pf_004_1_img1/900/700",
      ],
      portfolioPdf: ["https://example.com/mock/pf_004_1.pdf"],
      portfolioLink: ["https://example.com/pf_004_1"],
      problemSolution:
        "문제: 메시지 전달이 산발적이라 핵심 주제가 흐려짐.\n" +
        "해결: 서사 구조를 3막으로 정리하고 컷을 재배치.\n" +
        "결과: 브랜드 인지도 상승.",
    },
    {
      portfolioId: "pf_004_2",
      uid: "user_004",
      title: "콘텐츠 시리즈 연출",
      portfolioThumbnail: "https://picsum.photos/seed/pf_004_2_thumb/600/400",
      updatedAt: "2025.06.20",
      portfolioVisibility: false,
      isImportant: false,
      content:
        "콘텐츠 시리즈를 기획하고 주별 에피소드 구성과 촬영을 진행했습니다.",
      startYear: 2025,
      startMonth: 2,
      endYear: 2025,
      endMonth: 6,
      role: "프로덕션 총괄",
      skills: "촬영/편집, 일정 관리",
      portfolioImage: [
        "https://picsum.photos/seed/pf_004_2_img1/900/700",
      ],
      portfolioPdf: [],
      portfolioLink: ["https://example.com/pf_004_2"],
    },
  ],
};
