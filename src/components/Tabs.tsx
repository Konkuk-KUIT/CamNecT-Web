import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  children?: ReactNode;
  className?: string;
};

export function Tabs({ tabs, activeId, onChange, children, className = '' }: TabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const tabsSignature = tabs.map(({ id, label }) => `${id}:${label}`).join('|');

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.id === activeId);
    if (index === -1) return;
    const el = tabRefs.current[index];
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const parentRect = parent.getBoundingClientRect();
    const label = el.querySelector<HTMLElement>('.tab-label') ?? el;
    const labelRect = label.getBoundingClientRect();

    const scrollLeft = parent.scrollLeft || 0;
    setIndicatorLeft(labelRect.left - parentRect.left + scrollLeft);
    setIndicatorWidth(labelRect.width);
  }, [activeId, tabsSignature]);

  return (
    <div className={`w-full ${className}`}>
      <div className='relative flex w-full justify-evenly px-6 pb-[10px]'>
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            type='button'
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            className={`relative px-3 py-2 text-[18px] leading-[140%] tracking-[-0.04em] font-normal text-gray-650 transition-colors duration-150 whitespace-nowrap shrink-0 bg-transparent cursor-pointer ${
              activeId === tab.id ? 'text-gray-900 font-bold tracking-[-0.02em]' : ''
            }`}
            onClick={() => onChange(tab.id)}
          >
            <span className='tab-label'>{tab.label}</span>
          </button>
        ))}
        <span className='absolute left-6 right-6 bottom-0 h-[2px] bg-gray-650 opacity-50' />
        <span
          className='absolute bottom-0 h-[2px] bg-gray-900 transition-[left,width] duration-200 ease-out'
          style={{
            width: `${indicatorWidth}px`,
            left: `${indicatorLeft}px`,
          }}
        />
      </div>
      {children && <div className='mt-3 px-6'>{children}</div>}
    </div>
  );
}
