import { useState } from 'react';
import type { ButtonHTMLAttributes } from 'react';

type Size = number | string;

type ToggleProps = {
  toggled?: boolean;
  defaultToggled?: boolean;
  onToggle?: (next: boolean) => void;
  width?: Size;
  height?: Size;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>;

const toCssSize = (value?: Size) =>
  value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value;

const Toggle = ({
  toggled,
  defaultToggled = false,
  onToggle,
  width = 24,
  height = 24,
  className = '',
  style,
  ...props
}: ToggleProps) => {
  const [internal, setInternal] = useState(defaultToggled);
  const isControlled = toggled !== undefined;
  const isOn = isControlled ? toggled : internal;

  const handleClick = () => {
    const next = !isOn;
    if (!isControlled) setInternal(next);
    onToggle?.(next);
  };

  const dimensionStyle = {
    width: toCssSize(width),
    height: toCssSize(height),
  };

  return (
    <button
      type='button'
      aria-pressed={isOn}
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-full transition-colors cursor-pointer ${className}`}
      style={{ ...dimensionStyle, ...style }}
      {...props}
    >
      {isOn ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 15.75L12 8.25L19.5 15.75" stroke="#202023" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 8.25L12 15.75L19.5 8.25" stroke="#202023" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      )}
    </button>
  );
};

export type { ToggleProps };
export default Toggle;
