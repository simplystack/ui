const colors = require('./colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      borderColor: {
        default: 'var(--border-01)',
        primary: 'var(--color-brand)',
        'border-01': 'var(--border-01)',
      },
      textColor: {
        primary: 'var(--color-brand)',
        secondary: 'var(--text-02)',
        '01': 'var(--text-01)',
      },
      backgroundColor: {
        'ui-background': 'var(--ui-background)',
        'ui-01': 'var(--ui-01)',

        'interactive-01': 'var(--interactive-01)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
