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
  plugins: [],
};