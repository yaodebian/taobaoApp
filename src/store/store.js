import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import login from './modules/login.js'
import skin from './modules/skin.js'
import home from './modules/home.js'
import twitter from './modules/twitter.js'
import goods from './modules/goods.js'
import cart from './modules/cart.js'
import logReg from './modules/log_reg.js'
import nav from './modules/nav.js'
import userSet from './modules/userSet.js'
import keywords from './modules/keywords.js'
import searchVal from './modules/searchVal.js'
import seller from './modules/seller.js'

Vue.use(Vuex)

const state = {
  ...user.state,
  ...login.state,
  ...skin.state,
  ...home.state,
  ...twitter.state,
  ...goods.state,
  ...cart.state,
  ...logReg.state,
  ...nav.state,
  ...userSet.state,
  ...keywords.state,
  ...searchVal.state,
  ...seller.state
}

const mutations = {
  ...user.mutations,
  ...login.mutations,
  ...skin.mutations,
  ...home.mutations,
  ...twitter.mutations,
  ...goods.mutations,
  ...cart.mutations,
  ...logReg.mutations,
  ...nav.mutations,
  ...userSet.mutations,
  ...keywords.mutations,
  ...searchVal.mutations,
  ...seller.mutations
}

const getters = {
  ...user.getters,
  ...login.getters,
  ...skin.getters,
  ...home.getters,
  ...twitter.getters,
  ...goods.getters,
  ...cart.getters,
  ...logReg.getters,
  ...nav.getters,
  ...userSet.getters,
  ...keywords.getters,
  ...searchVal.getters,
  ...seller.getters
}

const actions = {
  ...user.actions,
  ...login.actions,
  ...skin.actions,
  ...home.actions,
  ...twitter.actions,
  ...goods.actions,
  ...cart.actions,
  ...logReg.actions,
  ...nav.actions,
  ...userSet.actions,
  ...keywords.actions,
  ...searchVal.actions,
  ...seller.actions
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})