export type AuthorProfile = {
  name: string;
  major: string;
  studentId: string;
  isAlumni?: boolean;
};

export type InfoPost = {
  id: string;
  author: AuthorProfile;
  categories: string[];
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  createdAt: string;
};

export type QuestionPost = {
  id: string;
  author: AuthorProfile;
  categories: string[];
  title: string;
  content: string;
  imageUrl?: string;
  answers: number;
  createdAt: string;
};

export type ChatPost = {
  id: string;
  author: AuthorProfile;
  categories: string[];
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  createdAt: string;
};

export const loggedInUserMajor = '컴퓨터공학부';

export const infoPosts: InfoPost[] = [
  {
    id: 'info-1',
    author: { name: '박원빈', major: '컴퓨터공학부', studentId: '20', isAlumni: true },
    categories: ['취업', '이직'],
    title: '올해 상반기 이직 준비 팁 모음',
    content:
      '이직 준비하면서 도움이 되었던 자료와 스터디 방법을 정리했어요. 면접 대비 시뮬레이션도 공유합니다. 많은 관심 부탁드려요',
    likes: 24,
    comments: 6,
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'info-2',
    author: { name: '김은지', major: '경영학부', studentId: '22', isAlumni: false },
    categories: ['인턴', '글로벌'],
    title: '글로벌 인턴십 Q&A 세션 자료 공유',
    content: '해외 인턴 준비 과정에서 정리한 자료와 발표 슬라이드를 업로드합니다.',
    likes: 12,
    comments: 3,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'info-3',
    author: { name: '이도윤', major: '미디어디자인학부', studentId: '19', isAlumni: true },
    categories: ['포트폴리오', '디자인'],
    title: '신입 디자이너 포트폴리오 구성법',
    content: '최근 제출했던 포폴 페이지 구성과 리뷰받은 피드백을 정리했습니다.',
    likes: 31,
    comments: 11,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
];

export const questionPosts: QuestionPost[] = [
  {
    id: 'question-1',
    author: { name: '장유진', major: '컴퓨터공학부', studentId: '23' },
    categories: ['코딩테스트', '취업'],
    title: 'PS 기초 다질 때 추천하는 문제집이 있을까요?',
    content: '1학년인데 어느 사이트 문제부터 풀면 좋을지 고민입니다.',
    answers: 0,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'question-2',
    author: { name: '박서준', major: '산업공학과', studentId: '21' },
    categories: ['교환학생', '어학'],
    title: '교환학생 서류 준비 일정 공유 부탁드립니다.',
    content: '가을학기 지원 일정과 필요한 어학 점수 컷이 궁금합니다.',
    answers: 3,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'question-3',
    author: { name: '정가을', major: '디자인컨버전스학부', studentId: '20' },
    categories: ['포트폴리오', '피드백'],
    title: '졸업전시 포트폴리오 피드백 받을 수 있을까요?',
    content: '레이아웃과 서체 선택 관련 의견을 듣고 싶습니다.',
    answers: 0,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

export const chatPosts: ChatPost[] = [
  {
    id: 'chat-1',
    author: { name: '최다인', major: '심리학부', studentId: '18' },
    categories: ['일상', '잡담'],
    title: '요즘 학교 앞 카페 어디가 조용한가요?',
    content: '스터디하기 좋은 조용한 카페 추천해주세요.',
    likes: 7,
    comments: 2,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'chat-2',
    author: { name: '윤시온', major: '전자공학부', studentId: '19' },
    categories: ['동아리', '공연'],
    title: '금요일 버스킹 같이 보러 갈 분?',
    content: '저녁 7시에 중앙도서관 앞에서 열리는 공연 보러 가요!',
    likes: 5,
    comments: 4,
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'chat-3',
    author: { name: '박민지', major: '컴퓨터공학부', studentId: '21' },
    categories: ['게임', '소모임'],
    title: '주말 보드게임 소모임 사람 구해요',
    content: '토요일 오후 3시에 캠퍼스 근처 카페에서 만나요!',
    likes: 14,
    comments: 9,
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
