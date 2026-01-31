import type { ChatRoomListItem } from "../../../types/coffee-chat/coffeeChatTypes";
import { formatDate } from "../../../utils/formatDate";

interface ChatListProps {
    chatRoom: ChatRoomListItem;
    searchQuery?: string; // todo 추후 검색어 부분만 하이라이트
    isFirstPaddingDisabled?: boolean;
    onClick?: () => void;
}

// 
export const ChatList = ({ chatRoom, isFirstPaddingDisabled = true, onClick }: ChatListProps) => {
    return (
        <li 
            onClick={onClick}
            className={`flex gap-[12px] px-[25px] py-[15px] border-b border-gray-150 cursor-pointer active:bg-gray-100 transition-colors ${isFirstPaddingDisabled ? 'first:pt-0' : ''}`}
        >
            {/* 프로필 이미지 영역 */}
            <div className="shrink-0">
                {chatRoom.partner.profileImg ? (
                    <img src={chatRoom.partner.profileImg} alt="프로필 이미지" className="w-[60px] h-[60px] rounded-full object-cover" />
                ) : (
                    <div className="w-[60px] h-[60px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <span className="text-gray-500 text-[18px] font-bold">{chatRoom.partner.name.charAt(0)}</span>
                    </div>
                )}
            </div>

            {/* 정보 영역 */}
            <div className="flex flex-col justify-center flex-1 min-w-0 gap-[5px]">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-[4px] min-w-0">
                        <span className="flex-none text-[18px] font-bold text-[#202023] leading-[140%] tracking-[-0.36px] truncate">
                            {chatRoom.partner.name}
                        </span>
                        <span className="truncate text-[14px] font-normal text-[#646464] leading-[140%] tracking-[-0.56px] whitespace-nowrap">
                            · {chatRoom.partner.major} {chatRoom.partner.studentId}
                        </span>
                    </div>
                    {/* 날짜 */}
                    <span className="text-[12px] font-normal text-[#A1A1A1] leading-[140%] tracking-[-0.24px] whitespace-nowrap ml-[8px]">
                        {formatDate(chatRoom.lastMessageDate)}
                    </span>
                </div>
                
                <div className="flex justify-between items-center">
                    {/* 마지막 메시지 */}
                    <span className="text-[14px] font-normal text-[#646464] leading-[140%] tracking-[-0.56px] truncate pr-[10px]">
                        {chatRoom.lastMessage}
                    </span>
                    
                    {/* 안읽은 메시지 뱃지 (있을 경우만) */}
                    {chatRoom.unreadCount > 0 && (
                        <div className="flex-none w-[20px] h-[20px] px-[6px] rounded-full bg-primary flex items-center justify-center">
                            <span className="text-[12px] font-bold text-white leading-none">
                                {chatRoom.unreadCount}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};