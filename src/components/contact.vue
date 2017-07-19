<template>
  <div class="page">
    <mu-appbar title="通讯录">
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>
    
    <mu-content-block class="has-header content-contact" style="padding-top:5px;" v-bind:style="{height:contentHeight+'px'}">
      <mu-text-field style="width:100%;" v-model="m.searchKey" hintText="输入联系人姓名查找"/>
      <mu-sub-header style="line-height:22px">常用联系人</mu-sub-header>
      <template v-for="item in contactData.hot">
        <mu-raised-button style="margin:10px 0 0 10px;" :label="item" class="demo-raised-button"/>
      </template>
      <mu-divider style="margin-top:20px;"/>
      <template v-for="(value, key, index)  in filterContact">
        <mu-sub-header :id="key" style="height:20px;line-height:40px;font-size:18px;">{{key}}</mu-sub-header>
        <template v-for="item in value">
          <mu-list-item style="margin-left:20px;" disableRipple :title="item.name" :describeText="'18702189255'">
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
      <li style="min-height:4.5%;" @click="selectAlias(0)"><mu-icon value="star" :size="14"/></li>
      <li style="min-height:4.5%;" v-for="(item, index) in aliasList" v-if="index!=0" @click="selectAlias(index)" on-drag="vc.selectAlias($event,$index)">{{item}}</li>
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
        contentWidth: window.globalConfig.screenWidth,
        contentHeight: window.globalConfig.contentHeight(true, false),
        activeTab: 'tab1',
        aliasList: ['热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
      }
    },
    mounted () {
      this.$store.commit('TOGGLE_TAB', false)
      this.scroller = document.getElementsByClassName('content-contact')[0]
      this.trigger = this.$el
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
      selectAlias (index) {
        this.alias = this.aliasList[index]
        this.aliasToast = true
        setTimeout(() => {
            this.aliasToast = false
        }, 2000)
        let element = document.querySelector('#'+this.alias);
        this.scroller.scrollTop = element.offsetTop
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
