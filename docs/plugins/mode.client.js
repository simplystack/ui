export default function ({ store }) {
  store.dispatch('mode/set', window.localStorage.getItem('mode'))
}
