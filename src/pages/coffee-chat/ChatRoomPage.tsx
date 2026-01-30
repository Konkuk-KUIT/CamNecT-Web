import {HeaderLayout} from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";

export const ChatRoomPage = () => {
    return (
        <HeaderLayout
        headerSlot={
            <MainHeader
                title="커피챗"
                leftIcon="empty"
            />
        }>
            <h1>ChatRoomPage</h1>
        </HeaderLayout>
    )
}
