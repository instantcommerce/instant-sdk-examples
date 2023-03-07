/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)'
        },
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)'
        },
        black: '#000',
        theme: {
          bg: 'var(--color-bg)',
          bgCard: 'var(--color-bgCard)',
          bgContrast: 'var(--color-bgContrast)',
          pretitle: 'var(--color-pretitle)',
          title: 'var(--color-title)',
          subtitle: 'var(--color-subtitle)',
          icon: 'var(--color-icon)',
          highlightedText: 'var(--color-highlightedText)',
          text: 'var(--color-text)',
          border: 'var(--color-border)',
          inactiveElement: 'var(--color-inactiveElement)',
          activeElement: 'var(--color-activeElement)',
          link: 'var(--color-link)'
        }
      }
    },
    borderRadius: {
      DEFAULT: '4px',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '16px',
      full: '9999px',
      none: '0'
    },
    boxShadow: {
      DEFAULT: '0px 1px 2px rgba(16, 24, 40, 0.05)',
      xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
      sm: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
      md: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
      lg: '0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)',
      xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.1), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)',
      '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.25)',
      '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.2)',
      none: 'none'
    },
    borderWidth: {
      DEFAULT: '1px',
      '1px': '1px',
      '2px': '2px',
      '4px': '4px',
      none: '0'
    },
    fontSize: {
      '2xs': ['0.625rem', {}],
      xs: ['0.75rem', {}],
      sm: ['0.875rem', {}],
      base: ['1rem', {}],
      lg: ['1.125rem', {}],
      xl: ['1.25rem', {}],
      '2xl': ['1.5rem', {}],
      '3xl': ['1.75rem', {}],
      '4xl': ['1.875rem', {}],
      '5xl': ['2rem', {}],
      '6xl': ['2.25rem', {}],
      '7xl': ['2.5rem', {}],
      '8xl': ['2.75rem', {}],
      '9xl': ['3rem', {}],
      '10xl': ['4rem', {}],
      '11xl': ['5rem', {}],
      '12xl': ['6rem', {}]
    },
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0em',
      wide: '0.01em',
      wider: '0.02em'
    },
    lineHeight: {
      none: '100%',
      tight: '110%',
      snug: '115%',
      normal: '125%',
      relaxed: '130%',
      roomy: '140%',
      loose: '150%',
      wide: '155%'
    },
    screens: {
      sm: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1440px',
      '2xl': '1536px'
    },
    spacing: {
      0: '0',
      0.25: '2px',
      0.5: '4px',
      0.75: '6px',
      1: '8px',
      1.25: '10px',
      1.5: '12px',
      1.75: '14px',
      2: '16px',
      2.25: '18px',
      2.5: '20px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
      9: '72px',
      10: '80px',
      11: '88px',
      12: '96px',
      15: '120px',
      16: '128px',
      20: '160px'
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
