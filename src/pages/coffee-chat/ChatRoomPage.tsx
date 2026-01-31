import dayjs from "dayjs";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import PopUp from "../../components/Pop-up";
import { useChatMessages, useChatRoom } from "../../hooks/useChatQuery";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";
import type { ChatMessage } from "../../types/coffee-chat/coffeeChatTypes";
import { formatFullDateWithDay, formatTime } from "../../utils/formatDate";
import { ChatRoomInfo } from "./components/ChatRoomInfo";
import { TypingArea } from "./components/TypingArea";

export const ChatRoomPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: roomInfo, isLoading: isRoomLoading } = useChatRoom(id || "");
    // 서버에서 가져온 채팅 데이터
    const { data: remoteMessages = [], isLoading: isMessagesLoading } = useChatMessages(id || "");
    // 내가 보낸 임시 메시지
    const [sentMessages, setSentMessages] = useState<ChatMessage[]>([]);

    const isLoading = isRoomLoading || isMessagesLoading;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // API 데이터와 내가 보낸 임시 메시지를 합치는 작업
    const localMessages = useMemo(
        () => [...remoteMessages, ...sentMessages], 
        [remoteMessages, sentMessages] // 의존성 : 서버 or 내가 보낸 메시지 
    );

    // 가장 아래로 스크롤하는 함수 (전체 문서 기준)
    const scrollToBottom = () => {
        window.scrollTo(0, document.documentElement.scrollHeight);
    };

    // 1. 레이아웃이 잡히기 직전에 즉시 이동 (깜빡임 방지)
    useLayoutEffect(() => {
        if (!isLoading && localMessages.length > 0) {
            scrollToBottom();
        }
    }, [isLoading, localMessages.length]);

    // 2. 화면이 완전히 그려진 후 한 번 더 보정 (확실한 이동)
    useEffect(() => {
        if (!isLoading && localMessages.length > 0) {
            const timer = setTimeout(scrollToBottom, 50);
            return () => clearTimeout(timer);
        }
    }, [isLoading, localMessages.length]);

    // 메시지 전송 함수
    const handleSendMessage = (text: string) => {
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            roomId: id || "",
            senderId: 'me',
            type: "TEXT",
            content: text,
            createdAt: new Date().toISOString(),
            isRead: false,
        };
        setSentMessages((prev) => [...prev, newMessage]);
    }

    if (isLoading) return <PopUp isOpen={true} type="loading" />;
    if (!roomInfo) return <div className="flex justify-center items-center h-screen text-gray-400">채팅방 정보를 찾을 수 없습니다.</div>;

    return (
        <HeaderLayout
            headerSlot={
                <MainHeader
                    title={roomInfo.partner.name}
                    rightActions={[
                        { icon: 'search', onClick: () => console.log('search clicked') },
                        { icon: 'mypageOption', onClick: () => console.log('menu clicked') }
                    ]}
                />
            }
        >
            <div className="flex flex-col pt-[74px] pb-[100px]">
                {/* 상단 정보 영역 */}
                <ChatRoomInfo chatRoom={roomInfo} />
                
                {/* 메시지 리스트 영역 */}
                <div className="flex flex-col mt-[40px] px-[25px]">
                    {localMessages.map((msg, index) => {
                        const isMe = msg.senderId === 'me';
                        
                        // 날짜 구분선 표시 여부 확인
                        const showDateDivider = index === 0 || !dayjs(msg.createdAt).isSame(dayjs(localMessages[index - 1].createdAt), 'day');

                        // 연속 메시지 판단 (작성자가 같고 1분 이내)
                        const isSameAsPrev = index > 0 && msg.senderId === localMessages[index - 1].senderId
                            && dayjs(msg.createdAt).isSame(dayjs(localMessages[index - 1].createdAt), 'minute');

                        const isSameAsNext = index < localMessages.length - 1 && msg.senderId === localMessages[index + 1].senderId
                            && dayjs(msg.createdAt).isSame(dayjs(localMessages[index + 1].createdAt), 'minute');
                        
                        // 말풍선 곡률: 중간 메시지는 둥글게, 마지막 메시지만 꼬리 노출
                        const bubbleRounding = isMe 
                            ? (isSameAsNext ? 'rounded-[20px]' : 'rounded-l-[20px] rounded-br-[20px] rounded-tr-0')
                            : (isSameAsNext ? 'rounded-[20px]' : 'rounded-t-[20px] rounded-br-[20px] rounded-bl-0');

                        return (
                            <React.Fragment key={msg.id}>
                                {
                                    // 날짜 구분선
                                    showDateDivider && (
                                    <div className="flex items-center gap-[15px] my-[10px]">
                                        <div className="flex-1 h-[1px] bg-gray-150"></div>
                                        <div className="text-r-12 text-gray-650 tracking-[-0.24px] shrink-0">
                                            {formatFullDateWithDay(msg.createdAt)}
                                        </div>
                                        <div className="flex-1 h-[1px] bg-gray-150"></div>
                                    </div>
                                )}
                                
                                <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} ${isSameAsPrev ? 'mt-[3px]' : 'mt-[7px]'}`}>
                                    <div className={`flex ${isMe ? 'flex-row-reverse' : 'flex-row'} items-end gap-[6px] max-w-[80%]`}>
                                        
                                        {/* 상대방일 때 프로필 영역: isSameAsPrev일 때도 공간은 차지해야 함 */}
                                        {!isMe && (
                                            <div className="w-[32px] mr-[4px] flex-shrink-0 self-start">
                                                {!isSameAsPrev && (
                                                    roomInfo.partner.profileImg ? (
                                                        <img 
                                                            src={roomInfo.partner.profileImg} 
                                                            alt={`${roomInfo.partner.name} 프로필`} 
                                                            className="w-[32px] h-[32px] rounded-full object-cover shrink-0" 
                                                        />
                                                    ) : (
                                                        <div className="w-[32px] h-[32px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                                            <span className="text-[12px] font-bold text-gray-600">
                                                                {roomInfo.partner.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} pt-[3px] gap-[7px]`}>
                                            {!isMe && !isSameAsPrev && (
                                                <span className="text-r-12 text-gray-750 tracking-[-0.24px] ml-[2px] ">{roomInfo.partner.name}</span>
                                            )}
                                            <div className={`px-[13px] py-[7px] text-r-16 tracking-[-0.64px] ${bubbleRounding} ${
                                                isMe ? 'bg-primary text-white' : 'bg-gray-150 text-gray-750'
                                            }`}>
                                                {msg.content}
                                            </div>
                                        </div>

                                        {/* 시간 표시: 묶음의 마지막 메시지일 때만 노출 */}
                                        {!isSameAsNext && (
                                            <span className="text-r-12 text-gray-750 tracking-[-0.24px] shrink-0 mb-[2px]">
                                                {formatTime(msg.createdAt)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* 고정된 입력창 */}
            <TypingArea onSend={handleSendMessage} />
        </HeaderLayout>
    )
}
