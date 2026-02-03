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
    <div className="w-full min-h-[100dvh] relative bg-white">
      {headerSlot ?? null}
      
      {/* 컨텐츠 하단이 BottomNav에 가려지지 않도록 패딩 추가 */}
      <main className="w-full" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom))' }}>
        {children ?? <Outlet />}
      </main>
      
      <BottomNav />
    </div>
  );
};
