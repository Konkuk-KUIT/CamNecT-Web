import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { stompClient } from "../api/stompClient";
import { useAuthStore } from "../store/useAuthStore";

// 로그인 / 로그아웃 시 소켓 연결/해제 (커피챗 실시간 수신을 위해)
export const useSocketInitializer = () => {
    const { isAuthenticated, user, accessToken } = useAuthStore();
    const queryClient = useQueryClient();

    // 로그인 상태 바뀔 때만 수행
    useEffect(() => {
        // 로그아웃 체크
        if (!isAuthenticated || !user?.id) {
            if (stompClient.active) {
                stompClient.deactivate();
            }
            return;
        }
        
        // accessToken 주입
        stompClient.connectHeaders = {
            Authorization: `Bearer ${accessToken}`,
        };

        const setUpSubscriptions = () => {
            console.log("전역 구독 중");

            // 전역 채팅 목록 destination
            stompClient.subscribe(`/sub/user/${user?.id}/rooms`, () => {
                queryClient.invalidateQueries({ 
                    queryKey: ['chatRooms'], 
                    exact: false, // 'chatRooms'로 시작하는 모든 키를 포함
                    refetchType: 'all' // 전부 리프레시
                });

                // BottomNav badge(totalUnreadCount 최신화)
                queryClient.invalidateQueries({
                    queryKey: ['chatUnreadCount']
                });
            });

        }
        // 연결 성공 후
        stompClient.onConnect = () => {
            console.log("socket 연결 성공");
            setUpSubscriptions();
        }
        
        // 소켓 연결
        stompClient.activate();

        // 이미 socket이 켜져있을때 새로운 구독 실행
        if(stompClient.connected){
            setUpSubscriptions();
        }

        return () => {
            if (stompClient.active) {
                stompClient.deactivate();
            }
        }
    }, [isAuthenticated, user?.id, accessToken, queryClient])
    
}