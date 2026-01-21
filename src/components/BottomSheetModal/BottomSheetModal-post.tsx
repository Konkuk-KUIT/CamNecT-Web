import BottomSheetModal from './BottomSheetModal';
import Icon, { type IconName } from './Icon';

type ContentTarget = 'post' | 'comment';

type BottomSheetModalPostProps = {
  isOpen: boolean;
  onClose: () => void;
  target: ContentTarget;
  isMine: boolean;
  onItemClick?: (item: ActionItem, target: ContentTarget) => void;
};

type ActionItem = {
  icon: IconName;
  label: string;
};

const optionsMap: Record<ContentTarget, { mine: ActionItem[]; other: ActionItem[] }> = {
  post: {
    mine: [
      { icon: 'edit', label: '게시글 수정' },
      { icon: 'delete', label: '게시글 삭제' },
    ],
    other: [
      { icon: 'url', label: 'URL 복사' },
      { icon: 'report', label: '게시글 신고' },
    ],
  },
  comment: {
    mine: [
      { icon: 'edit', label: '댓글 수정' },
      { icon: 'delete', label: '댓글 삭제' },
    ],
    other: [
      { icon: 'profile', label: '작성자 프로필 보기' },
      { icon: 'report', label: '댓글 신고' },
    ],
  },
};

const BottomSheetModalPost = ({
  isOpen,
  onClose,
  target,
  isMine,
  onItemClick,
}: BottomSheetModalPostProps) => {
  const items = optionsMap[target][isMine ? 'mine' : 'other'];

  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} height='auto'>
      <div className='flex min-h-[200px] flex-col px-[clamp(16px,6vw,25px)] pt-[30px]'>
        <div className='flex flex-col divide-y divide-[var(--ColorGray1,#ECECEC)]'>
          {items.map((item) => (
            <button
              key={`${target}-${item.icon}`}
              type='button'
              className='flex items-center gap-[15px] py-[15px] text-left'
              onClick={() => onItemClick?.(item, target)}
            >
              <Icon name={item.icon} />
              <span
                className='text-[16px] font-medium'
                style={{
                  color: item.label.includes('삭제')
                    ? 'var(--Color_Red, #FF3838)'
                    : 'var(--ColorGray3,#646464)',
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </BottomSheetModal>
  );
};

export default BottomSheetModalPost;
