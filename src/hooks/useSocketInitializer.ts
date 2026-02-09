import type { IMessage } from "@stomp/stompjs";
import { stompClient } from "../api/stompClient";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const onServerMessage = (message: IMessage) => {
    const payload = JSON.parse(message.body);
    console.log("메시지 도착", payload);
}

// 로그인 / 로그아웃 시 소켓 연결/해제 (커피챗 실시간 수신을 위해)
export const useSocketInitializer = () => {
    const { isAuthenticated, user } = useAuthStore();

    // 로그인 상태 바뀔 때만 수행
    useEffect(() => {
        // 로그아웃 체크
        if (!isAuthenticated || !user?.id) {
            if (stompClient.active) {
                stompClient.deactivate();
            }
        }
        
        // accessToken 주입
        stompClient.connectHeaders = {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        };

        // 소켓 연결
        stompClient.activate();

        // 연결 성공 후
        stompClient.onConnect = () => {
            console.log("socket 연결 성공");

            stompClient.subscribe(`/sub/user/${user?.id}/rooms`, onServerMessage);
        }

        return () => {
            if (stompClient.active) {
                stompClient.deactivate();
            }
        }
    }, [isAuthenticated, user?.id])
    
}