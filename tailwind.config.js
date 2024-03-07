/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('/1048.jpg')",
      },
    },
  },
  plugins: [],
};
