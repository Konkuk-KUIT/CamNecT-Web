export type AlumniProfile = {
  id: string;
  author: {
    name: string;
    major: string;
    studentId: string;
  };
  profileImage?: string;
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
    isFollowing: false,
    categories: ['UI/UX', '포트폴리오', '디자인'],
    intro: '스타트업 UI/UX 디자이너입니다. 디자인 툴 팁과 포트폴리오 구조 피드백 가능해요.',
    followingCount: 142,
    followerCount: 278,
  },
  {
    id: 'alumni-4',
    author: { name: '정민호', major: '미디어디자인학부', studentId: '15' },
    isFollowing: false,
    categories: ['영상', '콘텐츠', '기획'],
    intro: '콘텐츠 기획 및 영상 제작 실무를 경험했습니다. 취업 준비와 포트폴리오 개선을 도와드릴게요.',
    followingCount: 63,
    followerCount: 184,
  },
];
