<template>
  <div class="page">
    <mu-appbar>
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="准客户"/>
        <mu-tab value="tab2" title="老客户"/>
        <mu-tab value="tab3" title="网络客户"/>
      </mu-tabs>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>
    
    <mu-content-block class="has-header content-customer" style="padding:0;" v-bind:style="{height:contentHeight+'px'}">
      <div v-show="activeTab === 'tab1'">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <template v-for="item in list1">
          <mu-list-item :title="item"/>
          <mu-divider/>
        </template>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="拼命加载中..."/>
      </div>
      <div v-show="activeTab === 'tab2'">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <template v-for="item in list2">
          <mu-list-item :title="item"/>
          <mu-divider/>
        </template>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="拼命加载中..."/>
      </div>
      <div v-show="activeTab === 'tab3'">
          <template v-for="item in list3">
            <mu-list-item disableRipple :title="item.displayName" :describeText="item.phoneNumbers?item.phoneNumbers[0].value:'　'">
              <mu-avatar :src="head" slot="leftAvatar"/>
            </mu-list-item>
            <mu-divider/>
          </template>
      </div>
    </mu-content-block>
  </div>
</template>

<script>
  export default {
    name: 'customer',
    data () {
      const list1 = []
      const list2 = []
      const list3 = []

      return {
        head: require('../assets/head.jpg'),
        list1,
        list2,
        list3,
        num: 10,
        loading: false,
        scroller: null,
        refreshing: false,
        trigger: null,
        loaded: false,
        contentHeight: window.globalConfig.contentHeight(true, false),
        activeTab: 'tab1'
      }
    },
    mounted () {
      this.$store.commit('TOGGLE_TAB', false)
      this.scroller = document.getElementsByClassName('content-customer')[0]
      this.trigger = this.$el
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list1.push('准客户' + (i + 1))
          this.list2.push('老客户' + (i + 1))
        }

        // for (let i = 0; i < 300; i++) {
        //   this.list3.push({
        //     displayName:'网络客户' + (i + 1),
        //     phoneNumbers: [{value:'18702189255'}]
        //   })
        // }
      }, 1)


    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
        if (val === 'tab3' && this.list3.length === 0) {
          let time1 = new Date().getTime()
          document.addEventListener('deviceready', () => {
            let fields = [navigator.contacts.fieldType.title, navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.formatted, navigator.contacts.fieldType.familyName, navigator.contacts.fieldType.nickname, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name]

            navigator.contacts.find(fields, (contacts) => {
              console.log(contacts)
              let time2 = new Date().getTime()
              console.log(time2 - time1)
              this.list3 = contacts.slice(0,10)
            }, (contactError) => {
              console.log(contactError)
              alert('Error')
            })
          }, false)
        }
      },
      handleActive () {

      },
      refresh () {
        this.refreshing = true
        setTimeout(() => {
          for (let i = this.num; i < this.num + 10; i++) {
            this.list1.push('准客户' + (i + 1))
            this.list2.push('老客户' + (i + 1))
          }
          this.num += 10
          this.refreshing = false
        }, 2000)
      },
      loadMore () {
        this.loading = true
        setTimeout(() => {
          for (let i = this.num; i < this.num + 10; i++) {
            this.list1.push('准客户' + (i + 1))
            this.list2.push('老客户' + (i + 1))
          }
          this.num += 10
          this.loading = false
        }, 2000)
      }
    }
  }
</script>
