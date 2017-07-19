<template>
  <div>
    <mu-appbar style="z-index:-1;"></mu-appbar>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <transition name="slide-up">
      <mu-paper v-show="$store.state.common.hasFooter" class="footer-tabs">
        <mu-bottom-nav :value="bottomNav" @change="handleChange" style="height:48px;">
          <mu-bottom-nav-item href="#/page/home" value="home" title="首页" icon="home"/>
          <mu-bottom-nav-item href="#/page/customer" value="customer" title="客户" icon="person"/>
          <mu-bottom-nav-item href="#/page/about" value="about" title="我的" icon="face"/>
        </mu-bottom-nav>
      </mu-paper>
    </transition>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        transitionName: 'slide-left',
        bottomNav: 'home',
        screenWidth: document.documentElement.clientWidth,
        screenHeight: document.documentElement.clientHeight
      }
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      }
    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    },
    mounted () {
      
    }
  }
</script>

<style>
  .child-view {
    position: absolute;
    top:0;
    width:100%;
    height:100%;
    transition: all .1s ease-out;
  }
</style>
