import Vue from 'vue'
import chinaJson from './china.json'
const echarts = require('echarts/lib/echarts')
Vue.directive('echarts', {
  inserted: function(el, binding) {
    require('./macarons')
    require('echarts/lib/chart/bar')
    require('echarts/lib/chart/line')
    require('echarts/lib/chart/pie')
    require('echarts/lib/chart/radar')
    require('echarts/lib/chart/funnel')
    require('echarts/lib/chart/gauge')
    require('echarts/lib/chart/map')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/legend')
    let width = el.style.width || el.parentNode.offsetWidth + 'px'
    let height = el.style.height || el.parentNode.offsetHeight + 'px'
    el.style.width = width
    el.style.height = height
    echarts.registerMap('china', chinaJson)
    let myChart = echarts.init(el, 'macarons')
    myChart.setOption(binding.value.options, true)
  },
  update: function(el, binding) {
    if (JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue)) {
      let myChart = echarts.getInstanceByDom(el)
      myChart.setOption(binding.value.options, true)
    }
  }
})