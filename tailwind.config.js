/** @type {import('tailwindcss').Config} */
module.exports = {
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
        poopins: ["Poppins", "sans-serif"]
      },
      colors: {
        'very-dark-gray': '#25252A',
        'very-dark-blue': '#293241'
      },
      boxShadow: {
        'cs-lg': '0px 0px 50px -10px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

