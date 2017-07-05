<template>
  <div class="page">
    <mu-appbar title="列表">
      <mu-icon-button @click="goBack" icon="chevron_left" slot="left"/>
      <mu-icon-button @click="showSearch" icon="search" slot="right"/>
    </mu-appbar>

    <mu-dialog :open="openSearch" @close="closeSearch">
      <div style="position:relative;margin-bottom:50px;">
        <mu-appbar title="搜索"></mu-appbar>
      </div>
      <p>fjewifwjeiofwejfio</p>
      <mu-flat-button slot="actions" icon="clear" @click="closeSearch" label="取消"/>
      <mu-flat-button slot="actions" icon="done" @click="closeSearch" label="确定" primary/>
    </mu-dialog>
    
    <mu-content-block class="has-header has-footer content-list" style="padding-top:0;">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <div>
        <template v-for="item in list">
          <mu-list-item disableRipple :title="item.name" :describeText="item.gender | filter-gender">
            <mu-avatar :src="head" slot="leftAvatar"/>
          </mu-list-item>
          <mu-divider/>
        </template>
      </div>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="拼命加载中..."/>
    </mu-content-block>
  </div>
</template>

<script>
  export default {
    name: 'customer',
    data () {
      return {
        head: require('../assets/head.jpg'),
        list: [],
        num: 10,
        loading: false,
        scroller: null,
        refreshing: false,
        trigger: null,
        loaded: false,
        searching: false,
        openSearch: false
      }
    },
    mounted () {
      this.scroller = document.getElementsByClassName('content-list')[0]
      this.trigger = this.$el
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({
            name: 'item' + (i + 1),
            gender: '' + (i % 2)
          })
        }
      }, 1)
    },
    methods: {
      goBack () {
        this.$router.goBack()
      },
      showSearch () {
        this.openSearch = true
      },
      closeSearch () {
        this.openSearch = false
      },
      refresh () {
        this.refreshing = true
        setTimeout(() => {
          for (let i = this.num; i < this.num + 10; i++) {
            this.list.push({
              name: 'item' + (i + 1),
              gender: '' + (i % 2)
            })
          }
          this.num += 10
          this.refreshing = false
        }, 2000)
      },
      loadMore () {
        this.loading = true
        setTimeout(() => {
          for (let i = this.num; i < this.num + 10; i++) {
            this.list.push({
              name: 'item' + (i + 1),
              gender: '' + (i % 2)
            })
          }
          this.num += 10
          this.loading = false
        }, 2000)
      }
    }
  }
</script>
