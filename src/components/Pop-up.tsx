import type { ReactNode } from 'react';

type PopUpType = 'info' | 'warning' | 'confirm' | 'loading';

type PopUpProps = {
  isOpen: boolean;
  type: PopUpType;
  title: string;
  content?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
};

const PopUp = ({
  isOpen,
  type,
  title,
  content,
  leftButtonText,
  rightButtonText,
  onLeftClick,
  onRightClick,
}: PopUpProps) => {
  if (!isOpen) return null;

  const contentAlign =
    type === 'warning' || type === 'confirm' ? 'text-center' : 'text-left';

  const renderContent = (): ReactNode => {
    const formattedContent =
      type === 'warning' || type === 'confirm'
        ? content
          ? `* ${content}`
          : undefined
        : content;

    return (
      <div className={`flex flex-col gap-[15px] px-[15px] pt-[10px] ${contentAlign}`}>
        <div className='text-b-18 whitespace-pre-wrap text-[var(--ColorBlack,#202023)]'>{title}</div>
        {formattedContent && (
          <div className='text-r-14 whitespace-pre-wrap text-[var(--ColorGray3,#646464)]'>{formattedContent}</div>
        )}
      </div>
    );
  };

  const renderButtons = (): ReactNode => {
    if (type === 'loading') {
      return null;
    }

    if (type === 'confirm') {
      return (
        <button
          type='button'
          onClick={onRightClick}
          className='flex h-[45px] w-full items-center justify-center rounded-[10px] bg-[var(--ColorMain,#00C56C)] text-b-14-hn text-[var(--ColorWhite,#FFF)]'
        >
          <span className='whitespace-pre-wrap'>{rightButtonText ?? '확인'}</span>
        </button>
      );
    }

    if (type === 'warning') {
      return (
        <div className='flex w-full gap-[10px]'>
          <button
            type='button'
            onClick={onLeftClick}
            className='flex h-[45px] w-full items-center justify-center rounded-[10px] bg-[var(--Color_Red2,#FFEFEF)] text-b-14-hn text-[var(--ColorRed,#FF3838)]'
          >
            <span className='whitespace-pre-wrap'>{leftButtonText ?? '삭제하기'}</span>
          </button>
          <button
            type='button'
            onClick={onRightClick}
            className='flex h-[45px] w-full items-center justify-center rounded-[10px] bg-[var(--ColorGray1,#ECECEC)] text-sb-14 text-[var(--ColorGray2,#A1A1A1)]'
          >
            <span className='whitespace-pre-wrap'>아니요</span>
          </button>
        </div>
      );
    }

    return (
      <div className='flex w-full gap-[10px]'>
        <button
          type='button'
          onClick={onLeftClick}
          className='flex h-[45px] w-full items-center justify-center rounded-[10px] bg-[var(--ColorSub2,#F2FCF8)] text-sb-14 text-[var(--ColorMain,#00C56C)]'
        >
          <span className='whitespace-pre-wrap'>아니오</span>
        </button>
        <button
          type='button'
          onClick={onRightClick}
          className='flex h-[45px] w-full items-center justify-center rounded-[10px] bg-[var(--ColorMain,#00C56C)] text-b-14-hn text-[var(--ColorWhite,#FFF)]'
        >
          <span className='whitespace-pre-wrap'>{rightButtonText ?? '네, 확인했습니다'}</span>
        </button>
      </div>
    );
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-[20px] py-[20px]'>
      <div className='flex w-[clamp(260px,85vw,324px)] h-auto flex-col px-[20px] py-[20px] rounded-[20px] bg-[var(--ColorWhite,#FFF)] shadow-[0_12px_30px_rgba(0,0,0,0.16)]'>
        {renderContent()}
        <div className='mt-[25px]'>{renderButtons()}</div>
      </div>
    </div>
  );
};

export default PopUp;
