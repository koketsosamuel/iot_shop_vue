import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import conf from './config/'
import toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import Alert from './util/notifier'

Vue.use(toast, {})
Vue.prototype.$config = conf
Vue.prototype.$alert = Alert
Vue.prototype.$axios = axios.create(conf.axiosConf)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
