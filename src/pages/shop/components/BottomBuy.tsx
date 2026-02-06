type BottomBuyProps = {
  onClick?: () => void;
};

export const BottomBuy = ({ onClick }: BottomBuyProps) => {
  return (
    // 화면 하단 고정 구매 버튼
    <div
      className='fixed bottom-0 left-0 right-0 z-50 bg-white px-[25px] py-[5px]'
      style={{ paddingBottom: 'calc(5px + env(safe-area-inset-bottom))' }}
    >
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
