const state = {
  keywords: ['海贼王']
}

const mutations = {
  initKeywords(state, data) {
    state.keywords = data;
  }
}

const getters = {
  keywords(state) {
    return state.keywords;
  }
}

const actions = {
  initKeywords({
    commit
  }, data) {
    commit('initKeywords', data);
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}