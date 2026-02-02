// ISO/Date 입력을 상대 시간 텍스트로 변환
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
