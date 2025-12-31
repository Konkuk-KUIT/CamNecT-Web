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
                <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.093 3.32352C17.193 3.45152 18 4.40052 18 5.50852V21.0015L10.5 17.2515L3 21.0015V5.50852C3 4.40052 3.806 3.45152 4.907 3.32352C8.62319 2.89216 12.3768 2.89216 16.093 3.32352Z" fill="#00C56C" />
                </svg>

            ) : (
                <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.093 3.32352C17.193 3.45152 18 4.40052 18 5.50852V21.0015L10.5 17.2515L3 21.0015V5.50852C3 4.40052 3.806 3.45152 4.907 3.32352C8.62319 2.89216 12.3768 2.89216 16.093 3.32352Z"
                        fill="none"
                        stroke="#00C56C"
                        stroke-width="2"
                        stroke-linejoin="round"
                    />
                </svg>
            )}
        </label>
    );
};

export type { SaveProps };
export default SaveToggle;
