import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ label, className = '', disabled, ...props }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`w-[325px] h-[50px] rounded-[25px] flex items-center justify-center transition-all duration-200 ease-out text-white text-SB-18 rotate-0
        ${disabled 
          ? 'bg-gray-150 cursor-not-allowed' 
          : 'bg-primary cursor-pointer hover:bg-green-100 hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(0,197,108,0.28)]'
        } ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
