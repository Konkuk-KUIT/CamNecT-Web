import type { NextStepType, UserRole } from "../../api-types/authApiTypes";

export type AuthUser = {
    id: string;
    name?: string;
    role: UserRole;
    nextStep: NextStepType;
}

export interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: AuthUser | null;
    setLogin: (accessToken: string, user: AuthUser) => void;
    setLogout: () => void;
}   