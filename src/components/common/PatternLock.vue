<template>
  <div style="width:100%text-align:center" v-bind:style="{'padding-top':(contentHeight-310)/2+'px'}">
    <div class="mhn-lock-title">
      <span v-bind:class="{'mu-flat-button-stable':lock.state=='stable','mu-flat-button-primary':lock.state=='success','mu-flat-button-secondary':lock.state=='failure'}">{{lock.title}}</span>
    </div>
    <div class="mhn-lock-wrap">
      <div class="mhn-lock" ng-class="{'patt-success':lock.state=='success','patt-error':lock.state=='failure'}"></div>
    </div>
  </div>
</template>

<script>
  import '../../assets/lib/patternLock/patternLock.css'
  import '../../assets/lib/jquery/dist/jquery.min.js'
  import '../../assets/lib/patternLock/patternLock.js'
  import { mapMutations } from 'vuex'
  import utils from '../../utils'
  export default {
    name: 'pattern-lock',
    data () {
      return {
        lock: {},
        contentHeight: window.globalConfig.screenHeight
      }
    },
    methods: {
      ...mapMutations({
        lockScreen: 'LOCK_SCREEN'
      })
    },
    mounted () {
      let oldPattern = utils.cache.get('pattern')
      let timer
      let options = {
        onDraw:(newPattern)=>{
          if((newPattern+'').length<4){
            this.lock = {
              title:'请至少输入4位密码',
              state:'failure'
            }
            clearTimeout(timer)
            timer = setTimeout(()=>{
              patternLock.reset()
              if(oldPattern){
                this.lock = {
                  title:'请输入手势密码解锁',
                  state:'stable'
                }
              }else{
                this.lock = {
                  title:'请输入初始手势密码',
                  state:'stable'
                }
              }
            },2000)
          }else{
            if(oldPattern){
              if(oldPattern==newPattern){
                this.lock = {
                  prevPattern:null,
                  title:'解锁成功',
                  state:'success'
                }
                clearTimeout(timer)
                timer = setTimeout(()=>{
                  this.lockScreen(false)
                },1000)
              }else{
                this.lock = {
                  title:'密码输入错误，请重新输入',
                  state:'failure'
                }
                clearTimeout(timer)
                timer = setTimeout(()=>{
                  patternLock.reset()
                  this.lock = {
                    prevPattern:null,
                    title:'请输入手势密码解锁',
                    state:'stable'
                  }
                },2000)
              }
            }else{
              if(this.lock.prevPattern){
                if(this.lock.prevPattern==newPattern){
                  utils.cache.set('pattern',newPattern)
                  clearTimeout(timer)
                  this.lock = {
                    prevPattern:null,
                    title:'密码设置成功',
                    state:'success'
                  }
                  oldPattern = newPattern
                }else{
                  this.lock = {
                    prevPattern:null,
                    title:'两次密码不一致，请重新输入',
                    state:'failure'
                  }
                  clearTimeout(timer)
                  timer = setTimeout(()=>{
                    patternLock.reset()
                    this.lock = {
                      prevPattern:null,
                      title:'请输入手势密码解锁',
                      state:'stable'
                    }
                  },2000)
                }
              }else{
                this.lock = {
                  prevPattern:newPattern,
                  title:'请再输入一次',
                  state:'stable'
                }
                patternLock.reset()
              }
            }
          }
        }
      }
      let patternLock= new PatternLock($('.mhn-lock'),options)
      let wrap = $('.mhn-lock-wrap').css({display:'inline-block'})
      let lock = $('.mhn-lock')
      if(oldPattern){
        this.lock = {
          title:'请输入手势密码解锁',
          state:'stable'
        }
      }else{
        this.lock = {
          title:'请输入初始手势密码',
          state:'stable'
        }
      }
    }
  }
</script>
<style>
.mu-flat-button-stable{
  color:#fff;
}
</style>