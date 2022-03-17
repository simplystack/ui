// Import vue components
import * as directives from './directives';
import * as components from './components';

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  Object.keys(components).forEach((component) => {
    Vue.component(component, components[component]);
  });
  Object.keys(directives).forEach((directive) => {
    Vue.directive(directive, directives[directive]);
  });
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
// global window global
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Default export is library as a whole, registered via Vue.use()
export default plugin;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components';
export * from './icons';

// To allow individual directive use, export directives
// each can be registered via Vue.directive()
export * from './directives';

// To allow individual plugin use, export plugins
// each can be registered via Vue.use()
export * from './plugins';
