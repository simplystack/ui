const theme = require('../tailwind.config')

module.exports = {
  theme: {
    extend: {
      ...theme,
      container: {
        center: true,
        padding: '1rem'
      }
    }
  }
}
