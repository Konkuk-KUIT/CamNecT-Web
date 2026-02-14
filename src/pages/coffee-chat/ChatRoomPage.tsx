import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "../../components/Icon";
import PopUp from "../../components/Pop-up";
import { useChatRoom, useChatRoomOut } from "../../hooks/useChatQuery";
import { useStompChat } from "../../hooks/useStompChat";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";
import { useAuthStore } from "../../store/useAuthStore";
import type { ChatMessage } from "../../types/coffee-chat/coffeeChatTypes";
import { formatFullDateWithDay, formatTime } from "../../utils/formatDate";
import { ChatRoomInfo } from "./components/ChatRoomInfo";
import { TypingArea } from "./components/TypingArea";

// todo 읽었을때 읽은 시각으로 보여줘야 함 (읽음 표시와 함께)
export const ChatRoomPage = () => {
    const { id } = useParams<{ id: string }>();
    
    return <ChatRoomContent key={id} roomId={id || ""} />;
};

const ChatRoomContent = ({ roomId }: { roomId: string }) => {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const { data: chatRoomData, isLoading: isRoomLoading } = useChatRoom(roomId);
    const { mutate: endChat } = useChatRoomOut();

    const {messages: socketMessages, sendMessage} = useStompChat(Number(roomId));
    
    // 검색 관련 상태
    const [isSearching, setIsSearching] = useState(false);
    const [roomSearchQuery, setRoomSearchQuery] = useState("");
    
    // 메뉴 관련 상태
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEndPopUpOpen, setIsEndPopUpOpen] = useState(false);
    const [isTerminated, setIsTerminated] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // 메뉴 바깥 클릭/터치 시 닫기
    useEffect(() => {
        const handleOutsideAction = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node;
            // 메뉴 영역 외부이면서, 옵션 버튼(aria-label="option")이 아닐 때만 닫기
            const isOptionButton = (target as HTMLElement).closest('[aria-label="option"]');
            
            if (menuRef.current && !menuRef.current.contains(target) && !isOptionButton) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleOutsideAction);
            document.addEventListener("touchstart", handleOutsideAction);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideAction);
            document.removeEventListener("touchstart", handleOutsideAction);
        };
    }, [isMenuOpen]);

    // 초기 진입 시 깜빡임 방지를 위한 상태
    const [isReady, setIsReady] = useState(false);

    const isLoading = isRoomLoading;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const roomInfo = chatRoomData?.partner;
    const requestInfo = chatRoomData?.requestInfo;

    // API로 받은 기존 채팅 내역 데이터들
    const remoteMessages = useMemo(() => {
        return chatRoomData?.messages || [];
    }, [chatRoomData?.messages]);

    const myId = String(user?.id);

    // 실시간 메시지를 도메인 타입으로 변환
    const mappedSocketMessages = useMemo(() => {
        return socketMessages.map((msg):ChatMessage => ({
            id: String(msg.messageId),
            roomId: String(msg.roomId),
            senderId: String(msg.senderId),
            content: msg.message,
            createdAt: msg.sendDate,
            isRead: msg.read,
            readAt: msg.readAt
        }))
    }, [socketMessages]);

    // API 데이터와 소켓 메시지를 합치기
    const allMessages = useMemo(() => {
        return [...remoteMessages, ...mappedSocketMessages];
    }, [remoteMessages, mappedSocketMessages]);

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
    useLayoutEffect(() => {
        if (!isLoading && !isReady) {
            if (localMessages.length > 0) {
                window.scrollTo(0, document.documentElement.scrollHeight);
                requestAnimationFrame(() => {
                    window.scrollTo(0, document.documentElement.scrollHeight);
                    setIsReady(true);
                });
            } else {
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

    // 3. 채팅방을 나갈 때(언마운트) 전역 안 읽은 개수 다시 가져오도록 설정
    useEffect(() => {
        return () => {
            queryClient.invalidateQueries({ queryKey: ['chatUnreadCount'] });
        };
    }, [queryClient]);

    // 메시지 전송 함수 
    const handleSendMessage = (text: string) => {
        sendMessage(text);
    }

    // 채팅 종료 함수
    const handleEndChat = () => {
        setIsMenuOpen(false);
        setIsEndPopUpOpen(true);
    }

    const handleEndChatConfirm = () => {
        setIsEndPopUpOpen(false);
        endChat({ roomId: Number(roomId) }, {
            onSuccess: () => {
                // 채팅 종료 UI 표시
                setIsTerminated(true);
            }
        });
    }

    return (
        <HeaderLayout
            headerSlot={
                !isSearching ? (
                    <div className="fixed left-0 right-0 top-0 z-50 bg-white">
                        <MainHeader
                            title={roomInfo?.name}
                            rightActions={[
                                { icon: 'search', onClick: () => setIsSearching(true) },
                                { icon: 'option', onClick: () => setIsMenuOpen(!isMenuOpen) }
                            ]}
                        />
                        {/* 더보기 메뉴 드롭다운 */}
                        {isMenuOpen && (
                            <div 
                                ref={menuRef}
                                className="absolute right-[25px] top-[calc(100%+10px)] z-[60] min-w-[160px] bg-white rounded-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] border border-gray-150 overflow-hidden flex flex-col items-start p-[15px_20px_15px_15px] gap-[10px]"
                            >
                                <button 
                                    onClick={handleEndChat}
                                    className="w-full flex items-center gap-[15px] hover:bg-gray-50 transition-colors"
                                >
                                    <Icon name="logOut" className="w-[24px] h-[24px]" />
                                    <span className="text-r-16 text-[#FF3838] tracking-[-0.64px]">채팅 종료하기</span>
                                </button>
                            </div>
                        )}
                    </div>
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
                                    aria-label="채팅 내용 검색"
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
            <div className={`flex flex-col pt-[calc(74px+env(safe-area-inset-top,0px))] pb-[100px] ${!isReady ? 'invisible' : 'visible'} ${allMessages.length === 0 ? 'min-h-[calc(100dvh-100px)] justify-end' : ''}`}>
                {/* 상단 정보 영역 */}
                {roomInfo && requestInfo && (
                    <ChatRoomInfo 
                        partner={roomInfo} 
                        requestInfo={requestInfo} 
                    />
                )}
                
                {/* 메시지 리스트 영역 */}
                <div className="flex flex-col mt-[40px] px-[25px]">
                    {localMessages.map((msg, index) => {
                        const isMe = String(msg.senderId) === myId;
                        
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
                                                    roomInfo?.profileImg ? (
                                                        <img 
                                                            src={roomInfo.profileImg} 
                                                            alt={`${roomInfo.name} 프로필`} 
                                                            className="w-[32px] h-[32px] rounded-full object-cover shrink-0" 
                                                        />
                                                    ) : (
                                                        <div className="w-[32px] h-[32px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                                            <span className="text-[12px] font-bold text-gray-600">
                                                                {roomInfo?.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} pt-[3px] gap-[7px]`}>
                                            {!isMe && !isSameAsPrev && (
                                                <span className="text-r-12 text-gray-750 tracking-[-0.24px] ml-[2px] ">{roomInfo?.name}</span>
                                            )}
                                            <div className={`px-[13px] py-[7px] text-r-16 tracking-[-0.64px] ${bubbleRounding} ${
                                                isMe ? 'bg-primary text-white' : 'bg-gray-150 text-gray-750'
                                            }`}>
                                                {msg.content}
                                            </div>
                                        </div>

                                        {/* 
                                        시간 표시: 묶음의 마지막 메시지일 때만 노출 
                                        읽음 표시도...
                                        */}
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
                    {/* 채팅 종료 구분선 */}
                    {isTerminated && (
                        <div className="flex items-center gap-[15px] my-[20px]">
                            <div className="flex-1 h-[1px] bg-gray-150"></div>
                            <div className="text-r-12 text-gray-650 tracking-[-0.24px] shrink-0">
                                채팅이 종료되었습니다
                            </div>
                            <div className="flex-1 h-[1px] bg-gray-150"></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* 고정된 입력창 */}
            {!isTerminated && <TypingArea onSend={handleSendMessage} />}
            
            <PopUp isOpen={isLoading} type="loading" />
            
            <PopUp 
                isOpen={isEndPopUpOpen}
                type="warning"
                title="채팅을 종료하시겠습니까?"
                content="채팅을 종료하면 다시 복구할 수 없습니다."
                leftButtonText="종료하기"
                onLeftClick={handleEndChatConfirm}
                onRightClick={() => setIsEndPopUpOpen(false)}
            />

            {!isLoading && !roomInfo && (
                <div className="fixed inset-0 flex justify-center items-center bg-white z-[60] text-gray-400">
                    채팅방 정보를 찾을 수 없습니다.
                </div>
            )}
        </HeaderLayout>
    )
}
