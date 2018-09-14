const state = {
  seller: {
    sellerId: '',
    sellerImg: '',
    storeName: '',
    goodsCode: '',
    serviceCode: '',
    transCode:''
  }
}

const mutations = {
  initSeller(state, data) {
    state.seller = data;
  }
}

const getters = {
  seller(state) {
    return state.seller;
  }
}

const actions = {
  initSeller({
    commit
  }, data) {
    commit('initSeller', data);
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}