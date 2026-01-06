import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthState } from "../types/auth/authTypes";

// 앱 전체에서 사용하는 로그인 상태 관리

// persist: 새로고침 이후에도 로그인 상태를 유지하기 위함
// todo JS가 localstorage에 접근하면 토큰 탈취 가능 (추후에 HttpOnly Cookie로 보안강화 가능)
export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            accessToken: null,
            isAuthenticated: false,
            user: null,
            
            setLogin: (accessToken, user) => set({
                accessToken: accessToken,
                isAuthenticated: true,
                user: user
            }),
            setLogout: () => set({
                accessToken: null,
                isAuthenticated: false,
                user: null
            })
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
);