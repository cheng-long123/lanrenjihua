(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-promotionCenter"],{"04f9":function(t,e,a){"use strict";a.r(e);var i=a("17e3"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},"17e3":function(t,e,a){"use strict";(function(t){var i=a("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("96cf");var n=i(a("c964")),r={onLoad:function(){var t=this;uni.getStorage({key:"usertoken",success:function(e){t.erweimaImg="http://dh.weifoupay.com/payapi/Real/generalize?cre_id="+e.data.cre_id,t.phone=e.data.phone,t.userId=e.data.cre_id,t.token=e.data.token,t.cre_id=e.data.cre_id}}),this.getimgformapi()},onNavigationBarButtonTap:function(t){this.formSubmit()},onReady:function(){var t=this;setTimeout((function(){t.toImage()}),1500)},data:function(){return{erweimaImg:"",shareImg:"",phone:"",userId:"",showhongbao:!1,cre_id:"",token:"",shareimage:"",imgfromapi:[]}},methods:{swiperChange:function(t){this.shareimage=this.imgfromapi[t.target.current].curl},getimgformapi:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function a(){var i,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.Request({url:"/Info/advertisement"});case 2:i=a.sent,n=i.data,e.$data.imgfromapi=n.data,t("log",n," at pages/my/promotionCenter.vue:172");case 6:case"end":return a.stop()}}),a)})))()},geterweima:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function a(){var i,n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.Request({url:"/Real/generalize",method:"POST",data:{cre_id:e.$data.cre_id,token:e.$data.token}});case 2:i=a.sent,n=i.data,t("log",n," at pages/my/promotionCenter.vue:183"),4===n.status?e.baseLogout():(r="data:image/jpeg;base64,"+n,t("log",r," at pages/my/promotionCenter.vue:192"),e.erweimaImg="data:image/jpeg;base64,"+n,t("log",e.erweimaImg," at pages/my/promotionCenter.vue:194"));case 6:case"end":return a.stop()}}),a)})))()},hidehongbao:function(){this.showhongbao=!1},tohongbaolist:function(){uni.navigateTo({url:"myredpocket"})},formSubmit:function(){var t=this;uni.showToast({title:"请截屏保存后进行分享!",icon:"none",duration:1500}),uni.share({title:"懒人计划",provider:"weixin",scene:"WXSceneSession",type:2,imageUrl:"http://dh.weifoupay.com"+this.shareimage,success:function(e){t.shareimage="",uni.showToast({title:"已分享",duration:2e3})},fail:function(e){uni.share({provider:"weixin",scene:"WXSceneSession",type:2,imageUrl:"http://dh.weifoupay.com"+t.shareimage,success:function(t){uni.showToast({title:"已分享",duration:2e3})}})}})},getImage:function(){var e=this,a=getCurrentPages(),i=a[a.length-1],n=i.$getAppWebview(),r=null;r=new plus.nativeObj.Bitmap("amway_img"),n.draw(r,(function(){r.save("_doc/adrawScreen.jpg",{overwrite:!0},(function(a){t("log",a," at pages/my/promotionCenter.vue:295"),e.shareimage=a.target}),(function(e){t("log",JSON.stringify(e)," at pages/my/promotionCenter.vue:298")})),r.clear()}),(function(e){t("log",JSON.stringify(e)," at pages/my/promotionCenter.vue:303")}),{check:!0})},toImage:function(){var e=this,a=getCurrentPages(),i=a[a.length-1],r=null,o=i.$getAppWebview();r=new plus.nativeObj.Bitmap("test"),o.draw(r,(function(a){e.test=r.toBase64Data(),r.loadBase64Data(r.toBase64Data(),(function(){r.save("_doc/share.jpg",{},function(){var a=(0,n.default)(regeneratorRuntime.mark((function a(i){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t("log",i.target," at pages/my/promotionCenter.vue:333"),uni.saveImageToPhotosAlbum({filePath:i.target,success:function(){r.clear(),e.shareimage=i.target},fail:function(t){}});case 2:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}(),(function(t){}))}),(function(){}))}),(function(t){}),{check:!0,clip:{top:"70px",left:"0px",height:"100%",width:"100%"}})}},components:{}};e.default=r}).call(this,a("0de9")["log"])},"39c9":function(t,e,a){"use strict";var i,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"mybankcard"},[a("v-uni-view",{},[a("v-uni-view",{staticClass:"position-relative "},[a("v-uni-swiper",{staticStyle:{height:"1246rpx"},attrs:{"indicator-dots":!0,autoplay:!1,interval:3e3,duration:1e3},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.swiperChange.apply(void 0,arguments)}}},[t._l(t.imgfromapi,(function(e,i){return[a("v-uni-swiper-item",[a("v-uni-view",{},[a("v-uni-image",{staticClass:"tuiguang",attrs:{src:"http://dh.weifoupay.com"+e.curl,mode:""}}),0==i?a("v-uni-view",{staticStyle:{display:"flex",width:"100%","justify-content":"center"}},[a("v-uni-image",{staticClass:"erweima",staticStyle:{"z-index":"1000","margin-top":"-642rpx"},attrs:{aspectFit:!0,src:t.erweimaImg,alt:""}})],1):t._e(),1==i?a("v-uni-view",{staticStyle:{display:"flex",width:"100%","justify-content":"center"}},[a("v-uni-image",{staticClass:"erweima ",staticStyle:{"z-index":"1000","margin-top":"-380rpx"},attrs:{aspectFit:!0,src:t.erweimaImg,alt:""}})],1):t._e(),2==i?a("v-uni-view",{},[a("v-uni-image",{staticClass:"erweima ",staticStyle:{"z-index":"1000","margin-top":"-355rpx","margin-left":"118rpx"},attrs:{aspectFit:!0,src:t.erweimaImg,alt:""}})],1):t._e(),3==i?a("v-uni-view",{staticStyle:{"text-align":"center"}},[a("v-uni-image",{staticClass:"erweima ",staticStyle:{"z-index":"1000","margin-top":"-330rpx","margin-left":"-150rpx"},attrs:{aspectFit:!0,src:t.erweimaImg,alt:""}})],1):t._e(),4==i?a("v-uni-view",{staticStyle:{"text-align":"center"}},[a("v-uni-image",{staticClass:"erweima ",staticStyle:{"z-index":"1000","margin-top":"-440rpx","margin-left":"-100rpx",width:"200rpx",height:"200rpx"},attrs:{aspectFit:!0,src:t.erweimaImg,alt:""}})],1):t._e(),5==i?a("v-uni-view",{staticStyle:{display:"flex",width:"100%","justify-content":"center"}},[a("v-uni-image",{staticClass:"erweima ",staticStyle:{"z-index":"1000","margin-top":"-900rpx"},attrs:{aspectFit:!0,src:t.erweimaImg,alt:""}})],1):t._e()],1)],1)]}))],2)],1)],1)],1)},r=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return i}))},"5af4":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.hidehongbao[data-v-5a55491e]{width:%?80?%;height:%?80?%;position:absolute;top:%?300?%;margin-left:75%}.lijilingqu[data-v-5a55491e]{width:50%;margin-left:25%;height:%?100?%;position:absolute;top:%?800?%;z-index:1002}.hongbao[data-v-5a55491e]{margin-top:%?400?%;height:%?600?%;z-index:1001;width:95%;margin-left:2.5%}.hongbaocontain[data-v-5a55491e]{top:0;position:absolute;background-color:rgba(85,85,85,.8);width:100%;height:%?1246?%}.mybankcard .erweima[data-v-5a55491e]{width:%?300?%;height:%?300?%;position:absolute;z-index:1000;width:pxToRem(180);height:pxToRem(180);margin-bottom:20%}.mybankcard .phone[data-v-5a55491e]{position:absolute;top:%?-25?%;color:#333}.mybankcard .mterwei[data-v-5a55491e]{top:%?890?%}.mybankcard .posab[data-v-5a55491e]{position:absolute}.mybankcard .tuiguang[data-v-5a55491e]{width:100%;height:%?1246?%}.mybankcard .mtb[data-v-5a55491e]{padding-top:60%;padding-bottom:40%}.mybankcard .liji[data-v-5a55491e]{height:pxToRem(88);line-height:pxToRem(88)}.mybankcard .chuangjian[data-v-5a55491e]{height:pxToRem(88);line-height:pxToRem(88);margin-bottom:50%}.mybankcard .viewml[data-v-5a55491e]{margin-left:pxToRem(120)}.mybankcard .header[data-v-5a55491e]{border-bottom:1px solid #e5e5e5}.mybankcard .icon_fanhui2[data-v-5a55491e]{width:pxToRem(18);height:pxToRem(30)}.mybankcard .append[data-v-5a55491e]{box-shadow:0 0 .625rem 0 rgba(0,0,0,.1);color:#3691e9;height:pxToRem(98);line-height:pxToRem(98)}.mybankcard .bankcard[data-v-5a55491e]{position:relative}.mybankcard .bankcard .wenzi[data-v-5a55491e]{width:100%;position:absolute;top:pxToRem(20);line-height:pxToRem(22);text-align:left;color:#fff}.content[data-v-5a55491e]{width:100%;margin:20px auto}.content .uni-input[data-v-5a55491e]{width:80%;height:45px;margin:8px auto;border:1px solid #ccc;margin-bottom:8px;padding-left:8px;border-radius:10px;font-size:16px;color:#333}.content uni-button[data-v-5a55491e]{width:80%;height:45px;line-height:45px;margin:8px auto;border:1px solid #ccc;margin-bottom:8px;padding-left:8px;border-radius:10px;font-size:16px;color:#fff;background:#56b273;border:none}uni-button[data-v-5a55491e]::after{border:none}.content .banquan[data-v-5a55491e]{text-align:center;margin-top:50px;font-size:15px;color:#666}',""]),t.exports=e},"6cfc":function(t,e,a){var i=a("5af4");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("51837892",i,!0,{sourceMap:!1,shadowMode:!1})},"77fd":function(t,e,a){"use strict";a.r(e);var i=a("39c9"),n=a("04f9");for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("7ebe");var o,s=a("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"5a55491e",null,!1,i["a"],o);e["default"]=c.exports},"7ebe":function(t,e,a){"use strict";var i=a("6cfc"),n=a.n(i);n.a}}]);