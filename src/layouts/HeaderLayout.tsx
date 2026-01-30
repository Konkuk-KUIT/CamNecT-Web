import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

// Header (O) BottomNav (X) 레이아웃
type FullLayoutProps = {
  headerSlot?: ReactNode;
  children?: ReactNode;
};

export const HeaderLayout = ({ headerSlot, children }: FullLayoutProps) => {
  return (
    // min-h-full : 100dvh까지 채우고 넘치면 스크롤 생성
    <div
      className="w-full min-h-full relative bg-white"
      style={{ paddingBottom: 'calc(76px + env(safe-area-inset-bottom))' }}
    >
      {headerSlot ?? null}
      {children ?? <Outlet />}
    </div>
  );
};
