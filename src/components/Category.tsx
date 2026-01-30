import type { HTMLAttributes } from 'react';

type CategoryProps = {
  label: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;


const Category = ({
  label,
  className = '',
  style,
  ...props
}: CategoryProps) => {

  return (
    <div
      className={`inline-flex h-[24px] items-center justify-center px-[10px] text-r-12 leading-[24px] opacity-100 text-primary box-border ${className}`}
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '5px',
        border: '1px solid var(--ColorMain, #00C56C)',
        background: 'var(--ColorSub2, #F2FCF8)',
        boxSizing: 'border-box',
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
