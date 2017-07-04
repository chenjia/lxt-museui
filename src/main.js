import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-themes/theme-default.min.css'
import 'vue-swipe/dist/vue-swipe.css'
import { Swipe, SwipeItem } from 'vue-swipe'
import '@/assets/css/main.css'
import '@/filter/globalFilter.js'

Vue.use(MuseUI)
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
