import type { ButtonHTMLAttributes } from 'react';

type ButtonWhiteProps = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonWhite = ({ label, className = '', disabled, ...props}: ButtonWhiteProps) => {
  return (
    <button
      disabled={disabled}
      className={`max-w-[325px] w-full h-[50px] rounded-[25px] flex items-center justify-center text-SB-18 rotate-0 transition
        ${disabled 
          ? 'bg-gray-150 border-gray-150 text-gray-750 cursor-not-allowed' 
          : 'border border-primary bg-white text-primary cursor-pointer active:scale-95 active:brightness-95'
        } ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export type { ButtonWhiteProps };
export default ButtonWhite;
