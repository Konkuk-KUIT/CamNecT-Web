// API Request Body 타입 정의

// 로그인 DTO (/api/auth/login)
// todo 정해지는대로 수정
export type LoginStatusType = 'SUCCESS' | 'FAILED';
export interface LoginRequest {
  username: string; // 아이디
  password: string;
}

export type UserRole = 'USER' | 'ADMIN';

export type NextStepType = 
  | 'HOME'
  | 'DOCUMENT_REQUIRED'
  | 'ONBOARDING_REQUIRED'
  | 'DOCUMENT_REVIEW_WAITING'
  | 'VERIFICATION_COMPLETE'
  | 'ADMIN_DASHBOARD';

export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresInMs: number;
  refreshTokenExpiresInMs: number;
  userId: number;
  status: string;
  role: UserRole;
  nextStep: NextStepType;
}

// 아이디 중복확인 DTO (/api/auth/{username}/available)
export interface IdDuplicateCheckRequest {
  username: string;
}

export type IdDuplicateCheckResponse = boolean;

// 이메일 인증번호 요청 DTO (api/auth/signup/email/send)
export interface EmailRequest {
  email: string;
}

export interface EmailResponse {
  email: string;
  expiresMinutes: number;
}

// 이메일 인증 및 가계정 회원가입 DTO (api/auth/signup/email/verify)
export interface EmailVerificationRequest {
  email: string;
  code: string;
  username: string;
  password: string;
  name: string;
  phoneNum: string;
  agreements: {
    serviceTerms: boolean;
    privacyTerms: boolean;
  };
}

export interface EmailVerificationResponse {
  userId: number;
  verificationToken: string;
  expiresMinutes: number;
}

// 학교 인증서 인증 요청 DTO (/api/verification/documents)
// 학교 인증서 종류 타입 추출
export type SchoolDocType = 'ENROLLMENT_CERTIFICATE' | 'GRADUATION_CERTIFICATE';

export interface SchoolVerificationRequest {
  userId: number;
  docType: SchoolDocType; 
  documentKey: string;
}

export type SchoolVerificationStatusType = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';

export interface SchoolVerificationResponse {
  submissionId: number;
  status: SchoolVerificationStatusType; 
  submittedAt: string;
}

// 학교 인증서 인증 대기화면 조회 API DTO (/api/verification/documents/me)
export interface SchoolVerificationStatusRequest {
  email: string;
}

export interface SchoolVerificationStatusItem {
  submissionId: number;
  docType: SchoolDocType; // 'ENROLLMENT_CERTIFICATE' 등
  status: SchoolVerificationStatusType; 
  submittedAt: string;
  reviewedAt: string | null; // 리뷰 전 일 가능성 -> null
}

export type SchoolVerificationStatusResponse = SchoolVerificationStatusItem[];



export interface SchoolInfoResponse {
    name: string;
    studentId: string;
    univ: string;
    major: string;
}