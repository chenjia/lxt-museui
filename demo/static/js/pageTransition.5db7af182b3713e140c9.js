webpackJsonp([7],{158:function(t,e,o){function a(t){o(273)}var n=o(71)(o(436),o(258),a,null,null);t.exports=n.exports},239:function(t,e,o){e=t.exports=o(146)(!1),e.push([t.i,".child-view{position:absolute;top:0;width:100%;height:100%;transition:all .1s ease-out}",""])},258:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("mu-appbar",{staticStyle:{"z-index":"-1"}}),t._v(" "),o("transition",{attrs:{name:t.transitionName}},[o("router-view",{staticClass:"child-view"})],1),t._v(" "),o("transition",{attrs:{name:"slide-up"}},[o("mu-paper",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.common.hasFooter,expression:"$store.state.common.hasFooter"}],staticClass:"footer-tabs"},[o("mu-bottom-nav",{staticStyle:{height:"48px"},attrs:{value:t.bottomNav},on:{change:t.handleChange}},[o("mu-bottom-nav-item",{attrs:{href:"#/page/home",value:"home",title:"首页",icon:"home"}}),t._v(" "),o("mu-bottom-nav-item",{attrs:{href:"#/page/customer",value:"customer",title:"客户",icon:"person"}}),t._v(" "),o("mu-bottom-nav-item",{attrs:{href:"#/page/about",value:"about",title:"我的",icon:"face"}})],1)],1)],1),t._v(" "),t.$store.state.common.toast?o("mu-snackbar",{attrs:{message:t.$store.state.common.toastMsg,action:"关闭"},on:{actionClick:t.hideSnackbar,close:t.hideSnackbar}}):t._e()],1)},staticRenderFns:[]}},273:function(t,e,o){var a=o(239);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);o(147)("26f37e30",a,!0)},436:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{transitionName:"slide-left",bottomNav:"home",screenWidth:document.documentElement.clientWidth,screenHeight:document.documentElement.clientHeight}},methods:{hideSnackbar:function(){this.$store.commit("TOGGLE_TOAST",!1)},handleChange:function(t){this.bottomNav=t}},beforeRouteUpdate:function(t,e,o){var a=this.$router.isBack;this.transitionName=a?"slide-right":"slide-left",this.$router.isBack=!1,o()},mounted:function(){}}}});