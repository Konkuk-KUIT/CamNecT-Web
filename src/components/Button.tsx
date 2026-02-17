import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ label, className = '', disabled, ...props }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`max-w-[325px] w-full h-[50px] rounded-[25px] flex items-center justify-center text-SB-18 rotate-0 transition
        ${disabled 
          ? 'bg-gray-150 text-gray-750 cursor-not-allowed' 
          : 'bg-primary text-white cursor-pointer active:scale-95 active:brightness-95'
        } ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
