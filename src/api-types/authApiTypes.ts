// API Request Body 타입 정의

// 로그인 DTO (/api/auth/login)
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

export interface SchoolVerificationResponse {
  submissionId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'Canceled'; 
  submittedAt: string;
}

export interface SignupRequestBody {
  email: string;
  userName: string;
  password: string;
  name: string;
  phoneNum: string;
  agreements: {
    serviceTerms: boolean;
    privacyTerms: boolean;
  };
}

export interface SchoolInfoResponse {
    name: string;
    studentId: string;
    univ: string;
    major: string;
}