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
    <div className='fixed bottom-0 left-0 right-0 z-40 w-full border-t border-[#ECECEC] bg-white px-[20px] py-[12px]'>
      <div className='mx-auto flex w-full max-w-[720px] items-center justify-between gap-[12px]'>
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
              {isClosed ? '모집 완료' : '모집 전'}
            </div>
          )}
        </div>
        <div className='flex items-center gap-[12px]'>
          <div className='flex items-center gap-[6px] text-r-12 text-[var(--ColorGray3,#646464)]'>
            <LikeToggle aria-label='좋아요' />
            <span>{likeCount}</span>
          </div>
          <SaveToggle aria-label='저장' />
        </div>
      </div>
    </div>
  );
};

export default BottomReact;
