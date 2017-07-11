import Vue from 'vue'

Vue.filter('filter-gender', function (value) {
  if (value === '1') {
    return '男'
  } else {
    return '女'
  }
})
