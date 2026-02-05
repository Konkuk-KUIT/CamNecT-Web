import { useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

type Size = number | string;

type LikeToggleProps = {
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

const LikeToggle = ({
    width = 24,
    height = 24,
    className = '',
    style,
    isActive,
    onToggle,
    ...props
}: LikeToggleProps) => {
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_3756_5170)">
                        <path d="M12 7V3C12 2.2 11.68 1.44 11.12 0.88C10.56 0.32 9.79 0 9 0L5 9V20H16.28C16.76 20 17.23 19.84 17.6 19.52C17.97 19.21 18.21 18.77 18.28 18.3L19.66 9.3C19.7 9.01 19.68 8.72 19.6 8.44C19.52 8.16 19.38 7.9 19.19 7.69C19 7.47 18.76 7.3 18.5 7.18C18.24 7.06 17.95 7 17.66 7H12ZM5 20H2C1.47 20 0.96 19.79 0.59 19.41C0.21 19.03 0 18.53 0 18V11C0 10.47 0.21 9.96 0.59 9.59C0.97 9.21 1.47 9 2 9H5" fill="#00C56C" />
                        <path d="M5 9H3V20H5V9Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_3756_5170">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 11L11 2C11.7956 2 12.5587 2.31607 13.1213 2.87868C13.6839 3.44129 14 4.20435 14 5V9H19.66C19.9499 8.99672 20.2371 9.0565 20.5016 9.17522C20.7661 9.29393 21.0016 9.46873 21.1919 9.68751C21.3821 9.90629 21.5225 10.1638 21.6033 10.4423C21.6842 10.7207 21.7035 11.0134 21.66 11.3L20.28 20.3C20.2077 20.7769 19.9654 21.2116 19.5979 21.524C19.2304 21.8364 18.7623 22.0055 18.28 22H7M7 11V22M7 11H4C3.46957 11 2.96086 11.2107 2.58579 11.5858C2.21071 11.9609 2 12.4696 2 13V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H7" 
                    stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </label>
    );
};

export type { LikeToggleProps };
export default LikeToggle;
