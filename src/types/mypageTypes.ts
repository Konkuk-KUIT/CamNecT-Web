export type UserId = string;

export type EducationStatus = "ENROLLED" | "LEAVE" | "EXCHANGED" | "GRADUATED";
export type CareerStatus = "EMPLOYED" | "RESIGNED";

export type PortfolioVisibility = "PUBLIC" | "PRIVATE";

export interface UserProfile {
  uid: UserId;
  name: string;

  profileImageURL: string;
  major: string;
  gradeNumber: string;
  introduction: string;
  tags: string[];

  followingIds: UserId[];
  followerIds: UserId[];

  isFollowerCountPublic: boolean;
  avgReplyMinutes: number;
}

export interface EducationItem {
  id: string;
  school: string;
  status: EducationStatus;
  year: number;
}

export interface CareerItem {
  id: string;
  organization: string;
  status: CareerStatus;
  year: number;
}

export interface CertificateItem {
  id: string;
  name: string;
  acquiredYear: number;
}

//프로필 상세(학력/경력/자격증 등)까지 포함
export interface UserProfileDetail {
  user: UserProfile;
  visibility: PortfolioVisibility;
  educations: EducationItem[];
  careers: CareerItem[];
  certificates: CertificateItem[];
}

export const EDUCATION_STATUS_KR: Record<EducationStatus, string> = {
  ENROLLED: "입학",
  LEAVE: "휴학",
  EXCHANGED: "교환",
  GRADUATED: "졸업",
};

export const CAREER_STATUS_KR: Record<CareerStatus, string> = {
  EMPLOYED: "입사",
  RESIGNED: "퇴사",
};