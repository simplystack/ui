const config = require('../tailwind.config')

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
