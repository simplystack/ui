export default {
  home: {
    meta: {},
    title: 'A Design System for the Web',
    description: '@simplystack/ui is a simple, modular and accessible component library that gives you the building blocks you need to build your Vue applications.'
  },
  toc: {
    title: 'On this page'
  },
  content: {
    documentation: {
      'get-started': 'Get started'
    },
    foundations: {
      colors: 'Colors'
    },
    components: {
      forms: 'Forms',
      typography: 'Typography',
      ui: 'UI'
    }
  },
  navigation: {
    links: [
      {
        name: 'Documentations',
        section: 'documentation',
        category: 'get-started',
        slug: 'installation',
        routeName: 'section-category-slug'
      },
      {
        name: 'Foundations',
        section: 'foundations',
        category: 'colors',
        slug: 'palette',
        routeName: 'section-category-slug'
      },
      {
        name: 'Components',
        section: 'components',
        category: 'forms',
        slug: 'button',
        routeName: 'section-category-slug'
      },
      {
        name: 'Resources',
        section: 'resources',
        category: 'get-started',
        slug: 'introduction',
        routeName: 'section-category-slug'
      }
    ]
  }
}
