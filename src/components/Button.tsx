import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ label, className = '', disabled, ...props }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`max-w-[325px] w-full h-[50px] rounded-[25px] flex items-center justify-center transition-all duration-200 ease-out text-SB-18 rotate-0
        ${disabled 
          ? 'bg-gray-150 text-gray-750 cursor-not-allowed' 
          : 'bg-primary text-white cursor-pointer '
        } ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
