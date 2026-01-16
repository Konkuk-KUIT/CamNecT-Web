import { Outlet } from "react-router-dom";
import type { ReactNode } from 'react';
// Header (X) BottomNav (X) 레이아웃

type EmptyLayoutProps = {
    children?: ReactNode;
};
export const EmptyLayout = ({ children }: EmptyLayoutProps) => {
    return (
        <div
            className="w-full min-h-screen relative bg-white"
        >
            {children ?? <Outlet />}
        </div>
    );
}
