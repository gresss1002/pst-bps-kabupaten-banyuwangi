// eslint-disable-next-line no-undef
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluePrimary:'#002b6a',
        blueSecondary: '#003c80',
        softBlue:'#b4c2d6',
        nonActive:'#200202',
        hoverBlue:'#b4d4fc',
        hoverActive:'#e8e4e4',
        blueBPS:'#0093dd',
        orangeBPS:'#ea8b1c',
        greenBPS:'#68b92e',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        openSans: ['Open Sans', 'sans-serif'],
      },  
      screens: {
        'lg-plus': '1300px', // Tambahkan breakpoint kustom
        'xs':"400px",
        'xxs':"300px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

