<template>
	<view class="changemm">
		<view class="form">
			<view class="password">
				<text class="text">旧密码</text>
				<input type="password" v-model="old_pass" placeholder="请输入旧密码"/>
			</view>
			<view class="password">
				<text class="text">新密码</text>
				<input type="password" v-model="newpass"  placeholder="请输入新密码"/>
			</view>
			<view class="password">
				<text class="text">重复新密码</text>
				<input type="password" v-model="renewpass"  placeholder="请输入重复新密码"/>
			</view>
		</view>
		<wyb-button class="btn" width="90%" type="filled" :ripple="true" :radius="['20px']" @click="updatePsd">确认修改</wyb-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usertoken: {},
				old_pass: '',
				newpass: '',
				renewpass: ''
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
				}
			})
		},
		methods: {
			async updatePsd () {
				const { data } = await this.Request({
					methods: 'POST',
					url: '/Change/password',
					data: {
						cre_id: this.usertoken.cre_id,
						old_pass: this.old_pass,
						pass: this.newpass,
						repass: this.renewpass,
						token: this.usertoken.token
					}
				})
				if (data.status === 1) {
					uni.showToast({
						title: '修改密码成功',
						duration: 2000,
						icon: 'none'
					})
					uni.reLaunch({
						url: '../login/index'
					})
					setTimeout( () => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500) 
				} else if (data.status === 2) {
					uni.showToast({
						title: data.msg,
						duration: 2000,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
.changemm {
	.form{
		.password {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: space;
			padding: 30rpx 40rpx;
			.text {
				font-size: 32rpx;
			}
			input {
				border-bottom: 1rpx solid rgba(141,141,141,.5);
				font-size: 28rpx;
				margin-top: 20rpx;
			}
		}
	
   }
   .btn {
   	margin: 0 auto;
   	margin-top: 80rpx;
   }
}
</style>
