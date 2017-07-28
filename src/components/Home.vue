<template>
  <div class="page">
    <mu-appbar title="首页">
      <mu-icon-button icon="menu" slot="left" @click="openMenu('left')"/>
      <mu-icon-button icon="color_lens" slot="right" ref="buttonThemes" @click="toggleThemes"/>
    </mu-appbar>
    <mu-popup position="left" popupClass="demo-popup-left" :open="leftPopup" @close="closeMenu('left')">
      <mu-appbar title="菜单">
        <mu-icon-button icon="menu" slot="left"/>
        <mu-icon-button icon="chevron_left" slot="right" @click="closeMenu('left')"/>
      </mu-appbar>
      <mu-list class="has-header">
        <mu-list-item title="首页">
          <mu-icon slot="left" value="home"/>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item title="客户">
          <mu-icon slot="left" value="person"/>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item title="我的">
          <mu-icon slot="left" value="face"/>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item title="菜单四" toggleNested :open="false">
          <mu-icon slot="left" value="menu"/>
          <mu-list-item slot="nested" title="子菜单1">
            <mu-icon slot="left" value="arrow_forward"/>
          </mu-list-item>
          <mu-list-item slot="nested" title="子菜单2">
            <mu-icon slot="left" value="arrow_forward"/>
          </mu-list-item>
          <mu-list-item slot="nested" title="子菜单3">
            <mu-icon slot="left" value="arrow_forward"/>
          </mu-list-item>
        </mu-list-item>
        <mu-divider/>
      </mu-list>
    </mu-popup>
    <mu-popover :trigger="triggerThemes" :open="openThemes" @close="handleCloseThemes">
      <mu-menu>
        <mu-menu-item title="default" @click="chooseThemes('dft')"/>
        <mu-menu-item title="light" @click="chooseThemes('light')"/>
        <mu-menu-item title="dark" @click="chooseThemes('dark')"/>
        <mu-menu-item title="carbon" @click="chooseThemes('carbon')"/>
        <mu-menu-item title="teal" @click="chooseThemes('teal')"/>
      </mu-menu>
    </mu-popover>
    <mu-content-block class="has-header has-footer" style="padding-top:0;padding-left:0;padding-right:0;">
      <swipe class="swipe-home">
        <swipe-item>
          <img src="../assets/banner1.jpg">
        </swipe-item>
        <swipe-item>
          <img src="../assets/banner2.jpg">
        </swipe-item>
        <swipe-item>
          <img src="../assets/banner3.jpg">
        </swipe-item>
      </swipe>
      
      <table class="menu-table">
        <tr>
          <td>
            <div @click="go('list')">
              <mu-icon value="format_list_bulleted" color="#ff7f50"/>
              <span class="">动态列表</span>
            </div>
          </td>
          <td>
            <div @click="go('chart')">
              <mu-icon value="insert_chart" color="#87cefa"/>
              <span>动态图表</span>
            </div>
          </td>
          <td>
            <div @click="go('contact')">
              <mu-icon value="perm_contact_calendar" color="#da70d6"/>
              <span>通讯录</span>
            </div>
          </td>
          <td>
            <div @click="go('form')">
              <mu-icon value="description" color="#32cd32"/>
              <span>表单</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div @click="go('customer')">
              <mu-icon value="tab" color="#6495ed"/>
              <span>选项卡</span>
            </div>
          </td>
          <td>
            <div @click="go('login')">
              <mu-icon value="lock_outline" color="#ff69b4"/>
              <span>登录</span>
            </div>
          </td>
          <td>
            <div @click="go('loading')">
              <mu-icon value="refresh" color="#40e0d0"/>
              <span>加载图标</span>
            </div>
          </td>
          <td>
            <div @click="go('map')">
              <mu-icon value="map" color="#cd5c5c"/>
              <span>地图</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div @click="go('test')">
              <mu-icon value="build" color="#ffa500"/>
              <span>测试</span>
            </div>
          </td>
          <td>
            
          </td>
          <td>

          </td>
          <td>

          </td>
        </tr>
      </table>
    </mu-content-block>
  </div>
</template>

<script>
import dft from '!raw-loader!muse-themes/theme-default.min.css'
import light from '!raw-loader!muse-themes/theme-light.min.css'
import dark from '!raw-loader!muse-themes/theme-dark.min.css'
import carbon from '!raw-loader!muse-themes/theme-carbon.min.css'
import teal from '!raw-loader!muse-themes/theme-teal.min.css'

export default {
  name: 'home',
  data () {
    return {
      theme: 'default',
      themes: {
        dft,
        light,
        dark,
        carbon,
        teal
      },
      list: [{
        icon: '',
        title: '列表'
      }],
      openThemes: false,
      leftPopup: false,
      triggerThemes: null
    }
  },
  methods: {
    go (url) {
      this.$router.push(url)
    },
    toggleThemes () {
      this.openThemes = !this.openThemes
    },
    handleCloseThemes (e) {
      this.openThemes = false
    },
    chooseThemes (theme) {
      this.theme = theme
      const styleEl = this.getThemeStyle()
      styleEl.innerHTML = this.themes[theme] || ''
      this.openThemes = false
    },
    getThemeStyle () {
      const themeId = 'muse-theme'
      let styleEl = document.getElementById(themeId)
      if (styleEl) return styleEl
      styleEl = document.createElement('style')
      styleEl.id = themeId
      document.body.appendChild(styleEl)
      return styleEl
    },
    openMenu (position) {
      this[position + 'Popup'] = true
    },
    closeMenu (position) {
      this[position + 'Popup'] = false
    }
  },
  mounted () {
    this.triggerThemes = this.$refs.buttonThemes.$el
  }
}
</script>
<style scoped>
  .swipe-home {
    width:100%;
    height:45%;
  }
  .swipe-home img{
    width:100%;
    height:100%;
  }

  .menu-table{
    width:100%;
    border-collapse: collapse;
  }
  .menu-table td{
    width:25%;
    padding:10px;
    text-align:center;

    border: 1px solid #f0f0f0;
  }
  .menu-table .mu-icon{
    display:block;
    font-size:36px;
  }
</style>
