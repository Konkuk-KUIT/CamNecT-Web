import { useParams } from "react-router-dom";
import PopUp from "../../components/Pop-up";
import { useChatRequestRoom } from "../../hooks/useChatQuery";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";

export const ChatRequestRoomPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: requestInfo, isLoading } = useChatRequestRoom(id || "");

    const searchMessage = () => {
        console.log('search clicked');
    }

    const optionMenu = () => {
        console.log('option clicked');
    }

    if (isLoading) return <PopUp isOpen={true} type="loading" />;
    if (!requestInfo) return <div className="flex justify-center items-center h-screen text-gray-400">요청 정보를 찾을 수 없습니다.</div>;

    return (
        <HeaderLayout
            headerSlot={
                <MainHeader
                    title={requestInfo.partner.name}
                    rightActions={[
                        { icon: 'search', onClick: searchMessage },
                        { icon: 'mypageOption', onClick: optionMenu }
                    ]}
                />
            }
        >
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">{requestInfo.partner.name}님의 요청</h1>
                <p className="text-gray-600">내용: {requestInfo.lastMessage}</p>
                {requestInfo.requestPostTitle && (
                    <p className="text-blue-500 mt-2 font-semibold">[{requestInfo.requestPostTitle}]</p>
                )}
                <p className="text-gray-400 text-sm mt-4">요청 ID: {id}</p>
            </div>
        </HeaderLayout>
    )
}