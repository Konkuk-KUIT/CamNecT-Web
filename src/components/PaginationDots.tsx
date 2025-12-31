import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, PointerEvent, ReactNode, WheelEvent } from 'react';

type Size = number | string;

type PaginationDotsProps = {
  count?: number;
  activeIndex?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  dotSize?: Size;
  gap?: Size;
  activeColor?: string;
  inactiveColor?: string;
  width?: Size;
  height?: Size;
  trackWidth?: Size;
  trackHeight?: Size;
  items?: ReactNode[];
  className?: string;
  style?: CSSProperties;
} & HTMLAttributes<HTMLDivElement>;

const toCssSize = (value: Size) => (typeof value === 'number' ? `${value}px` : value);

const PaginationDots = ({
  count: countProp = 5,
  activeIndex,
  defaultIndex = 0,
  onChange,
  dotSize = 10,
  gap = 6,
  activeColor = 'var(--color-gray-750)',
  inactiveColor = 'var(--color-gray-150)',
  width = 50,
  height = 10,
  trackWidth = 325,
  trackHeight = 206,
  items,
  className = '',
  style,
  ...props
}: PaginationDotsProps) => {
  const itemCount = items?.length ?? countProp;
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const isControlled = activeIndex !== undefined;
  const currentIndex = isControlled ? activeIndex! : internalIndex;

  useEffect(() => {
    if (isControlled) return;
    if (defaultIndex >= 0 && defaultIndex < itemCount) {
      setInternalIndex(defaultIndex);
    }
  }, [defaultIndex, isControlled, itemCount]);

  const setIndex = (next: number) => {
    const bounded = ((next % itemCount) + itemCount) % itemCount;
    if (!isControlled) setInternalIndex(bounded);
    onChange?.(bounded);
  };

  const goPrev = () => setIndex(currentIndex - 1);
  const goNext = () => setIndex(currentIndex + 1);

  const dotSizeValue = toCssSize(dotSize);
  const gapValue = toCssSize(gap);

  const containerStyle: CSSProperties = {
    width: toCssSize(width),
    height: toCssSize(height),
    gap: 'var(--dot-gap)',
    ...style,
    '--dot-size': dotSizeValue,
    '--dot-gap': gapValue,
  } as CSSProperties;

  const indicatorStyle: CSSProperties = {
    position: 'absolute',
    left: 0,
    top: '50%',
    width: 'var(--dot-size)',
    height: 'var(--dot-size)',
    backgroundColor: activeColor,
    borderRadius: '9999px',
    transform: `translateX(calc(${currentIndex} * (var(--dot-size) + var(--dot-gap)))) translateY(-50%)`,
    transition: 'transform 200ms ease, background-color 200ms ease',
    pointerEvents: 'none',
  };

  const pointerStartXRef = useRef<number | null>(null);
  const isPointerActiveRef = useRef(false);
  const wheelLockRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  const wheelThreshold = 20; // 낮출수록 더 민감
  const wheelCooldownMs = 600; // 커질수록 한 번 스크롤당 1스텝에 가까워짐
  const swipeThreshold = 50;

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!items || items.length === 0) return;
    const now = Date.now();
    if (wheelLockRef.current || now - lastWheelTimeRef.current < wheelCooldownMs) return;

    const direction = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(direction) < wheelThreshold) return;

    wheelLockRef.current = true;
    lastWheelTimeRef.current = now;
    if (direction > 0) {
      goNext();
    } else if (direction < 0) {
      goPrev();
    }
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, wheelCooldownMs);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!items || items.length === 0) return;
    isPointerActiveRef.current = true;
    pointerStartXRef.current = event.clientX;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!items || items.length === 0) return;
    if (!isPointerActiveRef.current || pointerStartXRef.current === null) return;
    const deltaX = event.clientX - pointerStartXRef.current;

    if (deltaX <= -swipeThreshold) {
      goNext();
      isPointerActiveRef.current = false;
    } else if (deltaX >= swipeThreshold) {
      goPrev();
      isPointerActiveRef.current = false;
    }
  };

  const handlePointerEnd = () => {
    isPointerActiveRef.current = false;
    pointerStartXRef.current = null;
  };

  const sliderWidth = useMemo(() => toCssSize(trackWidth), [trackWidth]);
  const sliderHeight = useMemo(() => toCssSize(trackHeight), [trackHeight]);

  return (
    <div className='flex flex-col items-center gap-3'>
      {items && items.length > 0 && (
        <div
          className='relative overflow-hidden rounded-[12px]'
          style={{ width: sliderWidth, height: sliderHeight, touchAction: 'pan-y' }}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <div
            className='flex h-full transition-transform duration-300 ease-out'
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {items.map((item, idx) => (
              <div key={idx} className='h-full shrink-0 basis-full px-2'>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className={`relative flex items-center opacity-100 ${className}`}
        style={containerStyle}
        {...props}
      >
        {Array.from({ length: itemCount }).map((_, idx) => (
          <span
            key={idx}
            className='rounded-full'
            style={{
              width: 'var(--dot-size)',
              height: 'var(--dot-size)',
              backgroundColor: inactiveColor,
              flexShrink: 0,
            }}
          />
        ))}
        <span style={indicatorStyle} />
      </div>
    </div>
  );
};

export type { PaginationDotsProps };
export default PaginationDots;
