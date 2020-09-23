<template>
	<view class="my">
		<!-- 头部区域 -->
		<view class="my-head">
			<view class="user-info">
				<!-- 头像 -->
				<view class="avatar">
					<view class="avatar-img" >
						<image  class="avatar-img" :src="userInfo !== '' ? (userInfo.picture === null ? avatar : 'http://dh.weifoupay.com' + userInfo.picture ) : avatar " mode=""></image>
					</view>
					<view class="user" v-show="userInfo !== ''">
						<view class="user-name" >
							{{userInfo.bank_name == '' ? '先实名认证' : userInfo.bank_name }}
						</view>
						<view class="vip">
							{{userInfo.member === 1 ?　'普通会员' : userInfo.member === 2 ? '白金会员' : '钻石会员'　}}
						</view>
					</view>
					<view class="user-login" v-show="userInfo === ''" @click="login">
						点击登录
					</view>
				</view>
				<view class="get-deposit" v-show="userInfo !== ''" @click="toTixian">
					去提现
				</view>
			</view>
			 <!-- 金额 -->
			<view class="user-money">
				<view class="left-money" @click="toprofitSummary">
					<text class="left-money">{{ userInfo.total == null ? 0.00  : userInfo.total }}</text>
					<text class="left-text">分润</text>
				</view>
				<view class="border">
					
				</view>
				<view class="right-balance">
					<text class="rightmoney">{{userInfo.balance == 0 ? 0.00 : userInfo.balance }}</text>
					<text class="right-text">余额</text>
				</view>
			</view>
		</view>
		<view class="bg">
			
		</view>
	    <!-- 功能专区 -->
		<view class="function">
			<view class="head">
				功能专区
			</view>
			<view class="function-content" >
				<view class="card"  @click="toshiming">
					<view class="card-left">
						<image class="card-img" src="../../static/image/shiming.png" mode=""></image>
						<text class="card-text">实名认证</text>
					</view>
					<view class="right-img">
						<image class="right-btn" src="../../static/image/right-btn.png" mode=""></image>
					</view>
				</view>
				<view class="card" @click="toAccount">
					<view class="card-left">
						<image class="card-img" src="../../static/image/zhanghu.png" mode=""></image>
						<text class="card-text">账户管理</text>
					</view>
					<view class="right-img">
						<image class="right-btn" src="../../static/image/right-btn.png" mode=""></image>
					</view>
				</view>
				<view class="card" @click="toorderDetail">
					<view class="card-left">
						<image class="card-img" src="../../static/image/dingdan.png" mode=""></image>
						<text class="card-text">订单明细</text>
					</view>
					<view class="right-img">
						<image class="right-btn" src="../../static/image/right-btn.png" mode=""></image>
					</view>
				</view>
				<view class="card" @click="toprofitDetail">
					<view class="card-left">
						<image class="card-img" src="../../static/image/jinglirun.png" mode=""></image>
						<text class="card-text">分润明细</text>
					</view>
					<view class="right-img">
						<image class="right-btn" src="../../static/image/right-btn.png" mode=""></image>
					</view>
				</view>
				<view class="card" @click="toteamManagement ">
					<view class="card-left">
						<image class="card-img" src="../../static/image/tuandui.png" mode=""></image>
						<text class="card-text">团队管理</text>
					</view>
					<view class="right-img">
						<image class="right-btn" src="../../static/image/right-btn.png" mode=""></image>
					</view>
				</view>
				<view class="card" @click="tovip">
					<view class="card-left">
						<image class="card-img" src="../../static/image/huiyuan.png" mode=""></image>
						<text class="card-text">会员中心</text>
					</view>
					<view class="right-img">
						<image class="right-btn" src="../../static/image/right-btn.png" mode=""></image>
					</view>
				</view>
				<view class="card" @click="toPromotionCenter">
					<view class="card-left">
						<image class="card-img" src="../../static/image/tuiguang.png" mode=""></image>
						<text class="card-text">推广中心</text>
					</view>
					<view class="right-img">
						<image class="right-btn" src="../../static/image/right-btn.png" mode=""></image>
					</view>
				</view>
				<view class="card" @click="quitLogin">
					<view class="card-left">
						<image class="card-img" src="../../static/image/tuichu.png" mode=""></image>
						<text class="card-text">退出登录</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatar: '../../static/image/avatar.png',
			userToken:{}, //登录信息
			userInfo: '' // 用户信息
		}
	},
	components:{
	},
	onShow() {
		uni.getStorage({
			key: 'usertoken',
			success:res =>{
				// this.cre_id = res.data.cre_id
				// this.token = res.data.token
				this.userToken = res.data
				// console.log(res)
				// 获取信息
				this.getUserInfo()
			}
		})
	},
	onLoad() {
		var loginRes = this.checkLogin();
			if (!loginRes) {
				return false;
			}
		uni.getStorage({
			key: 'usertoken',
			success:res =>{
				// this.cre_id = res.data.cre_id
				// this.token = res.data.token
				this.userToken = res.data
				// console.log(res)
				// 获取信息
				this.getUserInfo()
			}
		})
	},
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '../setting/index'
		})
	    // console.log("success")        
	},
	methods: {
		// 登录跳转
		login () {
			uni.navigateTo({
				url: '../login/index'
			})
		},
		// 获取用户信息
		async getUserInfo () {

			const { data } = await this.Request({
				method: 'GET',
				url: '/Userforeign/user_query',
				data: {
					cre_id: this.$data.userToken.cre_id,
					token: this.$data.userToken.token
				},
				
			})
			console.log(data);
			if (data.status === 1) {
				
				this.userInfo = data.data
				
			} else if (data.status === 2) {
				uni.showToast({
					title: '获取信息失败',
					icon: 'none'
				})
			}
			 else if (data.status === 4) {
				this.baseLogout()
			}
			// console.log(this.userInfo)
		}, // 退出登录
		quitLogin () {
			uni.showModal({
				title: '提示',
				content: '确定要退出吗？',
				success:  (res) => {
					if (res.confirm) {
						this.userInfo = ''
						uni.removeStorage({
							key: 'usertoken',
							success() {
								uni.showToast({
									title: '退出成功',
									icon: 'none'
								})
								setTimeout( () => {
									uni.reLaunch({
										url: '../login/index'
									})
								},1200)
								// uni.reLaunch({
								// 	url: '../login/index'
								// })
							}
						})
					} else if (res.cancel) {     
					}
				}
			})
		},
		toprofitSummary () {
			uni.navigateTo({
				url: './profitSummary'
			})
		},
		 // 跳转账户管理
		toAccount () {
			uni.navigateTo({
				url: './account'
			})
		},//推广中心
		toPromotionCenter  () {
			uni.navigateTo({
				url: './promotionCenter'
			})
		},//订单明细
		toorderDetail () {
			uni.navigateTo({
				url: './orderDetail'
			})
		}, // 分润明细
		toprofitDetail () {
			uni.navigateTo({
				url: './profitDetail'
			})
		}, // 余额提现
		toTixian () {
			uni.navigateTo({
				url: './withdrawDeposit'
			})
		}, // vip中心
		tovip () {
			uni.navigateTo({
				url: './vip'
			})
		}, // 团队管理
		toteamManagement () {
			uni.navigateTo({
				url: './teamManagement'
			})
		},
		async toshiming () {
			const { data } = await this.Request({
				method: 'POST',
				url: '/Userforeign/user_query',
				data: {
					token: this.userToken.token,
					cre_id: this.userToken.cre_id
				}
			})
			if (data.data.is_real === 1) {
				uni.showToast({
					title: '已实名',
					duration: 2000,
					icon: 'none'
				})
			} else {
				uni.redirectTo({
					url: './Certification'
				})
			}
		}
	}
}
</script>

<style lang='scss' scoped>
 .my{
	 position: relative;
	 box-sizing: border-box;
	.my-head{
		width: 100%;
		height: 439rpx;
		background-color: #4481EB;
		
		.user-info{
			height: 200rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 50rpx;
			.avatar{
				display: flex;
				justify-content: center;
				align-items: center;
				.avatar-img{
					width: 132rpx;
					height: 132rpx;
					border-radius: 50%;
					margin-right: 23rpx;
				}
				.user {
					.user-name{
						font-size: 32rpx;
						color: #fff;
						margin-bottom: 10rpx;
					}
					.vip {
						color: rgba(255,255,255,.8);
						font-size: 24rpx;
					}
				}
			}
			.user-login {
				font-size: 28rpx;
				color: #fff;
			}
		}
		.get-deposit{
			width: 148rpx;
			height: 57rpx;
			background-color: #FFFFFF;
			border-radius: 50rpx;
			padding: 5rpx;
			line-height: 57rpx;
			text-align: center;
			font-size: 28rpx;
			color: #4481EB;
			
		}
		.user-money{
			width: 100%;
			height: 179rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgba(255,255,255,.9);
			font-size: 40rpx;
			.border {
				width: 4rpx;
				height: 89rpx;
				background-color: rgba(255,255,255,.5);
				margin-left: 89rpx;
			}
			.left-money{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: rgba(255,255,255,.9);
				.left-text{
					font-size: 28rpx;
					margin-top: 5rpx;
				}
			}
			.right-balance{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-left: 89rpx;
				.right-text{
					font-size: 28rpx;
					margin-top: 5rpx;
				}
			}
		}
	}
	.function {
		box-sizing: border-box;
		position: absolute;
		left: 0;
		right: 0;
		top: 400rpx;
		bottom: 0rpx;
		width: 100%;
		height: 1000rpx;
		background-color: #f4f4f6;
		border-radius: 50rpx;
		padding: 44rpx 50rpx;
		/* #ifdef H5 */
		margin-bottom: 80rpx;
		/* #endif */
		.head {
			font-size: 38rpx;
			color: #333333;
			font-weight: 700;
		}
	}
	.card{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 76rpx;
		border-bottom: 1rpx solid rgba(233,234,237,.5);
		margin-top: 30rpx;
		.card-left{
			display: flex;
			justify-content: center;
			align-items: center;
			.card-img{
				width: 58rpx;
				height: 58rpx;
				margin-right: 30rpx;
			}
			.card-text {
				font-size: 30rpx;
				color: rgba(51,51,51,.9);
			}
		}
		.right-img {
			width: 14rpx;
			height: 24rpx;
			line-height: 24rpx;
			.right-btn {
				width: 14rpx;
				height: 24rpx;
			}
		}
	}
}

</style>
