const state = {
  skinSta: false,
  skinCode: 0,
  skins: [{
      topic: '世界那么大我想去看看',
      topicFolder: 'world',
      topicColor: '#fbadfb',
      topicIcons: [
        '1.svg',
        '2.svg',
        '3.svg',
        '4.svg',
        '5.svg',
      ]
    },
    {
      topic: '动物简约主题',
      topicFolder: 'animal',
      topicColor: '#93c47d',
      topicIcons: [
        '1.svg',
        '2.svg',
        '3.svg',
        '4.svg',
        '5.svg',
      ]
    },
    {
      topic: '天气主题',
      topicFolder: 'weather',
      topicColor: '#ccc',
      topicIcons: [
        '1.svg',
        '2.svg',
        '3.svg',
        '4.svg',
        '5.svg',
      ]
    },
  ]
}

const mutations = {
  setSkin(state, data) {
    state.skinSta = true;
    state.skinCode = data;
  },
  recover(state) {
    state.skinSta = false;
  },
  initSkins(state, data) {
    state.skins = data;
  }
}

const getters = {
  skinSta(state) {
    return state.skinSta;
  },
  skinCode(state) {
    return state.skinCode;
  },
  skin(state) {
    return state.skins[state.skinCode];
  }
}

const actions = {
  setSkin({
    commit
  }, data) {
    commit('setSkin', data);
  },
  initSkins({
    commit
  }, data) {
    commit('initSkins', data);
  },
  recover({
    commit
  }) {
    commit('recover');
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}