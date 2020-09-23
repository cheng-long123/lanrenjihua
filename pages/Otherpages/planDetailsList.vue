<template>
	<view class="planDetailsList">
		<view class="plan_head">
			<view class="head_text">类型</view>
			<view class="head_text">还款时间</view>
			<view class="head_text" style="margin-left: 30rpx;">金额</view>
			<view class="head_text">还款状态</view>
		</view>
		<view
		  class="plan_content"
		  v-for="item in planList"
		  :key="item.id"
		  :style="{color:item.status === 0 ? '#209CFF' : item.status === 1 ? '#18BE73' : item.status === 3 ? '#F6900A' : 'red'}"
		  >
			<view class="content_text">{{item.purpose === 1 ? '消费' : '还款' }}</view>
			<view class="content_text">{{item.plan_date}}</view>
			<view class="content_text">{{item.period_amount}}</view>
			<view class="content_text" v-if="item.status === 0">未还</view>
			<view class="content_text" v-else-if="item.status === 1">已还</view>
			<view class="content_text" v-else-if="item.status === 3">执行中 </view>
			<view class="content_text"  v-else-if="item.status === 4">失败</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			cardid: '',
			planList: []
		}
	},
	onLoad(option) {
		this.id = option.id
		this.cardid = option.cardid
		uni.getStorage({
			key: 'usertoken',
			success: (res) => {
				this.usertoken = res.data
				this.getPlanList()
			}
		})
	},
	methods: {
		async getPlanList () {
			const { data } = await this.Request({
				method: 'POST',
				url: '/Plan/plan_details',
				data: {
					plan_id: this.id,
					token: this.usertoken.token
				}
			})
			// console.log(data);
			if (data.status === 1) {
				this.planList = data.data
				// console.log(data);
			} else if (data.status === 2) {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				})
			} else if (data.status === 4) {
				this.baseLogout()
			}
		}
	}
}
</script>

<style lang='scss' scoped>
.planDetailsList {
	.plan_head{
		display: flex;
		height: 96rpx;
		width: 100%;
		align-items: center;
		justify-content: space-around;
		font-size: 28rpx;
		border-bottom: 1rpx solid rgba(217,217,217,.6);
		text-align: center;
		.head_text {
			&:nth-child(2) {
				flex: 4;
			}&:nth-child(3) {
				flex: 3;
			}&:nth-child(4) {
				flex: 2;
			}&:nth-child(1) {
				flex: 2;
			}
		}
		
	}
	.plan_content{
		box-sizing: border-box;
		display: flex;
		height: 60rpx;
		line-height: 60rpx;
		width: 100%;
		align-items: center;
		justify-content: space-around;
		font-size: 25rpx;
		/* padding: 0 20rpx 20rpx; */
	}
}
</style>
