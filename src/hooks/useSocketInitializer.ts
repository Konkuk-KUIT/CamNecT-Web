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
        // 로그아웃 체크 또는 가입 완료 전(HOME이 아닌 경우) 연결 방지
        if (!isAuthenticated || !user?.id || user?.nextStep !== 'HOME') {
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
            setUpSubscriptions();
        }
        
        // 소켓 연결 (비활성 상태일 때만 활성화)
        if (!stompClient.active) {
            console.log("소켓 활성화 명령");
            stompClient.activate();
        }

        // 이미 socket이 켜져있을때 새로운 구독 실행
        if(stompClient.connected){
            setUpSubscriptions();
        }

        // 앱이 백그라운드에서 돌아왔을 때(visibilitychange) 소켓 재연결
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                if (!stompClient.active && isAuthenticated) {
                    console.log("앱 복귀 감지: 소켓 재활성화 시도");
                    stompClient.activate();
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            // 언마운트 시 매번 비활성화하기보다는 인증 해제 시에만 처리하도록 조정 가능
            // 여기서는 기존 유지
            if (stompClient.active) {
                stompClient.deactivate();
            }
        }
    }, [isAuthenticated, user?.id, user?.nextStep, accessToken, queryClient])
    
}