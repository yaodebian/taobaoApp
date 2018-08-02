const state = {
  reposition: [{
      img: '1.jpg',
      name: '路飞15亿,海贼王通缉令海贼王海报周边全套悬赏令墙纸索隆山治',
      discount: '包邮',
      price: '21.9',
      customers: '0人付款',
      location: '深圳'
    },
    {
      img: '2.jpg',
      name: '即将现货 MRC 艾斯之死 路飞赤犬 海贼王手办雕像 猴子gk',
      discount: '包邮',
      price: '1980',
      customers: '76人付款',
      location: '上海'
    },
    {
      img: '3.jpg',
      name: '动漫全套海贼手办王模型路飞索隆乔巴 七武海摆件玩偶公仔礼物',
      discount: '包邮',
      price: '238',
      customers: '363人付款',
      location: '广东 广州'
    },
    {
      img: '4.jpg',
      name: '海贼航海王海贼团路飞乔巴索隆周边手办发光水晶挂饰创意生日礼物',
      discount: '包邮',
      price: '15',
      customers: '89人付款',
      location: '广东 江门'
    },
    {
      img: '5.jpg',
      name: 'onepiece手办模型路飞索隆艾斯罗公仔动漫生日礼物摆件玩偶',
      discount: '包邮',
      price: '163',
      customers: '1664人付款',
      location: '广东 广州'
    },
    {
      img: '6.jpg',
      name: '正版onepiece手办模型全套草帽路飞手办果实海贼船手办 生日礼物',
      discount: '包邮',
      price: '8',
      customers: '161人付款',
      location: '广东 广州'
    },
    {
      img: '7.jpg',
      name: '万代海贼王手办MegaHouse POP四档路飞SOC艾斯 BB泳装娜美歌舞伎',
      discount: '包邮',
      price: '549',
      customers: '14人付款',
      location: '山东 青岛'
    },
    {
      img: '8.jpg',
      name: '海贼王手办Q版乔巴路飞手办索隆模型摆件玩偶周边生日礼物',
      discount: '包邮',
      price: '38',
      customers: '56人付款',
      location: '浙江 金华'
    },
    {
      img: '9.jpg',
      name: '黑色中分头路长直发海贼王女帝假发波雅汉库克仙剑四cosplay假发',
      discount: '包邮',
      price: '70',
      customers: '4人付款',
      location: '广东 广州'
    },
    {
      img: '10.jpg',
      name: '海贼王手办路飞索隆山治艾斯模型公仔动漫周边生日礼物男女帝国产',
      discount: '包邮',
      price: '45',
      customers: '613人付款',
      location: '广东 广州'
    }
  ],
  goods: [

  ],
  showingGood: {}
}

const mutations = {
  initGoods(state, data) {
    state.goods = [];
    for (let item of data) {
      state.goods.push(state.reposition[item]);
    }
  },
  initShowingGood(state, data) {
    if (typeof data == 'number') {
      state.showingGood = state.goods[data];
    } else {
      state.showingGood = data;
    }
  }
}

const getters = {
  goods(state) {
    return state.goods;
  },
  showingGood(state) {
    return state.showingGood;
  }
}

const actions = {
  initGoods({
    commit
  }, data) {
    commit("initGoods", data);
  },
  initShowingGood({
    commit
  }, data) {
    commit("initShowingGood", data);
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}