import { useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

type Size = number | string;

type CheckBoxProps = {
  width?: Size;
  height?: Size;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const toCssSize = (value?: Size) =>
  value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value;

const CheckBoxToggle = ({
  width = 24,
  height = 24,
  className = '',
  style,
  checked,
  defaultChecked,
  onChange,
  ...props
}: CheckBoxProps) => {
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
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.75 8.25L6.75 14.25L15.75 0.75" stroke="#00C56C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      ) : (
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.75 7.97222L6.75 13.75L15.75 0.75" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      )}
    </label>
  );
};

export type { CheckBoxProps };
export default CheckBoxToggle;
