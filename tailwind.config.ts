import type { Config } from 'tailwindcss';

// Note: this project uses Tailwind v4 with CSS-based @theme tokens in app/globals.css.
// This file is provided for tooling/IDE compatibility; the source of truth is the @theme block.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-input': 'var(--bg-input)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-muted': 'var(--text-muted)',
        'text-inverse': 'var(--text-inverse)',
        'accent-primary': 'var(--accent-primary)',
        'accent-primary-soft': 'var(--accent-primary-soft)',
        'accent-cta': 'var(--accent-cta)',
        'accent-cta-hover': 'var(--accent-cta-hover)',
        'accent-cta-soft': 'var(--accent-cta-soft)',
        'border-subtle': 'var(--border-subtle)',
        'border-medium': 'var(--border-medium)',
        'border-strong': 'var(--border-strong)',
        'status-success': 'var(--status-success)',
        'status-warning': 'var(--status-warning)',
        'status-error': 'var(--status-error)',
      },
      spacing: {
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)', 'Noto Serif', 'Georgia', 'serif'],
      },
      maxWidth: {
        narrow: 'var(--container-narrow)',
        medium: 'var(--container-medium)',
        wide: 'var(--container-wide)',
        extra: 'var(--container-extra)',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
      },
    },
  },
  plugins: [],
};

export default config;
