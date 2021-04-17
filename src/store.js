import { createStore, createLogger } from 'vuex';

const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  plugins: [createLogger()],
});

export default store;
