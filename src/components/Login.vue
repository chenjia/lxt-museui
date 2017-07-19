<template>
  <div class="page">
    <mu-appbar title="登录">
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer">
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
        <div v-else class="center">
          {{msg}}<br/><br/>
          <mu-raised-button style="width:100%;" slot="actions" primary @click="toggleDialog(false)" label="确定"/>
        </div>
    </mu-dialog>
  </div>
</template>

<script>
  import utils from '../utils'
  export default {
    name: 'login',
    data () {
      return {
        loading: false,
        showDialog: false,
        msg: '',
        model: {
          loginCode: '8601000068',
          loginPwd: '1234561'
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
            this.toggleDialog(false)
            this.loading = false
            if(response.data.packageList.packages.header.responseCode == '0') {
              this.msg = ''
              this.$router.push('/page/home')
            } else {
              this.msg = response.data.packageList.packages.header.errorMessage.substr(0,10)
            }
          })
        },1000)
      },
      toggleDialog (isShow) {
        this.showDialog = isShow
      }
    },
    mounted () {
      this.$store.commit('TOGGLE_TAB', false)
    }
  }
</script>

<style>

</style>