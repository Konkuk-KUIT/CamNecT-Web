//STOMP 실시간 통신을 위한 DTO 
 
// 1. [구독] 일반 메시지 (/sub/user/{userId}/rooms 및 /sub/chat/room/{roomId})
export interface StompMessageResponse {
    messageId: number;
    roomId: number;
    senderId: number;
    sender: string;
    receiverId: number;
    receiver: string;
    message: string;
    read: boolean; // 읽음 여부
    sendDate: string;
    readAt: string | null; // 읽은 시각
}

// 2. [구독] 읽음 처리의 수신 데이터 (/sub/chat/room/{roomId})
export interface StompReadReceiptResponse {
    roomId: number;
    lastReadMessageId: number;
    readAt: string;
    type: 'READ'; // 읽었을때만 type필드 추가 
}

// 3. [발행] 메시지 보내기 (/pub/chat/message)
export interface StompMessagePublishRequest {
    roomId: number;
    content: string;
}

// 4. 유니온 타입: 소켓으로 받은 데이터에 type 필드가 있으면 읽음 처리, 없으면 일반 메시지
export type StompChatResponse = StompMessageResponse | StompReadReceiptResponse;

// 타입 가드: 수신된 데이터가 읽음 처리 데이터인지 확인하는 함수
// isReadRecipt가 true이면 data는 StompReadReceiptResponse 타입으로 추론
export const isReadReceipt = (data: StompChatResponse): data is StompReadReceiptResponse => {
    return (data as StompReadReceiptResponse).type === 'READ';
};
