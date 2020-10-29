import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

import ConfirmDialog from './components/ConfirmDialog'

Vue.config.productionTip = false

Vue.component('ConfirmDialog', ConfirmDialog)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    page: 1
  },
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

