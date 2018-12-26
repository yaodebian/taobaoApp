const state = {
  logRegData: {
    count: '',
    password: '',
    getCheckable: true,
    checkCode: '',
    checkCodeMsg: '请输入验证码',
    buttonActive: true
  }
}

const mutations = {
  initLogReg(state) {
    state.logRegData = {
      count: '',
      password: '',
      getCheckable: true,
      checkCode: '',
      checkCodeMsg: '请输入验证',
      buttonActive: true
    }
  },
  initCheckCode(state, data) {
    state.checkCode = data
  },
  initCheckCodeMsg(state, data) {
    state.checkCodeMsg = data
  },
  initGetCheckable(state, data) {
    state.getCheckable = data
  },
  initButtonActive(state, data) {
    state.buttonActive = data
  }
}

const getters = {
  count(state) {
    return state.logRegData.count
  },
  password(state) {
    return state.logRegData.password
  },
  getCheckable(state) {
    return state.logRegData.getCheckable
  },
  checkCode(state) {
    return state.logRegData.checkCode
  },
  checkCodeMsg(state) {
    return state.logRegData.checkCodeMsg
  },
  buttonActive(state) {
    return state.logRegData.buttonActive
  }
}

const actions = {
  initLogReg({
    commit
  }) {
    commit('initLogReg')
  },
  initCheckCode({
    commit
  }, data) {
    commit('initCheckCode', data)
  },
  initCheckCodeMsg({
    commit
  }, data) {
    commit('initCheckCodeMsg', data)
  },
  initGetCheckable({
    commit
  }, data) {
    commit('initGetCheckable', data)
  },
  initButtonActive({
    commit
  }, data) {
    commit('initButtonActive', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
