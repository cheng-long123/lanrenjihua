<template>
	<view class="toteamManagement">
		<!-- 搜索 -->
		<view class="search">
			<view class="search-box">
				<text class="iconfont icon-sw_sousuo"></text>
				<input type="text" v-model="keyword" placeholder="请输入搜索姓名"/>
				<text class="search-text" @click="search">搜索</text>
			</view>
		</view>
		
		<view class="number">
			团队人员（共{{teamList.length}}人）
		</view>
		<!-- 主体 -->
		<view class="content" v-for="item in teamList" :key="item.cre_id">
			<!-- 头部 -->
			<view class="head">
				<view class="head-left">
					<text style="font-size: 30rpx; font-weight: 700; margin-bottom: 6rpx;">{{item.bank_name}}</text>
					<text style="font-size: 28rpx; color: #BCBCBC;">ID {{item.number}}</text>
				</view>
				<view class="head-right" @click="updateProfit(item.fee,item.phone)">
					<text class=" iconfont icon-xiugai"></text>
					<text class="update-text">修改分润</text>
				</view>
			</view>
			<view class="center-content">
				<view class="content-item">
					<view class="left-text">分润比例</view>
					<view class="right-num">{{item.fee}}%</view>
				</view>
				<view class="content-item">
					<view class="left-text">手机号</view>
					<view class="right-num">{{item.phone}}</view>
				</view>
				<view class="content-item">
					<view class="left-text">注册时间</view>
					<view class="right-num">{{item.created_at}}</view>
				</view>
			</view>
			<view class="bnts">
				<button class="btn" type="default"  @click="toProfit(item.cre_id)">查看分润</button>
				<button class="btn" type="default" @click="toOrder(item.cre_id)">查看订单</button>
			</view>
			
		</view>
		<wyb-popup ref="popup" type="center" zIndex="22" height="400" width="700" radius="6" centerAnim="slide-up">
		    <view class="popup-content">
		        <view class="popup-head">修改分润</view>
				<textarea class="textarea" v-model="userFee" placeholder="请输入修改的分润" />
				<view class="popup-btns">
					<button class="popup-btn" type="default" @click="modification">确认修改</button>
					<button class="popup-btn" type="default" @click="cancel">取消</button>
				</view>
		    </view>
		</wyb-popup>
	</view>
</template>

<script>
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
	export default {
		data() {
			return {
				keyword: '',
				usertoken: '',
				teamList: [],
				fee: '',
				userFee: '',
				phone: ''
			}
		},
		components: {
			wybPopup
		},
		onLoad() {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getTema()
				}
			})
		},
		methods: {
			async getTema () {
				const { data } = await this.Request({
					method: 'GET',
					url: '/Userforeign/grplist',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id,
					}
				})
				if (data.status === 1) {
					this.teamList = data.data
				} else if (data.status === 4) {
					this.baseLogout()
				}
			},
			async search () {
				uni.showLoading({
					title:'查询中...',
					mask: true
				})
				const { data } = await this.Request({
					method: 'POST',
					url: '/Userforeign/grplist',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id,
						bank_name: this.keyword
					}
				})
				console.log(data);
				if (data.status === 1) {
					this.teamList = data.data
					uni.hideLoading()
					uni.showToast({
						title: '查询成功',
						duration: 1500,
						icon: 'none'
					})
				} else {
					uni.hideLoading()
					uni.showToast({
						title: '查无此人',
						duration: 1500,
						icon: 'none'
					})
				}
			},
			toOrder (id) {
				uni.navigateTo({
					url: './orderDetail?id=' + id
				})
			},
			toProfit (id) {
				uni.navigateTo({
					url: './profitDetail?id=' + id
				})
			},
			updateProfit (fee,phone) {
				this.fee = fee
				this.phone = phone
				this.$nextTick( ()=> {
					this.$refs.popup.show() // 显示
				})
			},
			cancel () {
				this.$refs.popup.hide() // 隐藏
			},
			async modification () {
				if ( this.userFee === '') {
					uni.showToast({
						title: '修改费率不能为空',
						duration: 2000,
						icon: 'none'
					})
					return
				} else if (this.userFee > 100 || this.userFee < 1) {
					uni.showToast({
						title: '修改的费率有误',
						duration: 2000,
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					mask: true
				})
				const { data } = await this.Request({
					method: 'POST',
					url: '/Userforeign/editrate',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id,
						fee: this.userFee,
						phone: this.phone
					}
				})
				if (data.status) {
					uni.hideLoading()
					this.phone = ''
					this.getTema()
					setTimeout( () => {
						this.cancel() // 隐藏
					},100)
					uni.showToast({
						title: data.msg,
						duration: 2000,
						icon: 'none'
					})
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.toteamManagement {
	.search {
		// position: fixed;
		// top: 86rpx;
		// left: 0;
		// right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 102rpx;
		background-color: #fff;
		// z-index: 99;
		.search-box {
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 90%;
			height: 68rpx;
			border-radius: 40rpx;
			margin: 0 auto;
			background-color: #F3F3F3;
			padding: 0 20rpx;
			input {
				box-sizing: border-box;
				width: 75%;
				font-size: 26rpx;
				height: 68rpx;
				// border-right: 5rpx solid #C7C5C5;
			}
			.search-text {
				font-size: 26rpx;
				color: #4481EB;
				border-left: 5rpx solid #C7C5C5;
				padding-left: 20rpx;
				font-weight: 600;
			}
			.icon-sw_sousuo {
				width: 26rpx;
				height: 26rpx;
				padding-right: 40rpx;
				color: #707070;
			}
		}
	}
	.number {
		font-size: 24rpx;
		color: #818181;
		text-align: center;
		padding: 20rpx 0;
		// margin-top: 40rpx;
	}
	.content {
		box-sizing: border-box;
		width: 95%;
		height: 463rpx;
		margin: 0rpx auto;
		margin-bottom: 20rpx;
		background-color: #fff;
		border-radius: 40rpx;
		padding: 0rpx 40rpx;
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 131rpx;
			border-bottom: 1rpx solid rgba($color: #E9EAED, $alpha: 0.5);
			.head-left {
				display: flex;
				flex-direction: column;
				justify-content: space;
				
			}
			.head-right {
				.icon-xiugai {
					font-size: 28rpx;
				}
				.update-text {
					font-size: 28rpx;
					color: #4481EB;
					margin-left: 15rpx;
				}
			}
		}
		.center-content {
			margin: 25rpx 0;
			.content-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 25rpx;
				.left-text {
					font-size: 28rpx;
					color: #666666;
				}
				.right-num {
					font-size: 32rpx;
					color: #333333;
				}
			}
		}
		.bnts {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
			.btn {
				width: 155rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				border-radius: 60rpx;
				font-size: 24rpx;
				color: #fff;
				background-color: #4481EB;
			}
		}
	}
	.popup-content {
		padding: 10rpx;
		.popup-head {
			text-align: center;
			padding: 20rpx 0;
		}
		.textarea {
			box-sizing: border-box;
			height: 150rpx;
			border: 1rpx solid rgba($color: #E9EAED, $alpha: 0.5);
			margin: 10rpx auto;
			padding: 20rpx;
		}
		.popup-btns {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
			.popup-btn {
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				border-radius: 60rpx;
				font-size: 24rpx;
				color: #fff;
				background-color: #4481EB;
			}
		}
		
	}
}
</style>
