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
          bg: "#06130D",
          bgSecondary: "#0A1C14",
          card: "#0C2017",
          cardHover: "#112B20",
          cardBorder: "rgba(34, 197, 94, 0.2)",
          cardBorderHover: "rgba(74, 222, 128, 0.45)",
          green: "#22C55E",
          greenLight: "#4ADE80",
          greenMuted: "#86EFAC",
          yellow: "#FACC15",
          yellowHover: "#FDE047",
          yellowDark: "#EAB308",
          text: "#F8FAFC",
          muted: "#94A3B8",
          dim: "#64748B",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'brand-glow': '0 0 35px -5px rgba(34, 197, 94, 0.35)',
        'yellow-glow': '0 0 25px -3px rgba(250, 204, 21, 0.4)',
        'card-glow': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px rgba(34, 197, 94, 0.15)',
      }
    },
  },
  plugins: [],
}
