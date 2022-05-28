import Vue from 'vue';
import Vuex from 'vuex';
import cities from "@/store/modules/cities";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
  },
  getters: {
    error: (state) => state.error,
  },
  modules: {
    cities
  }
})
