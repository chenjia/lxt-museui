<template>
  <div class="page">
    <mu-appbar title="通讯录">
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>
    
    <mu-content-block class="has-header has-footer content-contact" style="padding-top:5px;">
      <mu-text-field style="width:100%;" v-model="m.searchKey" hintText="输入联系人姓名查找"/>
      <mu-sub-header style="line-height:22px">常用联系人</mu-sub-header>
      <template v-for="item in contactData.hot">
        <mu-raised-button style="margin:10px 0 0 10px;" :label="item" class="demo-raised-button"/>
      </template>
      <mu-divider style="margin-top:20px;"/>
      <template v-for="(value, key, index)  in filterContact">
        <mu-sub-header>{{key}}</mu-sub-header>
        <template v-for="item in value">
          <mu-divider/>
          <mu-list-item disableRipple :title="item.name" :describeText="'18702189255'">
            <mu-avatar :src="head" slot="leftAvatar"/>
            <mu-icon value="chevron_right" slot="right"/>
          </mu-list-item>
        </template>
        <mu-divider/>
      </template>
    </mu-content-block>

    <div v-bind:style="{opacity:aliasToast?1:0}" class="box-alias">
      {{alias}}
    </div>
    <ul class="alias" id="draggableAlias">
      <li style="min-height:4.5%;" a="{methods：selectAlias , arg: index}"><mu-icon value="star" :size="14"/></li>
      <li style="min-height:4.5%;" v-for="(item, index) in aliasList" v-if="index!=0" a="{methods：selectAlias , arg: index}" on-drag="vc.selectAlias($event,$index)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'contact',
    data () {
      const list1 = []
      const list2 = []

      return {
        m: {
          searchKey: ''
        },
        head: require('../assets/head.jpg'),
        list1,
        list2,
        num: 10,
        loading: false,
        scroller: null,
        refreshing: false,
        trigger: null,
        alias: null,
        loaded: false,
        aliasToast: false,
        contactData: contactData,
        contentWidth: window.config.screenWidth,
        contentHeight: window.config.contentHeight(true, true),
        activeTab: 'tab1',
        aliasList: ['热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
      }
    },
    mounted () {
      this.scroller = document.getElementsByClassName('content-contact')[0]
      this.trigger = this.$el
      // document.addEventListener('deviceready', () => {
      //   let fields = [navigator.contacts.fieldType.title, navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.formatted, navigator.contacts.fieldType.familyName, navigator.contacts.fieldType.nickname, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name]

      //   navigator.contacts.find(fields, (contacts) => {
      //     console.log(contacts)
      //     this.list2 = contacts
      //   }, (contactError) => {
      //     console.log(contactError)
      //     alert('Error')
      //   })
      // }, false)

      for(var i=0;i<10;i++){
        this.list2.push({displayName:'chenjia'+i, phoneNumbers:[{value:'18702189255'}]})
      }
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
      },
      selectAlias (event, index) {
        this.alias = this.aliasList[index]
        console.log(this.alias)
        this.aliasToast = true
        setTimeout(() => {
            this.aliasToast = false
        }, 2000)
      }
    },
    computed: {
      filterContact () {
        let contacts = this.contactData.contacts
        let newContacts = {}
        for(let i in contacts){
          let newArray = []
          contacts[i].map((value) => {
            if(value.name.indexOf(this.m.searchKey) != -1){
              newArray.push(value)
            }
          });
          if(newArray.length > 0) {
            newContacts[i] = newArray
          }
        }
        return newContacts
      }
    },
    watch: {
      'm.searchKey': {
        handler(curVal,oldVal){
          console.log(curVal,oldVal)
        },
        deep: true
      }
    }
  }

  let contactData = {
    "hot":["爸爸","妈妈","老板","老婆","汉子","啦啦"],
    "contacts":{
      "A":[{"name":"阿拉尔"}],
      "B":[{"name":"巴中"}],
      "C":[{"name":"长治"}],
      "D":[{"name":"大兴安岭地区"}],
      "E":[{"name":"鄂尔多斯"}],
      "F":[{"name":"佛山"}],
      "G":[{"name":"高雄"}],
      "H":[{"name":"黄南州"}],
      "I":[],
      "J":[{"name":"景德镇"}],
      "K":[{"name":"昆明"}],
      "L":[{"name":"六盘水"}],
      "M":[{"name":"眉山"}],
      "N":[{"name":"南昌"}],
      "O":[],
      "P":[{"name":"攀枝花"}],
      "Q":[{"name":"七台河"}],
      "R":[{"name":"日照"}],
      "S":[{"name":"石家庄"}],
      "T":[{"name":"唐山"}],
      "U":[],
      "V":[],
      "W":[{"name":"吴忠"}],
      "X":[{"name":"邢台"}],
      "Y":[{"name":"玉林"}],
      "Z":[{"name":"昭通"}]
    }
  }
</script>
<style scoped>
  .alias{
    position:absolute;
    top:20%;
    right:30px;
    width:30px;
    height:60%;
    list-style:none;
    color:orange;
    text-align:center;
  }
  .alias li{
    font-size:14px;
    width:30px;
    height:13px;
  }
  .item-alias{
    color:#888;
    padding:10px 15px 5px;
  }
  .box-alias{
    position: fixed;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    width: 60px;
    line-height: 60px;
    text-align: center;
    color: #FFF;
    border-radius:6px;
    font-size: 300%;
    background-color: rgba(0, 0, 0, 0.5);
    transition:opacity .5s;
  }
</style>
