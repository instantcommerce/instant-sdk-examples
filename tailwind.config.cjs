/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
        },
        gray: {
          50: "var(--color-gray-50)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
        },
        black: "#000",
        theme: {
          bg: "var(--color-theme-bg)",
          bgCard: "var(--color-theme-bgCard)",
          bgContrast: "var(--color-theme-bgContrast)",
          pretitle: "var(--color-theme-pretitle)",
          title: "var(--color-theme-title)",
          subtitle: "var(--color-theme-subtitle)",
          icon: "var(--color-theme-icon)",
          highlightedText: "var(--color-theme-highlightedText)",
          text: "var(--color-theme-text)",
          border: "var(--color-theme-border)",
          inactiveElement: "var(--color-theme-inactiveElement)",
          activeElement: "var(--color-theme-activeElement)",
          link: "var(--color-theme-link)",
        },
      },
    },
    borderRadius: {
      DEFAULT: "4px",
      xs: "4px",
      sm: "6px",
      md: "8px",
      lg: "16px",
      full: "9999px",
      none: "0",
    },
    boxShadow: {
      DEFAULT: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      sm: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
      md: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
      lg: "0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
      xl: "0px 20px 24px -4px rgba(16, 24, 40, 0.1), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)",
      "2xl": "0px 24px 48px -12px rgba(16, 24, 40, 0.25)",
      "3xl": "0px 32px 64px -12px rgba(16, 24, 40, 0.2)",
      none: "none",
    },
    borderWidth: {
      DEFAULT: "1px",
      "1px": "1px",
      "2px": "2px",
      "4px": "4px",
      none: "0",
    },
    letterSpacing: {
      tighter: "-0.02em",
      tight: "-0.01em",
      normal: "0em",
      wide: "0.01em",
      wider: "0.02em",
    },
    lineHeight: {
      none: "100%",
      tight: "115%",
      snug: "125%",
      normal: "130%",
      relaxed: "140%",
      loose: "150%",
      wide: "155%",
    },
    screens: {
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1440px",
      "2xl": "1536px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
