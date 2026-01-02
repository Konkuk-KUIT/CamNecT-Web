import type { ReactNode } from 'react';
import { useLayoutEffect, useRef } from 'react';

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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]); // 탭 버튼 참조
  const indicatorRef = useRef<HTMLSpanElement>(null); // 탭 indicator(탭 버튼 밑줄) 참조

  // 브라우저가 화면에 painting하기 전에 실행
  useLayoutEffect(() => {
    const index = tabs.findIndex((tab) => tab.id === activeId);
    if (index === -1) return;

    const el = tabRefs.current[index]; // 현재 탭 버튼
    const parent = el?.parentElement;
    const indicator = indicatorRef.current; // 현재 탭 버튼의 밑줄

    if (!el || !parent || !indicator) return;

    const parentRect = parent.getBoundingClientRect();
    const label = el.querySelector<HTMLElement>('.tab-label') ?? el;
    const labelRect = label.getBoundingClientRect();

    const scrollLeft = parent.scrollLeft || 0;

    // state대신 HTML요소의 style을 직접 변경 (실제 DOM 조작)
    // 리렌더 발생 X
    const left = labelRect.left - parentRect.left + scrollLeft;
    const width = labelRect.width;

    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
  }, [activeId, tabs]);

  return (
    <div className={`w-full ${className}`}>
      <div className='relative flex w-full justify-evenly px-6 pb-2.5'>
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
        <span className='absolute left-6 right-6 bottom-0 h-0.5 bg-gray-650 opacity-50' />
        <span
          ref={indicatorRef}
          className='absolute bottom-0 h-0.5 bg-gray-900 transition-[left,width] duration-200 ease-out'
        />
      </div>
      {children && <div className='mt-3 px-6'>{children}</div>}
    </div>
  );
}
