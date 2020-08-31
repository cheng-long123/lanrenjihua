<template>
	<view class="formsubmit">
		<!-- <button type="default" @click="towaibu()">11</button> -->
		<button type="primary" @click="goback()">返回</button>
		<!-- <view class="htmlcontainer" v-html="src2"> -->
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			// console.log("这是解析前的url：" + option)
			// console.log("这是解析后1的url："+encodeURIComponent(option.data))
			// console.log(this.url);
			this.src2=option.data
			this.url = this.src1 + encodeURI(option.data)
			//#ifdef APP-PLUS
			plus.runtime.openURL(this.url);
			//#endif
			//#ifdef H5
			window.location.href = this.url;
			//#endif
		},
		data() {
			return {
				url: '',
				src1: "http://dh.weifoupay.com/payapi/Dongfang/duan?data=",
				src2: "?id=1",
				data1: '',
			}
		},
		methods: {
			goback(){
				uni.navigateBack({
					
				})
			},
			// towaibu() {
			// 	//#ifdef APP-PLUS
			// 	plus.runtime.openURL(this.url);
			// 	//#endif
			// 	//#ifdef H5
			// 	window.location.href = this.url;
			// 	//#endif
			// }
		}

	}
</script>

<style>
</style>
