const isServer = window === undefined;

const on = ((() => {
  if (!isServer && document.addEventListener) {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return (element, event, handler) => {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler);
    }
  };
})());

const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;

/* eslint-disable-next-line */
!isServer && on(document, 'mousedown', e => (startClick = e));

/* eslint-disable-next-line */
!isServer && on(document, 'mouseup', (e) => {
  nodeList.forEach((node) => node[ctx].documentHandler(e, startClick));
});

function createDocumentHandler(el, binding, vnode) {
  return (mouseup = {}, mousedown = {}) => {
    if (!vnode
      || !vnode.context
      || !mouseup.target
      || !mousedown.target
      || el.contains(mouseup.target)
      || el.contains(mousedown.target)
      || el === mouseup.target
      || (vnode.context.popperElm
        && (vnode.context.popperElm.contains(mouseup.target)
          || vnode.context.popperElm.contains(mousedown.target)))) return;

    if (binding.expression
      && el[ctx].methodName
      && vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      /* eslint-disable-next-line */
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

/**
 * v-clickoutside
 * @example
 * ```vue
 * <div v-clickoutside="handleClose">
 * ```
 */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
export default {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value,
    };
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },

  unbind(el) {
    const len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  },
};
