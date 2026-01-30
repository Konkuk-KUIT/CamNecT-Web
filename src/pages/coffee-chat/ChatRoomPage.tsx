import { useParams } from "react-router-dom";
import PopUp from "../../components/Pop-up";
import { useChatRoom } from "../../hooks/useChatQuery";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";

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
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">{roomInfo.partner.name}님과의 채팅방</h1>
                <p className="text-gray-600">마지막 메시지: {roomInfo.lastMessage}</p>
                <p className="text-gray-400 text-sm mt-2">ID: {id}</p>
            </div>
        </HeaderLayout>
    )
}
