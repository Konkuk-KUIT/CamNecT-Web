import { Client } from "@stomp/stompjs";

export const stompClient = new Client({
    brokerURL: import.meta.env.VITE_SOCKET_URL,
    // 연결 상태를 로그로 확인
    debug: (str) => {
        console.log('STOMP Debug:', str);
    },
    reconnectDelay: 2000, 
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
})