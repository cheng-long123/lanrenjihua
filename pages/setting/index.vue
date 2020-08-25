<template>
	<view class="setting" >
		<view class="top">
			<view class="setting_name" @click="updateName">
				<text class="name">昵称</text>
				<view class="right">
					<text class="user_name">{{userinfo.nickname}}</text>
					<image src="../../static/image/right-btn.png" mode=""></image>
				</view>
			</view>
			<wyb-popup ref="update_name" type="bottom" height="400" width="500" radius="6" >
			    <view class="popup-content">
			        <view class="name">
			        	编辑昵称
			        </view>
					<textarea class="textarea" v-model="nickname" placeholder="请输入昵称" />
					<view class="btn">
						<wyb-button class="submit_btn" width="50%" :ripple="true" type="filled" @click="submit" >提交</wyb-button>
						<wyb-button class="call_btn" width="50%" :ripple="true" type="hollow" @click="call">取消</wyb-button>
					</view>
			    </view>
			</wyb-popup>
			<view class="user_id">
				<text class="id">ID</text>
				<text class="text">{{userinfo.number}}</text>
			</view>
		</view>
		<view class="update">
			<view class="setting_xiugai"  @click="jiejiUpdate">
				<text class="xiugai_text" >储蓄卡卡号修改</text>
				<image class="xiugai_right" src="../../static/image/right-btn.png" mode=""></image>
			</view>
			<view class="setting_xiugai" @click="changeXin">
				<text class="xiugai_text" >信用卡信息修改</text>
				<image class="xiugai_right" src="../../static/image/right-btn.png" mode=""></image>
			</view>
			<view class="setting_xiugai" @click="changemm">
				<text class="xiugai_text">密码修改</text>
				<image class="xiugai_right" src="../../static/image/right-btn.png" mode=""></image>
			</view>
		</view>
		<wyb-popup ref="card_update" type="bottom" height="400" width="500" radius="6" :showCloseIcon="true">
		    <view class="card_content">
		        <text class="update_text">借记卡号修改</text>
				<textarea class="card_text" v-model="bank_card" placeholder="请输入借记卡号" />
				<view class="btn">
					<wyb-button class="submit_btn" width="50%" :ripple="true" type="filled" @click="updateCard" >确认修改</wyb-button>
					<wyb-button class="call_btn" width="50%" :ripple="true" type="hollow" @click="updatecall">取消</wyb-button>
				</view>
		    </view>
		</wyb-popup>
		<view class="bottom">
			<view class="banben">
				<text class="banben_text">版本号</text>
				<view class="banben_right">1.2.1.9</view>
			</view>
			<view class="banben"  @click="tuichu">
				<text class="banben_text">退出</text>
				
			</view>
		</view>
	</view>
</template>

<script>
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
	export default {
		data() {
			return {
				userinfo: {},
				usertoken: '',
				nickname: '',
				bank_card: ''
			}
		},
		components:{
			  wybPopup
		},
		onLoad() {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getUserInfo()
				}
			})
			// plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
			// console.log(JSON.stringify(wgtinfo));
			// console.log(wgtinfo.version);//应用版本号
			// })
		},
		methods: {
			// 获取信息
			async getUserInfo() {
				const { data } = await this.Request({
					method: 'GET',
					url: '/Userforeign/user_query',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id
					}
				})
				this.userinfo = data.data
				this.nickname = data.data.nickname
				// console.log(this.userinfo);
			},
			updateName () {
				
				this.$refs.update_name.show() // 显示
				// uni.navigateTo({
				// 	url: './nickname?name=' + this.userinfo.nickname + '&number=' + this.userinfo.number
				// })
			},
			call () {
				this.$refs.update_name.hide() // 关闭
			},
			 tuichu () {
				 uni.navigateBack({
				 })
			 },
			 //修改昵称
			async submit () {
				if (this.userinfo.nickName === this.nickname ) {
					return uni.showToast({
							title: '不能与当前昵称一致',
							icon: 'none'
					})
				}
				const { data } = await this.Request({
					method: 'POST',
					url: '/Userforeign/user_update',
					data: {
						token: this.usertoken.token,
						number: this.userinfo.number,
						nickname: this.nickname
					}
				})
				if (data.status === 1) {
					this.call()
					 uni.showToast({
					 	title: data.msg,
						duration: 2000,
					 	icon: 'none'
					 })
					this.getUserInfo()
				} else if (data.status === 2) {
					this.call()
					uni.showToast({
						title: data.msg,
						duration: 2000,
						icon: 'none'
					})
				} else if (data.status === 4 ) {
					this.baseLogout()
				}
			// console.log(this.userinfo.nickname);
			}, // 修改密码
			changemm() {
				uni.navigateTo({
					url: './changemm'
				})
			}, 
			changeXin () {
				uni.navigateTo({
					url: './changeXinUpdate'
				})
			},
			// 借记卡修改
			jiejiUpdate () {
				this.$refs.card_update.show() // 显示
			},
			updatecall () {
				this.$refs.card_update.hide() // 显示
			},
			async updateCard () {
				const { data } = await this.Request({
					method: 'POST',
					url: '/Change/Jcard',
					data: {
						cre_id: this.usertoken.cre_id,
						token: this.usertoken.token,
						bank_card: this.bank_card
					}
				})
				uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none',
					complete: () => {
						this.updatecall()
					}
				})
				if (data.status === 1) {
					 this.updatecall()
				} else if (data.status === 4) {
					this.baseLogout()
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
.setting {
	box-sizing: border-box;
	.setting_name{
		height: 107rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		padding: 0 40rpx;
		font-size: 32rpx;
		border-bottom: 1rpx solid rgba(0,0,0,.1);
		.user_name {
			font-size: 30rpx;
			color: #8D8D8D;
		}
		.right{
			display: flex;
			justify-content: flex-end;
			line-height: 30rpx;
			
			image{
				width: 20rpx;
				height: 30rpx;
				margin-left: 15rpx;
			}
			
		}
	}
	.user_id {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		height: 107rpx;
		padding: 0 40rpx;
		font-size: 32rpx;
		border-bottom: 1rpx solid rgba(0,0,0,.1);
		.text{
			font-size: 30rpx;
			color: #8D8D8D;
		}
		
	}
	.update{
		margin-top: 40rpx;
		.setting_xiugai{
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 107rpx;
			background-color: #fff;
			padding: 0 40rpx;
			font-size: 32rpx;
			border-bottom: 1rpx solid rgba(0,0,0,.1);
			.xiugai_right {
				width: 20rpx;
				height: 30rpx;
				line-height: 30rpx;
				color: #8d8d8d;
				font-size: 30rpx;
			}
		}
	}
	.bottom{
		margin-top: 40rpx;
		.banben {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 107rpx;
				background-color: #fff;
				border-bottom: 1rpx solid rgba(0,0,0,.1);
				padding: 0 40rpx;
				font-size: 32rpx;
				.banben_right {
					color: #8d8d8d;
					font-size: 30rpx;
				}
			}
	}
	.popup-content {
		padding: 30rpx;
		.name {
			font-size: 34rpx;
			margin-bottom: 10rpx;
		}
		.textarea {
			border: 1rpx solid rgba(141,141,141,.5);
			width: 100%;
			height: 130rpx;
			margin: 20rpx 0;
			padding: 10rpx 15rpx;
		}
	}
	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card_content {
		padding: 30rpx;
		.card_text {
			border: 1rpx solid rgba(141,141,141,.5);
			width: 100%;
			height: 130rpx;
			margin: 20rpx 0;
			padding: 10rpx 15rpx;
		}
	}
}
</style>
