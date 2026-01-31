import type { ChatRoomListItem } from "../../../types/coffee-chat/coffeeChatTypes";
import { formatFullDateWithDay } from "../../../utils/formatDate";

interface ChatRoomInfoProps {
    chatRoom: ChatRoomListItem;
}

// todo 요청분야와 요청내용 API 호출
export const ChatRoomInfo = ({ chatRoom }: ChatRoomInfoProps) => {

    return (
        <div className="flex flex-col gap-[10px] px-[25px]">
            <section className="flex flex-col items-center gap-[40px]">
                <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col items-center gap-[15px]">
                        <div className="shrink-0">
                            {chatRoom.partner.profileImg ? (
                                <img src={chatRoom.partner.profileImg} alt="프로필 이미지" className="w-[84px] h-[84px] rounded-full object-cover" />
                            ) : (
                                <div className="w-[84px] h-[84px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    <span className="text-gray-700 text-[36px] font-bold">{chatRoom.partner.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col items-center gap-[7px]">
                            <h3 className="text-b-18-hn text-gray-900 text-center tracking-[-0.72px]">
                                {chatRoom.partner.name}
                            </h3>
                            <p className="text-r-12-hn text-gray-750 text-center tracking-[-0.48px]">
                                {chatRoom.partner.major} {chatRoom.partner.studentId}
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap gap-[5px]">
                        {chatRoom.partner.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="flex justify-center items-center rounded-[3px] border border-primary bg-green-50 px-[5px] py-[3px] text-R-12-hn text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <p className="text-r-12 text-gray-750 text-center tracking-[-0.24px]">
                    {formatFullDateWithDay(chatRoom.lastMessageDate)}
                </p>
            </section>

            <section className="flex flex-col gap-[15px] p-[25px] rounded-[20px] border border-gray-150">
                <div className="flex flex-col gap-[7px]">
                    <p className="text-sb-16 text-gray-900 tracking-[-0.64px]">요청 분야</p>
                    <div className="flex flex-wrap gap-[10px]">
                        {chatRoom.partner.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="flex justify-center items-center rounded-[3px] border border-primary bg-green-50 px-[5px] py-[3px] text-R-12-hn text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-[7px]">
                    <p className="text-sb-16 text-gray-900 tracking-[-0.64px]">요청 내용</p>
                    <p className="text-r-14 text-gray-750 tracking-[-0.56px]">요청 이유 및 궁금한점 (API 불러오기)</p>
                </div>
            </section>
        </div>
    )
}