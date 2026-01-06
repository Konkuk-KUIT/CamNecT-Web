import type {User} from "../user/userTypes";

// 로그인 전역상태의 인터페이스
export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    setLogin: (token: string, user: User) => void;
    setLogout: () => void;
}   