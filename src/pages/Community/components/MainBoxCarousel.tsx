import { type PointerEvent, useEffect, useRef, useState } from 'react';
import MainBox, { type MainBoxPost } from '../components/MainBox';

type MainBoxCarouselProps = {
  items: MainBoxPost[];
  gap?: number;
  peek?: number;
  edgePadding?: number;
};

const MainBoxCarousel = ({
  items,
  gap = 20,
  peek = 40,
  edgePadding = 20,
}: MainBoxCarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateWidth = () => {
      setContainerWidth(element.clientWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const resolvedWidth = containerWidth || 375;
  const itemWidth = Math.max(resolvedWidth - peek * 2, 0);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === items.length - 1;

  const baseOffset = isFirst
    ? edgePadding
    : isLast
      ? resolvedWidth - itemWidth - edgePadding
      : (resolvedWidth - itemWidth) / 2;

  const translateX = -activeIndex * (itemWidth + gap) + baseOffset;

  const goPrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));

  const pointerStartXRef = useRef<number | null>(null);
  const isPointerActiveRef = useRef(false);
  const swipeThreshold = 50;

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (items.length <= 1) return;
    isPointerActiveRef.current = true;
    pointerStartXRef.current = event.clientX;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
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

  return (
    <div className='flex flex-col items-center gap-[20px]'>
      <div
        ref={containerRef}
        className='relative w-full overflow-hidden'
        style={{ width: '100%', touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div
          className='flex'
          style={{
            gap: `${gap}px`,
            transform: `translateX(${translateX}px)`,
            transition: 'transform 300ms ease',
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                width: `${itemWidth}px`,
                flex: '0 0 auto',
              }}
            >
              <MainBox post={item} />
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center' style={{ gap: '8px' }}>
        {items.map((item, index) => (
          <span
            key={item.id}
            aria-hidden
            style={{
              width: '3.333px',
              height: '3.333px',
              borderRadius: '9999px',
              backgroundColor:
                index === activeIndex
                  ? 'var(--ColorMain, #00C56C)'
                  : 'var(--ColorGray3, #646464)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBoxCarousel;
