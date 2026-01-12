import { Header } from "./components/Header";
import { BottomNav } from "../components/BottomNav/BottomNav";
import { Outlet } from "react-router-dom";

// Header (O) BottomNav (O) 레이아웃
export const FullLayout = ({headerType}: {headerType: string}) => {
    return (
        <div>
            <Header type={ headerType} />
            <Outlet/>
            <BottomNav/>
        </div>
    );
}
