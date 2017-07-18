<template>
  <div class="page">
    <mu-appbar title="我的">
      <mu-icon-button href="#/page/login" icon="chevron_left" slot="left"/>
      <mu-icon-button href="#/page/login" icon="person" slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer">
      <div v-for="item in getProductList">
        <p>{{item.name}}</p>
      </div>
      <p>
        <button @click="getHotProductList">hot product</button>
      </p>
    </mu-content-block>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data () {
      return {
        
      }
    },
    methods: {
      getHotProductList () {
        this.$store.state.common.productList = this.$store.getters.getHotProductlist
      }
    },
    computed:{
      getProductList () {
        return this.$store.state.common.productList
      }
    },
    mounted () {
      
    }
  }
</script>
