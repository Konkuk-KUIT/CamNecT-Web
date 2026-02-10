import type { StompMessageRequest, StompMessageResponse } from "../api-types/stompApiTypes";
import { stompClient } from "../api/stompClient";
import { useEffect, useState } from "react";

// 개별 채팅방 구독 및 메시지 송수신을 위한 훅
export const useStompChat = (roomId: number) => {
    // 대화 입력값 상태 저장 
    const [messages, setMessages] = useState<StompMessageResponse[]>([]);

    // 특정 채팅방 구독 (수신)
    useEffect(() => {
        const subscription = stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
            const newMessage: StompMessageResponse = JSON.parse(message.body);
            setMessages((prev) => [...prev, newMessage]);
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