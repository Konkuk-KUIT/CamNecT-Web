import { useEffect, useState } from "react";
import type { StompChatResponse, StompMessageRequest, StompMessageResponse } from "../api-types/stompApiTypes";
import { isReadReceipt } from "../api-types/stompApiTypes";
import { stompClient } from "../api/stompClient";

// 개별 채팅방 구독 및 메시지 송수신을 위한 훅
export const useStompChat = (roomId: number) => {
    // 실시간으로 수신된 메시지들 상태 저장 
    const [messages, setMessages] = useState<StompMessageResponse[]>([]);

    // 특정 채팅방 구독 (수신)
    // todo 읽음 처리 복습
    useEffect(() => {
        const subscription = stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
            const data: StompChatResponse = JSON.parse(message.body);

            // 1. 읽음 처리 수신 시 (READ)
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

            // 2. 일반 메시지 수신 시
            setMessages((prev) => [...prev, data]);
        });

        // 나갈때 구독 해제
        return () => {
            subscription.unsubscribe();
        };
    }, [roomId]);

    // 메시지 발행 함수 (발신)
    const sendMessage = (content: string) => {
        const message: StompMessageRequest = { roomId, content };

        stompClient.publish(
            {
                destination: `/pub/chat/message`,
                body: JSON.stringify(message) // json -> string
            });
    };

    return {messages, sendMessage, setMessages}
}