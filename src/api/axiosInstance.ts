import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

// Axios 인스턴스 설정
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 9500,
    headers: {
        "Content-Type": "application/json",
    }
});

// [요청] 모든 API 요청 앞에 자동으로 토큰을 붙여줍니다.
axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// [응답] 에러가 났을 때(특히 토큰 만료) 처리합니다.
axiosInstance.interceptors.response.use(
    (response) => response, // 성공하면 그냥 통과
    async (error) => {
        const originalRequest = error.config;

        // 1. 401(토큰 만료) 에러가 났고, 아직 한 번도 직접 재시도를 안 했다면
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한 반복 방지 (딱 한 번만 다시 해보기)

            try {
                const refreshToken = useAuthStore.getState().refreshToken;

                // 2. 서버에 새 토큰을 달라고 요청합니다. (이때는 순수 axios 사용)
                const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`, {
                    refreshToken
                });

                const { accessToken, refreshToken: newRefreshToken } = res.data.data;

                // 3. 새로 받은 토큰들을 전역 상태(Zustand)에 업데이트합니다.
                useAuthStore.getState().setLogin(accessToken, newRefreshToken, useAuthStore.getState().user!);

                // 4. 실패했던 원래 요청에 새 토큰을 갈아 끼워서 다시 보냅니다.
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest); 
            } catch (err) {
                // 만약 리프레시 토큰까지 만료되어 살리기에 실패하면 로그아웃 시킵니다.
                useAuthStore.getState().setLogout();
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);