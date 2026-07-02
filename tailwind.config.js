/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#faf6f0",
        sand: "#f0e6d8",
        coffee: "#3d2c1e",
        terra: "#b5542d",
        terradark: "#94431f",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
