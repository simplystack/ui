const config = require('@simplystack/ui/tailwind.config')

module.exports = {
  theme: {
    extend: {
      ...config.theme.extend,
      container: {
        center: true,
        padding: '1rem'
      }
    }
  }
}
