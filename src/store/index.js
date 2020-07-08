import Vue from 'vue'
import Vuex from 'vuex'
import Category from "./modules/Category"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Category
  }
})
