import type {
    RegisterFcmTokenRequest,
    RegisterFcmTokenResponse
} from "../api-types/pushApiTypes";
import { axiosInstance } from "./axiosInstance";

// 1. FCM Token, FID 등록 API [POST] (/api/notifications/push/tokens)
export const registerFcmToken = async (data: RegisterFcmTokenRequest): Promise<RegisterFcmTokenResponse> => {
    const response = await axiosInstance.post("/api/notifications/push/tokens", data);
    return response.data;
};