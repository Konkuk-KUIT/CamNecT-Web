import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { useState } from 'react';

// 약관 동의 페이지에서의 체크박스 토글 사이즈 
type Size = 24 | 30;

type CheckBoxProps = {
  size?: Size;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const CheckBoxToggle = ({
  size = 24,
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
    width: `${size}px`,
    height: `${size}px`,
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
      {size === 30 ? (
        isOn ? (
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.625 15.9375L13.125 23.4375L24.375 6.5625" stroke="#00C56C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.625 15.9375L13.125 23.4375L24.375 6.5625" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      ) : (
        isOn ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75L10.5 18.75L19.5 5.25" stroke="#00C56C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75L10.5 18.75L19.5 5.25" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      )}
    </label>
  );
};

export type { CheckBoxProps };
export default CheckBoxToggle;
