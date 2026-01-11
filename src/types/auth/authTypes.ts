import type { User } from "../user/userTypes";

// 로그인 전역상태의 인터페이스

export type AuthUser = Pick<User, 'id' | 'name'>;

export interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: AuthUser | null;
    setLogin: (accessToken: string, user: AuthUser) => void;
    setLogout: () => void;
}   