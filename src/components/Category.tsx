import type { HTMLAttributes } from 'react';

type Size = number | string;

type CategoryProps = {
  label: string;
  className?: string;
  width?: Size; // optional override
  height?: Size; // optional override, defaults to 22px
} & HTMLAttributes<HTMLDivElement>;

const toCssSize = (value?: Size) =>
  value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value;

const Category = ({
  label,
  className = '',
  style,
  width,
  height = 22,
  ...props
}: CategoryProps) => {
  const widthCss = toCssSize(width);
  const heightCss = toCssSize(height);

  return (
    <div
      className={`inline-flex items-center rounded-[5px] border border-primary bg-sub px-[10px] py-[4px] gap-[10px] opacity-100 
        text-primary font-[Pretendard] font-normal text-[12px] leading-[100%] tracking-[-0.04em] ${className}`}
      style={{ width: widthCss, height: heightCss, ...style }}
      {...props}
    >
      {label}
    </div>
  );
};

export type { CategoryProps };
export default Category;
