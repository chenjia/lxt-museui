import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './routers'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-themes/theme-default.min.css'
import 'vue-swipe/dist/vue-swipe.css'
import {
	Swipe,
	SwipeItem
} from 'vue-swipe'
import '@/assets/css/main.css'
import '@/filters/globalFilter.js'
import finger from '@/directives/finger.js'

Vue.use(MuseUI)
Vue.use(finger)
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})