import type { CSSProperties } from 'react';
import { Outlet } from "react-router-dom";
import { BottomNav } from "../layouts/BottomNav/BottomNav";

// Header (X) BottomNav (O) 레이아웃
export const BottomNavLayout = () => {
    const layoutStyle: CSSProperties & { '--bottom-sheet-safe-padding': string } = {
        paddingBottom: 'calc(76px + env(safe-area-inset-bottom))',
        '--bottom-sheet-safe-padding': 'calc(50px + env(safe-area-inset-bottom))',
    };

    return (
        <div 
            className="w-full min-h-screen relative bg-white"
            style={layoutStyle}
        >
            <Outlet />
            <BottomNav/>
        </div>
    );
}
