import type { ReactNode } from 'react';

type EmptyLayoutProps = {
  children?: ReactNode;
};

const EmptyLayout = ({ children }: EmptyLayoutProps) => {
  return (
    <div
      className='min-h-screen flex justify-center bg-[#f5f6f7]'
      style={{ minHeight: '100dvh' }}
    >
      <div className='flex min-h-[100dvh] w-[375px] flex-col items-center bg-white'>
        <main className='w-[375px] flex-1 bg-white'>{children}</main>
      </div>
    </div>
  );
};

export default EmptyLayout;
