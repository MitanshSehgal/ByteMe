/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          full: "#ffffff",
        },
        black: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          full: "#000000",
        },
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          dark: {
            50: "#0c4a6e",
            100: "#075985",
            200: "#0369a1",
            300: "#0284c7",
            400: "#0ea5e9",
            500: "#38bdf8",
            600: "#7dd3fc",
            700: "#bae6fd",
            800: "#e0f2fe",
            900: "#f0f9ff",
          },
        },
        secondary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        display: ['"Space Grotesk"', "sans-serif"],
        space: ['"Space Grotesk"', "sans-serif"],
        mono: [
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "36px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 8s ease-in-out infinite 2s",
        twinkle: "twinkle 4s ease-in-out infinite",
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(-2deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.1)" },
        },
      },
      boxShadow: {
        glow: "0 0 10px rgba(59, 130, 246, 0.5)",
        "glow-md": "0 0 15px rgba(59, 130, 246, 0.6)",
        "glow-lg": "0 0 20px rgba(59, 130, 246, 0.7)",
        "dark-glow": "0 0 10px rgba(147, 197, 253, 0.5)",
        "dark-glow-md": "0 0 15px rgba(147, 197, 253, 0.6)",
        "dark-glow-lg": "0 0 20px rgba(147, 197, 253, 0.7)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".bg-grid-pattern": {
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), " +
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        },
        ".dark .bg-grid-pattern": {
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), " +
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        },
        ".text-balance": {
          textWrap: "balance",
        },
        ".backdrop-blur-lg": {
          "backdrop-filter": "blur(12px)",
          "-webkit-backdrop-filter": "blur(12px)",
        },
      });
    },
  ],
};
