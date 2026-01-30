import {HeaderLayout} from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";
// import { useNavigate } from "react-router-dom";
// import { CoffeeChatRequest } from "../../types/coffee-chat/coffeeChatTypes";


export const ChatRequestRoomPage = () => {
    // const navigate = useNavigate();

    return (
        <HeaderLayout
            headerSlot={
                <MainHeader
                    title="커피챗"
                    leftIcon="empty"
                    
                />
            }
        >
            <h1>ChatRequestRoomPage</h1>
        </HeaderLayout>
    )
}