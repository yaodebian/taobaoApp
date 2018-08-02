const state = {
  twitters: [{
    twitterInfo: '时装精们都在看',
    userImg: 'user.jpg',
    name: '川黛 原创国风森系女装',
    fans: '160.2万粉丝',
    tag: '优选女系',
    text: '夏天的尾巴 来点轻快的少女心把~',
    imgList: [
      '1.png',
      '2.png',
      '3.png',
      '4.png',
      '5.png',
      '6.png',
      '7.png',
      '8.png',
      '9.png',
      '10.png'
    ],
    msgNum: '1万',
    agreeNum: '228'
  }]
}

const mutations = {
  initTwitters(state, data) {
    state.twitters = data;
  }
}

const getters = {
  twitters(state) {
    return state.twitters;
  }
}

const actions = {
  initTwitters({
    commit
  }, data) {
    commit('initTwitters', data);
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}