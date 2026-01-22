import { create } from "zustand";
import type { SignupRequestBody } from "../api-types/authApiTypes";

// Store 상태 타입 정의
interface SignupStore {
    // API 필수 필드
    email: string;
    userName: string;
    password: string;
    name: string;
    phoneNum: string;
    agreements: {
        serviceTerms: boolean;
        privacyTerms: boolean;
    };
    // todo 태그 및 소개글 
    selfIntroduction: string;
    profileImage: File | null; 
    tags: string[];

    // UI 상태 
    verificationType: 'email' | 'phone'; // todo 휴대폰인증은 추후구현
    emailVerified: boolean;
    // phoneVerified: boolean;

    // 상태 변경 함수들 
    setEmail: (email: string) => void;
    setUserName: (userName: string) => void;
    setPassword: (password: string) => void;
    setName: (name: string) => void;
    setPhoneNum: (phoneNum: string) => void;
    setAgreements: (agreements: {serviceTerms: boolean, privacyTerms: boolean}) => void;
    setVerificationType: (verificationType: 'email' | 'phone') => void;
    setEmailVerified: (emailVerified: boolean) => void;
    setSelfIntroduction: (selfIntroduction: string) => void;
    setProfileImage: (profileImage: File | null) => void;
    // setPhoneVerified: (phoneVerified: boolean) => void;
    
    // API 요청 & 초기화
    getSignupData: () => SignupRequestBody;
    reset: () => void;
}

// 초기 상태 (데이터만)
const initialState = {
    email: '',
    userName: '',
    password: '',
    name: '',
    phoneNum: '',
    agreements: {
        serviceTerms: false,
        privacyTerms: false,
    },
    verificationType: 'email' as const,
    emailVerified: false,
    // phoneVerified: false,
};

// Zustand Store 생성
export const useSignupStore = create<SignupStore>((set, get) => ({
    ...initialState,
    selfIntroduction: '',
    profileImage: null,
    tags: [],

    // 상태 변경 함수들 구현
    setEmail: (email: string) => set({ email }),
    setUserName: (userName: string) => set({ userName }),
    setPassword: (password: string) => set({ password }),
    setName: (name: string) => set({ name }),
    setPhoneNum: (phoneNum: string) => set({ phoneNum }),
    setAgreements: (agreements: {serviceTerms: boolean, privacyTerms: boolean}) => set({ agreements }),
    setVerificationType: (verificationType: 'email' | 'phone') => set({ verificationType }),
    setEmailVerified: (emailVerified: boolean) => set({ emailVerified }),
    // setPhoneVerified: (phoneVerified: boolean) => set({ phoneVerified }),
    setSelfIntroduction: (selfIntroduction: string) => set({ selfIntroduction }),
    setProfileImage: (profileImage: File | null) => set({ profileImage }),

    // API 요청 시 필요한 필드만 추출
    getSignupData: (): SignupRequestBody => {
        const state = get();
        return {
            email: state.email,
            userName: state.userName,
            password: state.password,
            name: state.name,
            phoneNum: state.phoneNum,
            agreements: state.agreements,
        };
    },

    // 초기화 함수 (회원가입 이후 초기화)
    reset: () => set(initialState),
}));