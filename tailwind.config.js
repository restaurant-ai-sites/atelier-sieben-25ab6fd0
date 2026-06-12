/** @type {import('tailwindcss').Config} */
// basic_05 — Bildstark & Gastronomisch: beyaz zemin, bordo vurgu, dev görseller
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#ffffff",
        sand: "#f5f5f4",
        coffee: "#1c1917",
        terra: "#9f1239",
        terradark: "#881337",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
