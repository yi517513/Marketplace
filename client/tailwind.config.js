/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "rgb(128, 128, 128)",
        "light-gray": "rgb(109, 109, 109)",
        "disabled-bg": "#cccccc",
        "disabled-text": "#666666",
      },
    },
  },
  plugins: [],
};
