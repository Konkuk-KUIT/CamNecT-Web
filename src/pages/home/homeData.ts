import type { RecommendBoxProps } from './components/RecommendBox';
import type { CoffeeChatRequest } from './components/CoffeeChatBox';
import type { Contest } from './components/ContestBox';

type Recommend = RecommendBoxProps;

const avatarPlaceholder =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='54' height='54'><rect width='54' height='54' fill='%23D5D5D5'/></svg>";
const posterPlaceholder =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='135' height='126'><rect width='135' height='126' fill='%23E5E7EB'/></svg>";

export const recommendList: Recommend[] = [
    {
        name: '신다은',
        profileImage: avatarPlaceholder,
        major: '컴퓨터공학부',
        studentId: '22',
        intro: 'AI 스타트업에서 백엔드 엔지니어로 근무 중입니다. 커리어 상담과 프로젝트 멘토링 가능해요.',
        categories: ['AI', '백엔드', '커리어', '프로젝트'],
    },
    {
        name: '박성윤',
        profileImage: avatarPlaceholder,
        major: '경영학부',
        studentId: '20',
        intro: 'VC 인턴 경험이 있어요. 투자 리서치/자소서 리뷰 해드립니다. 커피챗 환영합니다.',
        categories: ['투자', 'VC', '자기소개서', '커피챗'],
    },
    {
        name: '이주하',
        profileImage: avatarPlaceholder,
        major: '디자인학부',
        studentId: '21',
        intro: 'UI/UX 디자이너입니다. 포트폴리오 피드백과 디자인 툴 사용 팁 공유해요.',
        categories: ['UI/UX', '포트폴리오', '디자인 툴'],
    },
];

export const coffeeChatRequests: CoffeeChatRequest[] = [
    { name: '김하린', major: '컴퓨터공학부', studentId: '21' },
    { name: '남유진', major: '경제학부', studentId: '20' },
    { name: '정윤재', major: '디자인학부', studentId: '22' },
];

export const contests: Contest[] = [
    {
        title: '캠퍼스 친환경 아이디어 공모전',
        posterImgUrl: posterPlaceholder,
        organizer: '총학생회',
        location: '서울캠퍼스',
        deadline: '마감 11.24 (일) 23:59',
        views: 1240,
        comments: 32,
        isHot: true,
        isClosingSoon: false,
    },
    {
        title: 'AI 해커톤 with 스타트업',
        posterImgUrl: posterPlaceholder,
        organizer: '컴공학부 X 산학협력단',
        location: 'IT관 B1',
        deadline: 'D-3 | 11.27(수) 자정',
        views: 980,
        comments: 18,
        isHot: true,
        isClosingSoon: true,
    },
    {
        title: '로컬 브랜드 디자인 챌린지',
        posterImgUrl: posterPlaceholder,
        organizer: '디자인학부',
        location: '온라인',
        deadline: '12.05(목) 18:00',
        views: 542,
        comments: 9,
        isHot: false,
        isClosingSoon: true,
    },
];
