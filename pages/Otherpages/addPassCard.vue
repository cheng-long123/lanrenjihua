<template>
	<view class="creditcard">
		<view class="user_info">
			输入信息
		</view>
		<view class="form">
			<view class="user_input">
				 <text class="user_text" style="font-size: 32rpx;">姓名</text>
				<input type="text" v-model="form.username" placeholder="姓名"/>
			</view>
			<view class="user_input">
				 <text class="user_text">身份证</text>
				<input type="text" v-model="form.identity" placeholder="身份证号"/>
			</view>
			<view class="user_input">
				 <text class="user_text">信用卡号</text>
				<input type="text" v-model="form.cardNumber" placeholder="信用卡号"/>
			</view>
			<view class="user_card" @click="getBankName">
				 <text class="user_text" style="font-size: 28rpx; margin-bottom: 15rpx;">银行名称</text>
				<picker class="picker" :range="bank_list"  :value="index"  @change="bankCardChang" >
					<view>{{bank_list[index] }}</view>
				</picker>
				<!-- <view class="add_card">
					+添加信用卡
				</view> -->
			</view>
			<view class="user_input">
				 <text class="user_text">预留手机号</text>
				<input type="text" v-model="form.bank_phone" placeholder="预留手机号"/>
			</view>
			<view class="user_input">
				 <text class="user_text">cvv</text>
				<input type="text" v-model="form.cvv" placeholder="卡背面末3位"/>
			</view>
			<view class="user_input">
				 <text class="user_text">城市</text>
				<input type="text" v-model="form.address" placeholder="城市"/>
			</view>
			<view class="user_input">
				 <text class="user_text">账单日</text>
				<input type="text" v-model="form.bill_day" placeholder="示例:21"/>
			</view>
			<view class="user_input">
				 <text class="user_text">还款日</text>
				<input type="text" v-model="form.repayment" placeholder="示例:05"/>
			</view>
			<view class="user_input">
				 <text class="user_text">信用额度</text>
				<input type="text" v-model="form.quota" placeholder="信用额度"/>
			</view>
			<view class="user_input">
				 <text class="user_text">有效期</text>
				<input type="text" v-model="form.expired" placeholder="示例:0524"/>
			</view>
			<view class="register-verify">
				<input type="text" v-model="code" placeholder="请输入短信验证码" />
				<view class="verify-btn" v-if="!isShowCode" @click="getCode">
					获取验证码
				</view>
				<view class="verify-btn" v-else style="color: #808080;">
					重发{{ time }}s
				</view>
			</view>
		</view>
		<button class="btn"  type="filled" @click="confirmSubmit">提交绑定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bank_cardname: '请选择银行名称',
				index: 0,
				usertoken: '',
				form: {
					username: '',
					identity: '',
					bank_phone: '',
					bank_card: '',
					address: '',
					money: '',
					cardNumber: '',
					cvv: '',
					bill_day: '',
					repayment: '',
					quota: '',
					expired: '',
				},
				code: '',
				isShowCode: false,
				time: 60,
				bank_list: ['请选择银行名称'],
				bank_codeList: [],
				// imei: '',
				card_msg: '',
				bank_name: '',
				order: '',
				tf_token: ''
			}
		},
		onLoad(option) {
			// this.$data.form.bill_day = option.bill_day
			// this.$data.form.cardNumber = option.accountNumber
			// this.$data.form.repayment = option.repayment
			// this.$data.form.expired = option.expired
			// this.$data.form.cvv = option.cvv2
			// this.$data.form.quota = option.quota
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getUserInfo()
					// this.getBankName()
				},
			})
			// this.bank_list = ['请选择银行名称']
			
			// var a = JSON.parse(decodeURIComponent(option))
			// console.log(a);
			// console.log(option.bank_name)
			
			
			// if (option.bank_name !== undefined) {
			// 	this.bank_list[0] = option.bank_name
			// 	this.cardname = option.bank_name
			// } else {
			// 	this.bank_list[0] = '请选择银行名称'
			// }
			
		},
		onShow() {
			
		},
		methods: {
			// 获取用户信息
			async getUserInfo () {
				const { data } = await this.Request({
					method: 'GET',
					url: '/Userforeign/user_query',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id
					}
				})
				// console.log(data)
				if (data.status === 1) {
					this.form.username = data.data.bank_name
					this.form.identity = data.data.identity
					this.form.bank_phone = data.data.bank_phone
					this.form.address = data.data.address
					this.form.chuan_id = data.data.chuan_id
					// this.form.bank_card = data.data.bank_card
				} else if (data.status === 4) {
					this.baseLogout()
				}
				// console.log(data);
			},// 获取银行卡名称
			async getBankName () {
				this.bank_list = []
				this.bank_cardname = ''
				const { data } = await this.Request({
					method: 'GET',
					url: '/Creditcard/bank_name',
					data: {
						token: this.usertoken.token
					}
				})
				// console.log(data)
				for (var i = 1; i< data.data.length; i++) {
					this.bank_list.push(data.data[i].bannk_name)
					this.bank_codeList.push(data.data[i].bannk_code)
				}
				// console.log(this.bank_codeList);
			},
			bankCardChang (e) {
			
				this.index = e.target.value
				this.bank_name = this.bank_list[e.target.value]
				this.bannk_code = this.bank_codeList[e.target.value]
				// this.bank_list.shift()
				// console.log(this.bannk_code)
				// console.log(this.bank_name)
			}, //提交绑卡
			async  getCode () {
				// console.log(this.bank)
				if (this.form.chuan_id === null && this.form.chuan_paynum == null) {
					return uni.showModal({
					 title: '提示',
					 content: '您还没有注册，是否注册',
					 success:  (res) => {
						  if (res.confirm) {
							  uni.navigateTo({
								url: '../register/chuanRegister'
							  })
							  // console.log('用户点击确定');
						  } else if (res.cancel) {
							  // console.log('用户点击取消');
						  }
					 }
					});
				}else if (this.form.cardNumber === '') {
					return uni.showToast({title: '信用卡号不能为空',icon: 'none'})
				} else if (this.form.cvv === '') {
					return uni.showToast({title: 'cvv不能为空',icon: 'none'})
				} else if (this.form.quota === '') {
					return uni.showToast({title: '信用额度不能为空',icon: 'none'})
				}
				if (this.form.bill_day % 1 == 0 && this.form.bill_day <= 31 && this.form.bill_day >= 1 && this.form.repayment % 1 ==
					0 && this.form.repayment <= 31 && this.form.repayment >= 1) {
						uni.showLoading({
							mask: true
						})
					const { data } = await this.Request({
						method: 'POST',
						url:　'/Chuanhuaapp/bindcard_do',
						data: {
							token: this.usertoken.token,
							cre_id: this.usertoken.cre_id,
							user_id: this.form.chuan_id,
							holder_name: this.form.username,
							idCard: this.form.identity,
							accountNumber: this.form.cardNumber,
							phone: this.form.bank_phone,
							city: this.form.address,
							bank_code: this.bannk_code,
							cvv: this.form.cvv,
							expired: this.form.expired,
							quota: this.form.quota,
							bill_day: this.form.bill_day,
							repayment: this.form.repayment,
						}
					})
					if (data.status === 1) {
						uni.hideLoading()
						this.order = data.order
						this.tf_token = data.tf_token
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
						// console.log(data)
					} else if (data.status === 2) {
						uni.hideLoading()
						uni.showToast({
							title: data.msg,
							icon: 'none'
						})
					} else {
					
					setTimeout( () => {
						uni.hideLoading()
						uni.showToast({
							title: '获取验证码失败',
							icon: 'none'
						})
					},15000)
					
					}
				} else {
					uni.hideLoading()
					uni.showToast({
						title: '请输入正确的账单日或还款日',
						duration: 2000,
						icon: "none",
					});
				} 
				
			},
			async confirmSubmit () {
				if (this.code === '') {
					return 	uni.showToast({
						title: '验证码不能为空',
						duration: 2000,
						icon: "none",
					});
				}
				const { data } = await this.Request({
					method: 'POST',
					url: '/Chuanhuaapp/bindCardConfirm',
					data: {
						code: this.code,
						user_id: this.form.chuan_id,
						tf_token: this.tf_token,
						order: this.order
					}
				})
				// console.log(data)
				if (data.status == 1) {
					uni.showToast({
						title: '绑卡成功',
						duration: 2000,
						icon: "none",
					});
					uni.navigateTo({
						url: '../index/index'
					})
				} else {
					uni.showToast({
						title: '绑卡失败',
						duration: 2000,
						icon: "none",
					});
				}
			}
		}
		
	}
</script>

<style lang='scss' scoped>
.creditcard {
	box-sizing: border-box;
	padding: 50rpx;
	.user_info {
		margin: 30rpx 0;
		font-size: 40rpx;
		font-weight: 600;
	}
	.user_input {
		padding: 40rpx 0 0 0;
		border-bottom: 1rpx solid rgba(68,129,235,.3);
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
		border-bottom: 1rpx solid rgba(68,129,235,.3);
		.picker {
			/* height: 90rpx; */
			width: 100%;
			color: rgba(0,0,0,.7);
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
		border-radius: 40rpx;
		background: linear-gradient(to left, #04BEFE, #005BEA);
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		font-size: 32rpx;
		margin: 0 auto;
		margin-top: 60rpx;
	}
	.register-verify {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:  40rpx 0;
		input {
			font-size: 28rpx;
			border-bottom: 1rpx solid rgba(68,129,235,.3);
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
}
</style>
