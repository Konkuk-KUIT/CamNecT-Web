import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ label, className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={`w-[325px] h-[50px] rounded-[25px] bg-primary text-white text-SB-18 opacity-100 rotate-0 flex items-center justify-center transition-all duration-200 ease-out hover:bg-green-100 hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(0,197,108,0.28)] cursor-pointer ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
