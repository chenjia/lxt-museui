<template>
  <div class="page">
    <mu-appbar>
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="准客户"/>
        <mu-tab value="tab2" title="老客户"/>
      </mu-tabs>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>
    
    <mu-content-block class="has-header has-footer content-customer" style="padding:0;" v-bind:style="{height:contentHeight+'px'}">
      <div v-show="activeTab === 'tab1'">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <mu-list>
          <template v-for="item in list1">
            <mu-list-item :title="item"/>
            <mu-divider/>
          </template>
        </mu-list>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="拼命加载中..."/>
      </div>
      <div v-show="activeTab === 'tab2'">
         <mu-list>
          <template v-for="item in list2">
            <mu-list-item disableRipple :title="item.displayName" :describeText="item.phoneNumbers?item.phoneNumbers[0].value:'　'">
              <mu-avatar :src="head" slot="leftAvatar"/>
            </mu-list-item>
            <mu-divider/>
          </template>
        </mu-list>
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

      return {
        head: require('../assets/head.jpg'),
        list1,
        list2,
        num: 10,
        loading: false,
        scroller: null,
        refreshing: false,
        trigger: null,
        loaded: false,
        contentHeight: window.globalConfig.contentHeight(true, true),
        activeTab: 'tab1'
      }
    },
    mounted () {
      this.scroller = document.getElementsByClassName('content-customer')[0]
      this.trigger = this.$el
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list1.push('准客户' + (i + 1))
        }
      }, 1)
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
        if (val === 'tab2' && this.list2.length === 0) {
          let time1 = new Date().getTime()
          document.addEventListener('deviceready', () => {
            let fields = [navigator.contacts.fieldType.title, navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.formatted, navigator.contacts.fieldType.familyName, navigator.contacts.fieldType.nickname, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name]

            navigator.contacts.find(fields, (contacts) => {
              console.log(contacts)
              let time2 = new Date().getTime()
              console.log(time2 - time1)
              this.list2 = contacts
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
          }
          this.num += 10
          this.loading = false
        }, 2000)
      }
    }
  }
</script>
