<template>
    <view class="index">
		<!-- 站位导航 -->
		<!-- #ifdef -->
		<view class="status_bar">  
		     <view class="top_view"></view>  
		 </view>  
		 <!-- #endif --> 
		       <view>  
		  </view> 
		  <wyb-popup ref="renovate" type="center" height="635" width="570" radius="6" >
		      <view class="popup-renovate">
		         <view class="renovate">
		         	<image src="../../static/image/gengxin.png" mode=""></image>
		         </view>
				<button class="renovate-btn" type="default" @click="updateApp">立即更新</button>
		      </view>
		  </wyb-popup>
		<view class="content">
			<!-- 头部 -->
			<view class="header">
					<view class="tab-text">
						<text class="text">首页</text>
						<view class="text-border"></view>
					</view>
				<view class="btn" @click="tocCreditcard">
					+添加信用卡
				</view>
			</view>
			<!-- 轮播图 -->
				<!-- <swiper  class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item class="swiper-item">
						<navigator url="#" class="swiper-banner">
								<image class="swiper-img" src="../../static/image/lb-01.png" mode=""></image>
						</navigator>
					</swiper-item><swiper-item class="swiper-item">
						<navigator url="#" class="swiper-banner">
								<image class="swiper-img" src="../../static/image/lb-01.png" mode=""></image>
						</navigator>
					</swiper-item><swiper-item class="swiper-item">
						<navigator url="#" class="swiper-banner">
								<image class="swiper-img" src="../../static/image/lb-01.png" mode=""></image>
						</navigator>
					</swiper-item>
				</swiper> -->
				<uni-swiper-dot
					:info="info"
					:indicator-dots="true"
					:dots-styles="dotsStyles"
					:current="current"
					field="content"
					:mode="mode"
					@change="change"
					>
					<swiper  class="swiper" :circular="true" :autoplay="true" :interval="3000" :duration="1000" @change="change">
						<!-- <swiper-item class="swiper-item" v-for="(item,index) in info" :key="index">
							<navigator url="#" class="swiper-banner">
									<image class="swiper-img" :src="'http://dh.weifoupay.com' + item.pic" mode=""></image>
							</navigator>
						</swiper-item> -->
						<swiper-item class="swiper-item">
							<navigator url="#" class="swiper-banner">
									<image class="swiper-img" src="../../static/image/banner/banner3.png" mode=""></image>
							</navigator>
						</swiper-item>
						<swiper-item class="swiper-item">
							<navigator url="#" class="swiper-banner">
									<image class="swiper-img" src="../../static/image/banner/banner1.png" mode=""></image>
							</navigator>
						</swiper-item>
						<swiper-item class="swiper-item">
							<navigator url="#" class="swiper-banner">
									<image class="swiper-img" src="../../static/image/banner/banner2.png" mode=""></image>
							</navigator>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
		</view>
		<!-- nav导航区 -->
		<view class="navs">
			<view class="nav" @click="shoukuan">
				<image src="../../static/image/shokuan.png" mode=""></image>
				<text>商户收款</text>
			</view>
			<view  class="nav" @click="toposMachineApplication">
				<image src="../../static/image/daikuan.png" mode=""></image>
				<text>我要贷款</text>
			</view>
			<view  class="nav" @click="intelligent ">
				<image src="../../static/image/huankuan.png" mode=""></image>
				<text>智能还款</text>
			</view>
			<view  class="nav" @click="cardApplyfor">
				<image  src="../../static/image/zhifubao.png" mode=""></image>
				<text>花呗</text>
			</view>
		</view>
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
						<text class="account-rate">费率<text class="rate">{{fee1}}%</text></text>
				   </view>
				   
			    </view>	
				<wyb-popup ref="popup" type="center" z-index='22' centerAnim="bounce" :duration=300 height="580" width="700" radius="6" :maskAlpha=0.1 :showCloseIcon="false" bgColor='rgba(255,255,255,0)'>
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
				{{userToken !== ''  || card_list.length === 0  ? '您还没有绑卡，快去绑卡吧！！' : '您还没有登录，快去登录！！'}}
			</view>
		</view>
    </view>
</template>
<script>
	import { uniCalendar,uniSwiperDot  } from "@dcloudio/uni-ui"
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
export default {
   data() {
      return {
		info: [],
			 current: 0,
			 mode: 'round',
			 dotsStyles: {
				 backgroundColor:'rgba(255,255,255,.5)',
				 selectedBackgroundColor: '#fff',
				 border: '0',
				 selectedBorder: '1px rgba(255, 255, 255, 1) solid'
				 
			 },
			 userToken: '', // 用户token
			 card_list: [], // 信用卡列表
			 fee1: '',
			 fee: 0.006,
			 level_name: '',
			 fee_2: '',
			 R16_fee: '',
			 isShowBox: false,
			 isindex: null,
			 card_msg: {},
			 card_index: '',
			 version: '',
			 download_url: ''
			 
		}
   },
   filters:{
	 cardFilter(value){
		 
	   return value.substring(value.length - 4)
		}
     },
   components: {
	   uniSwiperDot,
	   wybPopup
   },
   methods:{
	change(e) {
			   this.current = e.detail.current;
		   },
		   // 获取banner
	   async getBanner () {
		   const { data } = await this.Request({
			   method: 'GET',
			   url: '/Info/pic'
		   })
		   this.info = data.data
		   // console.log(this.info);
	   },
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
	if (data.status === 2 ) {
		this.card_list = data.data
		
	} else if (data.status === 4) {
		this.baseLogout()
	}
	// console.log(data);
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
			this.fee1 = (data.data.fee * 10000) / 100
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
		               // console.log('用户点击取消');
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
   }, // 智能还款
   intelligent () {
	   uni.navigateTo({
	   	url: '../my/account'
	   })
   }, // 我要贷款
   toposMachineApplication() {
	//#ifdef APP-PLUS
	plus.runtime.openURL('http://mall.juzifenqi.com/channel_register/register_loan/index-v2.html?channel=jsbaofutong');
	//#endif
	//#ifdef H5
	window.location.href =
		'http://mall.juzifenqi.com/channel_register/register_loan/index-v2.html?channel=jsbaofutong'
	//#endif
   	}, // 新增信用卡
   tocCreditcard () {
	   uni.navigateTo({
	   	url: '../Otherpages/addCreditCard'
	   })
   }, // 信用卡申请
   cardApplyfor () {
		uni.navigateTo({
			url: '../Otherpages/huaBei'
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
	   // console.log(this.card_msg);
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
					    //跳转到手动还款页面
	   				   uni.navigateTo({
	   				   			url: '../Otherpages/manual?card_id=' + this.card_msg.cid + 
	   							'&holderName=' + this.card_msg.holderName + '&accountNumber=' + this.card_msg.accountNumber +
	   							 '&fee=' + this.fee + '&bank_name=' + this.card_msg.bannk_name + '&quota=' + this.card_msg.quota +
								 '&bill_day=' + this.card_msg.bill_day + '&repayment=' + this.card_msg.repayment
	   				   })
	   			   } else {
					  // let cardmsg =  encodeURIComponent(JSON.stringify(this.card_msg))
					    //跳转到新增信用卡
	   				   uni.navigateTo({
	   				   			url: '../Otherpages/addCreditCard?card_id=' + this.card_msg.cid +
	   				   			'&holderName=' + this.card_msg.holderName + '&accountNumber=' + this.card_msg.accountNumber +
	   				   			 '&bank_name=' + this.card_msg.bannk_name + '&bill_day=' + this.card_msg.bill_day + '&quota=' + this.card_msg.quota +
	   				   			 '&repayment=' + this.card_msg.repayment + '&expired=' + this.card_msg.expired + '&cvv2=' + this.card_msg.cvv2
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
				   // console.log(this.card_msg);
				   //跳转到一键还款页面
				   uni.navigateTo({
				   			url: '../Otherpages/autoRefund?card_id=' + this.card_msg.cid +
				   			'&holderName=' + this.card_msg.holderName + '&accountNumber=' + this.card_msg.accountNumber +
				   			 '&fee=' + this.fee + '&bank_name=' + this.card_msg.bannk_name + '&quota=' + this.card_msg.quota +
				   			 '&bill_day=' + this.card_msg.bill_day + '&repayment=' + this.card_msg.repayment 
				   })
			   } else {
				   //跳转到新增信用卡
				   uni.navigateTo({
				   			url: '../Otherpages/addCreditCard?card_id=' + this.card_msg.cid +
				   			'&holderName=' + this.card_msg.holderName + '&accountNumber=' + this.card_msg.accountNumber +
				   			 '&bank_name=' + this.card_msg.bannk_name + '&bill_day=' + this.card_msg.bill_day + '&quota=' + this.card_msg.quota +
				   			 '&repayment=' + this.card_msg.repayment + '&expired=' + this.card_msg.expired + '&cvv2=' + this.card_msg.cvv2
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
		 uni.showToast({
			 title: '此功能维护中',
			 duration: 2000,
			 icon: 'none'
		 })
		//  const { data } = await this.Request({
		//  		   method: 'GET',
		//  		   url: '/Plan/get_bankStatus',
		//  		   data: {
		//  			   token: this.userToken.token,
		//  			   cid: this.card_msg.cid
		//  		   }
		//  })
		//  if (data.status === 4) {
		//  		   this.baseLogout()
		//  } else {
		//  		   if (!data.data) {
		//  			   if (this.card_msg.df === 1) {
		//  				   // console.log(this.card_msg);
		//  				   uni.navigateTo({
		//  				   			url: '../Otherpages/fastRefund?card_id=' + this.card_msg.cid +
		//  				   			'&holderName=' + this.card_msg.holderName + '&accountNumber=' + this.card_msg.accountNumber +
		//  				   			 '&fee=' + this.fee + '&bank_name=' + this.card_msg.bannk_name + '&quota=' + this.card_msg.quota +
		//  				   			 '&bill_day=' + this.card_msg.bill_day + '&repayment=' + this.card_msg.repayment 
		//  				   })
		//  			   } else {
		//  				   uni.navigateTo({
		//  				   			url: '../Otherpages/addCreditCard?card_id=' + this.card_msg.cid + 
		//  							'&holderName=' + this.card_msg.holderName + '&accountNumber=' + this.card_msg.accountNumber +
		//  							 '&bank_name=' + this.card_msg.bannk_name + '&bill_day=' + this.card_msg.bill_day + '&quota=' + this.card_msg.quota +
		// 							 '&repayment=' + this.card_msg.repayment + '&expired=' + this.card_msg.expired + '&cvv2=' + this.card_msg.cvv2
		//  				   })
		//  			   }
		//  		   } else {
		//  			   uni.showToast({
		//  			   	title: '当前信用卡已有计划正在执行',
		//  				duration: 2000,
		//  				icon: 'none'
		//  			   })
		//  		   }
		//  }
	 },
	 // 还款详情
	 planDetails () {
		 let weihao = this.card_msg.accountNumber.substring(this.card_msg.accountNumber.length - 4)
		 uni.navigateTo({
		 	url: '../Otherpages/planDetails?card_id=' +  this.card_msg.cid + '&accountNumber=' + 
			this.card_msg.accountNumber + '&quota=' + this.card_msg.quota + '&bill_day=' +  this.card_msg.bill_day +
			 '&repayment=' + this.card_msg.repayment + '&weihao=' + weihao + '&bannk_name=' + this.card_msg.bannk_name
		 })
	}, // 版本更新
	 getrenovate () {
		 // #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid,async (wgtinfo) => {
			if (this.platform == 'android') {
					this.version = 1
				} else {
					this.version = 2
				}
			const { data } = await this.Request({
				method: 'GET',
				url: '/Edition/renovate',
				data: {
					type: this.version
				}
			})
			if (data.status === 1) {
				
				if (wgtinfo.version < data.data.version) {
					this.$nextTick(() =>{
						this.$refs.renovate.show() // 显示
						// console.log(123);
					})
					this.download_url = data.data.download_url
				}
			}
		})
			// #endif
		// console.log(data);
	},
	updateApp () {
		// #ifdef APP-PLUS
		plus.runtime.openURL(this.download_url)
		// #endif
	},
	getStsyem () {
		uni.getSystemInfo({
			success: (res) => {
				this.platform = res.platform
				// console.log(res);
			}
		})
	}
},
onLoad() {
	this.getrenovate()
	this.getStsyem()
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
	// 判断是否登录
	var loginRes = this.checkLogin();
		if (!loginRes) {
			return false;
		}
},
onHide() {
	if (!uni.getStorageSync('usertoken')) {
		this.card_list = []
	}
	this.$refs.popup.hide()
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
	/* 头部 */
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		/* margin-bottom: 15px; */
		 border-bottom:1rpx solid rgba(255,0,0,.1);
		/* background: linear-gradient(left, #209CFF,#005BEA); */
		/* background: url(../../static/image/swiper-bg.png) no-repeat;
		background-size: cover;
		background-position-y: 20px; */
		  .tab-text{
			  display: flex;
			  flex-direction: column;
			  justify-content: space-between;
			.text{
				font-size: 40rpx;
				padding: 20rpx;
				color: #fff;
				
			}
			.text-border{
				width: 40rpx;
				height: 10rpx;
				background-color: #fff;
				margin-left: 41rpx;
				border-radius: 24rpx;
			}
		}
		
		.btn{
			height: 40rpx;
			line-height: 40rpx;
			padding: 10rpx 20rpx;
			border-radius: 40rpx;
			background-color: #fff;
			color: #4481EB;
			font-size: 24rpx;
		}
	}
}
/* 伦播图 */

	.swiper{
		width: 690rpx;
		height: 254rpx;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 50rpx;
		border-radius: 20rpx;
		overflow: hidden;
			/* 兼容IOS，否则在swiper组件内的布局都不受border-radius和overflow的约束 */
		transform: translateY(0);
		.swiper-item{
			width: 100%;
			height: 254rpx;
			overflow: hidden;
			transform: translateY(0);
			/* margin: 40rpx  20rpx;
			margin-right: 20rpx; */
			border-radius: 20rpx;
			.swiper-img {
				width: 100%;
				height: 254rpx;
				border-radius: 20rpx;
			}
		}
		
	}
/* 导航 */
   .navs {
     display: flex;
     justify-content: space-between;
     padding: 30rpx 44rpx;
	  .nav{
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		  align-items: center;
		  
	  }
     image {
       width: 120rpx;
       height: 120rpx;
	   
     }
	text{
		font-size: 24rpx;
		color: #464646;
	 }
   }
/* 账户管理 */
.account {
	/* #ifdef H5 */
	margin-bottom: 120rpx;
	/* #endif */
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
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
			font-size: 32rpx;
			color: rgba(0,0,0,.3);
			min-height: 515rpx;
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
 .popup-renovate {
 	.renovate {
 		width: 100%;
 		height: 458rpx;
 		/* background: url(../../static/image/gengxin.png) no-repeat;
 		background-size: cover; */
 		image {
 			width: 100%;
 			height: 100%;
			text-align: center;
 		}
 		
 	}
	.renovate-btn {
		width: 300rpx;
		height: 69rpx;
		line-height: 69rpx;
		text-align: center;
		background-color: #19C6FB;
		color: #fff;
		border-radius: 40rpx;
		margin: 0rpx auto;
		margin-top: 40rpx;
	}
 	
 }
</style>
