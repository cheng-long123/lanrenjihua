<template>
	<view class="shuokuan">
		<view class="user_info">
			输入信息
		</view>
		<view class="form">
			<view class="user_input">
				<input type="text" v-model="form.bank_name" placeholder="姓名"/>
			</view>
			<view class="user_input">
				<input type="text" v-model="form.identity" placeholder="身份证号"/>
			</view>
			<view class="user_card" >
				<picker class="picker" :range="choosezfkh"  :value="index"  @change="getCradList" @click="getXingList">
					<view>{{choosezfkh[index]}}</view>
				</picker>
				<view class="add_card">
					+添加信用卡
				</view>
			</view>
			<view class="user_input">
				<input type="text" v-model="form.bank_phone" placeholder="预留手机号"/>
			</view>
			<view class="user_input">
				<input type="text" v-model="form.money" placeholder="收款金额"/>
			</view>
			<view class="user_input">
				<input type="text" v-model="form.bank_card" placeholder="结算卡号"/>
			</view>
			<view class="user_input">
				<input type="text" v-model="form.address" placeholder="落款城市"/>
			</view>
		</view>
		<view class="btn" @click="confirmSubmit">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choosezfkh: ['支付卡号'],
				index: 0,
				usertoken: '',
				form: {
					bank_name: '',
					identity: '',
					bank_phone: '',
					bank_card: '',
					address: '',
					money: ''
				}
			}
		},
		methods: {
			// 获取卡号？？
			getCradList (e) {
				console.log(e);
				this.index = e.target.value
			}, //获取支付卡号
			async getXingList () {
				this.choosezfkh = []
				const { data } = await this.Request({
					methods: 'POST',
					url: '/Creditcard/card_list',
					data: {
						cre_id: this.usertoken.cre_id,
						token: this.usertoken.token
					}
				})
				for (var i = 0; i < data.data.length; i++) {
					if (data.data[i].df === 1) {
						this.choosezfkh.push(data.data[i].accountNumber)
						if (this.choosezfkh.length === 0) {
							this.choosezfkh = ['请选择支付卡号']
							uni.showToast({
								title: "暂无可选择信用卡",
								icon: "none",
							});
						}
					}
				}
				console.log(data);
				console.log(this.choosezfkh);
			},
			// 获取用户信息
			async getUserInfo () {
				const { data } = await this.Request({
					methods: 'GET',
					url: '/Userforeign/user_query',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id
					}
				})
				if (data.status === 1) {
					this.form.bank_name = data.data.bank_name
					this.form.identity = data.data.identity
					this.form.bank_phone = data.data.bank_phone
					this.form.address = data.data.address
					this.form.bank_card = data.data.bank_card
				} else if (data.status === 4) {
					this.baseLogout()
				}
				console.log(data);
			},//商户收款
			async confirmSubmit () {
				if (this.choosezfkh[0] == '支付卡号') {
					return uni.showToast({
						title: '请选择支付卡号',
						icon: 'none'
					})
				}
				if (this.form.money === '') {
					return uni.showToast({
						title: '请输入金额',
						icon: 'none'
					})
				}
				uni.showLoading({
					mask: true
				})
				const {data} = await this.Request({
					methods: 'POST',
					url: '/Samecard/card_tm',
					data: {
						holderName: this.form.bank_name,
						idCard: this.form.identity,
						number: this.usertoken.number,
						accountNumber: this.choosezfkh[this.index],
						settlement: this.form.bank_card,
						money: this.form.money,
						token: this.usertoken.token,
					}
				})
				if (data.status === 1) {
					uni.hideLoading()
					uni.showToast({
						title: '收款成功',
						icon: 'none'
					})
				} else if (data.status === 2) {
					uni.hideLoading()
					uni.showToast({
						title: '提交失败',
						icon: 'none'
					})
					setTimeout( () => {
						uni.switchTab({
							url: '../index/index'
						})
					},1500)
				} else {
					uni.hideLoading()
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
				}
				console.log(data);
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getUserInfo()
					this.getXingList()
					// console.log(res);
				},
				
			})
			this.choosezfkh = ['支付卡号']
		}
	}
</script>

<style lang='scss' scoped>
.shuokuan {
	box-sizing: border-box;
	padding: 50rpx;
	.user_info {
		margin: 40rpx 0;
		font-size: 32rpx;
	}
	.user_input {
		padding: 37rpx 0;
		border-bottom: 1rpx solid rgba(22,160,133,.5);
		input {
			font-size: 20rpx;
		}
	}
	.user_card {
		display: flex;
		justify-content: space-between;
		
		height: 30rpx;
		padding: 50rpx 0;
		
		.picker {
			height: 50rpx;
			width: 395rpx;
			border-bottom: 1rpx solid rgba(22,160,133,.5);
			font-size: 20rpx;
		}
		.add_card {
			width: 148rpx;
			height: 57rpx;
			line-height: 57rpx;
			text-align: center;
			border-radius: 40rpx;
			background-color: #209CFF;
			font-size: 20rpx;
			color: #fff;
		}
	}
	.btn {
		width: 590rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background: linear-gradient(left, #15BE73, #08BD9E, #16A085);
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		font-size: 32rpx;
		margin: 0 auto;
		margin-top: 60rpx;
	}
}
</style>
