/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  variants: {
    extend: {
      // ...
      backgroundColor: ["active"],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        poopins: ["Poppins", "sans-serif"],
        archivo: ["Archivo Black", "sans-serif"],
      },
      colors: {
        "very-dark-gray": "#25252A",
        "very-dark-blue": "#293241",
      },
      boxShadow: {
        "cs-md": "0px 0px 30px 5px rgba(0, 0, 0, 0.3)",
        "cs-lg": "0px 0px 30px 20px rgba(0, 0, 0, 0.3)",
        "cs-xl": "0px 0px 30px -10px rgba(0, 0, 0, 0.3)",
      },
      dropShadow: {
        "3xl": "0 35px 35px rgb(0 0 0 / 0.17)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
