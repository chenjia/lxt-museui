import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function() {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/page/home'
  }, {
    path: '/page',
    name: 'page',
    component: function(resolve) {
      require.ensure([], () => resolve(require('../components/PageTransition.vue')), 'pageTransition')
    },
    children: [{
      path: 'login',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Login.vue')), 'login')
      }
    }, {
      path: 'home',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Home.vue')), 'home')
      }
    }, {
      path: 'customer',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Customer.vue')), 'customer')
      }
    }, {
      path: 'about',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/About.vue')), 'about')
      }
    }, {
      path: 'list',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/List.vue')), 'list')
      }
    }, {
      path: 'chart',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Chart.vue')), 'chart')
      }
    }, {
      path: 'contact',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Contact.vue')), 'contact')
      }
    }, {
      path: 'test',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Test.vue')), 'test')
      }
    }]
  }]
})

export default router