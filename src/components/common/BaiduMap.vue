<template>
  <div id="mapBox" style="width:100%;height:40%;">
    <iframe src="static/html/baiduMap.html?callback=mapCallback" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'BaiduMap',
    data () {
      return {
        
      }
    },
    methods: {
      
    },
    computed:{
      
    },
    mounted () {
      window.mapCallback = BMap => {
        const map = new BMap.Map("mapBox")
        const point = new BMap.Point(121.7443650000,31.1506170000)
        map.addOverlay(new BMap.Marker(point))
        map.centerAndZoom(point,15)

        navigator.geolocation.getCurrentPosition(function(position){
          alert(position)
          const currentLat = position.coords.latitude
          const currentLon = position.coords.longitude
          const gpsPoint = new BMap.Point(currentLon, currentLat)
          map.centerAndZoom(gpsPoint,15)
        }, function(err){
          console.log(err)
          alert(err.message)
        })
      }
    }
  }
</script>