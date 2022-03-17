const colors = require('./colors');

module.exports = {
  theme: {
    colors: {
      ...colors,
    },
    extend: {
      colors: {},
      fontFamily: {
        body: 'var(--font-family)',
      },
      textColor: {
        brand: 'var(--color-typo-brand)',
        danger: 'var(--color-typo-danger)',
        primary: 'var(--color-typo-primary)',
        secondary: 'var(--color-typo-secondary)',
        tertiary: 'var(--color-typo-tertiary)',
        'control-placeholder': 'var(--color-control-typo-placeholder)',
        'control-primary': 'var(--color-control-typo-primary)',
        'control-disabled': 'var(--color-control-typo-disabled)',
      },
      fontSize: {
        control: 'var(--control-typo-size)',
      },
      borderWidth: {
        control: 'var(--control-border-width)',
      },
      borderRadius: {
        control: 'var(--control-border-radius)',
      },
      boxShadow: {
        control: 'var(--control-box-shadow)',
      },
      borderColor: {
        DEFAULT: 'var(--color-border-default)',
        brand: 'var(--color-border-brand)',
        inverted: 'var(--color-control-bg-inverted)',
        stripe: 'var(--color-bg-stripe)',
        success: 'var(--color-bg-success)',
        warning: 'var(--color-bg-warning)',
        danger: 'var(--color-bg-danger)',
        'control-default': 'var(--color-control-border-default)',
        'control-primary': 'var(--color-control-bg-primary)',
        'control-active': 'var(--color-control-border-active)',
        'control-focus': 'var(--color-control-border-focus)',
        'control-hover': 'var(--color-control-border-hover)',
        'control-disabled': 'var(--color-control-border-disabled)',
        'control-danger': 'var(--color-control-border-danger)',
      },
      backgroundColor: {
        body: 'var(--color-bg-body)',
        brand: 'var(--color-bg-brand)',
        success: 'var(--color-bg-success)',
        warning: 'var(--color-bg-warning)',
        danger: 'var(--color-bg-danger)',
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        tertiary: 'var(--color-bg-tertiary)',
        stripe: 'var(--color-bg-stripe)',
        tone: 'var(--color-bg-tone)',
        soft: 'var(--color-bg-soft)',
        'control-default': 'var(--color-control-bg-default)',
        'control-disabled': 'var(--color-control-bg-disabled)',
        'control-primary': 'var(--color-control-bg-primary)',
        'control-primary-hover': 'var(--color-control-bg-primary-hover)',
        'control-secondary': 'var(--color-control-bg-secondary)',
        'control-secondary-hover': 'var(--color-control-bg-secondary-hover)',
        'control-subtle-hover': 'var(--color-control-bg-subtle-hover)',
        'control-danger': 'var(--color-control-bg-danger)',
        'control-danger-hover': 'var(--color-control-bg-danger-hover)',
      },
      backgroundImage: {
        'select-chevron': 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
      },
      ringColor: {
        primary: 'var(--color-brand)',
        danger: 'var(--color-danger)',
      },
    },
  },
};
