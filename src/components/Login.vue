<template>
  <div class="page">
    <mu-appbar title="登录">
      <mu-icon-button href="#/page/about" icon="chevron_left" slot="left"/>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer">
      {{msg}}
    </mu-content-block>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        msg: 'login page'
      }
    },
    methods: {
      login () {

      }
    }
  }
</script>
