<template>
    <view id="login">
			<view class="login-text">
				<text>手机号密码登录</text>
				<text class="text">未注册的手机号登录成功后将自动注册</text>
			</view>
			<view class="form">
				<input type="text" v-model="phone" placeholder="请输入手机号码"/>
				<input type="password" v-model="password" placeholder="请输入密码" />
			</view>
			<!-- <view class="zhuce">
				<navigator url="../register/index">去注册</navigator>
			</view> -->
			<view class="login-btn">
				<image @click="login"  class="btn-img" src="../../static/image/denglu.png" mode=""></image>
			</view>
			<view class="otherways ">
				<view class="wire"></view>
				<view class="else">其他快捷登录方式</view>
				<view class="wire"></view>
				
			</view>
			<view class="denglu-img">
				<image class="image" src="../../static/image/weixin.png" mode=""></image>
				<image class="image" src="../../static/image/qq.png" mode=""></image>
				<image class="image" src="../../static/image/weibo.png" mode=""></image>
			</view>
    </view>
</template>
<script>
// import login from '../../api/api.js'
import request from '../../api/request.js'
export default {
   data() {
      return {
		 phone: '13915550562', //账号
		 password: '56559745' //密码
      }
   },
   onNavigationBarButtonTap(e) {
   	uni.navigateTo({
   		url: '../register/index'
   	})
       // console.log("success")        
   },
methods:{
	//登录
	   async login () {
		   uni.showLoading({
		       title: '登陆中'
		   });
		   
		const res = await this.Request({
			method: 'GET',
			url: '/Userforeign/login',
			data: {
				phone: this.$data.phone.trim(),
				password: this.$data.password.trim()
			}
		})
		
		
		if (res.data.status === 1) {
			uni.hideLoading()
			uni.showToast({
				title: '登陆成功',
				icon: 'success',
			})
			uni.setStorage({
				key: 'usertoken',
				data: res.data.data
			})
			setTimeout( ()=> {
				
				uni.switchTab({
				    url: '/pages/index/index',
				})
			},1000)
			
		} else if (res.data.status === 2) {
			uni.hideLoading()
			uni.showToast({
				title: '用户名或密码错误',
				icon: 'none'
			})
		}
		// console.log(res)
	}
},
   mounted() {
   }
}
</script>
<style lang='scss' scoped>
#login{
 box-sizing: border-box;
 width: 100%;
 height: 100%;
 background-color: #fff;
 /* background: url(../../static/image/login-bg.png) no-repeat; */
 /* background-size: cover; */
 .login-text {
	 box-sizing: border-box;
	 width: 100%;
	 height: 360rpx;
	 display: flex;
	 flex-direction: column;
	 justify-content: space;
	 align-items: space;
	 font-size: 40rpx;
	 font-weight: 600;
	 padding-top: 100rpx;
	 margin-left: 68rpx;
	 .text {
		font-size: 24rpx;
		color: #8D8D8D;
		font-weight: 400;
		margin-top: 10rpx;
	 }
	 }
	 .form {
		 input {
			 width: 590rpx;
			 height: 78rpx;
			 margin: 40rpx auto;
			 /* border: 1px solid #ccc; */
			 background-color: #F4F4F6 !important;
			 border-radius: 40rpx; 
			 background-color: #fff;
			 padding-left: 20rpx;
			 
		 }
	 }
	 .zhuce {
		float: right;
		margin-right: 82rpx;
		font-size: 32rpx;
		color: rgba(0,0,0,.5);
		 }
		 .login-btn{
			 width: 100%;
			 height: 380rpx;
			 display: flex;
			 justify-content: center;
			 align-items: center;
			 .btn-img {
				 width: 150rpx;
				 height: 150rpx;
			 }
		 }
		 .otherways {
			 display: flex;
			 justify-content: center;
			 align-items: center;
			 .else {
				 margin: 0 20rpx;
				 font-size: 28rpx;
				 color: rgba(0,0,0,.5);
			 }
			 .wire {
				 width: 161rpx;
				 height: 1rpx;
				 background-color: rgba(0,0,0,.5);
			 }
		 }
		 .denglu-img {
			 display: flex;
			 justify-content: center;
			 align-items: center;
			 margin-top: 30rpx;
			 .image{
				 width: 50rpx;
				 height: 50rpx;
				 &:nth-child(2) {
					 margin: 0 115rpx;
				 }
			 }
		 }
}

</style>