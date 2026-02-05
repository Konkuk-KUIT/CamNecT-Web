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

// 학교 인증서 업로드용 presign 발급 API DTO (/api/verification/documents/uploads/presign)
export interface SchoolVerificationPresignRequest {
  userId: number;
  contentType: string;
  size: number;
  originalFilename: string;
}

export interface SchoolVerificationPresignResponse {
  fileKey: string;
  uploadUrl: string;
  expiresAt: string;
  requiredHeaders: Record<string, string>;  
}

// 학교 인증서 업로드 제출 API DTO (/api/verification/documents)
export type SchoolDocType = 'ENROLLMENT_CERTIFICATE' | 'GRADUATION_CERTIFICATE';
export type SchoolVerificationStatusType = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';

export interface SchoolVerificationUploadRequest {
  userId: number;
  docType: SchoolDocType;
  documentKey: string;
}

export interface SchoolVerificationUploadResponse {
  submissionId: number;
  status: SchoolVerificationStatusType;
  submittedAt: string;
}

// 프로필 사진 presign 발급 API DTO (/api/profile/uploads/presign)
export interface ProfileImagePresignRequest {
  userId: number;
  contentType: string;
  size: number;
  originalFilename: string;
}

export interface ProfileImagePresignResponse {
  status: number;
  message: string;
  data: {
    fileKey: string;
    uploadUrl: string;
    expiresAt: string;
    requiredHeaders: Record<string, string>;
  };
}

// 프로필 이미지, 자기소개, 관심태그 전송 DTO (/api/profile/onboarding)
export interface ProfileOnboardingRequest {
  userId: number;
  profileImageKey?: string | null;
  bio?: string | null;
  tagIds?: number[] | null;
}

export interface ProfileOnboardingResponse {
  status: number;
  message: string;
  data: {
    status: string; // ex, 'EMAIL_PENDING'
  };
}

// 관리자 인증서 리스트 조회 DTO (/api/admin/verification/documents)
export interface AdminVerificationListRequest {
  status?: SchoolVerificationStatusType; // PENDING / APPROVED / REJECTED 
  page?: number;     // 페이지 번호 (0부터 시작)
  size?: number;     // 페이지 당 항목 수
  sort?: string[];   // 정렬 기준 (예: ["submittedAt,desc"]) // 정렬기준 X 
}

export interface AdminVerificationItem {
  submissionId: number;
  status: SchoolVerificationStatusType;
  docType: SchoolDocType;
  submittedAt: string;
  userId: number;
  username: string;
  phoneNum: string;
}

export interface AdminVerificationListResponse {
  totalElements: number;
  totalPages: number;
  pageable: {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  content: AdminVerificationItem[];
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}



export interface SchoolInfoResponse {
    name: string;
    studentId: string;
    univ: string;
    major: string;
}