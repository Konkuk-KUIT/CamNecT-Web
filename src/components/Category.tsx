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
      className={`inline-flex items-center justify-center opacity-100 text-primary font-[Pretendard] font-normal text-[12px] leading-[100%] tracking-[-0.04em] ${className}`}
      style={{
        display: 'inline-flex',
        padding: '3px 5px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '3px',
        border: '1px solid var(--ColorMain, #00C56C)',
        background: 'var(--ColorSub2, #F2FCF8)',
        width: widthCss,
        height: heightCss,
        ...style,
      }}
      {...props}
    >
      {label}
    </div>
  );
};

export type { CategoryProps };
export default Category;
