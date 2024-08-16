/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#4B5A35",
          dark: "#3E4A2B", // Slightly darker shade for hover/focus
        },
        dun: "#CDC2B6",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".slider-thumb": {
            "background-color": "#4B5A35", // Custom green color
            border: "2px solid #4B5A35", // Custom green color
            height: "16px",
            width: "16px",
            "border-radius": "50%",
            cursor: "pointer",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
