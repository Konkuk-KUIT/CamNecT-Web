import type { HTMLAttributes } from 'react';

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

const Badge = ({ className = '', ...props }: BadgeProps) => {
  return (
    <span
      className={`absolute -top-[2px] -right-[2px] w-[5.55px] h-[5.55px] rounded-full bg-primary opacity-100 ${className}`}
      {...props}
    />
  );
};

export type { BadgeProps };
export default Badge;
