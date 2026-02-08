// 채팅방 목록 조회 DTO (/api/chat/rooms)
export interface ChatRoomListRequest {
    userId: number;
}

export interface ChatRoomInfo {
    roomId: number;
    opponentName: string;
    opponentProfileImgUrl: string;
    opponentMajor: string;
    opponentStudentYear: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

export interface ChatRoomListResponse {
    status: number;
    message: string;
    data: {
        chatRoomList: ChatRoomInfo[];
        totalUnreadCount: number;
    };
}

// 채팅방 상세 조회 DTO (/api/chat/room/{roomId})
export interface ChatRoomDetailRequest {
    roomId: number;
    userId: number;
}

export interface ChatMessageInfo {
    messageId: number;
    roomId: number;
    senderId: number;
    sender: string;
    receiverId: number;
    receiver: string;
    message: string;
    read: boolean;
    sendDate: string;
    readAt: string | null;
}

export interface ChatRoomDetailResponse {
    status: number;
    message: string;
    data: {
        roomId: number;
        myId: number;
        opponentId: number;
        opponentName: string;
        opponentMajor: string;
        opponentStudentYear: string;
        opponentProfileImg: string;
        opponentTags: string[];
        requestCategory: string;
        requestTags: string[];
        requestContent: string;
        chatList: ChatMessageInfo[];
    };
}

// 커피챗 요청 수락/거절 DTO (/api/request/respond)
export interface CoffeeChatRespondRequest {
    userId: number;
    requestId: number;
    isAccepted: boolean;
}

export interface CoffeeChatRespondResponse {
    status: number;
    message: string;
    data: string;
}