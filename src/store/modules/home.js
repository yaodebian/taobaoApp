const state = {
  swipes: [
    'swipe1.jpg',
    'swipe2.jpg',
    'swipe3.jpg'
  ],
  hotItems: [{
      img: 'hot1.png',
      text: '天猫'
    },
    {
      img: 'hot2.png',
      text: '聚划算'
    },
    {
      img: 'hot3.png',
      text: '天猫国际'
    },
    {
      img: 'hot4.png',
      text: '外卖'
    },
    {
      img: 'hot5.png',
      text: '天猫超市'
    },
    {
      img: 'hot6.png',
      text: '充值中心'
    },
    {
      img: 'hot7.png',
      text: '飞猪旅行'
    },
    {
      img: 'hot8.png',
      text: '领金币'
    },
    {
      img: 'hot9.png',
      text: '拍卖'
    },
    {
      img: 'hot10.png',
      text: '分类'
    }
  ]
}

const mutations = {
  initSwipes(state, data) {
    state.swipes = data
  },
  initHotItems(state, data) {
    state.hotItems = data
  }
}

const getters = {
  swipes(state) {
    return state.swipes
  },
  hotItems(state) {
    return state.hotItems
  }
}

const actions = {
  initSwipes({
    commit
  }, data) {
    commit('initSwipes', data)
  },
  initHotItems({
    commit
  }, data) {
    commit('initHotItems', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}