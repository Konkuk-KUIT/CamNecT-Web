import { useQuery } from "@tanstack/react-query";
import { getChatMessages, getChatRequestDetail, getChatRequests, getChatRoomDetail, getChatRooms } from "../api/chat";

export const useChatRooms = () => {
    return useQuery({
        queryKey: ['chatRooms'], // 데이터 고유이름 (캐싱용)
        queryFn: getChatRooms // queryKey가 변경될 때마다 실행
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
