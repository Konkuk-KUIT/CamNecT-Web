import type { ButtonHTMLAttributes } from 'react';

type ButtonWhiteProps = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonWhite = ({ label, className = '', ...props }: ButtonWhiteProps) => {
  return (
    <button
      className={`w-[325px] h-[50px] rounded-[25px] border border-primary bg-white text-primary text-SB-18 opacity-100 rotate-0 flex items-center justify-center transition-all duration-200 ease-out hover:bg-sub hover:text-green-100 hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(0,197,108,0.18)] cursor-pointer ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export type { ButtonWhiteProps };
export default ButtonWhite;
