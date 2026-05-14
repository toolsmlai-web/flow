import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#CCFF00",
          50: "#FFFFF0",
          100: "#FFFFE6",
          200: "#FFFFCC",
          300: "#FFFF99",
          400: "#FFFF66",
          500: "#FFFF33",
          600: "#FFFF00",
          700: "#CCFF00",
          800: "#99CC00",
          900: "#669900",
        },
        neon: {
          lime: "#CCFF00",
          cyan: "#00FFFF",
          magenta: "#FF00FF",
          white: "#FFFFFF",
        },
        cyberpunk: {
          black: "#000000",
          dark: "#0A0A0A",
          darker: "#050505",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
