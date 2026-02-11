// User 공통 인터페이스 
export interface User {
  id: string; 
  name: string; 
  profileImg: string; 
  univ: string;
  major: string; 
  gradeNumber: string; 
  userTags: string[]; 
  introduction: string; // 자기소개 (최대 75자, 3줄)
  point: number; 
}