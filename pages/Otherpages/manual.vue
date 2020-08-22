<template>
    <view id="autorefund">
		<view class="h1">
			输入信息
		</view>
		<view class="input_text">
			<text class="text">姓名</text>
			<input type="text" value=""  placeholder-class="input-placeholder" placeholder="请输入姓名"/>
		</view>
		<view class="input_text">
			<text class="text">预还款金额</text>
			<input type="text" value=""  placeholder-class="input-placeholder" placeholder="请输入预还款金额"/>
		</view>
		<view class="input_text">
			<text class="text">信用卡号</text>
			<input type="text" value=""  placeholder-class="input-placeholder" placeholder="请输入信用卡号"/>
		</view>
		<view class="bottom_text">
			<view style="margin-right: 20rpx;">信用卡预留本金 &nbsp;<text style="margin-left: 20rpx; font-size: 30rpx; font-weight: bold;">10000</text></view>
			<view>手续费&nbsp; <text style="margin-left: 20rpx; font-size: 30rpx; font-weight: bold;">3.0</text></view>
		</view>
		<view class="calendar">
			    <uni-calendar 
				:date="time"
				:startDate="time"
				:endDate="info.endDate"
			    ref="calendar"
				:lunar="info.lunar"
			    :insert="info.insert"
				:range="info.range"
			    @confirm="confirm"
				@change="change"
			     />
			<view v-if="range === ''" class="open_btn" @click="open">选择时间</view>
			<view  v-else class="date">{{range.before}}至{{range.after}}</view>
		</view>
		<view class="radio_content">
			<view class="day">
				日还款笔数
			</view>
			<radio-group class="radio-group">
			        <label class="radio">
						<view class="radio_item">
							<text class="radio_text">1</text>
							<radio  checked=""></radio>
						</view>
						<view class="radio_item">
							<text class="radio_text">1</text>
							<radio  checked=""></radio>
						</view>
						<view class="radio_item">
							<text class="radio_text">1</text>
							<radio  checked=""></radio>
						</view>
					</label>
			 </radio-group>
		</view>
		<view class="auto_btn">
			提交
		</view>
    </view>
</template>
<script>
	import uniCalendar  from '@/components/uni-calendar/uni-calendar.vue'
export default {
   data() {
      return {
		 time: '',
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
		 range: ''
      }
   },
created() {
this.getStartTime()
},
methods:{
  open(){
		 this.$refs.calendar.open();
	 },
	 confirm(e) {
		 this.range = e.range
		 console.log(e);
		 console.log(this.range);
	 },
	 change (e) {
		
	 },
	 getStartTime() {
		var myDate = new Date();
		let year = myDate.getFullYear(); //完整的年份
		let month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
		var newMonth = month.toString().padStart(2, '0');
		let date = myDate.getDate(); //获取当前日(1-31)
		this.time = year.toString() + "-" + newMonth.toString() + '-' + date.toString()
	},
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
	.auto_btn {
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		background: linear-gradient(to left, #15BE73,#08BD9E,#16A085);
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
			border: 1rpx solid #16A085;
			line-height: 85rpx;
			text-align: center;
			color: #16A085;
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