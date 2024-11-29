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
        faX: "#f56565",
        "faX-hover": "#c53030",
        faStar: "#FFD700 ",
        "faStar-hover": "#FFBF00",
      },
      spacing: {
        "btn-small": "1.5rem",
        "btn-large": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in",
        "fade-out": "fadeOut 0.8s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
