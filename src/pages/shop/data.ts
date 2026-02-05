export type ShopItem = {
  id: number;
  company: string;
  name: string;
  point: number;
  imageUrl?: string;
};

export const shopItems: ShopItem[] = [
  {
    id: 1,
    company: '스타벅스',
    name: '아이스 아메리카노 T',
    point: 5200,
  },
  {
    id: 2,
    company: '투썸플레이스',
    name: '아이스 카페라떼',
    point: 6100,
  },
  {
    id: 3,
    company: 'CU',
    name: '모바일 금액권 5,000원',
    point: 5000,
  },
  {
    id: 4,
    company: '배스킨라빈스',
    name: '싱글 레귤러',
    point: 4300,
  },
];
