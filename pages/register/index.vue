<template>
    <view id="register">
		<view class="register-box">
			<view class="register-form">
				<input type="text" v-model="phone" placeholder="请输入手机号" />
			</view>
			<view class="register-form">
				<input type="password" v-model="phone" placeholder="请输入密码" />
			</view>
			<view class="register-form">
				<input type="password" v-model="phone" placeholder="请输入确认密码" />
			</view>
			<view class="register-form">
				<input type="text" v-model="phone" placeholder="请输入推荐人手机号" />
			</view>
			<view class="register-verify">
				<input type="text" v-model="phone" placeholder="请输入短信验证码" />
				<view class="verify-btn">
					发送验证码
				</view>
			</view>
			<view class="register-btn">
				注册
			</view>
		</view>
    </view>
</template>
<script>
export default {
   data() {
      return {

      }
   },
methods:{

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
		.register-form {
				width: 100%;
				height: 50rpx;
				padding: 40rpx 10rpx;
				border-bottom: 1rpx solid rgba(233,234,237,1);
				input {
					padding: 0 20rpx;
					width: 100%;
					height: 50rpx;
					font-size: 28rpx;
					
				}
			}
			.register-verify {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 40rpx 10rpx;
				input {
					font-size: 28rpx;
					padding: 0rpx 20rpx 30rpx 20rpx;
					border-bottom: 1rpx solid rgba(233,234,237,1);
				}
				.verify-btn {
					/* width: 200rpx; */
					padding: 10rpx;
					height: 40rpx;
					line-height: 40rpx;
					border-radius: 40rpx;
					font-size: 28rpx;
					border: 1rpx solid #E9EAED;
				}
			}
		}
		.register-btn {
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background-color: #3E94FF;
			border-radius: 40rpx;
			color: #fff;
			font-size: 34rpx;;
		}
}
</style>