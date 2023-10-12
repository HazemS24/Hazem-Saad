/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    extend: {
      // ...
     backgroundColor: ['active'],
    }
  },
  theme: {
    extend: {
      fontFamily: {
        tanker: "tanker",
      }
    },
  },
  plugins: [],
}

