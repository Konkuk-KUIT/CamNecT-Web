import type { NotificationListRequest, NotificationListResponse } from "../api-types/notificationApiTypes";
import { axiosInstance } from "./axiosInstance";

// 알림 목록 조회 API [GET] (/api/notifications)
export const requestNotifications = async (params: NotificationListRequest) => {
    const response = await axiosInstance.get<NotificationListResponse>("/api/notifications", {
        params,
    });
    return response.data;
};
