import { mockChatRequestRoomList, mockChatRoomList } from "../mock/coffeeChatMocks";
import type { ChatRoomListItem } from "../types/coffee-chat/coffeeChatTypes";

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
