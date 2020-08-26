<template>
<view class="manual">
		<view class="h1">
			输入信息
		</view>
		<view class="input_text">
			<text class="text">姓名</text>
			<input type="text" v-model="holderName"  placeholder-class="input-placeholder" placeholder="请输入姓名"/>
		</view>
		<view class="input_text">
			<text class="text">信用卡号</text>
			<input type="text" v-model="accountNumber"  placeholder-class="input-placeholder" placeholder="请输入信用卡号"/>
		</view>
		<view class="input_text">
			<text class="text">预还款金额</text>
			<input type="text" v-model="pre_money"  placeholder-class="input-placeholder" placeholder="请输入预还款金额"/>
		</view>
		<view class="input_text">
			<text class="text">预还款笔数</text>
			<input type="text" v-model="day_num"  placeholder-class="input-placeholder" placeholder="请输入预还款笔数"/>
		</view>
		<view class="bottom_text">
			<view style="margin-bottom: 20rpx;">手续费<text style="margin-left: 20rpx; font-size: 30rpx; font-weight: 600;">
			{{Meterrate !== '' ?　Meterrate.procedures_money　:　'0'}}
			</text></view>
			<view style="margin-bottom: 20rpx;">预留金额<text style="margin-left: 20rpx; font-size: 30rpx; font-weight: 600;">{{Meterrate !== '' ?　Meterrate.ensure_money　:　'0'}}</text></view>
			<view>笔数费<text style="margin-left: 20rpx; font-size: 30rpx; font-weight: 600;">{{Meterrate !== '' ?　Meterrate.num_money　:　'0'}}</text></view>
		</view>
		<button class="btn" type="filled" @click="fastRefund">提交</button>
	</view>
</template>
<script>
export default {
   data() {
	  return {
		usertoken: '',
		card_id: '',
		holderName: '',
		accountNumber: '',
		fee: '',
		pre_money: '',
		day_num: '',
		Meterrate: ''
	  }
   },
   onLoad(option) {
	    this.card_id = option.card_id
	   	this.holderName = option.holderName
	   	this.accountNumber = option.accountNumber
	   	this.fee = option.fee / 100
		uni.getStorage({
			key: 'usertoken',
			success: (res) => {
				this.usertoken = res.data
			}
		})
   },
methods:{
	// 计算费率
	async getMeterrate () {
		const { data } = await this.Request({
			method: 'POST',
			url: '/Ttfrepayment/speed_rate',
			data: {
				token: this.usertoken.token,
				card_id: this.card_id,
				day_num: this.day_num,
				pre_money: this.pre_money,
				fee: this.fee
			}
		})
		if (data.status === 1) {
			this.Meterrate  = data.data
		} else {
			uni.showToast({
				title: data.msg,
				icon: 'none'
			})
		}
		
		// console.log(data);
	},
	async fastRefund () {
		const { data } = await this.Request({
			method: 'POST',
			url: '/Ttfrepayment/generate_speed',
			data: {
				card_id: this.card_id,
				day_num: this.day_num,
				pre_money: this.pre_money,
				repayment: this.Meterrate.repayment,
				cur_date: this.Meterrate.cur_date,
				num_money: this.Meterrate.num_money,
				fee: this.Meterrate.fee,
				accountNumber: this.Meterrate.accountNumber,
				procedures_money: this.Meterrate.procedures_money,
				total_money: this.Meterrate.total_money,
				ensure_money: this.Meterrate.ensure_money,
				token: this.usertoken.token
			}
		})
		if (data.status === 1) {
			uni.showToast({
				title: '计划提交成功',
				icon: 'none',
			})
			
		} else if (data.status === 2) {
			uni.showToast({
				title: data.msg,
				duration: 2000,
				icon: 'none'
			})
			setTimeout( ()=> {
				uni.redirectTo({
					url: '../index/index'
				})
			},1500)
		}
		// console.log(data);
	}
	
},
watch: {
   pre_money() {
	   if (this.$data.pre_money <= 500) {
			uni.showToast({
				title: "金额不能小于500",
				icon: "none",
			});
		} else if (this.$data.pre_money >= 500 && this.$data.day_num != '') {
			this.getMeterrate();
		}
		// console.log(123);
   },
   day_num() {
	if (this.$data.pre_money >= 500 && this.$data.day_num != '') {
		this.getMeterrate();
	}

}
   },
   mounted() {
   }
}
</script>
<style lang='scss' scoped>
.manual{
	box-sizing: border-box;
	padding: 50rpx;
	.h1 {
		font-size: 40rpx;
		font-weight: bold;
		padding: 60rpx 0;
	}
	.input_text {
		box-sizing: border-box;
		margin-bottom: 20rpx;
		.text {
			font-size: 30rpx;
			margin-left: 10rpx;
			
		}
		input {
			margin-top: 10rpx;
			border-radius: 40rpx;
			background-color: #E8E8E8 !important;
			padding: 20rpx 15rpx;
			.input-placeholder {
				padding-right: 10rpx;
			}
		}
	}
	.bottom_text {
		font-size: 24rpx;
		margin-left: 10rpx;
		color: rgba(0,0,0,.8);
	}
	.radio_content {
		.day {
			font-size: 36rpx;
			text-align: center;
			margin-top: 60rpx;
			font-weight: 400;
		}
		.radio-group {
				margin-top: 30rpx;
				.radio{
					display: flex;
					justify-content: space-around;
					/deep/ .uni-radio-input-checked {
						background-color: #15BE73 !important;
						border: none;
						
						&::before{
								content: "";
								color: #fff; 
						}
					}
				}
				.radio_item {
					
					display: flex;
					/deep/.uni-radio-input {
						width: 60rpx !important;
						height: 60rpx !important;
					}
					.radio_text {
						margin-right: 20rpx;
					}
				}
			}
	}
	.btn {
		width: 90%;
		line-height: 80rpx;
		background: linear-gradient(to right, #04BEFE,#005BEA);
		margin:  50rpx auto;
		border-radius: 40rpx;
		text-align: center;
		color: #fff;
	}
}
</style>
