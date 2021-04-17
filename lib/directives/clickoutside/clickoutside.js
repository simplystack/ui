/* eslint-disable no-param-reassign */
const clickEventType = document.ontouchstart !== null ? 'click' : 'touchstart';

const UNIQUE_ID = '__vue_click_away__';

const onUnmounted = (el) => {
  document.removeEventListener(clickEventType, el[UNIQUE_ID], false);
  delete el[UNIQUE_ID];
};

const onMounted = (el, binding, vnode) => {
  onUnmounted(el);

  const vm = vnode.context;
  const callback = binding.value;

  let nextTick = false;
  setTimeout(() => {
    nextTick = true;
  }, 0);

  // eslint-disable-next-line consistent-return
  el[UNIQUE_ID] = (event) => {
    if (
      (!el || !el.contains(event.target))
      && callback
      && nextTick
      && typeof callback === 'function'
    ) {
      return callback.call(vm, event);
    }
  };

  document.addEventListener(clickEventType, el[UNIQUE_ID], false);
};

const onUpdated = (el, binding, vnode) => {
  if (binding.value === binding.oldValue) {
    return;
  }
  onMounted(el, binding, vnode);
};

const directive = {
  mounted: onMounted,
  updated: onUpdated,
  unmounted: onUnmounted,
};

export default directive;
