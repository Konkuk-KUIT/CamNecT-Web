import { getId } from "firebase/installations";
import { getToken, onMessage } from "firebase/messaging";
import { useCallback, useEffect } from "react";
import { registerFcmToken } from "../api/push";
import { installations, messaging } from "../shared/firebase";
import { useAuthStore } from "../store/useAuthStore";

export const useFcmToken = () => {
    // 브라우저 알림 권한 요청 및 토큰 등록

    // useCallback : handleRequestPermission 함수가 변경되지 않도록 메모이제이션 (HomePage에서 의존성으로 사용중)
    const handleRequestPermission = useCallback(async () => {
        // 이미 권한이 거부된 상태라면 다시 묻지 않음
        if (Notification.permission === "denied") return;

        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.log("알림 권한 거부됨");
            return;
        }

        try {
            // 서비스 워커가 등록될 때까지 대기
            const registration = await navigator.serviceWorker.ready;

            // FCM Token 발급 (서비스 워커 객체를 직접 전달하여 에러 방지)
            const fcmToken = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
                serviceWorkerRegistration: registration,
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
                    console.log("FCM 토큰 서버 등록/갱신 완료");
                }
            }

        } catch (error) {
            console.error("FCM 토큰 발급 및 등록 실패", error);
        }
    }, []);

    // 포그라운드(앱을 보고 있을 때) 메시지 수신 로그
    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("🔔 [포그라운드] FCM 메시지 도착:", payload);
        });

        return () => unsubscribe();
    }, []);

    return { handleRequestPermission };
}