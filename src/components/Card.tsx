import type { HTMLAttributes, ReactNode } from 'react';

type Size = number | string;

type CardProps = {
  width?: Size;
  height?: Size;
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const toPx = (value: Size) => (typeof value === 'number' ? `${value}px` : value);

const Card = ({
  width = 325,
  height = 206,
  children,
  className = '',
  style,
  ...props
}: CardProps) => {
  const cardWidth = toPx(width);
  const cardHeight = toPx(height);

  return (
    <div
      className={`bg-white border border-gray-150 rounded-[12px] opacity-100 ${className}`}
      style={{ width: cardWidth, height: cardHeight, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export type { CardProps };
export default Card;
