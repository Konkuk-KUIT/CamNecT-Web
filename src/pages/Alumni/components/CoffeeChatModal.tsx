import { useEffect, useMemo, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import Card from '../../../components/Card';
import Category from '../../../components/Category';
import BottomSheetModal from '../../community/components/BottomSheetModal';

type CoffeeChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onSubmit?: (payload: { categories: string[]; message: string }) => void;
};

// 커피챗 요청을 작성하는 바텀시트 모달.
const CoffeeChatModal = ({ isOpen, onClose, categories, onSubmit }: CoffeeChatModalProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const maxLength = 100;

  useEffect(() => {
    if (isOpen) {
      // 모달을 열 때마다 입력 상태를 초기화합니다.
      setSelectedCategories([]);
      setMessage('');
    }
  }, [isOpen]);

  // 최소 조건 충족 여부 및 글자수 표시.
  const isSubmitEnabled = selectedCategories.length > 0 && message.trim().length > 0;
  const countText = useMemo(() => `${message.length}/${maxLength}`, [message.length]);

  // 카테고리 활성/비활성 토글.
  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  // 입력 길이 제한 적용.
  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value.slice(0, maxLength);
    setMessage(value);
  };

  // 제출 시 부모로 선택 정보 전달.
  const handleSubmit = () => {
    if (!isSubmitEnabled) return;
    onSubmit?.({ categories: selectedCategories, message });
    onClose();
  };

  return (
    <BottomSheetModal
      isOpen={isOpen}
      onOutsideClick={onClose}
      className='bg-[var(--Color_Gray_B,#FCFCFC)] shadow-[0_-1px_9.6px_0_rgba(32,32,35,0.10)]'
    >
      <div className='flex flex-col [padding:clamp(36px,11cqw,45px)_clamp(18px,7cqw,25px)_clamp(40px,12cqw,50px)] [gap:clamp(24px,8cqw,36px)]'>
        {/* 요청 분야 + 요청 내용 영역 */}
        <div className='flex flex-col gap-[20px]'>
          <div className='flex flex-col gap-[15px]'>
            <span className='text-sb-18 text-[color:var(--ColorBlack,#202023)]'>요청 분야</span>
            <div className='flex flex-wrap gap-[10px]'>
              {categories.map((category) => {
                const isActive = selectedCategories.includes(category);
                const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleToggleCategory(category);
                  }
                };

                if (isActive) {
                  return (
                    <button
                      key={category}
                      type='button'
                      onClick={() => handleToggleCategory(category)}
                      onKeyDown={handleKeyDown}
                      className='cursor-pointer'
                    >
                      <Category label={category} />
                    </button>
                  );
                }

                return (
                  <button
                    key={category}
                    type='button'
                    onClick={() => handleToggleCategory(category)}
                    onKeyDown={handleKeyDown}
                    className='inline-flex items-center justify-center rounded-[3px] border border-[var(--ColorGray2,#A1A1A1)] bg-[var(--ColorGray1,#ECECEC)] px-[5px] py-[3px] text-[12px] font-normal leading-[100%] tracking-[-0.04em] text-[color:var(--ColorGray2,#A1A1A1)]'
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='flex flex-col gap-[15px]'>
            <span className='text-sb-18 text-[color:var(--ColorBlack,#202023)]'>요청 내용 (필수)</span>
            <div className='flex flex-col gap-[8px]'>
              <Card width='100%' height={130} className='px-[15px] py-[15px]'>
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  placeholder={`커피챗을 요청하는 이유와 궁금한 점을 간결하게 작성해주세요.\n(예: 백엔드 개발에 대한 멘토링을 부탁드립니다.)`}
                  className='h-full w-full resize-none bg-transparent outline-none text-r-16 text-[color:var(--ColorGray3,#646464)] placeholder:text-[color:var(--ColorGray2,#A1A1A1)]'
                />
              </Card>
              <div className='text-right text-r-12 text-[color:var(--ColorGray2,#A1A1A1)]'>
                {countText}
              </div>
            </div>
          </div>
        </div>

        {/* 커피챗 요청 버튼 */}
        <button
          type='button'
          onClick={handleSubmit}
          disabled={!isSubmitEnabled}
          className={`h-[50px] w-full rounded-[27px] text-sb-18 ${
            isSubmitEnabled
              ? 'bg-[var(--ColorMain,#00C56C)] text-[color:var(--ColorWhite,#FFF)]'
              : 'bg-[var(--ColorGray1,#ECECEC)] text-[color:var(--ColorGray2,#A1A1A1)]'
          }`}
        >
          커피챗 요청하기
        </button>
      </div>
    </BottomSheetModal>
  );
};

export default CoffeeChatModal;
