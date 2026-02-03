import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

// Axios 인스턴스 (API 모듈화)
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 9500, // Vercel Proxy는 10초이상 응답 지연 시 504 에러 발생 
    headers: {
        "Content-Type": "application/json",
    }
});

// Request Interceptor (요청 직전에 수행하는 작업)
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken =
            useAuthStore.getState().accessToken ?? import.meta.env.VITE_DEV_ACCESS_TOKEN;

        if (accessToken) {
            // 로그인된 유저의 accessToken 붙이기
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status = error.response?.status;

        // Unauthorized (비 로그인 접근 or Token 오류)
        if (status === 401) {
            console.log("Unauthorized(401)");
            // 토큰 만료 시 강제 로그아웃
            useAuthStore.getState().setLogout();
        }
        return Promise.reject(error);
    }
);
