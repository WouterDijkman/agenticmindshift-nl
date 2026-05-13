'use client';

import { useState, ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between text-left px-5 py-4 min-h-[44px]"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="text-base sm:text-lg font-semibold">{item.question}</span>
              <span
                aria-hidden="true"
                className="ml-4 text-xl"
                style={{
                  color: 'var(--accent-primary)',
                  transition: 'transform 0.2s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  display: 'inline-block',
                  lineHeight: 1,
                }}
              >
                +
              </span>
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              aria-hidden={!isOpen}
              className={`accordion-panel ${isOpen ? 'open' : ''}`}
            >
              <div
                className="px-5 pb-5 pt-1"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
