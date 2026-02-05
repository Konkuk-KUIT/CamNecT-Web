type BottomBuyProps = {
  onClick?: () => void;
  state?: 'default' | 'purchasing';
};

export const BottomBuy = ({ onClick, state = 'default' }: BottomBuyProps) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 bg-white px-[25px] py-[5px]'>
      <button
        type='button'
        onClick={onClick}
        className='h-[50px] w-full rounded-[10px] bg-[var(--ColorMain,#00C56C)] text-sb-18 text-white'
      >
        구매하기
      </button>
    </div>
  );
};
