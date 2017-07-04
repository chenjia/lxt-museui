<template>
  <div class="page">
    <mu-appbar title="我的">
      <mu-icon-button href="#/page/login" icon="chevron_left" slot="left"/>
      <mu-icon-button href="#/page/login" icon="person" slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer"v-bind:style="{height:contentHeight+'px'}">
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
        contentHeight: window.config.contentHeight(true),
        msg: 'About page'
      }
    },
    methods: {
      trigger () {
        this.state = !this.state
      }
    }
  }
</script>
