import { create } from "zustand";
import type { EmailRequest } from "../api-types/authApiTypes";

// Store 상태 타입 정의
interface SignupStore {
    // API 필수 필드
    email: string;
    username: string;
    password: string;
    name: string;
    phoneNum: string;
    agreements: {
        serviceTerms: boolean;
        privacyTerms: boolean;
    };
    userId: number | null; // 가입 과정에서 발급받는 ID
    // todo 태그 및 소개글 
    selfIntroduction: string;
    profileImage: File | null; 
    verificationFile: File | null;
    isVerificationSubmitted: boolean;
    tags: string[];

    // UI 상태 
    verificationType: 'email' | 'phone'; // todo 휴대폰인증은 추후구현
    emailVerified: boolean;
    // phoneVerified: boolean;

    // 상태 변경 함수들 
    setEmail: (email: string) => void;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    setName: (name: string) => void;
    setPhoneNum: (phoneNum: string) => void;
    setAgreements: (agreements: {serviceTerms: boolean, privacyTerms: boolean}) => void;
    setUserId: (userId: number | null) => void;
    setVerificationType: (verificationType: 'email' | 'phone') => void;
    setEmailVerified: (emailVerified: boolean) => void;
    setSelfIntroduction: (selfIntroduction: string) => void;
    setProfileImage: (profileImage: File | null) => void;
    setVerificationFile: (verificationFile: File | null) => void;
    setIsVerificationSubmitted: (isVerificationSubmitted: boolean) => void;
    setTags: (tags: string[]) => void;
    // setPhoneVerified: (phoneVerified: boolean) => void;
    
    // API 요청 & 초기화
    getSignupData: () => EmailRequest;
    reset: () => void;
}

// 초기 상태 (데이터만)
const initialState = {
    email: '',
    username: '',
    password: '',
    name: '',
    phoneNum: '',
    agreements: {
        serviceTerms: false,
        privacyTerms: false,
    },
    userId: null,
    verificationType: 'email' as const,
    emailVerified: false,
    // phoneVerified: false,
};

// Zustand Store 생성
export const useSignupStore = create<SignupStore>((set, get) => ({
    ...initialState,
    selfIntroduction: '',
    profileImage: null,
    verificationFile: null,
    isVerificationSubmitted: false,
    tags: [],

    // 상태 변경 함수들 구현
    setEmail: (email: string) => set({ email }),
    setUsername: (username: string) => set({ username }),
    setPassword: (password: string) => set({ password }),
    setName: (name: string) => set({ name }),
    setPhoneNum: (phoneNum: string) => set({ phoneNum }),
    setAgreements: (agreements: {serviceTerms: boolean, privacyTerms: boolean}) => set({ agreements }),
    setUserId: (userId: number | null) => set({ userId }),
    setVerificationType: (verificationType: 'email' | 'phone') => set({ verificationType }),
    setEmailVerified: (emailVerified: boolean) => set({ emailVerified }),
    // setPhoneVerified: (phoneVerified: boolean) => set({ phoneVerified }),
    setSelfIntroduction: (selfIntroduction: string) => set({ selfIntroduction }),
    setProfileImage: (profileImage: File | null) => set({ profileImage }),
    setVerificationFile: (verificationFile: File | null) => set({ verificationFile }),
    setIsVerificationSubmitted: (isVerificationSubmitted: boolean) => set({ isVerificationSubmitted }),
    setTags: (tags: string[]) => set({ tags }),

    // API 요청 시 필요한 필드만 추출
    getSignupData: (): EmailRequest => {
        const state = get(); // 현재 전역상태에 저장된 모든 값들 불러오는 함수
        return {
            email: state.email,
            username: state.username,
            password: state.password,
            name: state.name,
            phoneNum: state.phoneNum,
            agreements: state.agreements,
        };
    },

    // 초기화 함수 (회원가입 이후 초기화)
    reset: () => set(initialState),
}));