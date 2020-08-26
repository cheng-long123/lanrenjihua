<template>
	<view class="plandetails">
		<view class="top_box">
			<view class="card_text">
				{{bannk_name}}
			</view>
			<view class="card_num">
				信用卡尾号<text style="margin-left: 20rpx;">({{weihao}})</text>
			</view>
	 	</view>
		<view class="card_info">
			<view class="card_head">
				<view>总额度</view>
				<view style="font-size: 50rpx; color: #000;">￥{{quota}}</view>
			</view>
			<view class="card_head">
				<view>账单日</view>
				<view style="font-size: 45rpx; color: #000;">{{bill_day}}</view>
			</view>
			<view class="card_head">
				<view>还款日期</view>
				<view style="color: #000;">每月{{repayment}}日</view>
			</view>
		</view>
		<view class="plan_info" v-show="isShow" v-for="(item, index) in planlist" :key="index" >
			<view class="plan_head">
				<view class="head_left">
					<text style="font-size: 35rpx; margin-right: 10rpx;">计划列表</text>
					<text style="font-size: 24rpx; color: #747474;">{{item.day_num}}笔</text>
				</view>
				<view class="head_right">
					<text style="color: #747474; margin-right: 20rpx;">{{item.created_at}}</text>
					<text :style="{color:item.status === 0 ? 'blue' : item.status === 1 ? '#18BE73' : item.status === 3 ? '#F6900A' : 'red'}">
					{{item.status === 0 ? '未开始' : item.status === 1 ? '完成' : item.status === 3 ? '进行中' : '失败'}}</text>
					<text class="del"  @click="delPlan(item.id)">+</text>
				</view>
			</view>
			<view class="paln_content" @click="toPlan(item.id,item.card_id)" >
				<view class="paln_card">
					<text class="content_text">信用卡号</text>
					<text class="content_num" style="color: #005BEA; font-weight: 600;">{{accountNumber}}</text>
				</view>
				<view class="paln_card">
					<text class="content_text">预还款金额</text>
					<text class="content_num">{{item.pre_money}}</text>
				</view>
				<view class="paln_card">
					<text class="content_text">信用卡预留本金</text>
					<text class="content_num">{{item.ensure_money}}</text>
				</view>
				<view class="paln_card">
					<text class="content_text">计划时间</text>
				 <view class="date">
				 	<text class="content_num"
					>{{item.hk_date.split(',')[item.hk_date.split(',').length - 1]}}</text>
				 </view>
				</view>
			</view>
		</view>
		<view class="" style="text-align: center; margin-top: 400rpx; color: #808080;" v-show="!isShow">
			暂无任何计划
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			usertoken: '',
			card_id: '',
			accountNumber: '',
			quota: '',
			bill_day: '',
			repayment: '',
			weihao: '',
			bank_name: '',
			planlist: '',
			isShow: true,
			satatusList: []
		}
	},
	onLoad(option) {
		this.card_id = option.card_id
		this.accountNumber = option.accountNumber
		this.quota = option.quota
		this.bill_day = option.bill_day
		this.repayment = option.repayment
		this.weihao = option.weihao
		this.bannk_name = option.bannk_name
		uni.getStorage({
			key: 'usertoken',
			success: (res) => {
				this.usertoken = res.data
				this.getPlanList()
			}
		})
	},
	methods: {
		toPlan (id,cardid) {
			uni.navigateTo({
				url: './planDetailsList?id=' + id + '&cardid=' + cardid
			})
		},
		async getPlanList () {
			const { data } = await this.Request({
				method: 'POST',
				url: '/Plan/plan_list',
				data: {
					cid: this.card_id,
					token: this.usertoken.token
				}
			})
			
			if (data.status === 1) {
				this.planlist = data.data
				// for (let i =0; i < data.data.) {
					
				// }
				// var plan = data.data
				// for (let i = 0; i < plan.length; i++) {
				// 	this.satatusList.push(plan[i].status)
				// }
			} else if (data.status === 4 ) {
				this.baselogout()
			} else {
				this.isShow = false
			}
			// console.log(data);
		},
		 delPlan (id) {
			uni.showModal({
			    title: '提示',
			    content: '你确定要删除此计划吗？',
			    success: async (res)=> {
			        if (res.confirm) {
			           const { data } = await this.Request({
			           	method: 'POST',
			           	url: '/Plan/plan_delete',
			           	data: {
			           		id,
							token: this.usertoken.token
			           	}
			           })
			           if (data.status === 1) {
						   this.getPlanList()
			           	uni.showToast({
			           		title: data.msg,
			           		icon: 'none'
			           	})
			           } else if (data.status === 2) {
			           	uni.showToast({
			           		title: data.msg,
			           		icon: 'none'
			           	})
			           }
			        } else if (res.cancel) {
			            // console.log('用户点击取消');
			        }
			    }
			});
		
		}
	}
}
</script>

<style lang='scss' scoped>
.plandetails {
	margin: 0;
	padding: 0;
	.top_box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width:100%;
		height: 150rpx;
		background-color: #005BEA;
		border-radius: 0 0 40rpx 40rpx;
		color: #fff;
		box-shadow: 0rpx 0rpx 5rpx rgba(32,165,255,.8);
		.card_num {
			font-size: 28rpx;
			margin-top: 10rpx;
		}
	}
	.card_info {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 150rpx;
		background-color: #fff;
		padding: 20rpx;
		
		.card_head{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			color: rgba(0,0,0,.6);
			font-size: 28rpx;
		}
	}
	.plan_info {
		box-sizing: border-box;
		width: 95%;
		/* height: 463rpx; */
		background-color: #fff;
		margin: 0 auto;
		margin-top: 20rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		box-shadow:  0rpx 3rpx 20rpx rgba(157,157,157,.3);
		.plan_head {
			height: 109rpx;
			line-height: 109rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid rgba(233,234,237,.9);
			.head_right {
				font-size: 24rpx;
				display: flex;
				align-items: center;
				.del {
					display: block;
					width: 54rpx;
					height:54rpx;
					text-align: center;
					line-height: 54rpx;
					background-color: #F4F4F6;
					font-size: 36rpx;
					border-radius: 50%;
					transform: rotateZ(120deg);
					margin-left: 10rpx;
					box-shadow: 0rpx 0rpx 2rpx #fff;
				}
			}
		}
		.paln_content {
			.paln_card {
				margin: 22rpx 0;
				display: flex;
				justify-content: space-between;
				.content_text {
					font-size: 28rpx;
					color: #747474;
				}
				.content_num {
					font-size: 32rpx;
					color: #000;
				}
				.date {
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
				}
			}
		}
	}
	
}
</style>
