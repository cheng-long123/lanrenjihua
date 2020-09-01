<template>
    <view id="autorefund">
		<view class="h1">
			输入信息
		</view>
		<view class="input_text">
			<text class="text">姓名</text>
			<input type="text" v-model="holderName"  placeholder-class="input-placeholder" placeholder="请输入姓名"/>
		</view>
		<view class="input_text">
			<text class="text">预还款金额</text>
			<input type="text" v-model="pre_money"  placeholder-class="input-placeholder" placeholder="请输入预还款金额"/>
		</view>
		<view class="input_text">
			<text class="text">信用卡号</text>
			<input type="text" v-model="accountNumber"  placeholder-class="input-placeholder" placeholder="请输入信用卡号"/>
		</view>
		<view class="bottom_text">
			<view style="margin-right: 20rpx;">信用卡预留本金 &nbsp;
			<text style="margin-left: 20rpx; font-size: 30rpx; font-weight: bold;">{{ calculate !== '' ? calculate.last_money : '0'}}元</text></view>
			<view>手续费&nbsp; <text style="margin-left: 20rpx; font-size: 30rpx; font-weight: bold;">
			{{ calculate !== '' ? calculate.show_fee_money : '0'}}元</text></view>
		</view>
		<view class="calendar">
			    <uni-calendar 
				:date="time"
				:startDate="time"
				:endDate="info.endDate"
			    ref="calendar"
				:description="info.description"
				:lunar="info.lunar"
			    :insert="info.insert"
				:range="info.range"
				:selected="info.selected"
			    @confirm="confirm"
				@change="change"
			     />
			<view v-if="range === ''" class="open_btn" @click="open">选择时间</view>
			<view  v-else class="date" @click="open">{{range.before}}至{{range.after}}</view>
		</view>
		<view class="radio_content">
			<view class="day">
				日还款笔数
			</view>
			<radio-group class="radio-group" @change="radioChange">
			        <label class="radio" v-for="(item, index) in highestNum" :key="index">
						<view class="radio_item">
							<text class="radio_text">{{item.value}}</text>
							<radio :value="item.value"  :checked="index===current"></radio>
						</view>
					</label>
			 </radio-group>
		</view>
		<button class="auto_btn" :isabled="isdisabled" @click="subnitPlan">
			提交
		</button>
    </view>
</template>
<script>
	import uniCalendar  from '@/components/uni-calendar/uni-calendar.vue'
export default {
   data() {
      return {
		 time: '',
		 usertoken: '',
		 info: {
			date: '', //自定义当前时间,默认今天
			startDate: '',
			endDate: '',
			lunar: true,
			range: true,
			insert: false,
			selected: [],
		},
		 isCalendaar: true,
		 isdisabled: true,
		 range: '',
		 highestNum: [{
		 		value: "1"
		 	}, {
		 		value: "2"
		 	}],
			current: 0,
			card_id: '',
			holderName: '',
			accountNumber: '',
			fee: '',
			pre_money: '',
			day_num: '1',
			timeList: [],
			timeStr: '',
			calculate: '',
			num_money: 0,
			bank_name: '', // 银行卡名称
			quota: '', // 总泽度
			bill_day: '', //账单日
			repayment: '' // 还款日
      }
   },
  onLoad(option) {
   	this.card_id = option.card_id
   	this.holderName = option.holderName
   	this.accountNumber = option.accountNumber
   	this.fee = option.fee / 100
	this.bank_name = option.bank_name
	this.quota = option.quota
	this.bill_day = option.bill_day
	this.repayment = option.repayment
	// console.log(option);
   	uni.getStorage({
   		key: 'usertoken',
   		success: (res) => {
   			this.usertoken = res.data
   		}
   	})
   },
created() {
this.getStartTime()
},
watch: {
	// 预还款金额
	pre_money() {

		if (this.$data.pre_money <= 500) {
			uni.showToast({
				title: "金额不能小于500",
				icon: "none",
			});
		} else if (this.$data.pre_money > 500 && this.range.data != '' && this.day_num != '') {
			this.getCalculate();
		}
	},
	
	// 时间列表
	timeList() {
		if (this.$data.pre_money > 500 && this.range.data != '' && this.day_num != '') {
			this.getCalculate();
		}
	},
	// 日还款数
	day_num() {
		if (this.$data.pre_money > 500 && this.range.data != '' && this.day_num != '') {
			this.getCalculate();
		}
	}
},
methods:{
  open(){
		 this.$refs.calendar.open();
	 },
	 confirm(e) {
		 this.range = e.range
		 // console.log(this.time);
		 // this.timeList = []
			// for (var i = 0; i < this.info.selected.length; i++) {
			// 	this.timeList.push(this.info.selected[i].date)
			// }
			// this.timeStr = this.timeList.toString()
		 // console.log(e);
		 // console.log(this.range.data.length);
		 // console.log(this.range.data.toString());
		 // console.log(e);
		 // console.log(this.timeList);
	 },
	 change (e) {
			// var index = null;
			// for (var i = 0; i < this.info.selected.length; i++) {

			// 	if (this.info.selected[i].date == e.fulldate) {
			// 		index = i;
			// 		break;
			// 	}
			// }

			// if (index != null) {
			// 	this.info.selected.splice(index, 1);
			// } else {
			// 	this.info.selected.push({
			// 		date: e.fulldate,
			// 	})
			// }
	 },
	 radioChange (e) {
	 	for (let i = 0; i < this.highestNum.length; i++) {
	 		if (this.highestNum[i].value === e.target.value) {
	 			this.current = i;
	 			this.day_num = e.target.value
	 			// console.log(this.day_num)
	 			break;
	 		}
	 	}
	 },
	 getStartTime() {
		var myDate = new Date();
		let year = myDate.getFullYear(); //完整的年份
		let month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
		var newMonth = month.toString().padStart(2, '0');
		let date = myDate.getDate() + 1; //获取当前日(1-31)
		this.time = year.toString() + "-" + newMonth.toString() + '-' + date.toString()
	},
	async getCalculate () {
		// console.log(this.range.data.length);
		const { data } = await this.Request({
				method: 'POST',
				url: '/Ttfrepayment/ttf_fee_calculate',
				data: {
					token: this.usertoken.token,
					money: this.pre_money,
					days: this.range.data.length,
					counts: this.day_num || 1,
					fee: this.fee
				}
			})
				if (data.status === 1) {
					this.calculate = data.data
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
				}
		// console.log(data);
	},
	async subnitPlan () {
		// console.log(this.range.data.toString());
		this.isdisabled = false
		if (this.$data.pre_money < 500) {
			uni.showToast({
				title: "预还款金额不能低于500",
				icon: "none",
			});
		} else if (this.$data.day_num < 0 || this.$data.day_num > 3) {
			uni.showToast({
				title: "还款笔数输入有误",
				icon: "none",
			});
			} else {
				const { data } = await this.Request({
					method: 'POST',
					url: '/Ttfrepayment/add_ttf_plan',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id,
						number: this.usertoken.number,
						pre_money: this.pre_money,
						repayment_date: this.range.data.toString(),
						day_num: this.day_num,
						card_id: this.card_id,
						accountNumber: this.accountNumber,
						turnover_money: this.calculate.last_money,
						procedures_money: this.calculate.show_fee_money,
						num_money: this.num_money,
						ensure_money: this.calculate.last_money,
						fee: this.fee,
						passageway: '1',
						total: this.calculate.tatol_money,
						total: this.calculate.tatol_money
					}
				})
				this.isdisabled = true
				if (data.status === 1) {
					uni.showToast({
						title: '计划提交成功',
						icon: 'none'
					})
					var weihao = this.accountNumber.substring(this.accountNumber.length - 4)
					setTimeout( () => {
						uni.redirectTo({
							url: './planDetails?card_id=' + this.card_id + '&weihao=' + weihao +
							'&bannk_name=' + this.bank_name + '&quota=' + this.quota + '&bill_day=' + this.bill_day +
							 '&repayment=' + this.repayment
						})
					},2000)
				} else if (data.status === 2) {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
				}
				// console.log(data);
			}
			
		
	}
},
components: {
	uniCalendar
},
   mounted() {
   }
}
</script>
<style lang='scss' scoped>
#autorefund{
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
		display: flex;
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
			display: flex;
			justify-content: space-around;
			margin-top: 30rpx;
				.radio{
					/deep/ .uni-radio-input-checked {
						background-color: #4481EB !important;
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
						width: 50rpx !important;
						height: 50rpx !important;
					}
					.radio_text {
						margin-right: 20rpx;
					}
				}
			}
	}
	.auto_btn {
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		background: linear-gradient(to right, #04BEFE,#005BEA);
		margin:  50rpx auto;
		border-radius: 40rpx;
		text-align: center;
		color: #fff;
	}
	.calendar {
		.open_btn{
			width: 220rpx;
			height: 85rpx;
			border-radius: 40rpx;
			border: 1rpx solid #4481EB;
			line-height: 85rpx;
			text-align: center;
			color: #4481EB;
			font-size: 28rpx;
			margin: 30rpx auto;
		}
		.date {
			font-size: 28rpx;
			text-align: center;
			margin-top: 30rpx;
		}
	}
}
</style>