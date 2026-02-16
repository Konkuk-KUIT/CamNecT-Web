import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUp from "../../components/Pop-up";
import { useChatRequestRespond, useChatRequestRoom } from "../../hooks/useChatQuery";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";
import { ChatRequestButton } from "./components/ChatRequestButton";
import { ChatRoomInfo } from "./components/ChatRoomInfo";

export const ChatRequestRoomPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: requestInfo, isLoading } = useChatRequestRoom(id || "");

    const navigate = useNavigate();

    const [isAcceptPopUpOpen, setIsAcceptPopUpOpen] = useState(false);
    const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);

    const handleAcceptChatRequest = () => {
        setIsAcceptPopUpOpen(true);
    }

    const handleDeleteChatRequest = () => {
        setIsDeletePopUpOpen(true);
    }

    const { mutate: respondRequest } = useChatRequestRespond();
    const handleAcceptChatRequestConfirm = () => {
        if (!id) return;
        respondRequest(
            { requestId: Number(id), isAccepted: true },
            {
                onSuccess: () => {
                    setIsAcceptPopUpOpen(false);
                    navigate(`/chat/requests`, { replace: true });
                }
            }
        );
    }

    const handleDeleteChatRequestConfirm = () => {
        if (!id) return;
        respondRequest(
            { requestId: Number(id), isAccepted: false },
            {
                onSuccess: () => {
                    setIsDeletePopUpOpen(false);
                    navigate(`/chat/requests`, { replace: true });
                }
            }
        );
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
                <ChatRoomInfo partner={requestInfo.partner} requestInfo={requestInfo.requestInfo} />
            </div>
            <ChatRequestButton 
                onAccept={handleAcceptChatRequest}
                onDelete={handleDeleteChatRequest}
            />

            {/* 승인 팝업 */}
            <PopUp 
                isOpen={isAcceptPopUpOpen}
                type="info"
                title={`${requestInfo.partner.name}님의\n요청을 수락하시겠습니까?`}
                content="수락 시 채팅방이 생성됩니다."
                rightButtonText="수락하기"
                onLeftClick={() => setIsAcceptPopUpOpen(false)}
                onRightClick={handleAcceptChatRequestConfirm}
            />

            {/* 삭제 팝업 */}
            <PopUp 
                isOpen={isDeletePopUpOpen}
                type="warning"
                title={`${requestInfo.partner.name}님의\n요청을 삭제하시겠습니까?`}
                content="삭제된 요청은 다시 확인할 수 없습니다."
                onLeftClick={handleDeleteChatRequestConfirm}
                onRightClick={() => setIsDeletePopUpOpen(false)}
            />
        </HeaderLayout>
    )
}