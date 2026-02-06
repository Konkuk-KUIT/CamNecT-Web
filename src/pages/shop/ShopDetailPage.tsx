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
  // 구매 수량 및 구매 플로우 상태
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [popUpConfig, setPopUpConfig] = useState<{ title: string; content: string } | null>(null);
  const [confirmPopUpConfig, setConfirmPopUpConfig] = useState<{
    title: string;
    content: string;
    rightButtonText: string;
  } | null>(null);
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
    setConfirmPopUpConfig({
      title: '구매를 진행하시겠습니까?',
      content: '* 사용 시 포인트가 차감됩니다',
      rightButtonText: '네, 구매하겠습니다',
    });
  };

  const handleConfirmPurchase = () => {
    const totalRequiredPoint = product.point * quantity;
    const currentPoint = getPoint();
    // 포인트가 부족하면 구매 진행 중단 (최신 포인트 기준)
    if (currentPoint < totalRequiredPoint) {
      setConfirmPopUpConfig(null);
      setPopUpConfig({
        title: '포인트가 부족해서 구매할 수 없어요',
        content: '다양한 활동으로 포인트를 채워보세요!',
      });
      return;
    }
    deductPoint(totalRequiredPoint);
    setConfirmPopUpConfig(null);
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
            - 구매일로부터 교환권 지급까지 평균 3일 정도 소요될 수 있습니다.
          </span>
          <span className='text-r-12 text-[var(--ColorGray2,#A1A1A1)]'>
            - 교환권은 등록된 번호로 문자 발송됩니다.
          </span>
          <span className='text-r-12 text-[var(--ColorGray2,#A1A1A1)]'>
            - 구매 불가 시 이메일로 알림발송 됩니다.
          </span>
          <span className='text-r-12 text-[var(--ColorGray2,#A1A1A1)]'>
            - (주요 사유 : 재고부족)
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
      {confirmPopUpConfig && (
        <PopUp
          isOpen={true}
          type='info'
          title={confirmPopUpConfig.title}
          content={confirmPopUpConfig.content}
          rightButtonText={confirmPopUpConfig.rightButtonText}
          onLeftClick={() => setConfirmPopUpConfig(null)}
          onRightClick={handleConfirmPurchase}
        />
      )}
      {popUpConfig && (
        <PopUp
          isOpen={true}
          type='confirm'
          title={popUpConfig.title}
          content={popUpConfig.content}
          onClick={() => setPopUpConfig(null)}
        />
      )}
    </HeaderLayout>
  );
};
