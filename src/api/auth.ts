import { axiosInstance } from "./axiosInstance";
import type { LoginRequest, LoginResponse, EmailVerificationRequest } from "../api-types/authApiTypes";

// 1. 로그인 API (/api/auth/login)
export const login = async (data: LoginRequest) => {

    const response = await axiosInstance.post<LoginResponse>("/api/auth/login", data);
    return response.data;
}

// 2. 이메일 인증 번호 요청 API

// 3. 이메일 인증 번호 검증 API (/api/verification/email/verify-code)
export const verifyEmailCode = async (data: EmailVerificationRequest) => {
    
    const response = await axiosInstance.post<void>("/api/verification/email/verify-code", data);
    return response.data;
}

// 4. 학교 인증서 인증 요청 API 

// 5. 관심태그 리스트 조회 API

// 6. (관리자) 인증 요청 리스트 확인 API (전체조회)

// 7. (관리자) 인증 요청 승인 API

// 8. (관리자) 인증 요청 거부 API

// 9. 학교 인증 완료 이메일 알림 API

// 10. 인증 완료 화면 요청 API 

// 11. 회원가입 요청 API