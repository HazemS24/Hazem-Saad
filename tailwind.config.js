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
        pixel: ["Pixelify Sans", "sans-serif"]
      },
      colors: {
        'very-dark-gray': '#25252A'
      }
    },
  },
  plugins: [],
}

