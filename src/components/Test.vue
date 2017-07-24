<template>
  <div class="page">
    <mu-appbar title="我的">
      <mu-icon-button href="#/page/login" icon="chevron_left" slot="left"/>
      <mu-icon-button href="#/page/login" icon="person" slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer">
      {{bbb}}
    </mu-content-block>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data () {
      return {
        msg: 'fdsfwefew'
      }
    },
    methods: {
      aaa () {
        return 'bbb'
      }
    },
    computed:{
      bbb () {
        return 'hello ' + this.msg
      }
    },
    mounted () {
      
    }
  }
</script>
