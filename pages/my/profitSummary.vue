<template>
	<view class="profitSummary">
		<view class="summarizing">
			<view class="month-num">{{personal !== '' ? personal.amount : 0}}</view>
			<view class="month-text">本月</view>
			<view class="knot">
				<text>日结{{personal !== '' ? personal.daily : 0.00}}</text>
				<view class="xian"></view>
				<text>月结{{ personal !== '' ? personal.Monthly  : 0.00}}</text>
			</view>
			<view class="profit">
				<view class="profit-text">
					<text class="text">{{ personal !== '' ? personal.me_money : 0.00}}</text>
					<text class="text2">我的利润</text>
				</view>
				<view class="profit-text">
					<text class="text">{{personal !== '' ? personal.share_money : 0.00}}</text>
					<text class="text2">下发利润</text>
				</view>
			</view>
			<!-- <v-tabs
				class="tabs"
				v-model="current"
				:value="current"
				:tabs="tabs"
				@change="changeTab"
				color="rgba(255,255,255,.5)"
				:pills="true"
				bgColor="transparent"
				pillsColor="#fff"
				activeColor="#4481EB"
				pillsBorderRadius="40rpx"
			></v-tabs> -->
			<view class="tabs">
				<view :class="['tab-item', monthstate === 1 ? 'active-tab' : '' ]" @click="changeDte(1,month1)">{{month1}}月</view>
				<view :class="['tab-item', monthstate === 2 ? 'active-tab' : '' ]" @click="changeDte(2,month2)">{{month2}}月</view>
				<view :class="['tab-item', monthstate === 3 ? 'active-tab' : '' ]" @click="changeDte(3,month3)">本月</view>
			</view>
		</view>
		<view class="tabbar">
			<view :class="['vip-profit', type === 3 ? 'active' : '']" @click="changeVipProfit(3,month)">会员</view>
			<view :class="['vip-profit', type === 1 ? 'active' : '']" @click="changeVipProfit(1,month)">分润</view>
		</view>
		<view class="vipList" v-show="type === 3">
			<view class="viphead">收益金额</view>
			<view class="vipitem">
				<view class="vipheader">
					<text>时间</text>
					<text>金额</text>
					<text>姓名</text>
				</view>
				<view class="vipcontent" v-for="(item,index) in personal.daylist" :key="index">
					<text>{{item.date_time}}</text>
					<text>{{item.fee_money}}</text>
					<text>{{item.bank_name}}</text>
				</view>
			</view>
		</view>
		<view class="profitList"  v-show="type === 1">
			<view class="profithead">分润情况</view>
			<view class="profititem">
				<view class="profitheader">
					<text>时间</text>
					<text>收益金额</text>
					<text>交易金额</text>
					<text>姓名</text>
					<text>订单类型</text>
				</view>
				<view class="profitcontent" v-for="(item,index) in personal.daylist" :key="index">
					<text>{{item.date_time}}</text>
					<text>{{item.fee_money}}</text>
					<text>{{item.money}}</text>
					<text>{{item.bank_name}}</text>
					<text>{{item.business_type}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usertoken: '',
				current: 10 ,
				 tabs: [
					{}
				  ],
				  monthstate: 3,
				  type: 3,
				  year: '',
				  month1: '',
				  month2: '',
				  month3: '',
				  month: '',
				  personal: ''
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getTime()
					this.getInfo(this.year,this.month3,this.type)
				}
			})
		},
		methods: {
			 changeDte(state,month) {
				 this.monthstate = state
				 this.month = month
			      // console.log('当前选中的项：' + this.index)
				  this.getInfo(this.year,month,this.type)
			    },
			 changeVipProfit (type,month) {
				 console.log(this.month);
					this.type = type
					this.getInfo(this.year,month,this.type)
			},
			getTime () {
				var date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
				minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
				second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			    month >= 1 && month <= 9 ? (month = "0" + month) : "";
			    day >= 0 && day <= 9 ? (day = "0" + day) : "";

				this.year = year
				this.month1 = month - 2
				this.month2 = month - 1
				this.month3 = month
				this.month = month
		
			},
			async getInfo (years,month,type) {
				const { data } = await this.Request({
					method: 'GET',
					url: '/Userforeign/Personal',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id,
						years,
						month,
						type
					}
				})
				if (data.data.daylist.length === 0) {
						uni.showToast({
							title: '当月无分润详情',
							duration: 2000,
							icon: 'none'
						})
				}
				this.personal= data.data
			console.log(data);
			}
		}
	}
</script>

<style lang="scss" scoped>
.profitSummary {
	.summarizing {
		height: 400rpx;
		background-color: #005BEA;
		border-radius: 0 0 40rpx 40rpx;
		.month-num {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 50rpx;
			color: #fff;
			margin-bottom: 10rpx;
		}
		.month-text {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			color: #fff;
			margin-bottom: 10rpx;
		}
		.knot {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			color: rgba($color: #fff, $alpha: 0.8);
			.xian {
				width: 3rpx;
				height: 30rpx;
				background-color: rgba($color: #fff, $alpha: 0.5);
				margin: 10rpx 60rpx;
			}
		}
		.profit {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 20rpx;
			.profit-text {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #fff;
				.text {
					font-size: 50rpx;
				}
				.text2 {
					font-size: 24rpx;
					color: rgba($color: #fff, $alpha: 0.8);
				}
			}
		}
		.tabs {
			
			height: 80rpx;
			width: 80%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			text-align: center;
			border-radius: 40rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			.tab-item {
				// width: 33.33%;
				width: 150rpx;
				height: 80rpx;
				line-height: 80rpx;
				color: rgba($color: #fff, $alpha: .7);
			}
			.active-tab {
				background-color: #fff;
				color: #4481EB;
				border-radius: 40rpx;
			}
		}
	}
	.tabbar{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 438rpx;
		height: 60rpx;
		margin: 20rpx auto;
		font-size: 24rpx;
		background-color: #EDEDED;
		border-radius: 40rpx;
		.vip-profit {
			width: 220rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			color: #A5A5A5;
		}
		.active {
			background-color: #4481EB;
			color: #fff;
			border-radius: 40rpx;
		}
	}
	.vipList, .profitList{
		box-sizing: border-box;
		background-color: #fff;
		min-height: 800rpx;
		border-radius: 40rpx 40rpx 0 0;
		padding: 10rpx 0;
		.viphead, .profithead {
			text-align: center;
			font-size: 28rpx;
			font-weight: bold;
			margin-top: 20rpx;
		}
		.vipitem, .profititem{
			margin-top: 20rpx;
			.vipheader,.profitheader{
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				color: rgba($color: #000000, $alpha: 0.6);
				text-align: center;
				
			}
			.vipheader>text{
				width: 33.33%;
				display: block;
			}
			.profitheader>text{
				width: 20%;
			}
			.vipcontent,.profitcontent {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx;
				margin:  20rpx 0;
				text-align: center;
				
			}
			.vipcontent>text {
				display: block;
				width: 33.33%;
			}
			.profitcontent>text {
				width: 20%;
				white-space: nowrap;
			}
		}
	}
}
</style>
