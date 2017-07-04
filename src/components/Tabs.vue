<template>
	<div>
    <transition :name="'slide-left'">
      <router-view style="transition:all .2s" v-bind:style="{width:screenWidth+'px', height:screenHeight+'px'}"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      bottomNav: 'home',
      hasFooter: true,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>
