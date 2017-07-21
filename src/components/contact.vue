<template>
  <div class="page">
    <mu-appbar title="通讯录">
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>
    
    <mu-content-block class="has-header content-contact" style="padding-top:5px;" v-bind:style="{height:contentHeight+'px'}">
      <mu-text-field style="width:100%;" v-model="m.searchKey" hintText="输入联系人姓名查找"/>
      <mu-sub-header id="热" style="line-height:22px">常用联系人</mu-sub-header>
      <template v-for="item in contactData.hot">
        <mu-raised-button style="margin:10px 0 0 10px;min-width:80px;" :label="item"/>
      </template>
      <mu-divider style="margin-top:20px;"/>

      <template v-for="(value, key)  in filterContact" style="position:relative;">
        <i :id="key"></i>
        <template v-for="(item, index) in value">
          <mu-list-item :title="item.name" :inset="index!=0">
            <mu-avatar src="../assets/head_bg.jpg" slot="rightAvatar"/>
            <mu-avatar v-if="index==0" color="orange" style="margin-left:-8px;" backgroundColor="transparent" slot="leftAvatar">{{key}}</mu-avatar>
          </mu-list-item>
          <mu-divider v-if="index==value.length-1" inset/>
        </template>
      </template>
      <!-- <template v-for="(value, key, index)  in filterContact">
        <mu-sub-header :id="key" style="height:20px;line-height:40px;font-size:18px;">{{key}}</mu-sub-header>
        <template v-for="item in value">
          <mu-list-item style="margin-left:20px;" disableRipple :title="item.name" :describeText="'18702189255'">
            <mu-avatar :src="head" slot="leftAvatar"/>
            <mu-icon value="chevron_right" slot="right"/>
          </mu-list-item>
        </template>
        <mu-divider/>
      </template> -->
    </mu-content-block>

    <div :style="{opacity:aliasToast?1:0}" class="box-alias">
      {{alias}}
    </div>
    <ul class="alias" id="draggableAlias">
      <li style="min-height:4.5%;" v-finger:touch-move="swipeTest" v-finger:touch-start="swipeTest" @click="selectAlias(0)"><mu-icon :index="0" value="star" :size="14"/></li>
      <li style="min-height:4.5%;" :index="index" v-finger:touch-move="swipeTest" v-finger:touch-start="swipeTest" v-for="(item, index) in aliasList" v-if="index!=0" @click="selectAlias(index)">{{item}}</li>
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
        alias: null,
        activeTab: 'tab1',
        aliasList: ['热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
        aliasToast: false,
        contactData: contactData,
        contentWidth: window.globalConfig.screenWidth,
        contentHeight: window.globalConfig.contentHeight(true, false),
        head: require('../assets/head_bg.jpg'),
        list1,
        list2,
        loaded: false,
        loading: false,
        m: {
          searchKey: ''
        },
        num: 10,
        refreshing: false,
        scroller: null,
        startY: 0,
        timer: null,
        trigger: null
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
      swipeTest(event) {
        if(event.type == 'touchstart'){
          this.startY = event.changedTouches[0].clientY
        } else if(event.type == 'touchmove'){
          let rangeY = event.changedTouches[0].clientY - this.startY
          let height = document.getElementById('draggableAlias').offsetHeight
          let itemHeight = height/this.aliasList.length
          let index = parseInt(event.target.getAttribute('index'),10)
          
          let y = event.changedTouches[0].clientY-this.startY+itemHeight/2
          let rangeIndex = parseInt(y / itemHeight) + index
          if (rangeIndex < 0) {
              rangeIndex = 0
          }else if(rangeIndex >= this.aliasList.length){
              rangeIndex = this.aliasList.length-1
          }
          this.selectAlias(rangeIndex)
        }
      },
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
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.aliasToast = false
        }, 2000)
        let element = document.querySelector('#'+this.alias)
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
          })
          if(newArray.length > 0) {
            newContacts[i] = newArray
          }
        }
        return newContacts
      }
    }
  }

  let contactData = {
    "hot":["爸爸","妈妈","老板","老婆","汉子","啦啦"],
    "contacts":{
      "A":[{"name":"阿拉尔"},{"name":"阿拉宝贝"},{"name":"啊啦啦"}],
      "B":[{"name":"巴拉巴拉小魔仙"}, {"name":"爸鼻"}],
      "C":[{"name":"常回家看看"}],
      "D":[{"name":"大兵"}, {"name":"刀山火海"}, {"name":"带头大哥"}],
      "E":[{"name":"额额"}, {"name":"饿了么"}],
      "F":[{"name":"发哥"}, {"name":"范爷"}],
      "G":[{"name":"高大尚"}, {"name":"搞基"}],
      "H":[{"name":"红红火火恍恍惚惚"},{"name":"黄鳝"}],
      "I":[{"name":"哎哟不错"}],
      "J":[{"name":"佳哥哥"}],
      "K":[{"name":"酷库熊"}],
      "L":[{"name":"溜得一逼"}],
      "M":[{"name":"秒杀"},{"name":"梅长苏"}],
      "N":[{"name":"娜姐"}],
      "O":[{"name":"哦多K"}],
      "P":[{"name":"炮灰"}],
      "Q":[{"name":"七仙女"}],
      "R":[{"name":"任我行"}],
      "S":[{"name":"石惊天"}],
      "T":[{"name":"唐家山少"},{"name":"躺赢"}],
      "U":[],
      "V":[],
      "W":[{"name":"吴用"},{"name":"勿忘我"}],
      "X":[{"name":"刑天"},{"name":"行不行"}],
      "Y":[{"name":"御姐姐", "name":"虞美人"}],
      "Z":[{"name":"找茬"},{"name":"找你妹"}]
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
    transition:all .5s;
  }
</style>
