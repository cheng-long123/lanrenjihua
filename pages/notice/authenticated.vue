<template>
	<view class="athenticated">
		<view class="image">
		</view>
		<view class="athenticated-text">
			您以实名认证成功
		</view>
		<view class="info">
			您在实名认证信息上面已通过，您可以
			返回首页使用或查看信用卡。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.athenticated {
	overflow: hidden;
	.image {
		width: 368rpx;
		height: 368rpx;
		margin: 0 auto;
		background: url(../../static/image/smcg.png) no-repeat;
		background-size: cover;
		margin-top: 233rpx;
	}
	.athenticated-text {
		text-align: center;
		font-size: 30rpx;
		color: #333333;
		margin-top: 50rpx;
	}
	.info{
		box-sizing: border-box;
		width: 408rpx;
		text-align: center;
		margin: 30rpx auto;
		font-size: 24rpx;
		color: #464646;
	}
}
</style>
