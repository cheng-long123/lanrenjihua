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
			<text class="text">信用卡号</text>
			<input type="text" value=""  placeholder-class="input-placeholder" placeholder="请输入信用卡号"/>
		</view>
		<view class="input_text">
			<text class="text">信用卡号</text>
			<input type="text" value=""  placeholder-class="input-placeholder" placeholder="请输入信用卡号"/>
		</view>
		<view class="bottom_text">
			<view style="margin-right: 20rpx;">信用卡预留本金 &nbsp; 10000</view> 
			<view>手续费&nbsp; 3.0</view>
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
			text-align: center;
			margin-top: 40rpx;
			font-weight: bold;
		}
		.radio-group {
				margin-top: 30rpx;
				.radio{
					display: flex;
					justify-content: space-around;
					/deep/ .uni-radio-input-checked {
						background-color: #16A085 !important;
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
}
</style>