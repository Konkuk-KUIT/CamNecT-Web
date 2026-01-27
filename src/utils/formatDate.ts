import dayjs from 'dayjs';

// 날짜 주입받고 오늘, 어제, 이틀전부터는 YY.MM.DD 형식으로 반환
export const formatDate = (isoDate: string) => {
  const target = dayjs(isoDate);
  const now = dayjs();

  if (target.isSame(now, 'day')) {
    return '오늘';
  }

  if (target.isSame(now.subtract(1, 'day'), 'day')) {
    return '어제';
  }

  return target.format('YY.MM.DD'); // 이틀전부터는 YY.MM.DD 형식으로
};