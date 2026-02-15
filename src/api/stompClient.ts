import { Client } from "@stomp/stompjs";

export const stompClient = new Client({
    brokerURL: import.meta.env.VITE_SOCKET_URL,
    // 연결 상태를 로그로 확인
    // debug: (str) => {
    //     // console.log('STOMP Debug:', str);
    // },
    reconnectDelay: 2000, // 연결 끊겼을 때 자동 재연결 간격 (5초)
    // client <-> server 간의 연결 상태를 확인 간격
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
})