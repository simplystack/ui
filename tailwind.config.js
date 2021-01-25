const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          ...colors.blue,
          500: '#0044f0'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
