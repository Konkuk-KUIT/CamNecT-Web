import type { EducationStatus } from "../types/mypage/mypageTypes";

// ===== 학력 =====

// 학력 항목
export interface EducationItemAPI {
  educationId: number;
  schoolName: string;
  majorName: string;
  degree: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string | null;
  status: EducationStatus;
  description: string | null;
}

// 학력 목록 조회 응답
export interface EducationListResponse {
  status: number;
  message: string;
  data: EducationItemAPI[];
}

// 학력 추가/수정 요청
export interface EducationRequest {
  institutionId: number;
  startDate: string; // "YYYY-MM-DD"
  endDate: string | null;
  status: EducationStatus;
}

// 학력 추가 응답
export interface EducationAddResponse {
  status: number;
  message: string;
  data: string;
}

// 학력 수정 응답
export interface EducationUpdateResponse {
  status: number;
  message: string;
  data: string;
}

// 학력 삭제 응답
export interface EducationDeleteResponse {
  status: number;
  message: string;
  data: string;
}

// ===== 경력 =====

// 경력 항목
export interface ExperienceItemAPI {
  experienceId: number;
  companyName: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string | null;
  isCurrent: boolean;
  responsibilities: string[];
}

// 경력 목록 조회 응답
export interface ExperienceListResponse {
  status: number;
  message: string;
  data: ExperienceItemAPI[];
}

// 경력 추가/수정 요청
export interface ExperienceRequest {
  companyName: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string | null;
  isCurrent: boolean;
  responsibilities: string[];
}

// 경력 추가 응답
export interface ExperienceAddResponse {
  status: number;
  message: string;
  data: string;
}

// 경력 수정 응답
export interface ExperienceUpdateResponse {
  status: number;
  message: string;
  data: string;
}

// 경력 삭제 응답
export interface ExperienceDeleteResponse {
  status: number;
  message: string;
  data: string;
}

// ===== 자격증 =====

// 자격증 항목
export interface CertificateItemAPI {
  certificateId: number;
  certificateName: string;
  acquiredDate: string; // "YYYY-MM-DD"
  credentialUrl: string | null;
}

// 자격증 목록 조회 응답
export interface CertificateListResponse {
  status: number;
  message: string;
  data: CertificateItemAPI[];
}

// 자격증 추가/수정 요청
export interface CertificateRequest {
  certificateName: string;
  acquiredDate: string; // "YYYY-MM-DD"
}

// 자격증 추가 응답
export interface CertificateAddResponse {
  status: number;
  message: string;
  data: string;
}

// 자격증 수정 응답
export interface CertificateUpdateResponse {
  status: number;
  message: string;
  data: string;
}

// 자격증 삭제 응답
export interface CertificateDeleteResponse {
  status: number;
  message: string;
  data: string;
}