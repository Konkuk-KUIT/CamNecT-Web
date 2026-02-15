import type { StompSubscription } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";
import type { StompChatResponse, StompMessageRequest, StompMessageResponse } from "../api-types/stompApiTypes";
import { isReadReceipt } from "../api-types/stompApiTypes";
import { stompClient } from "../api/stompClient";

// 개별 채팅방 구독 및 메시지 송수신을 위한 훅
export const useStompChat = (roomId: number) => {
    // 실시간으로 수신된 메시지들 상태 저장 
    const [messages, setMessages] = useState<StompMessageResponse[]>([]);

    // 1. 메시지 발행 함수 (발신) - useCallback으로 메모이제이션
    const sendMessage = useCallback((content: string) => {
        const message: StompMessageRequest = { roomId, content };

        stompClient.publish({
            destination: `/pub/chat/message`,
            body: JSON.stringify(message)
        });
    }, [roomId]);

    // 2. 채팅방 나가기 함수 - useCallback으로 메모이제이션
    const leaveChatRoom = useCallback(() => {
        if (stompClient.connected) {
            stompClient.publish({
                destination: `/pub/chat/room/${roomId}/leave`
            });
        }
    }, [roomId]);

    // 특정 채팅방 구독 (수신) 및 클린업
    useEffect(() => {
        let subscription: StompSubscription | null = null;

        const performSubscribe = () => {
            if (subscription) return;
            subscription = stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
                const data: StompChatResponse = JSON.parse(message.body);

                // 읽음 처리 수신 시 (READ)
                if (isReadReceipt(data)) {
                    setMessages((prev) => 
                        prev.map((msg) => 
                            msg.messageId <= data.lastReadMessageId 
                                ? { ...msg, read: true, readAt: data.readAt } 
                                : msg
                        )
                    );
                    return;
                }

                // 일반 메시지 수신 시
                setMessages((prev) => [...prev, data]);
            });
        };

        if (stompClient.connected) {
            performSubscribe();
        } else {
            const originalOnConnect = stompClient.onConnect;
            stompClient.onConnect = (frame) => {
                if (originalOnConnect && originalOnConnect !== stompClient.onConnect) {
                    originalOnConnect(frame);
                }
                performSubscribe();
            };
        }

        // 핵심: 채팅방을 나갈 때(언마운트) 구독 해제와 나가기 신호를 한꺼번에 처리
        return () => {
            if (subscription) subscription.unsubscribe();
            leaveChatRoom();
        };
    }, [roomId, leaveChatRoom]);

    return { messages, sendMessage, setMessages, leaveChatRoom };
};