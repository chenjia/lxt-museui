import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/page/home'
    },
    {
      path: '/page',
      name: 'page',
      component: function (resolve) {
        require(['../components/PageTransition.vue'], resolve)
      },
      children: [{
        path: 'login',
        component: function (resolve) {
          require(['../components/Login.vue'], resolve)
        }
      }, {
        path: 'home',
        component: function (resolve) {
          require(['../components/Home.vue'], resolve)
        }
      }, {
        path: 'customer',
        component: function (resolve) {
          require(['../components/Customer.vue'], resolve)
        }
      }, {
        path: 'about',
        component: function (resolve) {
          require(['../components/About.vue'], resolve)
        }
      }, {
        path: 'list',
        component: function (resolve) {
          require(['../components/List.vue'], resolve)
        }
      }, {
        path: 'chart',
        component: function (resolve) {
          require(['../components/Chart.vue'], resolve)
        }
      }, {
        path: 'contact',
        component: function (resolve) {
          require(['../components/Contact.vue'], resolve)
        }
      }]
    }
  ]
})

export default router
