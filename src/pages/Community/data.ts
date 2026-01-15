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
  authorProfileImageUrl?: string;
  postImageUrl?: string;
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


const sampleProfileImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0OCIgY3k9IjQ4IiByPSI0OCIgZmlsbD0iI0UwRThFNSIvPjxwYXRoIGQ9Ik00OCAyNEM1Ni4yODQgMjQgNjMgMzAuNzE2IDYzIDM5QzYzIDQ3LjI4NCA1Ni4yODQgNTQgNDggNTRDMzkuNzE2IDU0IDMzIDQ3LjI4NCAzMyAzOUMzMyAzMC43MTYgMzkuNzE2IDI0IDQ4IDI0WiIgZmlsbD0iI0I0QkJCRiIvPjxwYXRoIGQ9Ik0yOCA3NEMzMiA2NS4zMzMgNDEuMzMzIDYwIDQ4IDYwQzU0LjY2NyA2MCA2NCA2NS4zMzMgNjggNzRIMjhaIiBmaWxsPSIjQjRCQkJGIi8+PC9zdmc+';

const samplePostImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDE2MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMjAiIHJ4PSIxMiIgZmlsbD0iI0U5RjdGMSIvPjxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjEzNiIgaGVpZ2h0PSI3MiIgcng9IjgiIGZpbGw9IiNDOUU5RDgiLz48Y2lyY2xlIGN4PSI0MCIgY3k9Ijg4IiByPSIxMCIgZmlsbD0iIzg2RDVCMCIvPjxyZWN0IHg9IjU2IiB5PSI4MCIgd2lkdGg9IjcyIiBoZWlnaHQ9IjE2IiByeD0iOCIgZmlsbD0iI0E1RTFDNCIvPjwvc3ZnPg==';

export const infoPosts: InfoPost[] = [
  {
    id: 'info-1',
    author: { name: '박원빈', major: '컴퓨터공학부', studentId: '20', isAlumni: true },
    categories: ['취업', '이직'],
    title: '올해 상반기 이직 준비 팁 모음',
    content:
      '이직 준비하면서 도움이 되었던 자료와 스터디 방법을 정리했어요. 면접 대비 시뮬레이션도 공유합니다. 많은 관심 부탁드려요',
    authorProfileImageUrl: sampleProfileImage,
    postImageUrl: samplePostImage,
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
    id: 'info-4',
    author: { name: '정태호', major: '컴퓨터공학부', studentId: '18', isAlumni: true },
    categories: ['취업', '면접'],
    title: '백엔드 면접 준비 체크리스트',
    content: '프로젝트 설명 구조, CS 질문 대비, 코드리뷰 준비 팁을 정리했습니다.',
    authorProfileImageUrl: sampleProfileImage,
    postImageUrl: samplePostImage,
    likes: 18,
    comments: 4,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'info-5',
    author: { name: '서지윤', major: '컴퓨터공학부', studentId: '17', isAlumni: true },
    categories: ['포트폴리오', '프로젝트'],
    title: '졸업작품 발표 자료 구성법',
    content: '기획 의도와 핵심 기능을 전달하기 위한 슬라이드 구조를 공유합니다.',
    authorProfileImageUrl: sampleProfileImage,
    likes: 27,
    comments: 9,
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'info-6',
    author: { name: '남현우', major: '컴퓨터공학부', studentId: '16', isAlumni: true },
    categories: ['연구실', '진로'],
    title: '학부연구생 지원 과정 정리',
    content: '컨택 메일 작성, 교수님 인터뷰 준비, 필요한 역량을 정리했어요.',
    authorProfileImageUrl: sampleProfileImage,
    postImageUrl: samplePostImage,
    likes: 22,
    comments: 5,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'info-3',
    author: { name: '이도윤', major: '미디어디자인학부', studentId: '19', isAlumni: true },
    categories: ['포트폴리오', '디자인'],
    title: '신입 디자이너 포트폴리오 구성법',
    content: '최근 제출했던 포폴 페이지 구성과 리뷰받은 피드백을 정리했습니다.',
    authorProfileImageUrl: sampleProfileImage,
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
