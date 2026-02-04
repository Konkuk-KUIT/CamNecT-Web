import type { EmailRequest, EmailResponse, EmailVerificationRequest, IdDuplicateCheckRequest, IdDuplicateCheckResponse, LoginRequest, LoginResponse } from "../api-types/authApiTypes";
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

// 3. 이메일 인증 번호 요청 API [POST] (/api/auth/signup) -> 추후 이름 변경 필요
export const requestEmailCode = async (data: EmailRequest) => {
    
    const response = await axiosInstance.post<EmailResponse>("/api/auth/signup", data);
    return response.data;
}

// 4. 이메일 인증 번호 검증 API [POST] (/api/verification/email/verify-code)
export const verifyEmailCode = async (data: EmailVerificationRequest) => {
    
    const response = await axiosInstance.post<void>("/api/verification/email/verify-code", data);
    return response.data;
}

// 5. 학교 인증서 인증 요청 API [POST] (/api/verification/documents)
// todo useImageUpload 수정해야되는지 알아보기


// 5. 관심태그 리스트 조회 API [GET] 

// 6. 학교 인증서 인증 대기화면 조회 API [GET] (/api/verification/documents/me)

// 7. (관리자) 인증 요청 리스트 확인 API (전체조회)

// 8. (관리자) 인증 요청 승인 API

// 9. (관리자) 인증 요청 거부 API

// 10. 학교 인증 완료 이메일 알림 API

// 11. 인증 완료 화면 요청 API 

// 12. 회원가입 요청 API