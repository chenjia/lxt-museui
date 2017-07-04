<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
window.config = {
  screenWidth: document.documentElement.clientWidth,
  screenHeight: document.documentElement.clientHeight,
  contentHeight (hasHeader, hasFooter) {
    let height = window.config.screenHeight
    if (hasHeader) { height -= 48 }
    if (hasFooter) { height -= 48 }
    return height
  }
}
export default {
  name: 'app',
  data () {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight
    }
  }
}
</script>
