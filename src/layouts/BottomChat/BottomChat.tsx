import { useEffect, useState } from 'react';
import SaveToggle from './components/SaveToggle';
import LikeToggle from './components/LikeToggle';

type BottomChatProps = {
  likeCount?: number;
  placeholder?: string;
};

export const BottomChat = ({
  likeCount = 0,
  placeholder = '댓글을 입력해 주세요',
}: BottomChatProps) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const updateOffset = () => {
      const offset = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop,
      );
      setKeyboardOffset(offset);
    };

    updateOffset();
    viewport.addEventListener('resize', updateOffset);
    viewport.addEventListener('scroll', updateOffset);
    window.addEventListener('resize', updateOffset);

    return () => {
      viewport.removeEventListener('resize', updateOffset);
      viewport.removeEventListener('scroll', updateOffset);
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  return (
    <div
      className='fixed left-0 right-0 z-50 bg-white'
      style={{ bottom: keyboardOffset }}
    >
      <div
        className='mx-auto flex w-full max-w-[720px] items-center gap-[clamp(8px,2.2vw,10px)] px-[clamp(16px,6vw,25px)] py-[6px]'
        style={{ paddingBottom: 'calc(6px + env(safe-area-inset-bottom))' }}
      >
        <input
          type='text'
          placeholder={placeholder}
          className='flex-1 rounded-[30px] border border-[var(--ColorGray1,#ECECEC)] bg-[var(--Color_Gray_B,#FCFCFC)] px-[clamp(12px,3.5vw,15px)] py-[10px] text-[16px] text-[var(--ColorBlack,#202023)] placeholder:text-[16px] placeholder:text-[var(--ColorGray2,#A1A1A1)] focus:border-[var(--ColorGray3,#646464)] focus:outline-none focus:ring-0'
        />
        <div className='flex items-center gap-[clamp(8px,3vw,13px)]'>
          <div className='flex items-center gap-[clamp(4px,1.5vw,5px)]'>
            <LikeToggle width={24} height={24} />
            <span className='text-[16px] text-[var(--ColorGray2,#A1A1A1)]'>
              {likeCount}
            </span>
          </div>
          <SaveToggle width={24} height={24} />
        </div>
      </div>
    </div>
  );
};
