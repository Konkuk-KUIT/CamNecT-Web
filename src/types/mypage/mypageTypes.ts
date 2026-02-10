export type EducationStatus = 'ATTENDING' | 'LEAVE_OF_ABSENCE' | 'GRADUATED' | 'EXCHANGE' | 'DROPPED_OUT' | 'TRANSFERRED';
// User 공통 인터페이스 
export interface User {
  uid: string; 
  name: string; 
  profileImg: string | null;
  univ: string;
  major: string; 
  gradeNumber: string; 
  userTags: string[]; 
  introduction: string; // 자기소개 (최대 75자, 3줄)
  following: number;
  follower: number;
  point: number; 
}

export type UserPreview = Omit<User, "userTags"|"introduction"|"point"|"univ">;

export interface UserProfile extends User {
  followingList: UserPreview[];
  followerList: UserPreview[];
}

export interface EducationItem {
  id: string;
  school: string;
  status: EducationStatus;
  startYear: number;
  endYear?: number;
}

export interface CareerItem {
  id: string;
  organization: string;
  positions: string[];
  startYear: number;
  startMonth: number;
  endYear?: number;
  endMonth?: number;
}

export interface CertificateItem {
  id: string;
  name: string;
  acquiredYear: number;
  acquiredMonth: number;
}

export interface ProfileVisibility {
  isFollowerVisible: boolean;
  educationVisibility: boolean;
  careerVisibility: boolean;
  certificateVisibility: boolean;
}

//프로필 상세(학력/경력/자격증 등)까지 포함
export interface UserProfileDetail {
  user: User;
  visibility: ProfileVisibility;
  educations: EducationItem[];
  careers: CareerItem[];
  certificates: CertificateItem[];
}

export const EDUCATION_STATUS_KR: Record<EducationStatus, string> = {
  ATTENDING: "재학",
  LEAVE_OF_ABSENCE: "휴학",
  EXCHANGE: "교환",
  GRADUATED: "졸업",
  DROPPED_OUT: "중퇴",
  TRANSFERRED: "편입"
};