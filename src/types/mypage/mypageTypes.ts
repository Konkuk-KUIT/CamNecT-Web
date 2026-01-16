import { type User } from "../user/userTypes";

export type EducationStatus = "ENROLLED" | "LEAVE" | "EXCHANGED" | "GRADUATED" | "DROPOUT" | "TRANSFERED";
// // User 공통 인터페이스 
// export interface User {
//   id: string; 
//   name: string; 
//   profileImg: string; 
//   major: string; 
//   gradeNumber: string; 
//   userTags: string[]; 
//   introduction: string; // 자기소개 (최대 75자, 3줄)
//   point: number; 
// }

export type UserPreview = Omit<User, "userTags"|"introduction"|"point">;

export interface UserProfile extends User {
  following: UserPreview[];
  follower: UserPreview[];

  isFollowCountPublic: boolean;
}

export interface EducationItem {
  id: string;
  school: string;
  status: EducationStatus;
  year: number;
  endYear: number;
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
}

export interface ProfileVisibility {
  portfolioVisibility: boolean;
  educationVisibility: boolean;
  careerVisibility: boolean;
  certificateVisibility: boolean;
}

//프로필 상세(학력/경력/자격증 등)까지 포함
export interface UserProfileDetail {
  user: UserProfile;
  visibility: ProfileVisibility;
  educations: EducationItem[];
  careers: CareerItem[];
  certificates: CertificateItem[];
}

export const EDUCATION_STATUS_KR: Record<EducationStatus, string> = {
  ENROLLED: "재학",
  LEAVE: "휴학",
  EXCHANGED: "교환",
  GRADUATED: "졸업",
  DROPOUT: "중퇴",
  TRANSFERED: "편입"
};