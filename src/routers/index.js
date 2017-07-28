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
    redirect: '/page/login'
  }, {
    path: '/page',
    component: function(resolve) {
      require.ensure([], () => resolve(require('../components/PageTransition.vue')), 'pageTransition')
    },
    children: [{
      name: 'login',
      path: 'login',
      meta: {
        login: false
      },
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Login.vue')), 'login')
      }
    }, {
      name: 'home',
      path: 'home',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Home.vue')), 'home')
      }
    }, {
      name: 'customer',
      path: 'customer',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Customer.vue')), 'customer')
      }
    }, {
      name: 'about',
      path: 'about',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/About.vue')), 'about')
      }
    }, {
      name: 'list',
      path: 'list',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/List.vue')), 'list')
      }
    }, {
      name: 'chart',
      path: 'chart',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Chart.vue')), 'chart')
      }
    }, {
      name: 'contact',
      path: 'contact',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Contact.vue')), 'contact')
      }
    }, {
      name: 'form',
      path: 'form',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Form.vue')), 'form')
      }
    }, {
      name: 'loading',
      path: 'loading',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Loading.vue')), 'form')
      }
    }, {
      name: 'map',
      path: 'map',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Map.vue')), 'map')
      }
    }, {
      name: 'test',
      path: 'test',
      component: function(resolve) {
        require.ensure([], () => resolve(require('../components/Test.vue')), 'test')
      }
    }]
  }]
})

router.beforeEach((to, from, next) => {
  const hasFooterPage = [
    'home', 'list', 'about'
  ]
  if (hasFooterPage.indexOf(to.name) != -1) {
    router.app.$store.commit('TOGGLE_TAB', true)
  } else {
    router.app.$store.commit('TOGGLE_TAB', false)
  }
  if (to.meta.login != false && !router.app.$store.state.common.user) {
    router.app.$store.commit('TOGGLE_TOAST', {
      toast: true,
      toastMsg: '请先登录！'
    })
    next('/page/login')
  } else {
    next()
  }
})

export default router