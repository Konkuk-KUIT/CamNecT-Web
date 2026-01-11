import type { ReactNode } from 'react';

type EmptyLayoutProps = {
  children?: ReactNode;
};

const EmptyLayout = ({ children }: EmptyLayoutProps) => {
  return (
    <div className='min-h-screen bg-[#f5f6f7] flex flex-col items-center'>
      <main className='w-[375px]'>{children}</main>
    </div>
  );
};

export default EmptyLayout;
