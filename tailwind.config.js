/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Background & Surfaces (Clean Bright Friendly Light Theme)
          bg: "#F8FAFC",
          bgSecondary: "#F1F5F9",
          surface: "#FFFFFF",
          surfaceElevated: "#FFFFFF",
          surfaceHover: "#F8FAFC",
          card: "#FFFFFF",
          cardHover: "#F8FAFC",
          cardBorder: "rgba(15, 23, 42, 0.08)",
          cardBorderHover: "rgba(15, 23, 42, 0.16)",

          // Primary Brand - Green Accent
          primary: "#10B981",
          primaryHover: "#059669",
          primaryActive: "#047857",
          primaryMuted: "#A7F3D0",
          primarySubtle: "#ECFDF5",
          green: "#10B981",
          greenLight: "#34D399",
          greenMuted: "#059669",

          // Secondary - Teal
          teal: "#0D9488",
          tealHover: "#0F766E",
          tealMuted: "#CCFBF1",

          // Secondary - Cyan
          cyan: "#0284C7",
          cyanHover: "#0369A1",
          cyanMuted: "#E0F2FE",

          // Accent - Amber
          amber: "#D97706",
          amberHover: "#B45309",
          amberMuted: "#FEF3C7",
          yellow: "#D97706",
          yellowHover: "#B45309",
          yellowDark: "#92400E",

          // Semantic
          success: "#10B981",
          error: "#EF4444",
          warning: "#F59E0B",
          info: "#0284C7",

          // Text System (Dark Slate on White for clarity)
          text: "#0F172A",
          textSecondary: "#475569",
          textMuted: "#64748B",
          textDisabled: "#94A3B8",
          muted: "#475569",
          dim: "#64748B",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'brand-glow': '0 0 25px -4px rgba(91, 196, 122, 0.28)',
        'teal-glow': '0 0 25px -4px rgba(69, 184, 165, 0.28)',
        'cyan-glow': '0 0 25px -4px rgba(94, 182, 214, 0.28)',
        'amber-glow': '0 0 20px -3px rgba(229, 184, 92, 0.3)',
        'card-glow': '0 10px 30px -10px rgba(0, 0, 0, 0.65)',
      }
    },
  },
  plugins: [],
}
