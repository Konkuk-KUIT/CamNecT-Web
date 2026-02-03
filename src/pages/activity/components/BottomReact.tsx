import LikeToggle from '../../../layouts/BottomChat/components/LikeToggle';
import SaveToggle from '../../../layouts/BottomChat/components/SaveToggle';
import type { ActivityPostStatus } from '../../../types/activityPost';

type BottomReactProps = {
  isMine: boolean;
  status: ActivityPostStatus;
  onOpenCompletePopup: () => void;
  likeCount?: number;
};

const BottomReact = ({
  isMine,
  status,
  onOpenCompletePopup,
  likeCount = 0,
}: BottomReactProps) => {
  const isClosed = status === 'CLOSED';

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 bg-white'>
      <div
        className='mx-auto flex w-full max-w-[720px] items-center gap-[clamp(8px,2.2vw,10px)] px-[clamp(16px,6vw,25px)] py-[6px] box-border'
        style={{ paddingBottom: 'calc(6px + env(safe-area-inset-bottom))' }}
      >
        <div className='flex flex-1 items-center'>
          {isMine ? (
            <button
              type='button'
              onClick={onOpenCompletePopup}
              disabled={isClosed}
              className='text-b-16-hn flex h-[44px] w-full items-center justify-center rounded-[10px] bg-[var(--ColorMain,#00C56C)] text-[var(--ColorWhite,#FFF)] disabled:cursor-not-allowed disabled:opacity-60'
            >
              모집완료
            </button>
          ) : (
            <div className='text-b-16-hn flex h-[44px] w-full items-center justify-center rounded-[10px] bg-[var(--ColorSub2,#F2FCF8)] text-[var(--ColorMain,#00C56C)]'>
              {isClosed ? '모집 완료' : '모집 중'}
            </div>
          )}
        </div>
        <div className='flex shrink-0 items-center gap-[clamp(8px,3vw,13px)]'>
          <div className='flex items-center gap-[clamp(4px,1.5vw,5px)]'>
            <LikeToggle width={24} height={24} aria-label='좋아요' />
            <span className='text-[16px] text-[var(--ColorGray2,#A1A1A1)]'>
              {likeCount}
            </span>
          </div>
          <SaveToggle width={24} height={24} aria-label='저장' />
        </div>
      </div>
    </div>
  );
};

export default BottomReact;
