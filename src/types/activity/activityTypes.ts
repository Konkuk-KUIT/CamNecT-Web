// 공모전 공통 인터페이스
export interface Activity {
  id: string;          
  title: string;       
  organizer?: string;
  location?: string; 
  deadline?: string; // 2025.12.11
  posterImg?: string; 
  bookmarkCount: number;
  commentCount?: number;
}