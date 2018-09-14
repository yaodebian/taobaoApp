const state = {
  userHead: {
    path: '',
    label: ''
  }
}

const mutations = {
  initUserHead(state, data) {
    state.userHead = data;
  }
}

const getters = {
  userHead(state) {
    return state.userHead;
  }
}

const actions = {
  initUserHead({
    commit
  }, data) {
    commit('initUserHead', data);
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}