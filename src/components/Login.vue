<template>
  <div class="page">
    <mu-appbar title="登录">
      <mu-icon-button href="#/page/about" icon="chevron_left" slot="left"/>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer">
      <div style="text-align:center;">
        <mu-text-field label="用户名" labelFloat/><br/>
        <mu-text-field label="密码" labelFloat/><br/>
      </div>
      <div class="center">
        <mu-raised-button @click="login" label="登　录" class="demo-raised-button" style="width:256px;" primary/>
      </div>
    </mu-content-block>
  </div>
</template>

<script>
  import utils from '../utils'
  export default {
    name: 'login',
    data () {
      return {
        model: {
          user: {}
        }
      }
    },
    methods: {
      login () {
        let params = {
          "agent": {
            "loginCode": '8601000068',
            "loginPwd": '123456',
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

        utils.http.post(params).then((response) => {
          console.log(response.data.packageList.packages.response)
        })
      }
    },
    mounted () {
      this.$store.commit('TOGGLE_TAB', false)
    }
  }
</script>
