import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PopUp from '../../components/Pop-up';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import { usePointStore } from '../../store/usePointStore';
import { BottomBuy } from './components/BottomBuy';
import { PurchaseBottomSheet } from './components/PurchaseBottomSheet';
import { shopItems } from './data';

const formatPoint = (value: number) => value.toLocaleString('ko-KR');

export const ShopDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const point = usePointStore((state) => state.point);
  const deductPoint = usePointStore((state) => state.deductPoint);
  const product = useMemo(() => {
    const id = Number(productId);
    if (!Number.isFinite(id)) {
      return null;
    }
    return shopItems.find((item) => item.id === id) ?? null;
  }, [productId]);

  if (!product) {
    return (
      <HeaderLayout headerSlot={<MainHeader title='기프티콘 샵' />}>
        <section className='flex flex-col px-[25px] py-[20px]'>
          <p className='text-m-14 text-[var(--ColorGray3,#646464)]'>상품을 찾을 수 없습니다.</p>
        </section>
      </HeaderLayout>
    );
  }

  const openPurchaseSheet = () => {
    setIsPurchasing(true);
    setIsSheetOpen(true);
  };

  const closePurchaseSheet = () => {
    setIsSheetOpen(false);
    setIsPurchasing(false);
  };

  const handleBuyClick = () => {
    if (!isPurchasing) {
      openPurchaseSheet();
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmPurchase = () => {
    const totalRequiredPoint = product.point * quantity;
    deductPoint(totalRequiredPoint);
    setIsConfirmOpen(false);
    setIsSheetOpen(false);
    setIsPurchasing(false);
    navigate('/shop', { state: { purchaseSuccess: true } });
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    const nextQuantity = quantity + 1;
    const nextRequiredPoint = product.point * nextQuantity;
    if (point - nextRequiredPoint < 0) {
      return;
    }
    setQuantity(nextQuantity);
  };

  return (
    <HeaderLayout headerSlot={<MainHeader title='기프티콘 샵' />}>
      <section className='flex flex-col flex-1 min-h-0 pb-[80px] bg-[var(--Color_Gray_B,#FCFCFC)]'>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className='w-full aspect-square object-cover'
          />
        ) : (
          <div className='w-full aspect-square bg-[var(--ColorGray1,#ECECEC)]' />
        )}

        <div className='flex flex-col gap-[10px] px-[25px] py-[25px]'>
          <div className='flex flex-col'>
            <span className='text-m-12 text-[var(--ColorGray2,#A1A1A1)]'>{product.company}</span>
            <span className='text-m-20 text-[var(--ColorBlack,#202023)]'>{product.name}</span>
          </div>
          <span className='text-[24px] font-bold leading-[normal] text-[var(--ColorMain,#00C56C)]'>
            {formatPoint(product.point)} Point
          </span>
        </div>

        <div className='flex flex-col gap-[10px] px-[25px] py-[15px] flex-1'>
          <span className='text-r-12 text-[var(--ColorGray2,#A1A1A1)]'>
            - 구매일로부터 교환권 지급까지 영업일 기준 ~3일 소요될 수 있습니다.
          </span>
          <span className='text-r-12 text-[var(--ColorGray2,#A1A1A1)]'>
            - 환불 및 취소와 관련된 사항은 문의 탭 이용 바랍니다.
          </span>
        </div>
      </section>
      <BottomBuy onClick={handleBuyClick} state={isPurchasing ? 'purchasing' : 'default'} />
      <PurchaseBottomSheet
        isOpen={isSheetOpen}
        onClose={closePurchaseSheet}
        quantity={quantity}
        onDecrease={handleDecrease}
        onIncrease={handleIncrease}
        myPoint={point}
        requiredPoint={product.point}
        bottomOffset='calc(60px + env(safe-area-inset-bottom))'
      />
      <PopUp
        isOpen={isConfirmOpen}
        type='info'
        title='구매를 진행하시겠습니까?'
        content='* 사용 시 포인트가 차감됩니다'
        rightButtonText='네, 구매하겠습니다'
        onLeftClick={() => setIsConfirmOpen(false)}
        onRightClick={handleConfirmPurchase}
      />
    </HeaderLayout>
  );
};
