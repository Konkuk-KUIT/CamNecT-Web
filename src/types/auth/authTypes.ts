import type { User } from "../user/userTypes";

// 로그인 전역상태의 인터페이스
export interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: User | null;
    setLogin: (accessToken: string, user: User) => void;
    setLogout: () => void;
}   