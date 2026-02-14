const MAJOR_ID_TO_NAME: Record<number, string> = {
  3: "컴퓨터공학과",
  4: "경영학",
  5: "경제학",
  6: "심리학",
  8: "디자인",
  9: "미디어학",
  10: "정치외교",
  11: "법학",
  12: "교육학",
  13: "간호학",
  14: "의학",
  15: "약학",
  16: "생명공학",
  17: "화학공학",
  18: "기계공학",
  19: "건축학",
  20: "통계학",
  21: "사회학",
  22: "철학",
  23: "국어국문",
};

export const mapMajorIdToName = (majorId?: number | null) =>
  (majorId && MAJOR_ID_TO_NAME[majorId]) || "전공 미입력";
