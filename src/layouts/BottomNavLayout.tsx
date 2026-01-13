import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/BottomNav/BottomNav";

// Header (X) BottomNav (O) 레이아웃
export const BottomNavLayout = () => {
    return (
        <div 
            className="w-full min-h-screen relative bg-white"
            style={{ paddingBottom: 'calc(76px + env(safe-area-inset-bottom))' }}
        >
            <Outlet />
            <BottomNav/>
        </div>
    );
}