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

// YY.MM.DD 형식으로 반환
export const formatOnlyDate = (isoDate: string) => {
  return dayjs(isoDate).format('YY.MM.DD');
};

// YYYY.MM.DD 형식으로 반환
export const formatDotDate = (isoDate: string) => {
  return dayjs(isoDate).format('YYYY.MM.DD');
};

//community/recruit 용
export const formatTimeAgo = (dateInput: string | number | Date) => {
  const targetDate = new Date(dateInput);
  if (Number.isNaN(targetDate.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();

  const minuteMs = 60 * 1000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;
  const weekMs = 7 * dayMs;
  const monthMs = 30 * dayMs;
  const yearMs = 365 * dayMs;

  if (diffMs < minuteMs) return '방금 전';

  const minutes = Math.floor(diffMs / minuteMs);
  if (minutes < 60) return `${minutes}분 전`;

  const hours = Math.floor(diffMs / hourMs);
  if (hours < 24) return `${hours}시간 전`;

  const days = Math.floor(diffMs / dayMs);
  if (days < 7) return `${days}일 전`;

  const weeks = Math.floor(diffMs / weekMs);
  if (weeks < 4) return `${weeks}주 전`;

  const months = Math.floor(diffMs / monthMs);
  if (months < 12) return `${months}개월 전`;

  const years = Math.floor(diffMs / yearMs);
  return `${years}년 전`;
};

//d-day 반환
export const getDDay = (targetDate: string): number => {
    const target = new Date(targetDate);
    const today = new Date();

    // 시간 부분을 제거하고 날짜만 비교
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // 밀리초 차이를 일수로 변환
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 양수만 반환 (음수면 0)
    return diffDays > 0 ? diffDays : 0;
};