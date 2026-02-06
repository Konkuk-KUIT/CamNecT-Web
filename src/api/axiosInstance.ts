import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { useCommunityErrorPopupStore } from "../store/useCommunityErrorPopupStore";

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
        const accessToken = useAuthStore.getState().accessToken;

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
        const url: string | undefined = error.config?.url;

        // Unauthorized (비 로그인 접근 or Token 오류)
        if (status === 401) {
            console.log("Unauthorized(401)");
            // 토큰 만료 시 강제 로그아웃
            useAuthStore.getState().setLogout();
        }

        if (url?.includes("/api/community")) {
            let popUpConfig;
            if (status === 403) {
                popUpConfig = {
                    title: "접근 권한이 없습니다",
                    content:
                        "요청하신 페이지를 볼 수 있는 권한이 없어요.\\n관리자에게 문의하시거나 권한을 확인해 주세요.",
                };
            } else if (status === 404) {
                popUpConfig = {
                    title: "원하시는 페이지를 찾을 수 없습니다",
                    content:
                        "요청하신 페이지는 존재하지 않는 주소입니다.\\n주소를 다시 한번 확인해 주세요.",
                };
            } else if (status === 500) {
                popUpConfig = {
                    title: "시스템 오류가 발생했습니다",
                    content:
                        "서비스 이용에 불편을 드려 죄송합니다.\\n잠시 후 다시 시도해 주세요.",
                };
            } else if (status) {
                popUpConfig = {
                    title: "서비스 이용에 불편을 드려 죄송합니다",
                    content:
                        "일시적인 오류로 요청을 처리하지 못했습니다.\\n잠시 후 다시 시도해 주세요.",
                };
            }

            if (popUpConfig) {
                useCommunityErrorPopupStore.getState().setPopUpConfig(popUpConfig);
            }
        }

        return Promise.reject(error);
    }
);
