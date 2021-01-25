const config = require('@simplystack/ui/tailwind.config')

module.exports = {
  theme: {
    extend: {
      colors: {
        ...config.theme.extend.colors,
        ui: {
          background: 'var(--color-ui-background)',
          sidebar: 'var(--color-ui-sidebar)',
          typo: 'var(--color-ui-typo)',
          primary: 'var(--color-ui-primary)',
          border: 'var(--color-ui-border)'
        }
      },
      container: {
        center: true,
        padding: '1rem'
      }
    }
  }
}
