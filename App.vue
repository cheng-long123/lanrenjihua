
<script>
	import Vue from 'vue'

	export default {
		onLaunch: function() {
			  uni.getSystemInfo({  
			        success:function(e){  
			            Vue.prototype.statusBar = e.statusBarHeight  
			            // #ifndef MP  
			            if(e.platform == 'android') {  
			                Vue.prototype.customBar = e.statusBarHeight + 50  
			            }else {  
			                Vue.prototype.customBar = e.statusBarHeight + 45  
			            }  
			            // #endif  
			
			            // #ifdef MP-WEIXIN  
			            let custom = wx.getMenuButtonBoundingClientRect()  
			            Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight  
			            // #endif  
			
			            // #ifdef MP-ALIPAY  
			            Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight  
			            // #endif  
			        }  
			    })  
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style src="./static/iconfont/iconfont.css">
	/* @import url("./static/iconfont/iconfont.css") */
	/*每个页面公共css */
	 /* @import url("./uni.scss"); */
	 page {
		 background-color: #f4f4f6;
		 height: 100% !important;
	 }
	 /deep/ uni-page-wrapper {
	 background-color: #f4f4f6;
	 }
	 /deep/ .uni-btn-icon{
		 margin-right: 22rpx;
	 }
</style>
