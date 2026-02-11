import type {
    DebugPushRequest,
    DebugPushResponse,
    PushTestResponse,
    RegisterFcmTokenRequest,
    RegisterFcmTokenResponse
} from "../api-types/pushApiTypes";
import { axiosInstance } from "./axiosInstance";

// 1. FCM Token, FID 등록 API [POST] (/api/notification/push/tokens)
export const registerFcmToken = async (data: RegisterFcmTokenRequest): Promise<RegisterFcmTokenResponse> => {
    const response = await axiosInstance.post("/api/notification/push/tokens", data);
    return response.data;
};

// 2. 푸쉬 테스트 API [POST] (/api/notifications/push/test?userId={userId})
export const testPushNotification = async (userId: number): Promise<PushTestResponse> => {
    const response = await axiosInstance.post(`/api/notifications/push/test?userId=${userId}`);
    return response.data;
};

// 3. 디버그 푸시 전송 API [POST] (/api/notifications/push/debug/send)
export const sendDebugPush = async (data: DebugPushRequest): Promise<DebugPushResponse> => {
    const response = await axiosInstance.post("/api/notifications/push/debug/send", data);
    return response.data;
};