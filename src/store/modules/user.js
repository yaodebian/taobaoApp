const state = {
  userId: '',
  username: '',
  phone: ''
}

const mutations = {
  initUser(state, data) {
    state.userId = data.userId;
    state.userName = data.userName;
    state.phone = data.phone;
  },
  regInit(state, data) {
    state.userId = data.userId;
    state.phone = data.phone;
  }
}

const getters = {
  user(state) {
    let data = {
      userId: state.userId,
      userName: state.userName,
      phone: state.phone
    }
    return data;
  },
  username(state) {
    return state.username ? state.username : state.phone;
  }
}

const actions = {
  initUser({
    commit
  }, data) {
    commit('initUser', data);
  },
  regInit({
    commit
  }, data) {
    commit('regInit', data);
  },
}

export default {
  state,
  mutations,
  getters,
  actions
}