const theme = require('./theme');

module.exports = {
  content: ["./src/**/*.{vue,js}", "./lib/**/*.vue"],
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
