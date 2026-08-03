'use client';

import { useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

const ease = [0.22, 1, 0.36, 1] as const;

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
              border: '1px solid',
              borderColor: isOpen ? 'var(--border-medium)' : 'var(--border-subtle)',
              borderRadius: '4px',
              transition: 'border-color 200ms ease',
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
              <motion.span
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.22, ease }}
                style={{
                  color: isOpen ? 'var(--accent-cta-ink)' : 'var(--accent-primary)',
                  display: 'inline-block',
                  lineHeight: 1,
                  fontSize: '1.25rem',
                  marginLeft: '16px',
                  flexShrink: 0,
                }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    className="px-5 pb-5 pt-1"
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.75,
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
