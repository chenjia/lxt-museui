<template>
  <div class="page">
    <mu-appbar title="加载">
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-icon-button @click="toggleLoading" icon="alarm" slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer"v-bind:style="{height:contentHeight+'px'}">
      <mu-list>
        <mu-list-item :disableRipple=true style="position:relative;">
          <mu-circular-progress :style="{'background-image':value==100?'url(../assets/head.jpg)':'url(../assets/head_bg.jpg)'}" style="transition:1s all;background-size:cover;border-radius:50%;" mode="determinate" :size="80" :color="color" :value="value"/>
          <div :style="{color:value==100?'#4caf50':''}" style="position:absolute;top:45px;left:120px;display:inline-block;height:80px;transition:1s all;">上传头像示例</div>
        </mu-list-item>
        <mu-divider/>

        <mu-list-item :disableRipple=true style="position:relative;">
          <p :style="{color:value==100?'#4caf50':''}" style="text-align:center;transition:2s all;">进度读取示例{{value}}%</p>
          <mu-linear-progress mode="determinate" :color="color" :value="value"/>
        </mu-list-item>
        <mu-divider/>

        <mu-stepper :activeStep="activeStep">
          <mu-step>
            <mu-step-label>
              <mu-icon v-if="value>=20" slot="icon" value="check_circle" color="green"/>
            </mu-step-label>
          </mu-step>
          <mu-step>
            <mu-step-label>
              <mu-icon v-if="value>=40" slot="icon" value="check_circle" color="green"/>
            </mu-step-label>
          </mu-step>
          <mu-step>
            <mu-step-label>
              <mu-icon v-if="value>=60" slot="icon" value="check_circle" color="green"/>
            </mu-step-label>
          </mu-step>
          <mu-step>
            <mu-step-label>
              <mu-icon v-if="value>=80" slot="icon" value="check_circle" color="green"/>
            </mu-step-label>
          </mu-step>
          <mu-step>
            <mu-step-label>
              <mu-icon v-if="value>=100" slot="icon" value="check_circle" color="green"/>
            </mu-step-label>
          </mu-step>
        </mu-stepper>
        <mu-divider/>

        
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
        stepColor: 'primary',
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
    computed: {
      activeStep () {
        return parseInt(this.value * 0.05)
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
