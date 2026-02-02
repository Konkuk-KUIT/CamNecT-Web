import { useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

type Size = number | string;

type SaveToggleProps = {
    width?: Size;
    height?: Size;
    className?: string;
    isActive?: boolean;
    onToggle?: (next: boolean) => void;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'checked' | 'defaultChecked' | 'onChange' | 'onToggle'
>;

const toCssSize = (value?: Size) =>
    value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value;

const SaveToggle = ({
    width = 24,
    height = 24,
    className = '',
    style,
    isActive,
    onToggle,
    ...props
}: SaveToggleProps) => {
    const [internalChecked, setInternalChecked] = useState(isActive ?? false);
    const isControlled = isActive !== undefined;
    const isOn = isControlled ? isActive : internalChecked;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInternalChecked(event.target.checked);
        onToggle?.(event.target.checked);
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
                checked={isOn}
                onChange={handleChange}
                {...props}
            />
            {isOn ? (
                <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.093 3.32352C17.193 3.45152 18 4.40052 18 5.50852V21.0015L10.5 17.2515L3 21.0015V5.50852C3 4.40052 3.806 3.45152 4.907 3.32352C8.62319 2.89216 12.3768 2.89216 16.093 3.32352Z" fill="#00C56C" />
                </svg>

            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17.593 3.32206C18.693 3.45006 19.5 4.39906 19.5 5.50706V21.0001L12 17.2501L4.5 21.0001V5.50706C4.5 4.39906 5.306 3.45006 6.407 3.32206C10.1232 2.89069 13.8768 2.89069 17.593 3.32206Z" 
                    stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </label>
    );
};

export type { SaveToggleProps };
export default SaveToggle;
