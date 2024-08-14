/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        green: "#4B5A35",
        orange: "#CA6749",
        brown: "#928368",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.slider-thumb': {
          'background-color': '#4B5A35', // Custom green color
          'border': '2px solid #4B5A35', // Custom green color
          'height': '16px',
          'width': '16px',
          'border-radius': '50%',
          'cursor': 'pointer',
        },
      }, ['responsive', 'hover']);
    },
  ],
};
