import { getId } from "firebase/installations";
import { getToken } from "firebase/messaging";
import { installations, messaging } from "../shared/firebase";

export const useFcmToken = () => {
    const handleRequestPermission = async () => {

        // 브라우저 알림 권한 요청
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.log("알림 권한 거부");
            return;
        }

        try {
            // FCM Token 발급 (브라우저 식별)
            const fcmToken = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
            });

            // FID 발급 (기기 아이디)
            const deviceId = await getId(installations);
            console.log("FCM 토큰", fcmToken);
            console.log("FID", deviceId);
        } catch (error) {
            console.error("FCM 토큰 발급 실패", error);
        }
    }

    return { handleRequestPermission };
}