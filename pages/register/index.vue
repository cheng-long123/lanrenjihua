<template>
    <view id="register">
		<view class="register-box">
			<view class="register-form">
				<input type="text" v-model="phone" placeholder="请输入手机号" />
			</view>
			<view class="register-form">

				<input type="password" v-model="password" placeholder="请输入密码" />
			</view>
			<view class="register-form">

				<input type="password" v-model="password2" placeholder="请输入确认密码" />
			</view>
			<view class="register-form">
				<input type="text" v-model="superior" placeholder="请输入推荐人手机号" />
			</view>
			<view class="register-verify">
				<input type="text" v-model="code" placeholder="请输入短信验证码" />
				<view class="verify-btn" v-if="!isShowCode" @click="getCode">
					发送验证码
				</view>
				<view class="verify-btn" v-else style="color: #808080;">
					重发{{ time }}s
				</view>
			</view>
			<wyb-button class="register-btn" width="90%" type="plain" :ripple="true" :radius="['20px']" @click="register">注册</wyb-button>
			<!-- <button class="register-btn" type="default" @click="register">
				注册
			</button> -->
			<text class="zhmm" @click="toLogin">账号密码登录</text>
		</view>
    </view>
</template>
<script>
	import {　checkMobile,checkPassword　} from '../../utils/index.js'
export default {
   data() {
      return {
		 phone: '', //手机号
		 password: '', //密码
		 password2: '', // 确认密码
		 superior: '',//推荐人手机号
		 code: '', //短信验证码
		 isShowCode: '',
		 time: 60
      }
   },
methods:{
	async getCode () {
		if (this.phone === '') {
			return uni.showToast({
				title: '请输入手机号',
				icon: 'none'
			})
		} else if(!checkMobile(this.phone)){
			
			return uni.showToast({
				title: '手机号格式错误',
				icon: 'none',
				});
		}
		const { data } = await this.Request({
			method: 'GET',
			url: '/Userforeign/message',
			data: {
				phone: this.phone
			}
		})
		if (data.status === 1) {
			uni.showToast({
				title: '验证码已发送',
				duration: 2000,
				icon: 'none'
			})
			this.isShowCode = true
			var timer = setInterval( ()=> {
				var times = this.time <= 10 ? '0' + this.time : this.time
				this.time = times
				this.time--
				if (this.time <= 0) {
					clearInterval(timer)
					this.time = 60
					this.isShowCode = false
				}
			},1000)
		} else {
			uni.showToast({
				title: data.msg,
				duration: 2000,
				icon: 'none'
			})
		}
	}, // 注册
	async register () {
		// if (this.phone === '') {
		// 	return uni.showToast({title: '请输入手机号',icon: 'none'})
		// } else if(!checkMobile(this.phone)){
		// 	return uni.showToast({title: '手机号格式错误',icon: 'none'});
		// } else if(this.password === '') {
		// 	return uni.showToast({title: '请输入密码',icon: 'none'})
		// } else if (!checkPassword(this.password)) {
		// 	return uni.showToast({title: '密码长度不少于6位',icon: 'none'})
		// } else if (this.password2 ===''){
		// 	return uni.showToast({title: '请输入密码',icon: 'none'})
		// }else if (this.password !== this.password2){
		// 	return uni.showToast({title: '两次密码不一致,请重新输入！',icon: 'none'})
		// }else if (this.superior === ''){
		// 	return uni.showToast({title: '请输入推荐人手机号',icon: 'none'})
		// }else if (!checkMobile(this.superior)){
		// 	return uni.showToast({title: '推荐人手机号个格式不正确',icon: 'none'})
		// }else if (this.code === ''){
		// 	return uni.showToast({title: '请输入验证码',icon: 'none'})
		// }if (this.code === ''){
		// 	return uni.showToast({title: '请输入验证码',icon: 'none'})
		// }
		// console.log(this.$data);
		const { data } = await this.Request({
			method: 'POST',
			url: '/Userforeign/user_instan',
			data: {
				phone: this.phone,
				password: this.password,
				password2: this.password2,
				superior: this.superior,
				code: this.code
			}
		})
		
		if (data.status === 1) {
			uni.showToast({
				title: data.msg,
				duration: 1500
			})
			setTimeout( () => {
				this.toLogin()
			},1500)
		} else if (data.status === 2) {
			uni.showToast({
				title: data.msg,
				duration: 2000,
				icon: 'none'
			})
		}
		
	},
	toLogin () {
		uni.redirectTo({
		    url: `../login/index`,
		    animationType: 'pop-in',
		    animationDuration: 200
		})
	}
},
   mounted() {
   }
}
</script>
<style lang='scss' scoped>
#register{
	box-sizing: border-box;
	.register-box{
		box-sizing: border-box;
		padding-top: 40rpx;
		.register-form {
				width: 100%;
				height: 50rpx;
				padding: 60rpx 40rpx 0 40rpx;
				margin-bottom: 10rpx;
				
				/* border-bottom: 1rpx solid rgba(233,234,237,1); */
				input {
					/* width: 100%; */
					height: 50rpx;
					font-size: 28rpx;
					 border-bottom: 1rpx solid rgba(233,234,237,1);
					
				}
			}
			.register-verify {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 60rpx 40rpx 0 40rpx;
				input {
					font-size: 28rpx;
					padding: 0rpx 10rpx 10rpx 10rpx;
					border-bottom: 1rpx solid rgba(233,234,237,1);
					&:-ms-input-placeholder {
						color: rgba(0,0,0,.5);
					}
				}
				.register-text {
					font-size: 32rpx;
				}
				.verify-btn {
					/* width: 200rpx; */
					padding: 15rpx;
					height: 40rpx;
					line-height: 40rpx;
					border-radius: 40rpx;
					font-size: 28rpx;
					border: 1rpx solid #E9EAED;
					color: #808080;
				}
			}
		}
		.register-btn {
			height: 80rpx;
			width: 590rpx;
			line-height: 80rpx;
			text-align: center;
			margin: 40rpx auto;
			background-color: #3E94FF;
			border-radius: 40rpx;
			color: #fff;
			font-size: 34rpx;;
		}
		.zhmm{
			display: flex;
			justify-content: center;
			align-items: center;
			color: #2475FB;
			font-size: 28rpx;
		}
}
</style>