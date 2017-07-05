<template>
  <div class="page">
    <mu-appbar title="通讯录">
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>
    
    <mu-content-block class="has-header has-footer content-contact" v-bind:style="{height:contentHeight+'px'}">
       <mu-list>
        <template v-for="item in list2">
          <mu-list-item disableRipple :title="item.displayName" :describeText="item.phoneNumbers?item.phoneNumbers[0].value:'　'">
            <mu-avatar :src="head" slot="leftAvatar"/>
          </mu-list-item>
          <mu-divider/>
        </template>
      </mu-list>
    </mu-content-block>
  </div>
</template>

<script>
  export default {
    name: 'contact',
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
        contentHeight: window.config.contentHeight(true, true),
        activeTab: 'tab1'
      }
    },
    mounted () {
      this.scroller = document.getElementsByClassName('content-contact')[0]
      this.trigger = this.$el
      document.addEventListener('deviceready', () => {
        let fields = [navigator.contacts.fieldType.title, navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.formatted, navigator.contacts.fieldType.familyName, navigator.contacts.fieldType.nickname, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name]

        navigator.contacts.find(fields, (contacts) => {
          console.log(contacts)
          this.list2 = contacts
        }, (contactError) => {
          console.log(contactError)
          alert('Error')
        })
      }, false)
    },
    methods: {
      refresh () {
        this.refreshing = true
        setTimeout(() => {
          this.refreshing = false
        }, 2000)
      },
      loadMore () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 2000)
      }
    }
  }
</script>
