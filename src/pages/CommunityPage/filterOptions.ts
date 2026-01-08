export type MajorGroup = {
  college: string;
  departments: string[];
};

export type InterestGroup = {
  category: string;
  items: string[];
};

export const majorOptions: MajorGroup[] = [
  {
    college: '조형대학',
    departments: ['디자인컨버전스학부', '영상애니메이션학부', '조형예술학부'],
  },
  {
    college: '공과대학',
    departments: ['컴퓨터공학부', '기계공학부', '전기전자공학부', '화학공학과'],
  },
  {
    college: '사회과학대학',
    departments: ['경영학부', '경제학부', '심리학부'],
  },
];

export const interestOptions: InterestGroup[] = [
  {
    category: '학업',
    items: ['공부', '시험', '자격증'],
  },
  {
    category: '대외활동',
    items: ['동아리', '멘토링', '친목', '봉사'],
  },
  {
    category: '커리어',
    items: ['취업', '이직', '인턴'],
  },
];
