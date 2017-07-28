<template>
  <div class="page">
    <mu-appbar title="图表">
      <mu-icon-button href="#/page/home" icon="chevron_left" slot="left"/>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header">
      <swipe class="swipe-home" :auto="auto">
        <swipe-item>
          <div v-echarts:bar="{options: barOptions}" v-bind:style="{width: (screenWidth-20)+'px', height: (contentHeight-100)+'px'}"></div>
        </swipe-item>
        <swipe-item>
          <div v-echarts:line="{options: lineOptions}" v-bind:style="{width: (screenWidth-20)+'px', height: (contentHeight-100)+'px'}"></div>
        </swipe-item>
        <swipe-item>
          <div v-echarts:pie="{options: pieOptions}" v-bind:style="{width: (screenWidth-20)+'px', height: (contentHeight-100)+'px'}"></div>
        </swipe-item>
        <swipe-item>
          <div v-echarts:radar="{options: radarOptions}" v-bind:style="{width: (screenWidth-20)+'px', height: (contentHeight-100)+'px'}"></div>
        </swipe-item>
        <swipe-item>
          <div v-echarts:funnel="{options: funnelOptions}" v-bind:style="{width: (screenWidth-20)+'px', height: (contentHeight-100)+'px'}"></div>
        </swipe-item>
        <swipe-item>
          <div v-echarts:gauge="{options: gaugeOptions}" v-bind:style="{width: (screenWidth-20)+'px', height: (contentHeight-100)+'px'}"></div>
        </swipe-item>
        <swipe-item>
          <div v-echarts:map="{options: mapOptions}" v-bind:style="{width: (screenWidth-20)+'px', height: (contentHeight-100)+'px'}"></div>
        </swipe-item>
      </swipe>
    </mu-content-block>
  </div>
</template>

<script>
  import '../directives/echarts.js'

  export default {
    name: 'chart',
    data () {
      return {
        auto: 99999,
        state: true,
        screenWidth: window.globalConfig.screenWidth,
        contentHeight: window.globalConfig.contentHeight(true),
        barOptions: {
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        },
        lineOptions: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高气温', '最低气温']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [{
            name: '最高气温',
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10],
            markPoint: {
              data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
              {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            name: '最低气温',
            type: 'line',
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
              data: [
              {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
              ]
            },
            markLine: {
              data: [{
                type: 'average',
                name: '平均值'
              }, [{
                symbol: 'none',
                x: '90%',
                yAxis: 'max'
              }, {
                symbol: 'circle',
                label: {
                  normal: {
                    position: 'start',
                    formatter: '最大值'
                  }
                },
                type: 'max',
                name: '最高点'
              }]
              ]
            }
          }
          ]
        },
        pieOptions: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: 335,
              name: '直达',
              selected: true
            }, {
              value: 679,
              name: '营销广告'
            }, {
              value: 1548,
              name: '搜索引擎'
            }]
          }, {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],

            data: [{
              value: 335,
              name: '直达'
            }, {
              value: 310,
              name: '邮件营销'
            }, {
              value: 234,
              name: '联盟广告'
            }, {
              value: 135,
              name: '视频广告'
            }, {
              value: 1048,
              name: '百度'
            }, {
              value: 251,
              name: '谷歌'
            }, {
              value: 147,
              name: '必应'
            }, {
              value: 102,
              name: '其他'
            }]
          }]
        },
        radarOptions: {
          tooltip: {},
          radar: {
            indicator: [{
              name: '销售',
              max: 6500
            }, {
              name: '管理',
              max: 16000
            }, {
              name: '信息技术',
              max: 30000
            }, {
              name: '客服',
              max: 38000
            }, {
              name: '研发',
              max: 52000
            }, {
              name: '市场',
              max: 25000
            }]
          },
          series: [{
            name: '预算 vs 开销',
            type: 'radar',
            data: [{
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: '预算分配（Allocated Budget）'
            }, {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '实际开销（Actual Spending）'
            }]
          }]
        },
        funnelOptions: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            data: ['展现', '点击', '访问', '咨询', '订单']
          },
          series: [{
            name: '预期',
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
              normal: {
                formatter: '{b}预期'
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}预期: {c}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.7
              }
            },
            data: [
            {value: 60, name: '访问'},
            {value: 40, name: '咨询'},
            {value: 20, name: '订单'},
            {value: 80, name: '点击'},
            {value: 100, name: '展现'}
            ]
          }, {
            name: '实际',
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            label: {
              normal: {
                position: 'inside',
                formatter: '{c}%',
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}实际: {c}%'
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.5,
                borderColor: '#fff',
                borderWidth: 2
              }
            },
            data: [
            {value: 30, name: '访问'},
            {value: 10, name: '咨询'},
            {value: 5, name: '订单'},
            {value: 50, name: '点击'},
            {value: 80, name: '展现'}
            ]
          }
          ]
        },
        gaugeOptions: {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [{
            name: '业务指标',
            type: 'gauge',
            detail: {
              formatter: '{value}%'
            },
            data: [{
              value: 54,
              name: '完成率'
            }]
          }]
        },
        mapOptions: {
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          series: [{
            name: '中国',
            type: 'map',
            mapType: 'china',
            selectedMode: 'multiple',
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [{
              name: '广东',
              selected: true
            }]
          }]
        }
      }
    },
    methods: {
      trigger () {
        this.state = !this.state
      }
    },
    mounted: function () {
      setInterval(() => {
        this.gaugeOptions = {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [{
            name: '业务指标',
            type: 'gauge',
            detail: {
              formatter: '{value}%'
            },
            data: [{
              value: parseInt(Math.random() * 100, 10),
              name: '完成率'
            }]
          }]
        }
      }, 2000)
    }
  }
</script>
