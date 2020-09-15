<template>
    <view id="register">
		<view class="register-box">
			<view class="register-form1">
				<text class="text">姓名:</text>
				<input type="text" v-model="holder_name" disabled placeholder="请输入姓名" />
			</view>
			<view class="register-form1">
				<text class="text">身份证号:</text>
				<input type="text" v-model="idCard"  disabled placeholder="身份证号" />
			</view>
			<view class="register-form1">
				<text class="text">注册手机号:</text>
				<input type="text" v-model="phone" disabled placeholder="注册手机号" />
			</view>	
			<view class="register-form">
				<input type="text" v-model="bank_phone" placeholder="绑卡手机号" />
			</view>
			<view class="register-form">
				<input type="text" v-model="bank_card" placeholder="银行卡号" />
			</view>
			<view class="register-form">
				<input type="text" v-model="idCard_end" placeholder="身份证截止日期 例:2020-09-15" />
			</view>
			<wyb-button class="register-btn" width="90%" type="plain" :ripple="true" :radius="['20px']" @click="register">注册</wyb-button>
			<!-- <button class="register-btn" type="default" @click="register">
				注册
			</button> -->
		</view>
    </view>
</template>
<script>
	import {　checkMobile,checkPassword　} from '../../utils/index.js'
export default {
   data() {
      return {
		 usertoken: '',
		 holder_name: '',//姓名
		 idCard: '', //身份证号
		 phone: '', //手机号
		 bank_phone: '',// 绑卡手机号
		 bank_card: '', // 银行卡号
		 idCard_end: '', //身份证截止日期
		 code: '', //短信验证码
		 isShowCode: '',
		 time: 60
      }
   },
   onLoad() {
		uni.getStorage({
			key: 'usertoken',
			success: (res) => {
				this.usertoken = res.data
				this.getuserInfo()
			}
		})
   },
methods:{
	async getuserInfo () {
		const { data } = await this.Request({
			method: 'GET',
			url: '/Userforeign/user_query',
			data: {
				token: this.usertoken.token,
				cre_id: this.usertoken.cre_id
			}
		})
		if (data.status == 1) {
			this.holder_name = data.data.bank_name
			this.phone = data.data.bank_phone
			this.idCard = data.data.identity
		}
	},
	async register () {
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
			method: 'POST',
			url: '/Chuanhuaapp/register_do',
			data: {
				holder_name: this.holder_name,
				idCard: this.idCard,
				phone: this.phone,
				bank_phone: this.bank_phone,
				bank_card: this.bank_card,
				idCard_end: this.idCard_end
			}
		})
		if (data.status === 1) {
			this.registerSubmit()
		} else {
			uni.showToast({
				title: data.msg,
				duration: 2000,
				icon: 'none'
			})
		}
	},
	async registerSubmit () {
		const { data } = await this.Request({
			method: 'POST',
			url: '/Chuanhuaapp/checkuser',
			data: {
				cre_id: this.usertoken.cre_id
			}
		})
		if (data.status == 1) {
			uni.showToast({
				title: '注册成功',
				icon: 'none'
			})
			setTimeout( () => {
				uni.navigateBack({
				})
			},1500)
		} else {
			uni.showToast({
				title: data.msg,
				icon: 'none'
			})
		}
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
			.register-form1 {
					display: flex;
					justify-content: space;
					align-items: center;
					width: 100%;
					height: 50rpx;
					padding: 60rpx 40rpx 0 40rpx;
					margin-bottom: 10rpx;
					.text{
						font-size: 28rpx;
						margin-right: 20rpx;
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