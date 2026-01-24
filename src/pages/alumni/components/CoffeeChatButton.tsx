import type { ButtonHTMLAttributes } from 'react';

type CoffeeChatButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// 커피챗 요청 버튼 공통 스타일 컴포넌트.
const CoffeeChatButton = ({ className, style, type, ...rest }: CoffeeChatButtonProps) => {
  return (
    <button
      type={type ?? 'button'}
      className={`flex w-full items-center justify-center rounded-[clamp(8px,2.8cqw,10px)] bg-[var(--ColorMain,#00C56C)] py-[10px]${
        className ? ` ${className}` : ''
      }`}
      style={style}
      {...rest}
    >
      <span className='text-sb-14 text-[color:var(--ColorWhite,#FFF)]'>커피챗 요청하기</span>
    </button>
  );
};

export default CoffeeChatButton;
