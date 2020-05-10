import Vue from 'vue'
import App from './App.vue'

import store from './store'

// const vueBubble = require('vue-bubble')
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);

// const VueKinesis = require('vue-kinesis') 

// Vue.use(VueKinesis)

Viewer.setDefaults({
  // 'inline':true,
  'button':true, //右上角按钮
  "navbar": 0, //底部缩略图
  "title": 0, //当前图片标题
  "toolbar": true, //底部工具栏
  "tooltip": true, //显示缩放百分比
  "movable": true, //是否可以移动
  "zoomable": true, //是否可以缩放
  "rotatable": true, //是否可旋转
  "scalable": true, //是否可翻转
  "transition": true, //使用 CSS3 过度
  "fullscreen": true, //播放时是否全屏
  "keyboard": true, //是否支持键盘
  "url": "data-source",
})

Notification.requestPermission()

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
