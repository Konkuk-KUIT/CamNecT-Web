import { useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

type Size = number | string;

type SaveProps = {
    width?: Size;
    height?: Size;
    className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const toCssSize = (value?: Size) =>
    value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value;

const SaveToggle = ({
    width = 24,
    height = 24,
    className = '',
    style,
    checked,
    defaultChecked,
    onChange,
    ...props
}: SaveProps) => {
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
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                    <path d="M15.2752 0.377444C16.5585 0.526778 17.5 1.63394 17.5 2.92661V21.0018L8.75 16.6268L0 21.0018V2.92661C0 1.63394 0.940333 0.526778 2.22483 0.377444C6.56039 -0.125815 10.9396 -0.125815 15.2752 0.377444Z" fill="#00C56C" />
                </svg>

            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17.593 3.32206C18.693 3.45006 19.5 4.39906 19.5 5.50706V21.0001L12 17.2501L4.5 21.0001V5.50706C4.5 4.39906 5.306 3.45006 6.407 3.32206C10.1232 2.89069 13.8768 2.89069 17.593 3.32206Z" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </label>
    );
};

export type { SaveProps };
export default SaveToggle;
