import { useEffect, useState } from 'react';

type ToastProps = {
  isOpen: boolean;
  isFading?: boolean;
  message: string;
};

const Toast = ({ isOpen, isFading = false, message }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsVisible(false);
    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, message]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-x-0 bottom-0 z-50 px-[20px] pb-[65px]'>
      <div
        className={`flex h-[45px] w-full items-center justify-center rounded-[5px] bg-[var(--ColorMain,#00C56C)] text-b-14-hn text-[var(--ColorWhite,#FFF)] transition-opacity duration-500 ${
          isFading ? 'opacity-0' : isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
