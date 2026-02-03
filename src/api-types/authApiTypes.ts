// API Request Body 타입 정의

// 로그인 DTO (/api/auth/login)
// todo 정해지는대로 수정
export type LoginStatusType = 'SUCCESS' | 'FAILED';
export interface LoginRequest {
  username: string; // 아이디
  password: string;
}

export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresInMs: number;
  refreshTokenExpiresInMs: number;
  userId: number;
  status: string;
}

// 아이디 중복확인 DTO (/api/auth/{username}/available)
export interface IdDuplicateCheckRequest {
  username: string;
}

export type IdDuplicateCheckResponse = boolean;

// 이메일 인증번호 요청 DTO (/api/auth/signup) -> user가계정 생성
export interface EmailRequest {
  email: string;
  username: string;
  password: string;
  name: string;
  phoneNum: string;
  agreements: {
    serviceTerms: boolean;
    privacyTerms: boolean;
  };
}

export interface EmailResponse {
  userId: number; // userId 처음 생성
  status: string;
}

// 이메일 인증 번호 검증 DTO (/api/verification/email/verify-code)
export interface EmailVerificationRequest {
  email: string;
  code: string;
}

// 학교 인증서 인증 요청 DTO (/api/verification/documents)
// 학교 인증서 종류 타입 추출
export type SchoolDocType = 'ENROLLMENT_CERTIFICATE' | 'GRADUATION_CERTIFICATE';

export interface SchoolVerificationRequest {
  email: string;        
  docType: SchoolDocType; 
  documents: File[];     // 파일 객체 배열
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