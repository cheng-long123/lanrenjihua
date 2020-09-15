<template>
	<view class="shuokuan">
		<view class="user_info">
			<text>输入信息</text>
			<text style="font-size: 28rpx; color: #4481EB;" @click="toAddPassCard">添加信用卡</text>
		</view>
		<view class="form">
			<view class="user_input">
				 <text class="user_text" style="font-size: 32rpx;">姓名</text>
				<input type="text" v-model="form.bank_name" placeholder="姓名"/>
			</view>
			<view class="user_input">
				 <text class="user_text">身份证</text>
				<input type="text" v-model="form.identity" placeholder="身份证号"/>
			</view>
			<view class="user_card">
				 <text class="user_text" style="font-size: 28rpx; margin-bottom: 15rpx;">信用卡号</text>
				<picker class="picker" :range="choosezfkh"  :value="index"  @change="getCradList" @click="getXingList">
					<view>{{choosezfkh[index]}}</view>
				</picker>
				<!-- <view class="add_card"> -->
					<!-- +添加信用卡 -->
				<!-- </view> -->
			</view>
			<view class="user_input">
				 <text class="user_text">收款金额</text>
				<input type="text" v-model="money" placeholder="收款金额"/>
			</view>
			<view class="user_input">
				 <text class="user_text">结算卡号</text>
				<input type="text" v-model="form.bank_card" placeholder="信用卡签约号"/>
			</view>
		<!-- 	<view class="user_input">
				 <text class="user_text">信用卡签约号</text>
				<input type="text" v-model="bind_code" placeholder="信用卡签约号"/>
			</view> -->
			<!-- <view class="user_input">
				 <text class="user_text">支付账号</text>
				<input type="text" v-model="form.chuan_paynum" placeholder="支付账号"/>
			</view> -->
			<view class="register-verify">
				<input type="text" v-model="form.code" placeholder="请输入短信验证码" />
				<view class="verify-btn" v-if="!isShowCode" @click="getCode">
					获取验证码
				</view>
				<view class="verify-btn" v-else style="color: #808080;">
					重发{{ time }}s
				</view>
			</view>
		</view>
		<button class="btn" @click="confastPayment">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// usertoken: '',
				// form: {
				// 	bank_name: '', // 姓名
				// 	identity: '', //身份证号
				// 	bind_code: '', //信用卡签约号
				// 	chuan_paynum: '', //支付卡号
				// 	address: '', //城市
				// 	money: '' ,//金额
				// },
				bind_code: '',
				money: '',
				fee: 0.006, // 费率
				excess_money: 2, //笔数费
				code: '',
				choosezfkh: ['请选择信用卡'],
				index: 0,
				isShowCode: false,
				time: 60,
				order: ''
			}
		},
		props:{
			form: {
				type: Object
			},
			usertoken: {
				type: Object
			}
		},
		onLoad() {
			// uni.getStorage({
			// 	key: 'usertoken',
			// 	success: (res) => {
			// 		this.usertoken = res.data
			// 		this.getUserInfo()
			// 		this.getXingList()
			// 	}
			// })
			this.choosezfkh = ['银行卡号']
		},
		methods: {
			toAddPassCard () {
				uni.navigateTo({
					url: 'addPassCard'
				})
			},
			// 获取用户信息
			// async getUserInfo () {
			// 	// console.log(this.usertoken);
			// 	const { data } = await this.Request({
			// 		method: 'GET',
			// 		url: '/Userforeign/user_query',
			// 		data: {
			// 			token: this.usertoken.token,
			// 			cre_id: this.usertoken.cre_id
			// 		}
			// 	})
			// 	if (data.status === 1) {
			// 		console.log(data);
			// 		// this.form.bank_name = data.data.bank_name
			// 		// this.form.identity = data.data.identity
			// 		// this.form.chuan_paynum = data.data.chuan_paynum
			// 		// // this.form.address = data.data.address
			// 		// this.form.bank_card = data.data.bank_card
			// 	} else if (data.status === 4) {
			// 		this.baseLogout()
			// 	}
			// 	// console.log(data);
			// },
			getCradList (e) {
				// console.log(e);
				this.index = e.target.value
			}, //获取支付卡号
			async getXingList () {
				this.choosezfkh = []
				const { data } = await this.Request({
					method: 'POST',
					url: '/Creditcard/card_list',
					data: {
						cre_id: this.usertoken.cre_id,
						token: this.usertoken.token
					}
				})
				console.log(data)
				for (var i = 0; i < data.data.length; i++) {
					if (data.data[i].bind_code === null) {
						// this.choosezfkh.push(data.data[i].accountNumber)
						if (this.choosezfkh.length === 0) {
							this.choosezfkh = ['请选择支付卡号']
							uni.showToast({
								title: "暂无可选择信用卡",
								icon: "none",
							});
						}
					} else {
						this.choosezfkh.push(data.data[i].accountNumber)
						this.bind_code = data.data[i].bind_code
					}
				}
				// console.log(data);
				// console.log(this.choosezfkh);
			},
			async getCode () {
				if (this.choosezfkh[0] === '银行卡号') {
					return uni.showToast({
						title: '请选择银行卡号',
						icon: 'none'
					})
				}
				const { data } = await this.Request({
					method: 'POST',
					url: '/Chuanhuaapp/tquickpay_do',
					data: {
						number: this.usertoken.number,
						holder_name: this.form.bank_name,
						idCard: this.form.identity,
						accountNumber: this.choosezfkh[this.index],
						bind_code: this.bind_code,
						account_number: this.form.chuan_paynum,
						money: this.money,
						fee: this.fee,
						excess_money: this.excess_money,
					}
				})
				if (data.status == 1) {
					this.order = data.order
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
				} else if (data.status == 2) {
					uni.showToast({
						title: '获取验证码失败',
						icon: 'none'
					})
				}
			},
			async confastPayment () {
				if (this.code === '') {
					return uni.showToast({
						title: '验证码不能为空',
						icon: 'none'
					})
				}
				const { data } = await this.Request({
					method: 'POST',
					url: '/Chuanhuaapp/payconfirm',
					data: {
						code: this.code,
						order: this.order
					}
				})
				if (data.status == 1) {
					uni.showToast({
						title: '收款成功',
						icon:'none'
					})
				} else if (data.status == 2) {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
.shuokuan {
	box-sizing: border-box;
	padding: 50rpx;
	/* background-color: #fff; */
	.user_info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 0;
		font-size: 40rpx;
		font-weight: 600;
	}
	.user_input {
		padding: 40rpx 0 0 0;
		/* border-bottom: 1rpx solid rgba(22,160,133,.3); */
		display: flex;
		flex-direction: column;
		justify-content: space;
		align-items: space;
		.user_text{
			font-size: 28rpx;
			margin-bottom: 15rpx;
		}
		input {
			font-size: 28rpx;
			color: rgba(0,0,0,.7);
			border-radius: 40rpx;
			background-color: #E8E8E8 !important;
			padding: 20rpx 15rpx;
		}
	}
	.user_card {
		display: flex;
		flex-direction: column;
		justify-content: space;
		align-items: space;
		justify-content: space-between;
		height: 30rpx;
		padding: 60rpx 0;
		margin-bottom: 40rpx;
		/* border-bottom: 1rpx solid rgba(22,160,133,.3); */
		.picker {
			/* height: 90rpx; */
			border-radius: 40rpx;
			width: 100%;
			background-color: #E8E8E8 !important;
			color: rgba(0,0,0,.7);
			padding: 20rpx 0rpx 20rpx 5rpx;
			font-size: 28rpx;
			
		}
		.add_card {
			width: 160rpx;
			height: 60rpx;
			line-height: 57rpx;
			text-align: center;
			border-radius: 40rpx;
			background:linear-gradient(to left,#15BE73, #08BD9E, #16A085);
			font-size: 20rpx;
			color: #fff;
		}
	}
	.btn {
		width: 590rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background: linear-gradient(to right, #04BEFE, #005BEA);
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		font-size: 32rpx;
		margin: 0 auto;
		margin-top: 60rpx;
	}
	
}
.register-verify {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 60rpx 10rpx 0 10rpx;
	input {
		font-size: 28rpx;
		padding: 20rpx 15rpx;
		background-color: #E8E8E8 !important;
		border-radius: 40rpx;
		color: rgba(0,0,0,.7);
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
		color: #4481EB;
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
</style>