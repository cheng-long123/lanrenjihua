<template>
	<view class="creditcard">
		<view class="user_info">
			输入信息
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
			<view class="user_input">
				 <text class="user_text">信用卡号</text>
				<input type="text" v-model="form.cardNumber" placeholder="银行卡号"/>
			</view>
			<view class="user_card">
				 <text class="user_text" style="font-size: 28rpx; margin-bottom: 15rpx;">银行名称</text>
				<picker class="picker" :range="bank_list"  :value="index"  @change="bankCardChang" >
					<view>{{bank_list[index]}}</view>
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
				 <text class="user_text">落款城市</text>
				<input type="text" v-model="form.address" placeholder="落款城市"/>
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
		</view>
		<view class="btn" @click="confirmSubmit">提交绑定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bank_cardname: ['请选择银行名称'],
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
				bank_list: ['请选择银行名称']
			}
		},
		onLoad(option) {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getUserInfo()
					this.getBankName()
				},
			})
			this.bank_list = ['请选择银行名称']
			console.log(option);
		},
		onShow() {
			
		},
		methods: {
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
					this.form.username = data.data.bank_name
					this.form.identity = data.data.identity
					this.form.bank_phone = data.data.bank_phone
					this.form.address = data.data.address
					// this.form.bank_card = data.data.bank_card
				} else if (data.status === 4) {
					this.baseLogout()
				}
				console.log(data);
			},// 获取银行卡名称
			async getBankName () {
				const { data } = await this.Request({
					methods: 'GET',
					url: '/Creditcard/bank_name',
					data: {
						token: this.usertoken.token
					}
				})
				for (var i = 0; i< data.data.length; i++) {
					this.bank_list.push(data.data[i].bannk_name)
				}
				// console.log(this.bank_list);
			},
			bankCardChang (e) {
				this.index = e.target.value
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
		border-bottom: 1rpx solid rgba(22,160,133,.3);
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
		border-bottom: 1rpx solid rgba(22,160,133,.3);
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
			background:linear-gradient(left,#15BE73, #08BD9E, #16A085);
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
