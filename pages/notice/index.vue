<template>
 	<view class="index">
		<view style="width: 100%; height: 20rpx;"></view>
 		<view class="content" @click="toAuthenticated">
 			<view class="left" >
 				<view class="left-img">
 					<image  src="../../static/image/notice-1.png" mode=""></image>
 				</view>
 				<view class="left-text">
 					<text class="text1">系统通知</text>
 					<text class="text2">{{is_real == 1 ? '您已实名认证成功' : '您还没实名' }}</text>
 				</view>
 			</view>
 			<view class="right">
 				<image class="right-img" src="../../static/image/right-btn.png" mode=""></image>
 			</view>
 		</view>
 	</view>

</template>

<script>
	export default {
		data() {
			return {
				usertoken: '',
				is_real: ''
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getAuthenticated()
				}
			})
			var loginRes = this.checkLogin();
				if (!loginRes) {
					return false;
				}
				
		},
		methods: {
			async getAuthenticated () {
				const { data } = await this.Request({
					method: 'POST',
					url: '/Userforeign/user_query',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id
					}
				})
				console.log(data);
				this.is_real = data.data.is_real
			},
			toAuthenticated () {
				if (this.is_real ===1) {
					uni.navigateTo({
						url: 'authenticated?is_real=' + this.is_real
					})
				} else {
					uni.showModal({
					    title: '提示',
					    content: '您还没有实名认证，是否实名认证',
					    success: function (res) {
					        if (res.confirm) {
								uni.redirectTo({
									url: '../my/Certification'
								})
					            // console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				
			}
		}
	}
</script>

<style lang='scss' scoped>
	.index{
		height: 100%;
		background-color: #f4f4f6;
		box-sizing: border-box;
		.content{
				background-color: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 141rpx;
				.left{
					margin-left: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.left-img{
						width: 120rpx;
						height: 120rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.left-text{
						
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: space;
						.text1{
							font-size: 30rpx;
						}
						.text2{
							font-size: 22rpx;
							color: #8D8D8D;
						}
					}
				}
					
				.right{
					margin-right: 40rpx;
					.right-img{
						width: 17rpx;
						height: 30rpx;
					}
				}
				
			}
	}
	

</style>
