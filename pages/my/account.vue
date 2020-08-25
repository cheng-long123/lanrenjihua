<template>
		<!-- 账户管理 -->
		<view class="account">
			<!-- 账户管理头部 -->
			<view class="head">
				<text class="account-text1">账户管理</text>
				<text class="account-text2">{{card_list.length}}页</text>
			</view>
			<!-- 账户管理内容 -->
			<view class="card_box" v-if="card_list.length !== 0"  >
				<view  class="account-content" v-for="(item,index) in card_list" :key="index" @click="popup(item,index)">
					<view class="account-card">
						<text class="account-num">{{item.bannk_name}}  尾号 <text class="cardnum">{{item.accountNumber | cardFilter}}</text></text>
						<text class="account-date">还款日<text class="refund-date">{{item.repayment}}</text>号 </text>
					</view>
					<view class="account-money ">
						<text class="account-num">总额度<text class="sum-money">￥{{item.quota}}</text></text>
						<text class="account-date">账单日<text class="bill">{{item.bill_day}}</text></text>
						<text class="account-rate">费率<text class="rate">{{fee}}%</text></text>
				   </view>
				   
			    </view>	
				<wyb-popup ref="popup" type="center" centerAnim="bounce" :duration=300 height="580" width="700" radius="6" :maskAlpha=0.1 :showCloseIcon="false" bgColor='rgba(255,255,255,0)'>
				    <view class="popup-content">
				     
					  <view class="popup_box" @click="autoRefund">
						<image class="box_img" src="../../static/image/yijian.png" mode=""></image>
						<view class="box_text">
							一键还款
						</view>
				      </view>
					   <view class="popup_box" @click="manual">
				      	<image class="box_img" src="../../static/image/shoudong.png" mode=""></image>
				      	<view class="box_text">
				      		手动还款
				      	</view>
				      </view> 
					  <view class="popup_box" @click="fastRefund">
				      	<image class="box_img" src="../../static/image/jisu.png" mode=""></image>
				      	<view class="box_text">
				      		极速还款
				      	</view>
				      </view> 
					  <view class="popup_box" @click="planDetails">
				      	<image class="box_img" src="../../static/image/xiangqing.png" mode=""></image>
				      	<view class="box_text">
				      		还款详情
				      	</view>
				      </view>
				    </view>
				</wyb-popup>
			</view>
			<view v-else class="tishi">
				{{userToken !== '' && card_list.length !== 0  ? '您还没有绑卡，快去绑卡吧！！' : '您还没有登录，快去登录！！'}}
			</view>
		</view>
</template>
<script>
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
export default {
   data() {
      return {
			 userToken: '', // 用户token
			 card_list: [], // 信用卡列表
			 fee: '',
			 level_name: '',
			 fee_2: '',
			 R16_fee: '',
			 isShowBox: false,
			 isindex: null,
			 card_msg: {},
			 card_index: ''
			 
		}
   },
   filters:{
	 cardFilter(value){
		 
	   return value.substring(value.length - 4)
		}
     },
   components: {
	   wybPopup
   },
   methods:{
   // 获取信用卡列表
   async getCardlist() {
	const { data } = await this.Request({
		method: 'GET',
		url: '/Creditcard/card_list',
		data: {
			cre_id: this.userToken.cre_id,
			token: this.userToken.token
		}
	})
	if (data.status === 2 && this.userToken !== '') {
		this.card_list = data.data
		
	} else if (data.status === 4) {
		this.baseLogout()
	}
	console.log(data);
   }, // 返回会员等级
   async DoMember () {
	   const { data } = await this.Request({
		   methods: 'GET',
		   url: '/DoMember/grade',
		   data: {
			  cre_id: this.userToken.cre_id,
			  token: this.userToken.token
		   }
	   })
	   if (data.status === 1) {
			this.level_name = data.data.level_name
			this.fee = (data.data.fee * 10000) / 100
			this.fee2 = (data.data.fee_2 * 10000) / 100
			this.R16_fee=(data.data.R16_fee * 10000) / 100
			// console.log(this.R16_fee)
			// console.log(this.fee)
			// console.log(this.fee_2)
			// console.log(this.level_name)
		} else if (data.status == 4) {
			this.baseLogout()
		} else {
			uni.showToast({
				title: data.msg,
				icon: 'none',
			})
	   						}
	   // console.log(data);
   },
   // 商户收款
   async shoukuan () {
	   if (uni.getStorageSync('usertoken') === '') {
		   uni.showModal({
		       title: '提示',
		       content: '该功能需要登录，是否登录》',
		       success: function (res) {
		           if (res.confirm) {
		              uni.navigateTo({
		              	url: '../login/index'
		              })
		           } else if (res.cancel) {
		               console.log('用户点击取消');
		           }
		       }
		   });
	   }
	   const { data } = await this.Request({
		   method: 'GET',
		   url: '/Userforeign/user_query',
		   data: {
			   cre_id: this.userToken.cre_id,
			   token: this.userToken.token
		   }
	   })
	   if (data.data.is_real === 1) {
		   uni.navigateTo({
		   	url: '../Otherpages/gathering'
		   })
	   } else if (data.status === 4) {
		   this.baseLogout()
	   // } else {
		  // uni.showModal({
		  //     title: '提示',
		  //     content: '你还没有进行实名认证，是否实名认证？',
		  //     success: function (res) {
		  //         if (res.confirm) {
		  //             uni.switchTab({
		  //             	url: ''
		  //             })
		  //         } else if (res.cancel) {
		  //             console.log('用户点击取消');
		  //         }
		  //     }
		  // });
	   // }
	   // console.log(data);
    }
   },
   tocCreditcard () {
	   uni.navigateTo({
	   	url: '../Otherpages/addCreditCard'
	   })
   },
   popup (item, index) {
	   this.card_msg = item
	    this.card_index = index
	   this.$refs.popup.show()
	   // if (this.isindex !== index) {
		  //  this.isShowBox = true
	   // } else {
		  //  this.isShowBox = !this.isShowBox
	   // }
	   // this.isindex = index
	   // console.log(index);
	   console.log(this.card_msg);
   },// 手动还款
   async manual () {
	   const { data } = await this.Request({
	   		   method: 'GET',
	   		   url: '/Plan/get_bankStatus',
	   		   data: {
	   			   token: this.userToken.token,
	   			   cid: this.card_msg.cid
	   		   }
	   })
	   // console.log(data);
	   if (data.status === 4) {
	   		   this.baseLogout()
	   } else {
	   		   if (!data.data) {
	   			   if (this.card_msg.df === 1) {
	   				   // console.log(this.card_msg);
	   				   uni.navigateTo({
	   				   			url: '../Otherpages/manual?card_id=' + this.card_msg.cid + 
	   							'&holderName=' + this.card_msg.holderName + '&accountNumber=' + this.card_msg.accountNumber +
	   							 '&fee=' + this.fee
	   				   })
	   			   } else {
					  // let cardmsg =  encodeURIComponent(JSON.stringify(this.card_msg))
	   				   uni.navigateTo({
	   				   			url: '../Otherpages/addCreditCard?cardinfo' + this.card_msg
	   				   })
	   			   }
	   		   } else {
	   			   uni.showToast({
	   			   	title: '当前信用卡已有计划正在执行',
	   				duration: 2000,
	   				icon: 'none'
	   			   })
	   		   }
	   }
   }, // 一键还款
  async autoRefund () {
	   const { data } = await this.Request({
		   method: 'GET',
		   url: '/Plan/get_bankStatus',
		   data: {
			   token: this.userToken.token,
			   cid: this.card_msg.cid
		   }
	   })
	   if (data.status === 4) {
		   this.baseLogout()
	   } else {
		   if (!data.data) {
			   if (this.card_msg.df === 1) {
				   console.log(this.card_msg);
				   uni.navigateTo({
				   			url: '../Otherpages/autoRefund?card_id=' + this.card_msg.cid + 
							'&holderName=' + this.card_msg.holderName + '&accountNumber=' + this.card_msg.accountNumber +
							 '&fee=' + this.fee
				   })
			   } else {
				   uni.navigateTo({
				   			url: '../Otherpages/addCreditCard?cardinfo' + JSON.stringify(this.card_msg)
				   })
			   }
		   } else {
			   uni.showToast({
			   	title: '当前信用卡已有计划正在执行',
				duration: 2000,
				icon: 'none'
			   })
		   }
	   }
	   // console.log(data);
   	  
     }, //极速还款
	 async fastRefund (item) {
		 const { data } = await this.Request({
		 		   method: 'GET',
		 		   url: '/Plan/get_bankStatus',
		 		   data: {
		 			   token: this.userToken.token,
		 			   cid: this.card_msg.cid
		 		   }
		 })
		 if (data.status === 4) {
		 		   this.baseLogout()
		 } else {
		 		   if (!data.data) {
		 			   if (this.card_msg.df === 1) {
		 				   console.log(this.card_msg);
		 				   uni.navigateTo({
		 				   			url: '../Otherpages/fastRefund?card_id=' + this.card_msg.cid + 
		 							'&holderName=' + this.card_msg.holderName + '&accountNumber=' + this.card_msg.accountNumber +
		 							 '&fee=' + this.fee
		 				   })
		 			   } else {
		 				   uni.navigateTo({
		 				   			url: '../Otherpages/addCreditCard?cardinfo' + JSON.stringify(this.card_msg)
		 				   })
		 			   }
		 		   } else {
		 			   uni.showToast({
		 			   	title: '当前信用卡已有计划正在执行',
		 				duration: 2000,
		 				icon: 'none'
		 			   })
		 		   }
		 }
	 },// 还款详情
	 planDetails () {
		 let weihao = this.card_msg.accountNumber.substring(this.card_msg.accountNumber.length - 4)
		 uni.navigateTo({
		 	url: '../Otherpages/planDetails?card_id=' +  this.card_msg.cid + '&accountNumber=' + 
			this.card_msg.accountNumber + '&quota=' + this.card_msg.quota + '&bill_day=' +  this.card_msg.bill_day +
			 '&repayment=' + this.card_msg.repayment + '&weihao=' + weihao + '&bannk_name=' + this.card_msg.bannk_name
		 })
	}
},
onLoad() {
	// 获取本地token
	uni.getStorage({
		key: 'usertoken',
		success: res => {
			this.userToken = res.data
			// 获取信用卡列表
			this.getCardlist()
			// 会员等级获取
			this.DoMember()
		}
	})
	this.getBanner()
},
onShow() {
	var loginRes = this.checkLogin();
		if (!loginRes) {
			return false;
		}

	if (!uni.getStorageSync('usertoken')) {
		this.card_list = []
	} else {
		uni.getStorage({
			key: 'usertoken',
			success: res => {
				this.userToken = res.data
				// 获取信用卡列表
				this.getCardlist()
				// 会员等级获取
				this.DoMember()
			}
		})
	}
},
onHide() {
	if (!uni.getStorageSync('usertoken')) {
		this.card_list = []
	}
},
onPullDownRefresh () {
	setTimeout( () => {
		uni.stopPullDownRefresh()
	},5000)
},
 mounted() {
   }
}
</script>
<style lang='scss' scoped>
.status_bar {  
    height: var(--status-bar-height);  
    width: 100%;  
    background-color: #F8F8F8;  
}  
.top_view {  
    height: var(--status-bar-height);  
    width: 100%;  
    position: fixed;  
    background-color: #F8F8F8;  
    top: 0;  
    z-index: 999;  
} 
.index {
	box-sizing: border-box;
	background-color: #f4f4f6;
	height: 100%;
	.content{
		background:  url(../../static/image/swiper-bg.png) no-repeat;
		background-size: 150%;
		background-position: -188rpx -460rpx;
	}
}
/* 账户管理 */
.account {
	
		.head{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 55rpx;
			.account-text1{
				font-size: 38rpx;
				font-weight: bold;
			}
			.account-text2{
				font-size: 28rpx;
				color: #747474;
			}
		}
		.tishi {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 150rpx;
			font-size: 32rpx;
			color: rgba(0,0,0,.3);
		}
		.account-content{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;
			 width: 95%;
			 height: 200rpx;
			 background-color: #fff;
			 border-radius: 20rpx;
			 margin: 20rpx auto;
			 padding: 30rpx;
			 box-shadow: 0rpx 3rpx 20rpx rgba(157,157,157,.3);
			 .account-card{
				 display: flex;
				 justify-content: space-between;
				 align-items: center;
				  font-size: 32rpx;
				 .account-num{
					 .cardnum{
						 color: #2475f8;
						 font-size: 32rpx;
						 font-weight: bold;
					 }
				 }
				 .account-date{
					 .refund-date{
						  color:#2475f8;;
						  font-size: 32rpx;
						   font-weight: bold;
					 }
				 }
			 }
			 .account-money {
				 display: flex;
				 justify-content: space-between;
				 align-items: center;
				 font-size: 24rpx;
				 color: #747474;
				 .account-num{
					 .sum-money{
						  margin-left: 10rpx;
						font-size: 30rpx;
						color: #16A085;
					 }
				 }
				 .account-date{
					 .bill{
						  margin-left: 10rpx;
						font-size: 30rpx;
						color: #16A085;
					 }
				 }
				 .account-rate{
					 .rate{
						 margin-left: 10rpx;
						 font-size: 30rpx;
						 color: #FDA085;
					 }
				 }
			 }
		}
		.popup-content {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 32rpx;
			.popup_box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 297rpx;
				height: 274rpx;
				background-color: #fff;
				border-radius: 32rpx;
				&:nth-child(1) {
					margin-bottom: 32rpx;
				}
				&:nth-child(2) {
					margin-bottom: 32rpx;
				}
				.box_img{
					width: 99rpx;
					height: 99rpx;
					line-height: 99rpx;
					margin-bottom: 10rpx;
				}
				.box_text{
					font-size: 28rpx;
					color: #000;
					font-weight: 700rpx;
				}
			}
		}
		
	}
 
</style>
