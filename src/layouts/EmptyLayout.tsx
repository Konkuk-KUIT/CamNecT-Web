import type { ReactNode } from 'react';

type EmptyLayoutProps = {
  children?: ReactNode;
};

const EmptyLayout = ({ children }: EmptyLayoutProps) => {
  return (
    <div
      className='min-h-screen flex justify-center bg-[#f5f6f7] [container-type:inline-size]'
      style={{ minHeight: '100dvh' }}
    >
      <div className='flex min-h-[100dvh] w-[clamp(320px,100cqw,540px)] flex-col items-center bg-white'>
        <main className='w-full flex-1 bg-white'>{children}</main>
      </div>
    </div>
  );
};

export default EmptyLayout;
