<template>
	<view class="orderdetail">
		<!-- 头部 -->
		<view class="top_head">
			<view class="head_num">
				<view class="money">
					<view class="num">{{ profitList !== '' ? profitList.day_money : '0'}}</view>
					<view class="text">今日分润</view>
				</view>
				<view class="center_num"></view>
				<view class="money">
					<view class="num">{{profitList !== '' ? profitList.total : '0'}}</view>
					<view class="text">分润金额</view>
				</view>
			</view>
			<view class="head_btn">
				<button v-if="stardate === ''" class="btn" type="default" @click="onStardate">开始时间</button>
				<button v-else class="btn" @click="onStardate">{{stardate}}</button>
				<button v-if="enddate === ''" class="btn" type="default" @click="onEnddate">结束时间</button>
				<button v-else class="btn" @click="onEnddate">{{enddate}}</button>
			</view>
			<!-- 开始 -->
			    <w-picker
			        :visible.sync="visible1"
			        mode="date" 
			        :current="current"
			        fields="day"
			        @confirm="stardConfirm($event,'date')"
			        @cancel="onCancel"
			        :disabled-after="false"
			        ref="date" 
			    ></w-picker>
				<!-- 结束 -->
				<w-picker
			        :visible.sync="visible2"
			        mode="date" 
			        :current="current"
			        fields="day"
			        @confirm="endConfirm($event,'date')"
			        @cancel="onCancel"
			        :disabled-after="false"
			        ref="date" 
			    ></w-picker>
		</view>
		<!-- 明细 -->
		<view class="content" v-show="isshow">
			<view class="year">分润金额</view>
			<view class="detail" v-for="item in profitList.list" :key="item.id" @click="toProfitParticulars(item.id)">
				<view class="detail-text">
					<view class="text">时间</view>
					<view
					  class="datemoney">{{item.date_time}}</view>
				</view>
				<view class="detail-text">
					<view class="text">分润金额</view>
					<view
					  class="datemoney">{{item.fee_money}}</view>
				</view>
				<view class="img">
					<image class="image" src="../../static/image/right-btn.png" mode=""/>
				</view>
			</view>
		</view>
		<view class="tishi" v-show="profitList === ''"  >
			点击开始时间和结束时间查询
		</view>
	</view>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue"
export default {
	data() {
		return {
			isshow: false,
			visible1: false,
			visible2: false,
			current: true,
			stardate: '',
			enddate: '',
			usertoken: '',
			profitList: '',
			id:'',
			cre_id: ''
		}
	},
	onLoad(option) {
		uni.getStorage({
			key: 'usertoken',
			success: (res) => {
				this.usertoken = res.data
				this.cre_id = res.data.cre_id
			}
		})
		// if (option.id !== undefined) {
		// 	this.id = option.id
		// }
		this.id = option.id
		
	},
	components:{
		wPicker
	},
	methods: {
		// 开始、
		onStardate () {
			this.visible1 = true
		},
		stardConfirm (e) {
			// console.log(e);
			this.stardate = e.result
			console.log(this.stardate);
		}, // 结束
		onEnddate () {
			this.visible2 = true
		},
		endConfirm (e) {
			// console.log(e);
			this.enddate = e.result
			console.log(this.enddate);
		},
		async getProfitlist () {
			uni.showLoading({
				mask: true
			})
			const { data } = await this.Request({
				method: 'GET',
				url: '/OrderPart/arelist',
				data: {
					token: this.usertoken.token,
					cre_id: this.id || this.cre_id,
					start_time: this.stardate,
					end_time: this.enddate
				}
			})
			console.log(data);
			if (data.status === 1) {
				uni.hideLoading()
				if (data.msg === "当日无数据") {
					this.isshow = false
					uni.showToast({
						title: '查询成功,暂无数据'
					})
				} else {
					this.isshow = true
					this.profitList = data.data
					uni.showToast({
						title: '查询成功',
						duration: 2000,
						icon: 'none'
					})
				}
			} else if (data.status === 2) {
				uni.hideLoading()
				uni.showToast({
					title: data.msg,
					icon: 'none'
				})
			} else if (data.status === 4) {
				this.baseLogout()
			} else {
				uni.hideLoading()
				this.isshow = false
				uni.showToast({
					title: '没有相关记录',
					duration:2000,
					icon: 'none'
				})
			}
		},
		toProfitParticulars (id) {
			uni.navigateTo({
				url: './profitParticulars?id=' + id
			})
		}
	},
	watch: {
		stardate () {
			if (this.stardate !== '' && this.enddate !== '') {
				this.getProfitlist()
			}
		},
		enddate () {
			if (this.stardate !== '' && this.enddate !== '') {
				this.getProfitlist()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.orderdetail{
	.top_head{
		width: 100%;
		height: 376rpx;
		background:#005BEA;
		border-radius: 0 0 50rpx 50rpx;
		.head_num{
			width: 100%;
			height: 244rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #fff;
			.money{
				display: flex;
				flex-direction: column;
				justify-items: center;
				align-items: center;
				font-size: 50rpx;
				.text{
					font-size: 24rpx;
					color: rgba(255,255,255,.8);
				}
			}
			.center_num {
				width: 1rpx;
				height: 81rpx;
				background-color: rgba(255,255,255,.5);
			}
		}
		.head_btn {
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.btn {
				width: 200rpx;
				height: 77rpx;
				line-height: 77rpx;
				background-color: #fff;
				font-size: 25rpx;
				color: #4481EB;
				border-radius: 40rpx;
				font-weight: 600;
				text-align: center;
			}
		}
	}
	.content {
		.year{
			width: 100%;
			height: 110rpx;
			line-height: 110rpx;
			text-align: center;
			font-weight: 700;
			font-size: 40rpx;
			color: #000;
		}
		.detail {
			height: 105rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-bottom: 1rpx solid rgba(233,234,237,.7);
			.detail-text {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				.text{
					font-size: 24rpx;
					color: rgba(0,0,0,.6);
					margin-bottom: 10rpx;
				}
				.datemoney {
					font-size: 30rpx;
				}
			}
			.image {
				// display: block;
				width: 16rpx;
				height: 30rpx;
			}
		}
	}
	.tishi {
		margin-top: 100rpx;
		text-align: center;
		font-size: 34rpx;
		color: #878787;
	}
}
</style>
