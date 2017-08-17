<template>
  <div class="page">
    <mu-appbar title="登录">
      <mu-icon-button @click="back" icon="chevron_left" slot="left"/>
      <mu-icon-button @click="lockScreen(true)" icon="lock" slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header">
      <div style="text-align:center;">
        <mu-text-field label="用户名" v-model="model.loginCode" labelFloat/><br/>
        <mu-text-field label="密码" v-model="model.loginPwd" labelFloat/><br/>
      </div>
      <div class="center">
        <mu-raised-button @click="login" label="登　录" class="demo-raised-button" style="width:256px;" primary/>
      </div>
    </mu-content-block>

    <mu-dialog :open="showDialog" @close="toggleDialog(false)">
        <div v-if="loading" class="center">
          <p>登录中，请稍等...</p>
          <mu-linear-progress />
        </div>
        <div v-else class="center" style="line-height:24px;">
          <p color="red"><a>{{msg}}</a></p>
          <mu-raised-button style="width:100%;" slot="actions" primary @click="toggleDialog(false)" label="确定"/>
        </div>
    </mu-dialog>

    <mu-dialog dialogClass="dialog-lock" bodyClass="dialog-body" :open="isLockScreen" @close="lockScreen(false)">
      <mu-appbar title="手势解锁"></mu-appbar>
        <pattern-lock></pattern-lock>
    </mu-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import utils from '../utils'
  import { mapGetters, mapMutations } from 'vuex'
  import PatternLock from './common/PatternLock.vue'
  Vue.component('pattern-lock', PatternLock)
  export default {
    name: 'login',
    data () {
      return {
        loading: false,
        showDialog: false,
        lock: false,
        msg: 'aaa',
        model: {
          loginCode: '13701263621',
          loginPwd: '123456'
        }
      }
    },
    methods: {
      login () {
        let params = {
          "agent": {
            "loginCode": this.model.loginCode,
            "loginPwd": this.model.loginPwd,
            "agentChannel": "iwechat1",
            "channel": globalConfig.channel || "iwechat",
            "deviceNo": Math.floor(Math.random() * 100000000000000000000) + '',
            "token": "",
            "openId": "00000",
            "random": '111111',
            "loginType": globalConfig.loginType,
          },
          "deviceNo": '666666',
          "deviceType": "ios"
        };

        this.loading = true
        this.toggleDialog(true)
        setTimeout(()=>{
          utils.http.post(params).then((response) => {
            this.loading = false
            if(response.data.packageList.packages.header.responseCode == '0') {
              this.toggleDialog(false)
              this.msg = ''
              utils.cache.set('user', response.data.packageList.packages.response.user)
              this.$store.commit('LOGIN', utils.cache.get('user'))
              this.$router.push('/page/home')
            } else {
              this.msg = response.data.packageList.packages.header.errorMessage.substr(0,10)
            }
          })
        },1000)
      },
      ...mapMutations({
        lockScreen: 'LOCK_SCREEN'
      }),
      toggleLock (isShow) {
        this.lock = isShow
      },
      toggleDialog (showLoginDialog) {
        this.showDialog = showLoginDialog
      }
    },
    computed: {
      ...mapGetters([
        'isLockScreen'
      ])
    },
    mounted () {
      console.log(DES3.encrypt('','chenjia'))
      console.log(DES3.decrypt('',DES3.encrypt('','chenjia')))
    }
  }
</script>

<style>
  .dialog-lock{
    width:100%;
    height:100%;
  }
  .dialog-body{
    padding:0;
    width:100%;
    height:100%;
    text-align:center;
    background:url(../assets/lock-bg.jpg);
    background-size:cover;
  }
</style>