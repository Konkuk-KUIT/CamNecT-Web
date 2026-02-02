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
      className={`inline-flex items-center h-[22px] justify-center opacity-100 text-primary text-r-12-hn ${className}`}
      style={{
        display: 'inline-flex',
        padding: '4px 10px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '5px',
        border: '1px solid var(--ColorMain, #00C56C)',
        background: 'var(--ColorSub2, #F2FCF8)',
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
