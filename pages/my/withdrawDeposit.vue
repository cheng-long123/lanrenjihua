<template>
	<view class="tixian">
		<view class="card">
			<view class="card_top">
			<view class="card_name">银行卡号</view>
			<view class="card_num">{{userInfo.bank_card}}</view>
			</view>
			<view class="card_bottom">￥{{userInfo.balance}}</view>
		</view>
		<view class="head">
			提现金额
		</view>
		<view class="input">
			<view style="font-size: 60rpx;margin-right: 150rpx; ">￥</view>
			<input type="text" v-model="money" placeholder="请输入要提现的金额" />
		</view>
		<button class="btn" type="filled" @click="fetchMoney">立即提现</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '',
				usertoken: '',
				userInfo: '',
				nowHours: ''
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getUserInfo()
				}
			})
			this.getNowTime()
		},
		methods: {
			async getUserInfo() {
				const { data } = await this.Request({
					method: 'GET',
					url: '/Userforeign/user_query',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id
					}
				})
				console.log(data);
				if (data.status === 1) {
					this.userInfo = data.data
				} else if (ata.status === 4) {
					this.baseLogout()
				}
			},
			getNowTime () {
				let myDate = new Date();
				let hour = myDate.getHours()
				this.nowHours = hour
			},
			async fetchMoney () {
				if (this.money == '') {
					return uni.showToast({
						title: '金额不能为空',
						icon: 'none'
					})
				} else if (this.money < 100) {
					return uni.showToast({
						title: '提现金额不能少于100',
						icon: 'none'
					})
				} else if (this.nowHours < 7 || this.nowHours >= 21) {
					uni.showToast({
						title: '当前不在可提现时间内',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					mask: true
				})
				const { data } = await this.Request({
					method: 'POST',
					url: '/Cashout/exchange',
					data: {
						amount: this.money,
						cre_id: this.usertoken.cre_id,
						number: this.usertoken.number,
						accountNumber: this.userInfo.bank_card,
						holderName: this.userInfo.bank_name
					}
				})
				if ( data.status === 1 ) {
					uni.hideLoding()
					uni.showToast({
						title: data.msg,
						duration: 2000,
						icon: 'none'
					})
					setTimeout( () => {
						uni.switchTab({
							url: './index'
						})
					},1500)
				} else {
					uni.hideLoding()
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

<style lang="scss" scoped>
.tixian {
	.card{
		width: 90%;
		height: 224rpx;
		margin: 40rpx auto;
		background: url(../../static/image/card-bg.png) no-repeat;
		// background-size: 200%;
		background-position: -228rpx -190rpx;
		border-radius: 40rpx;
		text-align: center;
		color: #fff;
		.card_top{
			margin-bottom: 40rpx;
			padding-top: 30rpx;
			.card_name {
				font-size: 28rpx;
			}
			.card_num {
				font-size: 24rpx;
			}
		}
		.card_bottom {
			font-size: 50rpx;
		}
		
	}
	.head {
		padding: 0 40rpx;
	}
	.input {
		
		margin-top: 80rpx;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		// justify-content: center;
		border-bottom: 1rpx solid rgba(0,0,0,.1);
	}
	.btn {
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		margin: 60rpx auto;
		color: #fff;
		border-radius: 40rpx;
		background: linear-gradient(to right, #04BEFE,#005BEA);
	}
}
</style>
