/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          1000: "#8E8CD8",
          1050: "#6d6bb1",
        },
      },
    },
  },
  plugins: [],
};
