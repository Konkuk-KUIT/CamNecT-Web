import { BottomNav } from "../components/BottomNav/BottomNav";
import { Outlet } from "react-router-dom";

// Header (X) BottomNav (O) 레이아웃
export const BottomNavLayout = () => {
    return (
        <div>
            <Outlet />
            <BottomNav/>
        </div>
    );
}