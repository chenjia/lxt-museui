import Vue from 'vue'
import chinaJson from './china.json'
var echarts = require('echarts/lib/echarts')
Vue.directive('echarts', {
  inserted: function (el, binding) {
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
    // var width = binding.value.width || 300
    // var height = binding.value.height || width * 0.8
    // el.style.width = width + 'px'
    // el.style.height = height + 'px'
    echarts.registerMap('china', chinaJson)
    var myChart = echarts.init(el, 'macarons')
    myChart.setOption(binding.value)
  },
  update: function () {
    alert(123)
  }
})
