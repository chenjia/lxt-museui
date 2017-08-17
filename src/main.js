window.globalConfig = {
  rootUrl: "http://140.207.91.54:9001/com.ifp.ipartner/",
  iosUrl: "",
  getIwechatUrl: "aixin.n22.com.cn", //微信服务器URL
  env: "int", //目前版本环境分别为---int---uat---sh
  isUseModuleCache: true,
  moduleIndex: null,
  isDebug: false, //是否开启接口debug模式
  isWeb: false, //是否是后端-部署扫码用默认false
  //  isWebView:ionic.Platform.isWebView(),
  plat: 'WEB', //是WEB
  //  plat: 'NATIVE', //是原生
  isAndroid: true,
  isWebChat: false, //是否是微信
  timeout: 1000 * 180, //默认是3000毫秒
  version: 'V1.0',
  loginType: "extraExtCheck", //登陆方式--国泰项目传extraExtCheck
  from: "iwechat", //header--from
  transfer: "GTO2OINTERFACE2017#@!%88", //接口数据交互加密key
  comId: "GTO2O20170118", //保险公司编码--保险公司Id(固定为：GTO2O20170118）
  //  debug:true,
  screenWidth: document.documentElement.clientWidth,
  screenHeight: document.documentElement.clientHeight,
  contentHeight(hasHeader, hasFooter) {
    let height = window.globalConfig.screenHeight
    if (hasHeader) {
      height -= 48
    }
    if (hasFooter) {
      height -= 48
    }
    return height
  }
}
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
import '@/assets/lib/security/DES3.js'
import '@/assets/lib/security/md5-min.js'
import '@/assets/lib/finger/alloy_finger.js'
import '@/assets/lib/finger/alloy_finger.vue.js'

// MuseUI.config({
//   disableTouchRipple: true,
//   disableFocusRipple: true
// })
Vue.use(MuseUI)
Vue.use(AlloyFingerVue)
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
Vue.config.productionTip = false

Vue.mixin({
  methods: {
    go(url) {
      this.$router.push(url)
    },
    back() {
      router.goBack()
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})