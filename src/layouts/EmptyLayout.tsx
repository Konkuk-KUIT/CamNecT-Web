import { Outlet } from "react-router-dom";

// Header (X) BottomNav (X) 레이아웃
export const EmptyLayout = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
}