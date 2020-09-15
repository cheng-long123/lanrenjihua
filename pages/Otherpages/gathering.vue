<template>
	<view class="shuokuan">
		   <view style="margin-top: 20upx;">
		             <zzx-tabs :items="items" activeColor="#4481EB" :current="current" @clickItem="onClickItem" @click="submitCard" ref="mytabs">
		             </zzx-tabs>
		        </view> 
		        <view >
		            <view v-show="current === 0">
						<dfgathering :form="userInfo" :usertoken="usertoken" ></dfgathering>
		                
		            </view>
		            <view v-show="current === 1" >
		                <fastPayment :form="userInfo" :usertoken="usertoken" ></fastPayment>
		            </view>
		        </view>
	</view>
</template>

<script>
	import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"
	import fastPayment from "./fastPayment.vue"
	import dfgathering from "./dfgathering.vue"
	export default {
		data() {
			return {
				choosezfkh: ['支付卡号'],
				index: 0,
				usertoken: '',
				items: ['收款1','收款2'],
				current: 0,
				userInfo: {},
				cardList: [],
				bind_code: ''
			}
		},
		components:{
			zzxTabs,
			fastPayment,
			dfgathering
		},
		methods: {
			submitCard () {
			
			},
			 onClickItem(e) {
				 if (this.current === 0) {
					 if (this.userInfo.chuan_paynum === null) {
						 return uni.showModal({
						  title: '提示',
						  content: '您还没有注册，是否注册',
						  success:  (res) => {
							  if (res.confirm) {
								  this.current = e.currentIndex
								  uni.navigateTo({
									url: '../register/chuanRegister'
								  })
								  // console.log('用户点击确定');
							  } else if (res.cancel) {
								  this.current = e.currentIndex
								  // console.log('用户点击取消');
							  }
						  }
						 });
					 }
					 // for (let i = 0; i < this.cardlist.length; i++) {
					 //   if (this.cardlist[i].includes('bind_code') === null) { 
					 // 	  // console.log(123);
					 // 	  uni.showModal({
					 // 		  title: '提示',
					 // 		  content: '您还没有绑卡，是否绑卡',
					 // 		  success: (res) => {
					 // 			  if (res.confirm) {
						// 			  this.current = e.currentIndex
					 // 				  uni.navigateTo({
					 // 					url: 'addPassCard'
					 // 				  })
					 // 				  // console.log('用户点击确定');
					 // 			  } else if (res.cancel) {
						// 			  this.current = e.currentIndex
					 // 				  // console.log('用户点击取消');
					 // 			  }
					 // 		  }
					 // 	  });
					 //   }
					 // }
				 }
				 this.current = e.currentIndex
				 console.log(e);
			},
		// 	// 获取卡号？？
		// 	getCradList (e) {
		// 		// console.log(e);
		// 		this.index = e.target.value
		// 	}, //获取支付卡号
			async getXingList () {
				// this.choosezfkh = []
				const { data } = await this.Request({
					method: 'POST',
					url: '/Creditcard/card_list',
					data: {
						cre_id: this.usertoken.cre_id,
						token: this.usertoken.token
					}
				})
				this.cardlist = data.data
				console.log(data)
				// for (var i = 0; i < data.data.length; i++) {
				// 	if (data.data[i].bind_code === null) {
				// 		// this.choosezfkh.push(data.data[i].accountNumber)
				// 		if (this.choosezfkh.length === 0) {
				// 			this.choosezfkh = ['请选择支付卡号']
				// 			uni.showToast({
				// 				title: "暂无可选择信用卡",
				// 				icon: "none",
				// 			});
				// 		}
					// } else {
					// 	// this.choosezfkh.push(data.data[i].accountNumber)
					// 	this.bind_code = data.data[i].bind_code
					// }
				// }
			// 	console.log(data);
			// 	 if (data.status == 1) {
			// 		 this.cardList = data.data
			// 	 }
			// 	// console.log(data);
			// 	// console.log(this.choosezfkh);
			},
			// 获取用户信息
			async getUserInfo () {
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
						this.userInfo = data.data
				} else if (data.status === 4) {
					this.baseLogout()
				}
				// console.log(data);
			},//商户收款
			// async confirmSubmit () {
			// 	if (this.choosezfkh[0] == '支付卡号') {
			// 		return uni.showToast({
			// 			title: '请选择支付卡号',
			// 			icon: 'none'
			// 		})
			// 	}
			// 	if (this.form.money === '') {
			// 		return uni.showToast({
			// 			title: '请输入金额',
			// 			icon: 'none'
			// 		})
			// 	}
			// 	uni.showLoading({
			// 		mask: true
			// 	})
			// 	const {data} = await this.Request({
			// 		method: 'POST',
			// 		url: '/Samecard/card_tm',
			// 		data: {
			// 			holderName: this.form.bank_name,
			// 			idCard: this.form.identity,
			// 			number: this.usertoken.number,
			// 			accountNumber: this.choosezfkh[this.index],
			// 			settlement: this.form.bank_card,
			// 			money: this.form.money,
			// 			token: this.usertoken.token,
			// 		}
			// 	})
			// 	if (data.status === 1) {
			// 		uni.hideLoading()
			// 		uni.showToast({
			// 			title: '收款成功',
			// 			icon: 'none'
			// 		})
			// 		setTimeout( () => {
			// 			uni.switchTab({
			// 				url: '../index/index'
			// 			})
			// 		},1500)
			// 	} else if (data.status === 2) {
			// 		uni.hideLoading()
			// 		uni.showToast({
			// 			title: '提交失败',
			// 			icon: 'none'
			// 		})
			// 		setTimeout( () => {
			// 			uni.switchTab({
			// 				url: '../index/index'
			// 			})
			// 		},1500)
			// 	} else {
			// 		uni.hideLoading()
			// 		uni.showToast({
			// 			title: data.msg,
			// 			icon: 'none'
			// 		})
			// 	}
			// 	// console.log(data);
			// }
		},
		onLoad() {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getUserInfo()
					this.getXingList()
					// console.log(res);
				},
				
			})
		// 	this.choosezfkh = ['支付卡号']
		}
	}
</script>

<style lang='scss' scoped>
.shuokuan {
	box-sizing: border-box;
	/* background-color: #fff; */
	.user_info {
		margin: 30rpx 0;
		font-size: 40rpx;
		font-weight: 600;
	}
	.user_input {
		padding: 40rpx 0 0 0;
		/* border-bottom: 1rpx solid rgba(22,160,133,.3); */
		display: flex;
		flex-direction: column;
		justify-content: space;
		align-items: space;
		.user_text{
			font-size: 28rpx;
			margin-bottom: 15rpx;
		}
		input {
			font-size: 28rpx;
			color: rgba(0,0,0,.7);
			border-radius: 40rpx;
			background-color: #E8E8E8 !important;
			padding: 20rpx 15rpx;
		}
	}
	.user_card {
		display: flex;
		flex-direction: column;
		justify-content: space;
		align-items: space;
		justify-content: space-between;
		height: 30rpx;
		padding: 60rpx 0;
		margin-bottom: 40rpx;
		/* border-bottom: 1rpx solid rgba(22,160,133,.3); */
		.picker {
			/* height: 90rpx; */
			border-radius: 40rpx;
			width: 100%;
			background-color: #E8E8E8 !important;
			color: rgba(0,0,0,.7);
			padding: 20rpx 0rpx 20rpx 5rpx;
			font-size: 28rpx;
			
		}
		.add_card {
			width: 160rpx;
			height: 60rpx;
			line-height: 57rpx;
			text-align: center;
			border-radius: 40rpx;
			background:linear-gradient(to left,#15BE73, #08BD9E, #16A085);
			font-size: 20rpx;
			color: #fff;
		}
	}
	.btn {
		width: 590rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background: linear-gradient(to right, #04BEFE, #005BEA);
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		font-size: 32rpx;
		margin: 0 auto;
		margin-top: 60rpx;
	}
}
</style>
