const theme = require('./theme');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      ...theme,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
