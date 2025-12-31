import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import './Tabs.css';

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
  }, [activeId, tabs]);

  return (
    <div className={`tabs ${className}`}>
      <div className='tabs-list'>
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            type='button'
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            className={`tab-button ${activeId === tab.id ? 'is-active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            <span className='tab-label'>{tab.label}</span>
          </button>
        ))}
        <span className='tabs-rail' />
        <span
          className='tabs-indicator'
          style={{
            width: `${indicatorWidth}px`,
            left: `${indicatorLeft}px`,
          }}
        />
      </div>
      {children && <div className='tab-panel'>{children}</div>}
    </div>
  );
}
