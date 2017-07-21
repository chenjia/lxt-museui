<template>
  <div class="page">
    <mu-appbar title="表单">
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header" v-bind:style="{height:contentHeight+'px'}">
      <div class="field">
        <label>普通文本框</label>
        <mu-text-field fullWidth />
      </div>

      <div class="field">
        <label>日期格式</label>
        <mu-date-picker fullWidth hintText="竖屏模式选择"/>
      </div>

      <div class="field">
        <label>时间格式</label>
        <mu-time-picker fullWidth hintText="24小时制" format="24hr"/>
      </div>

      <div class="field">
        <label>单选示例</label>
        <mu-select-field fullWidth :labelFocusClass="['label-foucs']">
          <mu-menu-item v-for="text,index in selectData" :key="index" :value="index" :title="text" />
        </mu-select-field>
      </div>

      <div class="field">
        <label>多选示例</label>
        <mu-select-field fullWidth multiple>
          <mu-menu-item value="1" title="阴阳师"/>
          <mu-menu-item value="2" title="影之刃"/>
          <mu-menu-item value="3" title="天下HD"/>
          <mu-menu-item value="4" title="穿越火线"/>
          <mu-menu-item value="5" title="英雄联盟"/>
          <mu-menu-item value="6" title="王者荣耀"/>
        </mu-select-field>
      </div>

      <div class="field">
        <label>屏幕亮度</label>
        <mu-slider style="margin-top:11px;" class="demo-slider"/>
      </div>

      <div class="field">
        <label>复选框</label>
        <mu-checkbox style="margin-top:11px;" label="普通　"/>
        <mu-checkbox style="margin:11px 0 0 30px;" uncheckIcon="visibility_off" checkedIcon="visibility" label="可见　"/>
      </div>

      <div class="field">
        <label></label>
        <mu-checkbox style="margin-top:11px;" uncheckIcon="favorite_border" checkedIcon="favorite" label="策妹子"/>
        <mu-checkbox style="margin:11px 0 0 30px;" uncheckIcon="lock_open" checkedIcon="lock" label="锁定"/>
      </div>

      <div class="field">
        <label></label>
        <mu-checkbox style="margin-top:11px;" disabled label="禁用　" :value="true"/>
        <mu-checkbox style="margin:11px 0 0 30px;" disabled label="禁用　"/>
      </div>
      
      <div class="field">
        <label>单选框</label>
        <mu-radio style="margin-top:11px;" label="单选 1" name="group" nativeValue="simple1" class="demo-radio"/>
        <mu-radio style="margin:11px 0 0 30px;" label="单选 2" name="group" nativeValue="simple2" class="demo-radio"/> <br/>
      </div>

      <div class="field">
        <label></label>
        <mu-radio style="margin-top:11px;" label="自定义" name="group" nativeValue="simple3" class="demo-radio" uncheckIcon="favorite_border" checkedIcon="favorite"/>
        <mu-radio style="margin:11px 0 0 30px;" label="不可用" class="demo-radio" name="disabled" disabled nativeValue="dd"/>
      </div>

      <div class="field">
        <label>开关</label>
        <mu-switch style="margin-top:11px;" label="开关" class="demo-switch" />
        <mu-switch style="margin:11px 0 0 30px;" disabled label="禁用" class="demo-switch" />
      </div>
      
    </mu-content-block>
  </div>
</template>

<script>
  export default {
    name: 'form',
    data () {
      return {
        errorText: '又输错啦',
        selectData: ['阴阳师', '影之刃', '天下HD', '穿越火线', '英雄联盟', '王者荣耀'],
        contentHeight: window.globalConfig.contentHeight(true)
      }
    },
    methods: {
      
    },
    mounted () {
      this.$store.commit('TOGGLE_TAB', false)
    }
  }
</script>
<style scoped>
  .field{
    display:flex;
  }
  .field label:first-child{
    flex:0 0 100px;
    font-size:16px;
    height:56px;
    line-height:44px;
  }
</style>