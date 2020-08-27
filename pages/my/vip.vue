<template>
	<view class="vip">
		<view class="vip_top">
			<view class="top_text">{{vipInfo.level_name}}</view>
			<view class="bottom_text">您现在是{{vipInfo.level_name}}</view>
		</view>
		<view class="setmeal">
			<view style="margin-bottom: 40rpx;">
				请选择套餐
			</view>
			<view class="taocan">
				<view :class="['platinum-diamond', level === '1' ? 'active' : '']" @click="platinum()">
					<view :class="['text1', level === '1' ? 'active-text' : '']">白金会员vip卡</view>
					<view :class="['text2', level === '1' ? 'active-text' : '']"><text style="font-size: 40rpx;">￥</text>198</view>
					<view :class="['text3', level === '1' ? 'active-text' : '']">一次开通，终身免费</view>
				</view>
				<view :class="['platinum-diamond', level === '3' ? 'active' : '']" @click="diamond()">
					<view :class="['text1', level === '3' ? 'active-text' : '']">钻石会员vip卡</view>
					<view :class="['text2', level === '3' ? 'active-text' : '']"><text style="font-size: 40rpx;">￥</text>
					 {{vipInfo.member === 1 ? 298 : vipInfo.member === 2 ? 100 : 298}}
					</view>
					<view :class="['text3', level === '3' ? 'active-text' : '']">一次开通，终身免费</view>
				</view>
			</view>
			<button class="btn" type="default" @click="openVip">立即开通</button>
		</view>
		<uni-popup ref="popup2" type="center">
				<view class="upgrade">
					<view style="font-size: 30rpx;">支付宝</view>
					<image style="width: 200rpx;height: 200rpx;" :src="erweimaImg" @longpress="saveImgToLocal()"></image>
					<view>长按保存二维码</view>
					<view style="font-size: 30rpx;">3分钟后订单失效</view>
				</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				level_id: '1',
				level: '1',
				usertoken: '',
				userinfo: '',
				vipInfo: '',
				erweimaImg: ''
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getUserInfo()
					this.getvip()
				}
			})
		},
		components:{
			uniPopup
		},
		methods: {
			platinum () {
				this.level = '1'
				this.level_id = '1'
			},
			diamond () {
				this.level = '3'
				if (this.vipInfo.member === 1) {
					this.level_id = '3'
				} else if (this.vipInfo.member === 2) {
					this.level_id = '2'
				}
				
			},
			async getUserInfo() {
				const { data } = await this.Request({
					method: 'GET',
					url: '/Userforeign/user_query',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id
					}
				})
				console.log(data);
				if (data.status === 1) {
					this.userinfo = data.data
				} else if (data.status === 4) {
					this.baseLogout()
				}
			}, // 查询会员
			async getvip () {
	
				const { data } = await this.Request({
					method: 'GET',
					url: '/DoMember/grade',
					data: {
						token: this.usertoken.token,
					}
				})
				console.log(data);
				if (data.status === 1) {
					this.vipInfo = data.data
				} else if (data.status === 4) {
					this.baseLogout()
				}
			}, // 开通
			async openVip () {
				// console.log(123);
				console.log(this.level_id);
				if (this.vipInfo.member == 2) {
					uni.showToast({
						title: '您当前已是白金会员',
						duration:2000,
						icon: 'none'
					})
					return
				} else if (this.vipInfo.member == 3) {
					uni.showToast({
						title: '您当前已是钻石会员',
						duration:2000,
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					mask: true
				})
				const { data } = await this.Request({
					method: 'POST',
					url: '/DoMember/upgrade',
					data: {
						token: this.usertoken.token,
						level_id: this.level_id,
						phone: this.userinfo.bank_phone
					}
				})
				console.log(data);
				if (data.status === 1) {
					uni.hideLoading()
					var img = data.img
					this.erweimaImg = 'http://dh.weifoupay.com/payapi/DoMember/create?res=' + img
					// this.$refs.popup.close()
					this.$refs.popup2.open();
				} else {
					uni.hideLoading()
					uni.showToast({
						title: data.msg,
						duration:1500,
						icon: 'none'
					})
				}
			},
	   toImage() {
			const that = this;
			/* 获取屏幕信息 */
			let ws = this.$mp.page.$getAppWebview();
			let bitmap = new plus.nativeObj.Bitmap('test');
			// 将webview内容绘制到Bitmap对象中
			ws.draw(
				bitmap,
				function(e) {
					/* 获取base64 */
					that.test = bitmap.toBase64Data();
					/* 加载base64编码 */
					bitmap.loadBase64Data(
						bitmap.toBase64Data(),
						function() {
							// console.log('加载Base64图片数据成功');
							/* 保存图片 */
							bitmap.save(
								'_doc/share.jpg', {},
								async (i) => {
										// console.log(i.target)
										that.shareImg = i.target
										uni.saveImageToPhotosAlbum({
											filePath: i.target,
											success: function() {
												/* 清除 */
												bitmap.clear();
												uni.showToast({
													title: "保存成功,请到相册中查看",
													duration: 1000,
													icon: "none",
												});
											},
											fail(e) {
												uni.showToast({
													title: "保存失败",
													duration: 1000,
													icon: "none",
												});
											}
										});
									},
									function(e) {
										// console.log('保存图片失败：' + JSON.stringify(e));
									}
							);
						},
						function() {
							// console.log('加载Base64图片数据失败：' + JSON.stringify(e));
						}
					);
				},
				function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				}, {
					check: true, // 设置为检测白屏
					clip: {
						top: '200px',
						left: '0px',
						height: '100%',
						width: '100%'
					} // 设置截屏区域
				}
			);
		},

		saveImgToLocal(e) {
			uni.showModal({
				title: '提示',
				content: '确定保存到相册吗',
				success: (res) => {
					if (res.confirm) {
						this.toImage()
					}
				}
			});
		},

		}
	}
</script>

<style lang="scss" scoped>
.vip {
	position: relative;
	.vip_top {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 421rpx;
		background-color: #005BEA;
		color: #fff;
		// z-index: -1;
		padding: 50rpx 0;
		.top_text{
			font-size: 28rpx;
			font-weight: 600;
			margin-bottom: 40rpx;
		}
		.bottom_text{
			font-size: 28rpx;
		}
	}
	.setmeal {
		position: absolute;
		bottom: 0;
		top: 370rpx;
		left: 0;
		right: 0;
		width: 100%;
		box-sizing: border-box;
		height: 870rpx;
		// z-index: 9999;
		border-radius: 60rpx;
		background-color: #fff;
		// margin-top: -40rpx
		padding: 50rpx;
	}
	.taocan {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.platinum-diamond {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			width: 278rpx;
			height: 375rpx;
			border: 1rpx solid rgba($color: #DDC774, $alpha: .4);
			border-radius: 40rpx;
			padding:  20rpx;
			.active-text{
				color: #fff !important;
			}
			.text1 {
				font-size: 30rpx;
				color: #888888;
			}
			.text2 {
				font-size: 60rpx;
				color: #4481EB;
			}
			.text3 {
				font-size: 24rpx;
				color: #888888;
			}
			
		}
		.active {
			background-color: #DDBF9F;
			color: #fff !important;
		}
		
	}
	.btn {
		width: 90%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background: linear-gradient(to right, #04BEFE,#005BEA);
		border-radius: 40rpx;
		margin-top: 80rpx;
		color: #fff;
	}
	.upgrade {
		background-color: white;
		width: 500rpx;
		border-radius: 10rpx;
		text-align: center;
		padding: 50rpx;

		button {
			margin: 25rpx 0;
			color: white;
		}

		.silver {
			background-color: #abb4bf;
		}

		.glod {
			background-color: #ddbb72;
		}
	}

}
</style>
