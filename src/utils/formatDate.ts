import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// 한국어 로케일 설정 (요일을 한국어로 출력하기 위함)
dayjs.locale('ko');

// 날짜 주입받고 오늘, 어제, 이틀전부터는 YY.MM.DD 형식으로 반환
// (채팅 리스트 용)
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

// "1월 15일 수요일" 형식으로 반환
export const formatFullDateWithDay = (isoDate: string) => {
  return dayjs(isoDate).format('M월 D일 dddd');
};

// HH:mm 형식으로 반환
export const formatTime = (isoDate: string) => {
  return dayjs(isoDate).format('HH:mm');
};

// YY.MM.DD HH:mm 형식으로 반환
export const formatFullDateWithTime = (isoDate: string) => {
  return dayjs(isoDate).format('YY.MM.DD HH:mm');
};

//community/recruit 용
export const formatDaysAgo = (isoDate: string) => {
  const target = dayjs(isoDate);
  const now = dayjs();

  const diffDays = now.startOf('day').diff(target.startOf('day'), 'day');

  // 오늘 ~ 7일 전
  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays >= 2 && diffDays <= 7) return `${diffDays}일 전`;

  // 1년 이상이면 n년 전
  const diffYears = now.startOf('day').diff(target.startOf('day'), 'year');
  if (diffYears >= 1) return `${diffYears}년 전`;

  // 그 외(8일 전 ~ 1년 미만): MM.DD
  return target.format('MM.DD');
};
