import Vue from 'vue'
import App from './App.vue'

import store from './store'

// const vueBubble = require('vue-bubble')


import router from './router'
//in webpack environment:

// Vue.use(vueBubble)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)







Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
