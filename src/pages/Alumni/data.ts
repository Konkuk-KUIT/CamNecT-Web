export type AlumniProfile = {
  id: string;
  author: {
    name: string;
    major: string;
    studentId: string;
  };
  profileImage?: string;
  privacy: {
    showFollowStats: boolean;
    showPortfolio: boolean;
    showEducation: boolean;
    showCareer: boolean;
    showCertificates: boolean;
  };
  portfolioItems: {
    id: string;
    title: string;
    image?: string;
  }[];
  educationItems: {
    id: string;
    period: string;
    school: string;
    status: string;
  }[];
  careerItems: {
    id: string;
    period: string;
    company: string;
    tasks: string[];
  }[];
  certificateItems: {
    id: string;
    date: string;
    name: string;
  }[];
  isFollowing: boolean;
  categories: string[];
  intro: string;
  followingCount: number;
  followerCount: number;
};

const profilePlaceholder =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='84' height='84'><rect width='84' height='84' fill='%23D5D5D5'/></svg>";

export const alumniList: AlumniProfile[] = [
  {
    id: 'alumni-1',
    author: { name: '김아린', major: '컴퓨터공학부', studentId: '18' },
    profileImage: profilePlaceholder,
    privacy: {
      showFollowStats: true,
      showPortfolio: true,
      showEducation: true,
      showCareer: true,
      showCertificates: true,
    },
    portfolioItems: [
      { id: 'portfolio-1', title: '캡스톤 프로젝트', image: undefined },
      { id: 'portfolio-2', title: '백엔드 아키텍처 리빌드', image: undefined },
      { id: 'portfolio-3', title: '서비스 모니터링 대시보드', image: undefined },
    ],
    educationItems: [
      { id: 'education-1', period: '2017~2019', school: '건국대학교', status: '졸업' },
      { id: 'education-2', period: '2013~2016', school: '건국여자고등학교', status: '졸업' },
    ],
    careerItems: [
      {
        id: 'career-1',
        period: '2017.03~2019.04',
        company: '아모레퍼시픽',
        tasks: ['컨텐츠 디렉터', 'OO 프로젝트 참여', 'XX 프로젝트 총괄 및 비주얼 디렉터'],
      },
      {
        id: 'career-2',
        period: '2019.05~2022.01',
        company: '에버그린 테크',
        tasks: ['백엔드 리드', '서비스 안정화 프로젝트', 'API 성능 개선'],
      },
    ],
    certificateItems: [
      { id: 'certificate-1', date: '2017.04', name: '자격증 이름 1' },
      { id: 'certificate-2', date: '2018.09', name: '정보처리기사' },
    ],
    isFollowing: false,
    categories: ['백엔드', '커리어', '면접'],
    intro:
      '대기업 백엔드 엔지니어로 근무 중입니다. 이력서/면접 준비와 커리어 방향 고민 상담 가능합니다.',
    followingCount: 128,
    followerCount: 256,
  },
  {
    id: 'alumni-2',
    author: { name: '박지훈', major: '경영학부', studentId: '16' },
    privacy: {
      showFollowStats: true,
      showPortfolio: false,
      showEducation: true,
      showCareer: true,
      showCertificates: true,
    },
    portfolioItems: [
      { id: 'portfolio-1', title: '브랜드 리뉴얼 캠페인', image: undefined },
      { id: 'portfolio-2', title: 'SNS 성장 전략', image: undefined },
      { id: 'portfolio-3', title: 'IMC 프로젝트', image: undefined },
    ],
    educationItems: [
      { id: 'education-1', period: '2014~2018', school: '건국대학교', status: '졸업' },
    ],
    careerItems: [
      {
        id: 'career-1',
        period: '2018.01~2020.08',
        company: '브랜드랩',
        tasks: ['브랜드 전략 수립', 'IMC 캠페인 운영'],
      },
    ],
    certificateItems: [
      { id: 'certificate-1', date: '2018.11', name: '디지털 마케팅 전문가' },
    ],
    isFollowing: true,
    categories: ['마케팅', '브랜딩', '포트폴리오'],
    intro: '브랜드 마케팅 실무 경험을 바탕으로 포트폴리오 피드백과 프로젝트 기획 조언 드립니다.',
    followingCount: 94,
    followerCount: 310,
  },
  {
    id: 'alumni-3',
    author: { name: '이서연', major: '디자인학부', studentId: '17' },
    profileImage: profilePlaceholder,
    privacy: {
      showFollowStats: false,
      showPortfolio: true,
      showEducation: true,
      showCareer: false,
      showCertificates: true,
    },
    portfolioItems: [
      { id: 'portfolio-1', title: '모바일 앱 리디자인', image: undefined },
      { id: 'portfolio-2', title: 'UX 리서치 리포트', image: undefined },
      { id: 'portfolio-3', title: '디자인 시스템 구축', image: undefined },
    ],
    educationItems: [
      { id: 'education-1', period: '2015~2019', school: '건국대학교', status: '졸업' },
    ],
    careerItems: [
      {
        id: 'career-1',
        period: '2019.03~2022.06',
        company: '크리에이티브 스튜디오',
        tasks: ['UI/UX 디자인', '디자인 시스템 운영'],
      },
    ],
    certificateItems: [{ id: 'certificate-1', date: '2020.02', name: 'UX 리서처' }],
    isFollowing: false,
    categories: ['UI/UX', '포트폴리오', '디자인'],
    intro: '스타트업 UI/UX 디자이너입니다. 디자인 툴 팁과 포트폴리오 구조 피드백 가능해요.',
    followingCount: 142,
    followerCount: 278,
  },
  {
    id: 'alumni-4',
    author: { name: '정민호', major: '미디어디자인학부', studentId: '15' },
    privacy: {
      showFollowStats: true,
      showPortfolio: true,
      showEducation: false,
      showCareer: true,
      showCertificates: false,
    },
    portfolioItems: [
      { id: 'portfolio-1', title: '브랜드 필름 제작', image: undefined },
      { id: 'portfolio-2', title: '다큐멘터리 기획', image: undefined },
      { id: 'portfolio-3', title: '콘텐츠 시리즈 연출', image: undefined },
    ],
    educationItems: [
      { id: 'education-1', period: '2012~2016', school: '건국대학교', status: '졸업' },
    ],
    careerItems: [
      {
        id: 'career-1',
        period: '2016.02~2019.12',
        company: '비주얼하우스',
        tasks: ['영상 기획', '콘텐츠 연출', '브랜드 영상 제작'],
      },
    ],
    certificateItems: [
      { id: 'certificate-1', date: '2016.07', name: '영상편집 전문가' },
    ],
    isFollowing: false,
    categories: ['영상', '콘텐츠', '기획'],
    intro: '콘텐츠 기획 및 영상 제작 실무를 경험했습니다. 취업 준비와 포트폴리오 개선을 도와드릴게요.',
    followingCount: 63,
    followerCount: 184,
  },
];
