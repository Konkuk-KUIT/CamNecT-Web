import type { ReactNode } from 'react';
import Icon from '../../components/Icon';

type EditHeaderProps = {
  title: string;
  rightElement?: ReactNode;
};

export const EditHeader = ({ title, rightElement }: EditHeaderProps) => {
  return (
    <header
      className='sticky left-0 right-0 top-0 z-50 inline-flex w-full items-center bg-white px-[25px] py-[10px] [container-type:inline-size] relative'
      style={{
        paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
        top: 'env(safe-area-inset-top, 0px)',
      }}
      role='banner'
    >
      <div className='flex w-[28px] items-center justify-start z-10'>
        <Icon name='cancel' style={{ width: 'clamp(24px, 7.467cqw, 28px)', height: 'clamp(24px, 7.467cqw, 28px)' }} />
      </div>
      <div
        className='absolute left-1/2 -translate-x-1/2 text-center text-sb-20 text-[var(--ColorBlack,#202023)] max-w-[60%] truncate'
        style={{ fontSize: 'clamp(18px, 5.333cqw, 20px)' }}
      >
        {title}
      </div>
      <div className='flex min-w-[28px] flex-1 items-center justify-end z-10'>{rightElement}</div>
    </header>
  );
};
