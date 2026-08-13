/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        ink: {
          950: "#06060a",
          900: "#0a0a11",
          800: "#12121c",
          700: "#1b1b28",
        },
        accent: {
          teal: "#5eead4",
          indigo: "#818cf8",
          fuchsia: "#e879f9",
        },
      },
      borderRadius: {
        card: "24px",
        panel: "28px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.4), 0 16px 40px -20px rgba(0,0,0,0.7)",
        lift: "0 2px 4px rgba(0,0,0,0.3), 0 36px 70px -28px rgba(0,0,0,0.85)",
        glow: "0 0 0 1px rgba(129,140,248,0.28), 0 18px 50px -18px rgba(129,140,248,0.45)",
        pill: "0 10px 30px -10px rgba(129,140,248,0.55)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        shell: "1200px",
      },
    },
  },
  plugins: [],
};
