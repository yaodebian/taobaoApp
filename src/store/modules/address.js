const state = {
  // 表单绑定地址项
  address: {
    addressId: '',
    uuserId: '',
    receiver: '',
    tel: '',
    area: '',
    detailAdd: '',
    tagVal: '',
    isDefault: false
  },
  isOrder: false,
  // 地址列表
  addressList: []
}

const mutations = {
  initAddressList (state, data) {
    state.addressList = data
  },
  initAddress (state, data) {
    state.address = data
    state.address.isDefault = !!data.isDefault
  },
  initIsOrder (state, data) {
    state.isOrder = data
  },
  editArea (state, data) {
    state.address.area = data
  },
  editTagVal (state, data) {
    state.address.tagVal = data
  }
}

const getters = {
  address (state) {
    return state.address
  },
  isOrder (state) {
    return state.isOrder
  },
  addressList (state) {
    return state.addressList
  }
}

const actions = {
  initAddressList ({
    commit
  }, data) {
    commit('initAddressList', data)
  },
  initAddress ({
    commit
  }, data) {
    commit('initAddress', data)
  },
  initIsOrder ({
    commit
  }, data) {
    commit('initIsOrder', data)
  },
  editArea ({
    commit
  }, data) {
    commit('editArea', data)
  },
  editTagVal ({
    commit
  }, data) {
    commit('editTagVal', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
