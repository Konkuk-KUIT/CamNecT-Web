import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from "../layouts/BottomNav/BottomNav";

// Header (O) BottomNav (O) 레이아웃
type FullLayoutProps = {
  headerSlot?: ReactNode;
  children?: ReactNode;
};

// todo main태그 감싸기
export const FullLayout = ({ headerSlot, children }: FullLayoutProps) => {
  return (
    <div
      className="w-full min-h-full relative bg-white"
      style={{ paddingBottom: 'calc(76px + env(safe-area-inset-bottom))' }}
    >
      {headerSlot ?? null}
      {children ?? <Outlet />}
      <BottomNav />
    </div>
  );
};
