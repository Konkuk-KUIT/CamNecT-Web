import type { ChatRoomDetailRequest, ChatRoomDetailResponse, ChatRoomListRequest, ChatRoomListResponse, CoffeeChatRespondRequest, CoffeeChatRespondResponse } from "../api-types/chatApiTypes";
import { mockChatRequestRoomList, mockChatRoomList, mockMessages } from "../mock/coffeeChatMocks";
import type { ChatMessage, ChatRoomListItem } from "../types/coffee-chat/coffeeChatTypes";
import { axiosInstance } from "./axiosInstance";

// 네트워크 지연 시뮬레이션 함수
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 채팅방 목록 조회 (커피챗 메인)
export const getChatRooms = async (): Promise<ChatRoomListItem[]> => {
    await delay(500);
    return mockChatRoomList;
};

// 채팅방 상세 조회 (채팅방 내부)
export const getChatRoomDetail = async (roomId: string): Promise<ChatRoomListItem> => {
    await delay(500);

    const room = mockChatRoomList.find(r => r.roomId === roomId);
    if (!room) throw new Error("Chat room not found");
    return room;
};

// 채팅방 메시지 목록 조회
export const getChatMessages = async (roomId: string): Promise<ChatMessage[]> => {
    await delay(300);
    return mockMessages.filter(m => m.roomId === roomId);
};

// 커피챗/팀원모집 요청 목록 조회
export const getChatRequests = async (): Promise<ChatRoomListItem[]> => {
    await delay(500);
    return mockChatRequestRoomList;
};

// 요청 상세 조회 (요청 상세 페이지)
export const getChatRequestDetail = async (roomId: string): Promise<ChatRoomListItem> => {
    await delay(500);
    
    const request = mockChatRequestRoomList.find(r => r.roomId === roomId);
    if (!request) throw new Error("Chat request not found");
    return request;
};

/*
---------------------------------------------------------------------------------------------------
*/

// 채팅방 목록 조회 API [GET] (/api/chat/rooms)
export const requestChatRoomList = async (data: ChatRoomListRequest) => {
    
    const response = await axiosInstance.get<ChatRoomListResponse>("/api/chat/rooms", {
        params: data
    });
    return response.data;
}

// 채팅방 상세 조회 API [GET] (/api/chat/rooms/{roomId})
export const requestChatRoomDetail = async (data: ChatRoomDetailRequest) => {
    const { roomId, ...queryParams } = data;
    
    const response = await axiosInstance.get<ChatRoomDetailResponse>(`/api/chat/rooms/${roomId}`, {
        params: queryParams
    });
    return response.data;
}

// 커피챗 요청 수락/거절 API [POST] (/api/request/respond)
export const requestCoffeeChatRespond = async (data: CoffeeChatRespondRequest) => {
    const { userId, ...body } = data;
    
    const response = await axiosInstance.post<CoffeeChatRespondResponse>("/api/request/respond", body, {
        params: { userId }
    });
    return response.data;
}