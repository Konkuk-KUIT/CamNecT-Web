import { useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

type Size = number | string;

type LikeToggleProps = {
  width?: Size;
  height?: Size;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const toCssSize = (value?: Size) =>
  value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value;

const LikeToggle = ({
  width = 24,
  height = 24,
  className = '',
  style,
  checked,
  defaultChecked,
  onChange,
  ...props
}: LikeToggleProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internalChecked;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(event.target.checked);
    onChange?.(event);
  };

  const dimensionStyle = {
    width: toCssSize(width),
    height: toCssSize(height),
  };

  return (
    <label
      className={`inline-flex items-center justify-center cursor-pointer select-none ${className}`}
      style={{ ...dimensionStyle, ...style }}
    >
      <input
        type='checkbox'
        className='absolute opacity-0 w-0 h-0 pointer-events-none'
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        {...props}
      />
      {isOn ? (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 20.5L10.55 19.18C5.4 14.36 2 11.28 2 7.5C2 5 4 3 6.5 3C8.24 3 9.91 3.81 11 5.09C12.09 3.81 13.76 3 15.5 3C18 3 20 5 20 7.5C20 11.28 16.6 14.36 11.45 19.18L12 20.5Z'
            fill='#00C56C'
          />
        </svg>
      ) : (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 20.5L10.55 19.18C5.4 14.36 2 11.28 2 7.5C2 5 4 3 6.5 3C8.24 3 9.91 3.81 11 5.09C12.09 3.81 13.76 3 15.5 3C18 3 20 5 20 7.5C20 11.28 16.6 14.36 11.45 19.18L12 20.5Z'
            stroke='#00C56C'
            strokeWidth='2'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </label>
  );
};

export type { LikeToggleProps };
export default LikeToggle;
