import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  /** Demotes the label visually (muted color, lighter weight) for non-required fields. */
  optional?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, optional, ...rest }, ref) => {
    const inputId = id || rest.name || label.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className={optional ? 'text-xs font-normal' : 'text-sm font-semibold'}
          style={{ color: optional ? 'var(--text-muted)' : 'var(--text-primary)' }}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          {...rest}
          style={{
            background: 'var(--bg-input)',
            border: `1px solid ${error ? 'var(--status-error)' : 'var(--border-medium)'}`,
            color: 'var(--text-primary)',
            borderRadius: '4px',
            padding: '12px 14px',
            ...((rest.style as object) || {}),
          }}
        />
        {hint && !error && (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {hint}
          </span>
        )}
        {error && (
          <span className="text-xs" style={{ color: 'var(--status-error)' }} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  /** Demotes the label visually (muted color, lighter weight) for non-required fields. */
  optional?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, optional, ...rest }, ref) => {
    const inputId = id || rest.name || label.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className={optional ? 'text-xs font-normal' : 'text-sm font-semibold'}
          style={{ color: optional ? 'var(--text-muted)' : 'var(--text-primary)' }}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          {...rest}
          style={{
            background: 'var(--bg-input)',
            border: `1px solid ${error ? 'var(--status-error)' : 'var(--border-medium)'}`,
            color: 'var(--text-primary)',
            borderRadius: '4px',
            padding: '12px 14px',
            resize: 'vertical',
            ...((rest.style as object) || {}),
          }}
        />
        {hint && !error && (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {hint}
          </span>
        )}
        {error && (
          <span className="text-xs" style={{ color: 'var(--status-error)' }} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, id, children, ...rest }, ref) => {
    const inputId = id || rest.name || label.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className="text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </label>
        <select
          ref={ref}
          id={inputId}
          {...rest}
          style={{
            background: 'var(--bg-input)',
            border: `1px solid ${error ? 'var(--status-error)' : 'var(--border-medium)'}`,
            color: 'var(--text-primary)',
            borderRadius: '4px',
            padding: '12px 14px',
            ...((rest.style as object) || {}),
          }}
        >
          {children}
        </select>
        {hint && !error && (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {hint}
          </span>
        )}
        {error && (
          <span className="text-xs" style={{ color: 'var(--status-error)' }} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
Select.displayName = 'Select';
