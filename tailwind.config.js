const colors = require('./colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors
      },
      borderColor: {
        default: 'var(--border-01)',
        primary: colors.blue['500'],
        'border-01': 'var(--border-01)',
      },
      textColor: {
        'primary': colors.blue['500'],
        'secondary':'var(--text-02)',
        '01': 'var(--text-01)',
      },
      backgroundColor: {
        'ui-background': 'var(--ui-background)',
        'ui-01': 'var(--ui-01)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
