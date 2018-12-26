const state = {
  userId: '',
  username: '点击我设置你的登录名吧',
  phone: '',
  userImg: 'icon.svg',
  nick: '点击我设置昵称吧'
}

const mutations = {
  initUser(state, data) {
    state.userId = data.userId
    state.username = data.username
    state.phone = data.phone
    state.userImg = data.userImg
    state.nick = data.nick
  },
  editNick(state, data) {
    state.nick = data
  },
  editUsername(state, data) {
    state.username = data
  },
  regInit(state, data) {
    state.userId = data.userId
    state.phone = data.phone
  },
  clearUserInfo(state) {
    state.userId = ''
    state.username = '点击我设置你的登录名吧'
    state.phone = ''
    state.userImg = 'icon.svg'
    state.nick = '点击我设置昵称吧'
  }
}

const getters = {
  userId (state) {
    return state.userId
  },
  username(state) {
    return state.username
  },
  phone(state) {
    return state.phone
  },
  userImg(state) {
    return state.userImg
  },
  nick(state) {
    return state.nick
  }
}

const actions = {
  initUser({
    commit
  }, data) {
    commit('initUser', data)
  },
  regInit({
    commit
  }, data) {
    commit('regInit', data)
  },
  clearUserInfo({
    commit
  }) {
    commit('clearUserInfo')
  },
  editNick({
    commit
  }, data) {
    commit('editNick', data)
  },
  editUsername({
    commit
  }, data) {
    commit('editUsername', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}