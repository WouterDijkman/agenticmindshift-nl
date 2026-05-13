'use client';

import { useEffect } from 'react';
import type { Question, OptionLetter } from '@/lib/questions';

interface QuestionCardProps {
  question: Question;
  index: number; // 1..15 (global)
  selected: OptionLetter | undefined;
  onSelect: (letter: OptionLetter) => void;
}

const VALID_KEYS: OptionLetter[] = ['A', 'B', 'C', 'D', 'E'];

export default function QuestionCard({
  question,
  index,
  selected,
  onSelect,
}: QuestionCardProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const k = e.key.toUpperCase() as OptionLetter;
      if (VALID_KEYS.includes(k)) {
        const exists = question.options.find((o) => o.letter === k);
        if (exists) onSelect(k);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [question, onSelect]);

  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '4px',
        padding: '32px',
      }}
    >
      <p
        className="text-xs uppercase tracking-wider mb-3"
        style={{ color: 'var(--accent-primary)', letterSpacing: '0.12em' }}
      >
        Vraag {index} / 15
      </p>
      <h2
        className="text-xl sm:text-2xl mb-7 leading-snug"
        style={{ color: 'var(--text-primary)' }}
      >
        {question.text}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((opt) => {
          const isSelected = selected === opt.letter;
          return (
            <button
              key={opt.letter}
              type="button"
              onClick={() => onSelect(opt.letter)}
              aria-pressed={isSelected}
              className="w-full text-left flex items-start gap-4 transition-colors duration-150"
              style={{
                background: isSelected
                  ? 'var(--accent-primary-soft)'
                  : 'var(--bg-elevated)',
                border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                color: 'var(--text-primary)',
                padding: '14px 18px',
                borderRadius: '4px',
              }}
            >
              <span
                className="text-base font-semibold shrink-0"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isSelected ? 'var(--accent-primary)' : 'transparent',
                  border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-medium)'}`,
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  borderRadius: '4px',
                }}
              >
                {opt.letter}
              </span>
              <span className="text-base sm:text-lg pt-1">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-xs" style={{ color: 'var(--text-muted)' }}>
        Tip: u kunt ook de toetsen A, B, C, D of E gebruiken.
      </p>
    </div>
  );
}
