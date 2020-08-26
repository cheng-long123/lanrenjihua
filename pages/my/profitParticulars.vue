<template>
	<view class="order">
		<view class="order_info">
			<view class="info">
				<view class="order_title">下级机构</view>
				<view class="order_text">{{profitInfo.bank_name}}</view>
			</view>
			<view class="info">
				<view class="order_title">订单号</view>
				<view class="order_text">{{profitInfo.order_id}}</view>
			</view>
			<view class="info">
				<view class="order_title">分润差值</view>
				<view class="order_text">{{profitInfo.fee_money}}</view>
			</view>
			<view class="info">
				<view class="order_title">下分金额</view>
				<view class="order_text">{{profitInfo.pts_money}}</view>
			</view>
			<view class="info">
				<view class="order_title">创建时间</view>
				<view class="order_text">{{profitInfo.date_time}}</view>
			</view>
			<view class="info">
				<view class="order_title">分润总额</view>
				<view class="order_text">{{profitInfo.total_money}}</view>
			</view>
			<view class="info">
				<view class="order_title">交易日期</view>
				<view class="order_text">{{profitInfo.date}}</view>
			</view>
			<view class="info">
				<view class="order_title">交易时间</view>
				<view class="order_text">{{profitInfo.time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usertoken: '',
				id: '',
				profitInfo: ''
			}
		},
		onLoad(option) {
			this.id = option.id
			console.log(option);
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getprofitInfo()
				}
			})
		},
		methods: {
			async getprofitInfo() {
				const { data } = await this.Request({
					method: 'GET',
					url: '/OrderPart/aredetails',
					data: {
						token: this.usertoken.token,
						id: this.id
					}
				})
				console.log(data);
				if (data.status === 1) {
					this.profitInfo = data.data[0]
				} else if (data.status === 2) {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
				} else if ( data.status === 4) {
					this.baseLogout()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.order{
	.order_info{
		padding: 50rpx 30rpx;
		.info {
			margin-bottom: 40rpx;
			.order_title{
				font-size: 24rpx;
				margin-bottom: 20rpx;
				color: rgba(0,0,0,.7);
			}
			.order_text{
				font-size: 30rpx;
			}
		}
	}
}
</style>
