import dayjs from "dayjs";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "../../components/Icon";
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
    
    // 검색 관련 상태
    const [isSearching, setIsSearching] = useState(false);
    const [roomSearchQuery, setRoomSearchQuery] = useState("");
    
    // 초기 진입 시 깜빡임 방지를 위한 상태
    const [isReady, setIsReady] = useState(false);

    const isLoading = isRoomLoading || isMessagesLoading;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // API 데이터와 내가 보낸 임시 메시지를 합침
    const allMessages = useMemo(() => [...remoteMessages, ...sentMessages], [remoteMessages, sentMessages]);

    // 검색어 필터링 적용
    const localMessages = useMemo(() => {
        if (!isSearching || !roomSearchQuery.trim()) return allMessages;
        return allMessages.filter(msg => 
            msg.content.toLowerCase().includes(roomSearchQuery.toLowerCase())
        );
    }, [allMessages, isSearching, roomSearchQuery]);

    // 가장 아래로 스크롤하는 함수 (전체 문서 기준)
    const scrollToBottom = () => {
        window.scrollTo(0, document.documentElement.scrollHeight);
    };

    // 1. 레이아웃 안정화 및 초기 스크롤
    // useLayoutEffect : 화면 렌더링 직전 실행
    useLayoutEffect(() => {
        if (!isLoading && !isReady) {
            if (localMessages.length > 0) {
                // 화면 그린 후 이동
                window.scrollTo(0, document.documentElement.scrollHeight);
                
                // 이동 직후 즉시 공개 (애니메이션 프레임을 기다려 더 정확하게 처리)
                requestAnimationFrame(() => {
                    window.scrollTo(0, document.documentElement.scrollHeight);
                    setIsReady(true); // 메시지들 visible 
                });
            } else {
                // 메시지가 없을 때는 스크롤 없이 즉시 표시
                requestAnimationFrame(() => {
                    setIsReady(true);
                });
            }
        }
    }, [isLoading, localMessages.length, isReady]);

    // 2. 메시지가 추가될 때 부드럽게 스크롤
    useEffect(() => {
        if (isReady && localMessages.length > 0) {
            scrollToBottom();
        }
    }, [localMessages.length, isReady]);

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

    return (
        <HeaderLayout
            headerSlot={
                !isSearching ? (
                    <MainHeader
                        title={roomInfo?.partner.name}
                        rightActions={[
                            { icon: 'search', onClick: () => setIsSearching(true) },
                            { icon: 'mypageOption', onClick: () => console.log('menu clicked') }
                        ]}
                    />
                ) : (
                    <header 
                        className="fixed left-0 right-0 top-0 z-50 flex items-center bg-white px-[25px] py-[10px]"
                        style={{
                            paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
                            top: 'env(safe-area-inset-top, 0px)',
                        }}
                    >
                        <div className="flex items-center justify-center gap-[15px] w-full">
                            <div className="flex items-center w-[282px] h-[40px] px-[15px] py-[8px] bg-gray-150 rounded-[10px]">
                                <Icon name="search" style={{ width: '20px', height: '20px' }} />
                                <input 
                                    autoFocus
                                    type="text"
                                    value={roomSearchQuery}
                                    onChange={(e) => setRoomSearchQuery(e.target.value)}
                                    placeholder="채팅 내용 검색"
                                    className="flex-1 ml-[15px] bg-transparent border-none outline-none text-gray-750 text-r-16 tracking-[-0.64px] placeholder:text-gray-400"
                                />
                            </div>
                            <button 
                                onClick={() => {
                                    setIsSearching(false);
                                    setRoomSearchQuery("");
                                }}
                                className="text-gray-650 text-B-16-hn tracking-[-0.4px] shrink-0"
                            >
                                취소
                            </button>
                        </div>
                    </header>
                )
            }
        >
            {/* invisible : 공간은 차지 하지만 보이지 않음*/}
            <div className={`flex flex-col pt-[74px] pb-[100px] ${!isReady ? 'invisible' : 'visible'} ${allMessages.length === 0 ? 'min-h-[calc(100dvh-100px)] justify-end' : ''}`}>
                {/* 상단 정보 영역 */}
                {roomInfo && <ChatRoomInfo chatRoom={roomInfo} />}
                
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
                            ? (isSameAsNext ? 'rounded-[20px]' : 'rounded-l-[20px] rounded-br-[20px] rounded-tr-none')
                            : (isSameAsNext ? 'rounded-[20px]' : 'rounded-t-[20px] rounded-br-[20px] rounded-bl-none');

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
                                                    roomInfo?.partner.profileImg ? (
                                                        <img 
                                                            src={roomInfo?.partner.profileImg} 
                                                            alt={`${roomInfo?.partner.name} 프로필`} 
                                                            className="w-[32px] h-[32px] rounded-full object-cover shrink-0" 
                                                        />
                                                    ) : (
                                                        <div className="w-[32px] h-[32px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                                            <span className="text-[12px] font-bold text-gray-600">
                                                                {roomInfo?.partner.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} pt-[3px] gap-[7px]`}>
                                            {!isMe && !isSameAsPrev && (
                                                <span className="text-r-12 text-gray-750 tracking-[-0.24px] ml-[2px] ">{roomInfo?.partner.name}</span>
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
            
            <PopUp isOpen={isLoading} type="loading" />
            {!isLoading && !roomInfo && (
                <div className="fixed inset-0 flex justify-center items-center bg-white z-[60] text-gray-400">
                    채팅방 정보를 찾을 수 없습니다.
                </div>
            )}
        </HeaderLayout>
    )
}
