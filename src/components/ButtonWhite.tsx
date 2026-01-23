import type { ButtonHTMLAttributes } from 'react';

type ButtonWhiteProps = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonWhite = ({ label, className = '', disabled, ...props}: ButtonWhiteProps) => {
  return (
    <button
      disabled={disabled}
      className={`max-w-[325px] w-full h-[50px] rounded-[25px] flex items-center justify-center transition-all duration-200 ease-out text-SB-18 rotate-0
        ${disabled 
          ? 'bg-gray-150 border-gray-150 text-gray-750 cursor-not-allowed' 
          : 'border border-primary bg-white text-primary cursor-pointer'
        } ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export type { ButtonWhiteProps };
export default ButtonWhite;
