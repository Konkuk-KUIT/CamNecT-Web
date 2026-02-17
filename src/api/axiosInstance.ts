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

let isRefreshing = false;
let failedQueue: { resolve: (token: string | null) => void; reject: (error: unknown) => void }[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const url = originalRequest?.url ?? "";
        
        // 비밀번호 변경 시의 401은 강제 로그아웃 안 되도록 예외처리
        const isPasswordChange = url.includes("/api/profile/password");
        // 토큰 재발급 요청 자체가 401인 경우 체크
        const isRefreshUrl = url.includes("/api/auth/refresh");

        // 401 Unauthorized 에러이고, 리프레시 요청이 아니며, 비밀번호 변경이 아닐 때만 리프레시 시도
        if (status === 401 && !isPasswordChange && !isRefreshUrl && !originalRequest._retry) {
            
            if (isRefreshing) {
                // 이미 리프레시 중이라면 큐에 쌓아두고 나중에 한꺼번에 처리
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = useAuthStore.getState().refreshToken;

            // 리프레시 토큰이 없으면 그냥 로그아웃
            if (!refreshToken) {
                useAuthStore.getState().setLogout();
                return Promise.reject(error);
            }

            try {
                // 토큰 재발급 API 호출 (인터셉터 무한 루프 방지를 위해 axios 직속 호출)
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`, {
                    refreshToken
                });

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;
                const user = useAuthStore.getState().user;

                // 새로운 토큰 저장
                if (user) {
                    useAuthStore.getState().setLogin(newAccessToken, newRefreshToken, user);
                }

                // 대기 중이던 요청들 처리
                processQueue(null, newAccessToken);
                
                // 현재 원래 요청 재시도
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                // 리프레시 실패 시 큐에 대기 중인 모든 요청 거부 및 로그아웃
                processQueue(refreshError, null);
                useAuthStore.getState().setLogout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // 리프레시 토큰까지 만료되었거나 다른 401 에러인 경우
        if (status === 401 && !isPasswordChange) {
            console.log("Unauthorized(401) - Force Logout");
            useAuthStore.getState().setLogout();
        }

        return Promise.reject(error);
    }
);