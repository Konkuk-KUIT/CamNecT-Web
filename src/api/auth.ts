import type { ProfileOnboardingRequest, ProfileOnboardingResponse, EmailRequest, EmailResponse, EmailVerificationRequest, EmailVerificationResponse, IdDuplicateCheckRequest, IdDuplicateCheckResponse, LoginRequest, LoginResponse, SchoolVerificationPresignRequest, SchoolVerificationPresignResponse, SchoolVerificationUploadRequest, SchoolVerificationUploadResponse, ProfileImagePresignRequest, ProfileImagePresignResponse } from "../api-types/authApiTypes";
import { axiosInstance } from "./axiosInstance";

// 1. 로그인 API [POST] (/api/auth/login)
export const login = async (data: LoginRequest) => {

    const response = await axiosInstance.post<LoginResponse>("/api/auth/login", data);
    return response.data; 
}

// 2. 아이디 중복확인 [GET] (/api/auth/{username}/available)
export const checkIdDuplicate = async (data: IdDuplicateCheckRequest) => {
    
    const response = await axiosInstance.get<IdDuplicateCheckResponse>(`/api/auth/${data.username}/available`);
    return response.data;
}

// 3. 이메일 인증 번호 요청 API [POST] (/api/auth/signup/email/send)
export const requestEmailCode = async (data: EmailRequest) => {
    
    const response = await axiosInstance.post<EmailResponse>("/api/auth/signup/email/send", data);
    return response.data;
}

// 4. 이메일 인증 번호 검증 API [POST] (/api/auth/signup/email/verify)
export const verifyEmailCode = async (data: EmailVerificationRequest) => {
    
    const response = await axiosInstance.post<EmailVerificationResponse>("/api/auth/signup/email/verify", data);
    return response.data;
}

// 5. 학교 인증서 업로드용 presign 발급 API [POST] (/api/verification/documents/uploads/presign)
export const requestSchoolVerificationPresign = async (data: SchoolVerificationPresignRequest) => {
    
    const response = await axiosInstance.post<SchoolVerificationPresignResponse>("/api/verification/documents/uploads/presign", data);
    return response.data;
}

// 6. 학교 인증서 인증 요청 API [POST] (/api/verification/documents)
export const requestSchoolVerification = async (data: SchoolVerificationUploadRequest) => {
    
    const response = await axiosInstance.post<SchoolVerificationUploadResponse>("/api/verification/documents", data);
    return response.data;
}

// 7. 프로필 이미지 업로드용 presign 발급 API [POST] (/api/profile/uploads/presign)
export const requestProfilePresign = async (data: ProfileImagePresignRequest) => {
    
    const response = await axiosInstance.post<ProfileImagePresignResponse>("/api/profile/uploads/presign", data);
    return response.data;
}

// 8. 관심태그 리스트 조회 API [GET] 

// 9. 프로필 이미지, 자기소개, 관심태그 전송 API [POST] (/api/profile/onboarding)
export const requestProfileOnboarding = async (data: ProfileOnboardingRequest) => {
    
    const response = await axiosInstance.post<ProfileOnboardingResponse>("/api/profile/onboarding", data);
    return response.data;
}

// 9. (관리자) 인증 요청 리스트 확인 API (전체조회)

// 8. (관리자) 인증 요청 승인 API

// 9. (관리자) 인증 요청 거부 API

// 10. 인증 완료 화면 요청 API 

// 11. 회원가입 요청 API