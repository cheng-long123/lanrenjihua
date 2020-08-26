<template>
	<view class="order">
		<view class="order_info">
			<view class="info">
				<view class="order_title">姓名</view>
				<view class="order_text">{{orderInfo.holder_name}}</view>
			</view>
			<view class="info">
				<view class="order_title">订单号</view>
				<view class="order_text">{{orderInfo.order_num}}</view>
			</view>
			<view class="info">
				<view class="order_title">金额</view>
				<view class="order_text">{{orderInfo.money}}元</view>
			</view>
			<view class="info">
				<view class="order_title">交易类型</view>
				<view class="order_text">{{orderInfo.business_type}}</view>
			</view>
			<view class="info">
				<view class="order_title">支付状态</view>
				<view class="order_text">{{orderInfo.pay_status}}</view>
			</view>
			<view class="info">
				<view class="order_title">创建时间</view>
				<view class="order_text">{{orderInfo.created_at}}</view>
			</view>
			<view class="info">
				<view class="order_title">备注</view>
				<view class="order_text">{{orderInfo.remarks}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usertoken: '',
				oid: '',
				orderInfo: ''
			}
		},
		onLoad(option) {
			this.oid = option.oid
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getOrderInfo()
				}
			})
		},
		methods: {
			async getOrderInfo() {
				const { data } = await this.Request({
					method: 'GET',
					url: '/OrderPart/ordermore',
					data: {
						token: this.usertoken.token,
						oid: this.oid
					}
				})
				if (data.status === 1) {
					this.orderInfo = data.data
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
