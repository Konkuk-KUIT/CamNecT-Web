import type { ReactNode } from 'react';
import Icon from '../components/Icon';

type MainLayoutProps = {
  title: string;
  rightElement?: ReactNode;
  onBack?: () => void;
  children?: ReactNode;
};

const MainLayout = ({ title, rightElement, onBack, children }: MainLayoutProps) => {
  return (
    <div className='w-full max-w-[430px] min-h-screen mx-auto bg-white relative shadow-md flex flex-col items-center'>
      <header
        className='sticky left-0 right-0 top-0 z-50 grid w-full max-w-[430px] grid-cols-[24px_1fr_24px] items-center bg-white px-[20px] py-[10px] mx-auto'
        style={{
          paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
          top: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <button type='button' className='flex items-center justify-start' onClick={onBack}>
          <Icon name='back' />
        </button>
        <div className='text-center text-[16px] font-semibold leading-[150%] tracking-[-0.02em] text-[#202023]'>
          {title}
        </div>
        <div className='flex items-center justify-end'>
          {rightElement ?? <span className='block w-6 h-6' />}
        </div>
      </header>

      <main className='w-full px-[20px] pb-10'>{children}</main>
    </div>
  );
};

export default MainLayout;
