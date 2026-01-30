import { useParams } from "react-router-dom";
import PopUp from "../../components/Pop-up";
import { useChatRoom } from "../../hooks/useChatQuery";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";
import { ChatRoomInfo } from "./components/ChatRoomInfo";
import { TypingArea } from "./components/TypingArea";

export const ChatRoomPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: roomInfo, isLoading } = useChatRoom(id || "");

    if (isLoading) return <PopUp isOpen={true} type="loading" />;
    if (!roomInfo) return <div className="flex justify-center items-center h-screen text-gray-400">채팅방 정보를 찾을 수 없습니다.</div>;

    return (
        <HeaderLayout
            headerSlot={
                <MainHeader
                    title={roomInfo.partner.name}
                />
            }
        >
            <div className="flex flex-col pt-[74px] pb-[150px]">
                <ChatRoomInfo chatRoom={roomInfo} />
            </div>
            <TypingArea />
        </HeaderLayout>
    )
}
