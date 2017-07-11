<template>
  <div class="page">
    <mu-appbar title="我的">
      <mu-icon-button href="#/page/login" icon="chevron_left" slot="left"/>
      <mu-icon-button href="#/page/login" icon="person" slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer">
      <div v-for="item in productList">
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
        productList: []
      }
    },
    methods: {
      getProductList () {
        return this.$store.state.productList
      },
      getHotProductList () {
        this.productList = this.$store.getters.getHotProductList
        console.log(this.productList)
      }
    },
    mounted () {
      this.productList = this.getProductList()
      console.log(this.productList)
    }
  }
</script>
