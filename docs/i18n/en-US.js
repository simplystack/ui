export default {
  home: {
    meta: {},
    title: 'Build powerful apps using our simple API',
    description: 'This page provides all published technical documentation <br> for the SimplyStack platform.'
  },
  content: {
    components: {
      'get-started': 'Get started',
      button: 'Button'
    }
  },
  navigation: {
    links: [
      {
        name: 'Components',
        section: 'components',
        category: 'get-started',
        slug: 'introduction',
        routeName: 'section-category-slug'
      },
      {
        name: 'Resources',
        section: 'metadata',
        category: 'get-started',
        slug: 'introduction',
        routeName: 'section-category-slug'
      }
    ]
  }
}
