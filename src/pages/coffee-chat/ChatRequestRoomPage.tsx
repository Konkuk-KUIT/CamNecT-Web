import { useParams } from "react-router-dom";
import PopUp from "../../components/Pop-up";
import { useChatRequestRoom } from "../../hooks/useChatQuery";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";
import { ChatRequestButton } from "./components/ChatRequestButton";
import { ChatRoomInfo } from "./components/ChatRoomInfo";

export const ChatRequestRoomPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: requestInfo, isLoading } = useChatRequestRoom(id || "");

    const handleAcceptChatRequest = () => {
        console.log('accept clicked');
    }

    const handleDeleteChatRequest = () => {
        console.log('delete clicked');
    }

    if (isLoading) return <PopUp isOpen={true} type="loading" />;
    if (!requestInfo) return <div className="flex justify-center items-center h-screen text-gray-400">요청 정보를 찾을 수 없습니다.</div>;

    return (
        <HeaderLayout
            headerSlot={
                <MainHeader
                    title={requestInfo.partner.name}
                />
            }
        >
            {/* 75px : ChatRequestButton 높이, 20px : ChatRoomInfo 하단 여백, env(safe-area-inset-bottom) : 하단 안전영역 */}
            <div className="flex flex-col min-h-[calc(100dvh-60px)] justify-end pb-[calc(75px+20px+env(safe-area-inset-bottom))]">
                <ChatRoomInfo chatRoom={requestInfo} />
            </div>
            <ChatRequestButton 
                onAccept={handleAcceptChatRequest}
                onDelete={handleDeleteChatRequest}
            />
        </HeaderLayout>
    )
}   