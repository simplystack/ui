/* eslint-disable global-require */
module.exports = {
  content: ['./lib/**/*.vue', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  presets: [require('./preset')],
  plugins: [],
};
