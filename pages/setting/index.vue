<template>
	<view class="setting" >
		<view class="setting_name">
			<text class="name">昵称</text>
			<text class="user_name">朱海东</text>
			<view class="right">
				<image src="../../static/image/right-btn.png" mode=""></image>
			</view>
		</view>
		<view class="user_id">
			<text class="id">ID</text>
			<text class="text">12</text>
		</view>
		<view class="setting_xiugai">
			<text class="xiugai_text">借记卡卡号修改</text>
			<image class="xiugai_right" src="../../static/image/right-btn.png" mode=""></image>
		</view>
		<view class="setting_xiugai">
			<text class="xiugai_text">信用卡信息修改</text>
			<image class="xiugai_right" src="../../static/image/right-btn.png" mode=""></image>
		</view>
		<view class="setting_xiugai">
			<text class="xiugai_text">密码修改</text>
			<image class="xiugai_right" src="../../static/image/right-btn.png" mode=""></image>
		</view>
		<view class="banben">
			<text class="banben_text">版本号</text>
			<view class="banben_right">1.2.1.9</view>
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

<style lang='scss' scoped>
.setting {
	box-sizing: border-box;
	.setting_name{
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		padding: 0 40rpx;
		margin-top: 20rpx;
		font-size: 32rpx;
		.user_name {
			font-size: 30rpx;
			color: #8D8D8D;
		}
		.right{
			width: 20rpx;
			height: 30rpx;
			line-height: 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
			
		}
	}
	.user_id {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		height: 120rpx;
		margin-top: 20rpx;
		padding: 0 40rpx;
		font-size: 32rpx;
		.text{
			font-size: 30rpx;
			color: #8D8D8D;
		}
		
	}
	.setting_xiugai{
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;
		background-color: #fff;
		margin-top: 20rpx;
		padding: 0 40rpx;
		font-size: 32rpx;
		.xiugai_right {
			width: 20rpx;
			height: 30rpx;
			line-height: 30rpx;
			color: #8d8d8d;
			font-size: 30rpx;
		}
	}
	.banben {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;
		background-color: #fff;
		margin-top: 20rpx;
		padding: 0 40rpx;
		font-size: 32rpx;
		.banben_right {
			color: #8d8d8d;
			font-size: 30rpx;
		}
	}
}
</style>
