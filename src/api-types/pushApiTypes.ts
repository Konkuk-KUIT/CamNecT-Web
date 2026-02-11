// 공통 응답 구조
export interface BaseResponse<T> {
    status: number;
    message: string;
    data: T;
}

// 1. FCM Token 등록 (/api/notification/push/tokens)
export interface RegisterFcmTokenRequest {
    userId: number;
    deviceId: string;
    platform: "ANDROID"; 
    token: string;
}

export interface RegisterFcmTokenData {
    pushDeviceId: number;
    created: boolean;
}

export type RegisterFcmTokenResponse = BaseResponse<RegisterFcmTokenData>;

// 2. 푸시 테스트 (/api/notifications/push/test?userId={userId})
export interface PushTestData {
    requested: number;
    success: number;
    failure: number;
    invalidTokenCount: number;
    invalidTokens: string[];
}

export type PushTestResponse = BaseResponse<PushTestData>;

// 3. 디버그 푸시 전송 (/api/notifications/push/debug/send)
export interface DebugPushRequest {
    token: string;
    title: string;
    body: string;
    data: Record<string, string>;
}

export type DebugPushResponse = BaseResponse<Record<string, string>>;