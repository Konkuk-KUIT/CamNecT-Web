export type TagCategory = {
  code: string;
  categoryId: number;
  tags: { id: number; name: string }[];
};

export const TAG_CATEGORIES: TagCategory[] = [
  {
    code: "field_major",
    categoryId: 1,
    tags: [
      { id: 15, name: "경영학" },
      { id: 16, name: "경제학" },
      { id: 17, name: "심리학" },
      { id: 18, name: "컴퓨터공학" },
      { id: 19, name: "디자인" },
      { id: 20, name: "미디어학" },
      { id: 21, name: "정치외교" },
      { id: 22, name: "법학" },
      { id: 23, name: "교육학" },
      { id: 24, name: "간호학" },
      { id: 25, name: "의학" },
      { id: 26, name: "약학" },
      { id: 27, name: "생명공학" },
      { id: 28, name: "화학공학" },
      { id: 29, name: "기계공학" },
      { id: 30, name: "건축학" },
      { id: 31, name: "통계학" },
      { id: 32, name: "사회학" },
      { id: 33, name: "철학" },
      { id: 34, name: "국어국문" },
    ],
  },
  {
    code: "job_skill",
    categoryId: 2,
    tags: [
      { id: 46, name: "기획" },
      { id: 47, name: "서비스기획" },
      { id: 48, name: "PM" },
      { id: 49, name: "PO" },
      { id: 50, name: "마케팅" },
      { id: 51, name: "데이터분석" },
      { id: 52, name: "프론트엔드" },
      { id: 53, name: "백엔드" },
      { id: 54, name: "iOS개발" },
      { id: 55, name: "안드로이드개발" },
      { id: 56, name: "AI/딥러닝" },
      { id: 57, name: "UI/UX디자인" },
      { id: 58, name: "영상편집" },
      { id: 59, name: "브랜딩" },
      { id: 60, name: "광고PR" },
      { id: 61, name: "영업" },
      { id: 62, name: "인사(HR)" },
      { id: 63, name: "회계/재무" },
      { id: 64, name: "전략컨설팅" },
      { id: 65, name: "공기업준비" },
    ],
  },
  {
    code: "activity_spec",
    categoryId: 3,
    tags: [
      { id: 77, name: "공모전" },
      { id: 78, name: "대외활동" },
      { id: 79, name: "서포터즈" },
      { id: 80, name: "동아리" },
      { id: 81, name: "학생회" },
      { id: 82, name: "연합동아리" },
      { id: 83, name: "봉사활동" },
      { id: 84, name: "인턴십" },
      { id: 85, name: "교환학생" },
      { id: 86, name: "어학연수" },
      { id: 87, name: "학부연구생" },
      { id: 88, name: "창업" },
      { id: 89, name: "해커톤" },
      { id: 90, name: "멘토링" },
      { id: 91, name: "교육봉사" },
    ],
  },
  {
    code: "certificate_interest",
    categoryId: 4,
    tags: [
      { id: 92, name: "토익" },
      { id: 93, name: "토플" },
      { id: 94, name: "오픽" },
      { id: 95, name: "토스" },
      { id: 96, name: "정보처리기사" },
      { id: 97, name: "ADsP" },
      { id: 98, name: "SQLD" },
      { id: 99, name: "컴활" },
      { id: 100, name: "한국사" },
      { id: 101, name: "CPA" },
      { id: 102, name: "로스쿨(LEET)" },
      { id: 103, name: "공무원시험" },
      { id: 104, name: "제2외국어" },
      { id: 105, name: "포토샵/일러" },
      { id: 106, name: "파이썬" },
    ],
  },
  {
    code: "community",
    categoryId: 5,
    tags: [
      { id: 107, name: "취업" },
      { id: 108, name: "이직" },
      { id: 109, name: "면접" },
      { id: 110, name: "포트폴리오" },
      { id: 111, name: "백엔드" },
      { id: 112, name: "교환학생" },
      { id: 113, name: "어학" },
      { id: 114, name: "코딩테스트" },
      { id: 115, name: "피드백" },
      { id: 116, name: "진로" },
      { id: 117, name: "멘토링" },
      { id: 118, name: "인턴" },
      { id: 119, name: "글로벌" },
      { id: 120, name: "프로젝트" },
      { id: 121, name: "연구실" },
      { id: 122, name: "디자인" },
    ],
  },
];

const TAG_NAME_TO_ID = new Map(
  TAG_CATEGORIES.flatMap((category) =>
    category.tags.map((tag) => [tag.name, tag.id] as const)
  )
);

export const mapTagNamesToIds = (names: string[]) =>
  names
    .map((name) => TAG_NAME_TO_ID.get(name))
    .filter((id): id is number => Number.isFinite(id));
