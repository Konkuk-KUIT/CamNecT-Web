type ToastProps = {
  isOpen: boolean;
  isFading?: boolean;
  message: string;
};

const Toast = ({ isOpen, isFading = false, message }: ToastProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-x-0 bottom-0 z-50 px-[20px] pb-[65px]'>
      <div
        key={message}
        className={`flex h-[45px] w-full items-center justify-center rounded-[5px] bg-[var(--ColorMain,#00C56C)] text-b-14-hn text-[var(--ColorWhite,#FFF)] transition-opacity duration-600 starting:opacity-0 ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
