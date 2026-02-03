import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

// Header (O) BottomNav (X) 레이아웃
type FullLayoutProps = {
  headerSlot?: ReactNode;
  children?: ReactNode;
};

export const HeaderLayout = ({ headerSlot, children }: FullLayoutProps) => {
  return (
    <div
      className="w-full min-h-[100dvh] relative bg-white"
      style={{ paddingBottom: 'calc(20px + env(safe-area-inset-bottom))' }}
    >
      {headerSlot ?? null}
      <main className="w-full">
        {children ?? <Outlet />}
      </main>
    </div>
  );
};
