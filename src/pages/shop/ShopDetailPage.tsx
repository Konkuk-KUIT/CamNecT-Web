import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PopUp from '../../components/Pop-up';
import Toast from '../../components/Toast';
import { useToast } from '../../hooks/useToast';
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
  // 구매 수량 및 구매 플로우 상태
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { isOpen: isToastOpen, isFading: isToastFading, openToast } = useToast();
  // 전역 포인트 (구매 즉시 반영)
  const point = usePointStore((state) => state.point);
  const getPoint = usePointStore((state) => state.getPoint);
  const deductPoint = usePointStore((state) => state.deductPoint);
  // URL 파라미터로 상품 찾기
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
    // 바텀 시트가 내려가면 기본 상태로 복귀
    setIsPurchasing(false);
  };

  const handleBuyClick = () => {
    if (!isPurchasing) {
      openPurchaseSheet();
      return;
    }
    // 구매중 상태에서 재클릭 시 구매 확인 팝업
    setIsConfirmOpen(true);
  };

  const handleConfirmPurchase = () => {
    const totalRequiredPoint = product.point * quantity;
    const currentPoint = getPoint();
    // 포인트가 부족하면 구매 진행 중단 (최신 포인트 기준)
    if (currentPoint < totalRequiredPoint) {
      setToastMessage('포인트가 부족해서 구매할 수 없어요');
      openToast();
      setIsConfirmOpen(false);
      return;
    }
    deductPoint(totalRequiredPoint);
    setIsConfirmOpen(false);
    setIsSheetOpen(false);
    setIsPurchasing(false);
    navigate('/shop', { state: { purchaseSuccess: true } });
  };

  const handleDecrease = () => {
    // 수량은 최소 1 유지
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    const nextQuantity = quantity + 1;
    const nextRequiredPoint = product.point * nextQuantity;
    // 잔여 포인트가 0 아래로 내려가는 경우 증가 불가
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
      <BottomBuy onClick={handleBuyClick} />
      <PurchaseBottomSheet
        isOpen={isSheetOpen}
        onClose={closePurchaseSheet}
        quantity={quantity}
        onDecrease={handleDecrease}
        onIncrease={handleIncrease}
        myPoint={point}
        requiredPoint={product.point}
        bottomOffset='calc(105px)'
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
      <Toast isOpen={isToastOpen} isFading={isToastFading} message={toastMessage} />
    </HeaderLayout>
  );
};
