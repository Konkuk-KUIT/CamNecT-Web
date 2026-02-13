import { useQuery } from "@tanstack/react-query";
import { viewChatRoomDetail, viewChatRoomList, viewChatRequestList, viewChatRequestDetail } from "../api/chat";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import type { ChatMessage, ChatRoomListItem, ChatRoomListItemType } from "../types/coffee-chat/coffeeChatTypes";

// 1-1. 전체 안 읽은 메시지 개수 조회 전용 쿼리
export const useUnreadCountQuery = () => {
    const { user, isAuthenticated } = useAuthStore();
    const { setTotalUnreadCount } = useChatStore();

    return useQuery({
        queryKey: ['chatUnreadCount', user?.id],
        queryFn: async () => {
            if (!user?.id) return 0;
            const response = await viewChatRoomList({
                userId: Number(user?.id)
            });
            const count = response.data.totalUnreadCount;
            setTotalUnreadCount(count);
            return count;
        },
        enabled: isAuthenticated && !!user?.id,
        staleTime: 1000 * 60, // 1분간 신선도 유지
    });
};

// 1. 채팅방 목록 조회 API [GET] (/api/chat/rooms)
export const useChatRooms = (type: ChatRoomListItemType) => {
    const { user } = useAuthStore(); // 1. 유저 정보 가져오기 
    const { setTotalUnreadCount } = useChatStore();

    return useQuery<ChatRoomListItem[]>({
        queryKey: ['chatRooms', user?.id, type], // 데이터 고유이름 (캐싱용)
        queryFn: async () => {

            const response = await viewChatRoomList({
                userId: Number(user?.id),
                type: type
            })

            // 전역 안 읽은 개수 업데이트
            setTotalUnreadCount(response.data.totalUnreadCount);

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

// 2. 채팅방 조회 상세 API [GET] (/api/chat/room/{roomId})
export const useChatRoom = (roomId: string) => {
    const { user } = useAuthStore(); // 1. 유저 정보 가져오기 

    return useQuery({
        queryKey: ['chatRoom', roomId],
        queryFn: async () => {
            
            const response = await viewChatRoomDetail({
                userId: Number(user?.id),
                roomId: Number(roomId)
            });

            const { data } = response;

            // 4. API DTO -> UI DTO 매핑
            return {
                // 커피챗 상대 정보
                partner: {
                    id: String(data.opponentId),
                    name: data.opponentName,
                    major: data.opponentMajor,
                    studentId: data.opponentStudentYear,
                    profileImg: data.opponentProfileImg,
                    tags: data.opponentTags, // 상대방 전문 분야
                },
                // 커피챗 요청 상세 정보 (카드 영역)
                requestInfo: {
                    createdAt: data.requestAt,
                    type: data.requestType,
                    tags: data.requestTags || [], 
                    content: data.requestContent,
                },
                // 채팅 메시지 리스트
                messages: data.chatList.map((message): ChatMessage => ({
                    id: String(message.messageId),
                    roomId: String(message.roomId),
                    senderId: String(message.senderId),
                    content: message.message,
                    createdAt: message.sendDate,
                    isRead: message.read,
                    readAt: message.readAt
                }))
            };
        },
        enabled: !!roomId && !!user?.id
    });
};

// 3. 커피챗 요청 목록 조회 API [GET] (/api/request/list)
export const useChatRequests = (type: ChatRoomListItemType) => {

    const { user } = useAuthStore();

    return useQuery<ChatRoomListItem[]>({
        queryKey: ['chatRequests'],
        queryFn: async () => { 

            // API 호출
            const response = await viewChatRequestList({
                userId: Number(user?.id),
                type:type
            })

            // 응답 매핑
            return response.data.chatRequestList.map((room): ChatRoomListItem => ({
                roomId: String(room.requestId), // 요청 ID를 채팅방 ID로 사용 (식별자)
                type: type,
                partner: {
                    id: String(room.opponentId), 
                    name: room.opponentName,
                    major: room.opponentMajor,
                    studentId: room.opponentStudentYear,
                    profileImg: room.opponentProfileImg,
                },
                lastMessage: room.requestContent,
                lastMessageDate: room.createdAt,
                unreadCount: 0, // 요청은 1번 밖에 못보내므로 
            }));
        }
    });
};

// 4. 커피챗 요청 상세 조회 API [GET] (/api/request/{requestId})
export const useChatRequestRoom = (requestId: string) => {

    const { user } = useAuthStore();

    return useQuery({
        queryKey: ['chatRequestRoom', requestId],
        queryFn: async () => {

            const response = await viewChatRequestDetail({
                userId: Number(user?.id),
                requestId: Number(requestId)
            })

            const { data } = response;

            // 4. API DTO -> UI DTO 매핑
            return {
                // 커피챗 상대 정보
                partner: {
                    id: String(data.opponentId),
                    name: data.opponentName,
                    major: data.opponentMajor,
                    studentId: data.opponentStudentYear,
                    profileImg: data.opponentProfileImg,
                    tags: data.opponentTags, // 상대방 전문 분야
                },
                // 커피챗 요청 상세 정보 (카드 영역)
                requestInfo: {
                    createdAt: data.createdAt,
                    type: data.requestType,
                    tags: data.requestTags || [], 
                    content: data.requestContent,
                }
            };
        },
        enabled: !!requestId
    });
};
