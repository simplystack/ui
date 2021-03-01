const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss('tailwind.config.js'), //This refers to your tailwind config
    require('autoprefixer'),
  ],
};
