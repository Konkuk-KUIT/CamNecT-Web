import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

// Header (O) BottomNav (X) 레이아웃
export const HeaderLayout = ({headerType}: {headerType: string}) => {
    return (
        <div>
            <Header type={ headerType}/>
            <Outlet/>
        </div>
    );
}