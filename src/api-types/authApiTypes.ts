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

// 이메일 인증 요청 DTO (/api/verification/email/verify-code)
export interface EmailVerificationRequest {
  userId: number;
  code: string;
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

export interface SchoolVerificationResponse {
    name: string;
    studentId: string;
    univ: string;
    major: string;
}