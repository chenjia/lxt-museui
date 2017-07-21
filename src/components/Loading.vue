<template>
  <div class="page">
    <mu-appbar title="加载">
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-icon-button @click="toggleLoading" icon="person" slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer"v-bind:style="{height:contentHeight+'px'}">
      <mu-list>
        <mu-list-item :disableRipple=true style="position:relative;">
          <mu-circular-progress :style="{'background-image':value==100?'url(../assets/head.jpg)':'url(../assets/head_bg.jpg)'}" style="transition:2s all;background-size:cover;border-radius:50%;" mode="determinate" :size="80" :color="color" :value="value"/>
          <div :style="{color:value==100?'#4caf50':''}" style="position:absolute;top:45px;left:120px;display:inline-block;height:80px;transition:2s all;">上传头像示例</div>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item :disableRipple=true style="position:relative;">
          <p :style="{color:value==100?'#4caf50':''}" style="text-align:center;transition:2s all;">进度读取示例{{value}}%</p>
          <mu-linear-progress mode="determinate" :color="color" :value="value"/>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item :disableRipple=true style="position:relative;">
          <mu-circular-progress :size="80" :strokeWidth="5"/>
          <div style="position:absolute;top:45px;left:120px;display:inline-block;height:80px;">无限加载示例</div>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item :disableRipple=true style="position:relative;">
          <p style="text-align:center;">无限进度示例</p>
          <mu-linear-progress />
        </mu-list-item>

      </mu-list>

      
      
      
    </mu-content-block>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data () {
      return {
        contentHeight: window.globalConfig.contentHeight(true),
        color: 'deepPurple500',
        loading: false,
        value: 0
      }
    },
    methods: {
      toggleLoading () {
        if(!this.loading){
          this.value = 0
        }
        this.loading = !this.loading
      }
    },
    mounted () {
      this.$store.commit('TOGGLE_TAB', false)
      setInterval(()=>{
        if(this.loading){
          this.value += parseInt(Math.random()*10)
          if(this.value >= 100){
            this.value = 100
            this.color = 'green'
            this.loading = false
          }
        }
      },200)
    }
  }
</script>
