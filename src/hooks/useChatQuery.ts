import { useQuery } from "@tanstack/react-query";
import { getChatMessages, getChatRequestDetail, getChatRequests, getChatRoomDetail, viewChatRoomList } from "../api/chat";
import type { ChatRoomListItem } from "../types/coffee-chat/coffeeChatTypes";
import { useAuthStore } from "../store/useAuthStore";
import type { ChatRoomListItemType } from "../types/coffee-chat/coffeeChatTypes";

export const useChatRooms = (type: ChatRoomListItemType) => {
    const { user } = useAuthStore(); // 1. 유저 정보 가져오기 

    return useQuery<ChatRoomListItem[]>({
        queryKey: ['chatRooms', user?.id, type], // 데이터 고유이름 (캐싱용)
        queryFn: async () => {

            const response = await viewChatRoomList({
                userId: Number(user?.id),
                type: type
            })

            // 4. API 응답 데이터를 UI에서 사용하는 형식으로 변환 (Mapper)
            return response.data.chatRoomList.map((room): ChatRoomListItem => ({
                roomId: String(room.roomId),
                type: type,
                partner: {
                    id: String(room.opponentId), 
                    name: room.opponentName,
                    major: room.opponentMajor,
                    studentId: room.opponentStudentYear,
                    profileImg: room.opponentProfileImgUrl,
                },
                lastMessage: room.lastMessage,
                lastMessageDate: room.lastMessageTime,
                unreadCount: room.unreadCount,
            }));
        },
        enabled: !!user?.id // 유저 ID가 있을 때만 실행
    });
};

export const useChatRoom = (roomId: string) => {
    return useQuery({
        queryKey: ['chatRoom', roomId],
        queryFn: () => getChatRoomDetail(roomId),
        enabled: !!roomId // roomId가 유효할 때만 실행
    });
};

export const useChatMessages = (roomId: string) => {
    return useQuery({
        queryKey: ['chatMessages', roomId],
        queryFn: () => getChatMessages(roomId),
        enabled: !!roomId
    });
};

export const useChatRequests = () => {
    return useQuery({
        queryKey: ['chatRequests'],
        queryFn: getChatRequests
    });
};

export const useChatRequestRoom = (roomId: string) => {
    return useQuery({
        queryKey: ['chatRequestRoom', roomId],
        queryFn: () => getChatRequestDetail(roomId),
        enabled: !!roomId
    });
};

/*
--------------------------------------------------------------------
*/


