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
      },
      borderColor: {
        primary: colors.blue['500']
      },
      textColor: {
        primary: colors.blue['500'],
        secondary: colors.gray['700'],
      },
      backgroundColor: {
        primary: colors.blue['500'],
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
