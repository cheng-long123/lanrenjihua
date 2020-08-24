<template>
    <view id="xinUpdate">
		<view class="select_card">
			<text class="card_text">信用卡</text>
			<picker class="card_pic" :index="index" :range="cardlist" @change="changeXin">
				<view>{{moren}}</view>
			</picker>
		</view>
		<view class="xin_box">
			<text  class="text">姓名</text>
			<input type="text" v-model="cardinfo.holderName" placeholder="请输入姓名" />
		</view>
		<view class="xin_box">
			<text  class="text">账单日</text>
			<input type="text" v-model="cardinfo.bill_day" placeholder="请输入账单日" />
		</view>
		<view class="xin_box">
			<text  class="text">还款日</text>
			<input type="text" v-model="cardinfo.repayment" placeholder="请输入还款日" />
		</view>
		<view class="xin_box">
			<text  class="text">额度</text>
			<input type="text" v-model="cardinfo.quota" placeholder="请输入额度" />
		</view>
		<wyb-button class="btn" width="80%" :ripple="true" type="filled" @click="confirm">确认修改</wyb-button>
    </view>
</template>
<script>
export default {
   data() {
      return {
		moren: '请选择信用卡',
		index: 0 ,
		userinfo: {},
		cardinfoList: [],
		cardlist: [],
		cardinfo:{}
		
      }
   },
   onLoad() {
   	 uni.getStorage({
   	 	key: 'usertoken',
		success: (res) => {
			this.usertoken = res.data
			this.getCardList()
		}
   	 })
   },
   methods: {
	   changeXin (e) {
	   	this.index = e.target.value
	   	this.moren = this.cardlist[e.target.value]
			for (let i = 0; i < this.cardinfoList.length; i++ ) {
				if (this.cardinfoList[i].accountNumber === this.moren) {
					this.cardinfo = this.cardinfoList[i]
				}
			}
	   	console.log(this.cardinfo);
		// const { data } = await this.Request({
		// 		methods: 'GET',
		// 		url: '/Creditcard/card_list',
		// 		data: {
		// 		   cre_id: this.usertoken.cre_id,
		// 		   token: this.usertoken.token
		// 		}
		// }) 
		// console.log(data);
	   },
	  async getCardList() {
	  		   const { data } = await this.Request({
	  			   method: 'GET',
	  			   url: '/Creditcard/card_list',
	  			   data: {
	  				   cre_id: this.usertoken.cre_id,
	  				   token: this.usertoken.token
	  			   }
	  		   })
			   this.cardinfoList = data.data
			   for (var i = 0; i < data.data.length; i++) {
				   this.cardlist.push(data.data[i].accountNumber) 
			   }
			   console.log(data);
	  },
	  async confirm () {
		  const { data } = await this.Request({
			  method: 'POST',
			  url: '/Change/xycard',
			  data: {
				  cre_id: this.usertoken.cre_id,
				  token: this.usertoken.token,
				  cid: this.cardinfo.cid,
				  bill_day: this.cardinfo.bill_day,
				  repayment: this.cardinfo.repayment,
				  quota: this.cardinfo.quota
			  }
		  })
		  uni.showToast({
		  	title: data.msg,
			duration: 200,
			icon: 'none'
		  })
		  if (data.status === 1) {
			 setTimeout( () => {
				 uni.navigateBack({
				 	
				 })
			 },1500)
		  }
		  // console.log(this.cardinfo);
		  
	  }
   }
}
</script>
<style lang='scss' scoped>
#xinUpdate{
	.select_card {
		width: 90%;
		margin: 30rpx auto;
		border-bottom: 1rpx solid rgba(0,0,0,.1);
		.card_text {
			font-size: 34rpx;
			
		}
		.card_pic {
			font-size: 30rpx;
			margin-top: 25rpx;
		}
	}
	.xin_box {
		width: 90%;
		margin: 30rpx auto;
		border-bottom: 1rpx solid rgba(0,0,0,.1);
		.text {
				font-size: 34rpx;
				
		}
		input {
			margin-top: 25rpx;
			font-size: 30rpx;
		}
	}
	.btn {
		margin:  50rpx auto;
	}
}
</style>