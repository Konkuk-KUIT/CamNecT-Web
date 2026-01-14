import { Header } from "./components/Header";
import { BottomNav } from "../components/BottomNav/BottomNav";
import { Outlet } from "react-router-dom";

// Header (O) BottomNav (O) 레이아웃
export const FullLayout = ({headerType}: {headerType: string}) => {
    return (
        <div 
            className="w-full min-h-screen relative bg-white"
            style={{ paddingBottom: 'calc(76px + env(safe-area-inset-bottom))' }}
        >
            <Header type={ headerType} />
            <Outlet/>
            <BottomNav/>
        </div>
    );
}
