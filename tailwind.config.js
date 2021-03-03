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
        default: 'var(--color-border-default)',
        brand: 'var(--color-border-brand)',

        'control-default': 'var(--color-control-border-default)',
        'control-active': 'var(--color-control-border-active)',
        'control-focus': 'var(--color-control-border-focus)',
        'control-hover': 'var(--color-control-border-hover)',
        'control-disabled': 'var(--color-control-border-disabled)',
        'control-danger': 'var(--color-control-border-danger)',
      },
      textColor: {
        brand: 'var(--color-typo-primary)',
        danger: 'var(--color-typo-danger)',
        primary: 'var(--color-typo-primary)',
        secondary: 'var(--color-typo-secondary)',
        placeholder: 'var(--color-typo-placeholder)',
        'control-disabled': 'var(--color-control-typo-disabled)',
      },
      backgroundColor: {
        body: 'var(--color-bg-body)',
        brand: 'var(--color-bg-brand)',
        success: 'var(--color-bg-success)',
        warning: 'var(--color-bg-warning)',
        danger: 'var(--color-bg-danger)',
        base: 'var(--color-bg-base)',
        secondary: 'var(--color-bg-secondary)',
        tertiary: 'var(--color-bg-tertiary)',
        'control-default': 'var(--color-control-bg-default)',
        'control-disabled': 'var(--color-control-bg-disabled)',
        'control-primary': 'var(--color-control-bg-primary)',
        'control-primary-hover': 'var(--color-control-bg-primary-hover)',
        'control-secondary': 'var(--color-control-bg-secondary)',
        'control-secondary-hover': 'var(--color-control-bg-secondary-hover)',
        'control-subtle': 'var(--color-control-bg-subtle)',
        'control-danger': 'var(--color-control-bg-danger)',
        'control-danger-hover': 'var(--color-control-bg-danger-hover)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
