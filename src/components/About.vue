<template>
  <div class="page">
    <mu-appbar title="我的">
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-icon-button href="#/page/login" icon="person" slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer">
      {{msg}}
    </mu-content-block>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data () {
      return {
        state: true,
        msg: 'About page'
      }
    },
    methods: {
      trigger () {
        this.state = !this.state
      }
    },
    mounted () {
      
    }
  }
</script>
