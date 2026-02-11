import { getId } from "firebase/installations";
import { getToken } from "firebase/messaging";
import { registerFcmToken } from "../api/push";
import { installations, messaging } from "../shared/firebase";
import { useAuthStore } from "../store/useAuthStore";

export const useFcmToken = () => {
    // 브라우저 알림 권한 요청
    const handleRequestPermission = async () => {
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
            
            if (fcmToken && deviceId) {
                const userId = useAuthStore.getState().user?.id;
                
                if (userId) {
                    await registerFcmToken({
                        userId: Number(userId),
                        deviceId,
                        platform: "ANDROID",
                        token: fcmToken
                    });
                    console.log("FCM 토큰 등록 성공");
                }
            }

        } catch (error) {
            console.error("FCM 토큰 발급 및 등록 실패", error);
        }
    }

    return { handleRequestPermission };
}