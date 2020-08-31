<template>
	<view class="Certification">
		<view class="title">
			设置成功后可通过账号密码登录
		</view>
		<view class="shiming_box">
			<view class="input_text">
				<text class="text">银行预留手机号</text>
				<input type="text" v-model="bank_phone"  placeholder-class="input-placeholder" placeholder="请输入银行预留手机号"/>
			</view>
			<view class="input_text">
				<text class="text">储蓄卡号</text>
				<input type="text" v-model="bank_card"  placeholder-class="input-placeholder" placeholder="请输入储蓄号"/>
			</view>
			<view class="input_text">
				<text class="text">姓名</text>
				<input type="text" v-model="bank_name"  placeholder-class="input-placeholder" placeholder="请输入姓名"/>
			</view>
			<view class="input_text">
				<text class="text">身份证</text>
				<input type="text" v-model="identity"  placeholder-class="input-placeholder" placeholder="请输入身份证号"/>
			</view>
			
			<view class="uni-list" style="font-size: 32rpx;margin: 0 20rpx;">
				<view class="sex">
					性别
				</view>
				<radio-group @change="radioChange" style="display: flex;">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value" style="display: flex;margin: 0 30rpx;">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view style="margin-top: 10rpx;">{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			
			<view class="pickeybox">
				<pick-regions class="picker" :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<text class="pick_text">点击选择省市区</text>
				</pick-regions>
				<text class="picketname">{{regionName}}</text>
			</view>
			<button class="btn"  type="filled" @click="shiming">实名认证</button>
		</view>
	</view>
</template>

<script>
import pickRegions from '@/components/pick-regions/pick-regions.vue'
export default {
	data() {
		return {
			usertoken: '',
			items: [{
				value: '1',
				name: '男'
				},
				{
					value: '2',
					name: '女',
					checked: 'true'
				}
			],
			gender: '1',
			current: 0,
			bank_name: '',
			bank_phone: '',
			bank_card: '',
			identity: '',
			region:[],
			defaultRegion:['江苏省','苏州市','吴中区'],
			defaultRegionCode:'320506'
		}
	},
	onLoad() {
		uni.getStorage({
			key: 'usertoken',
			success: (res) => {
				this.usertoken = res.data
				this.getuserinfo()
			}
		})
	},
	components:{ pickRegions },
	computed:{
		 regionName(){
			// 转为字符串
			return this.region.map(item=>item.name).join(' ')
		}
	},
	methods: {
		 handleGetRegion(region){
				this.region = region
				console.log(region[0].name);
				console.log(this.gender);
			},
			radioChange (e) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === e.target.value) {
						this.current = i;
						this.gender = e.target.value
						break;
					}
				}
			},
			async shiming () {
				uni.showLoading({
					mask: true
				})
				const { data } = await this.Request({
					method: 'POST',
					url: '/Real/personer',
					data: {
						number: this.usertoken.number,
						bank_name: this.bank_name,
						bank_phone: this.bank_phone,
						bank_card: this.bank_card,
						identity: this.identity,
						gender: this.gender,
						province: this.region[0].name,
						city: this.region[1].name,
						area: this.region[2].name,
						token: this.usertoken.token
					}
				})
				if (data.status === 1) {
					this.getuserinfo()
					uni.hideLoading()
					uni.showToast({
						title: '实名认证成功',
						duration: 2000,
						icon: 'none'
					})
					setTimeout(()=> {
						uni.reLaunch({
							url: './index'
						},2000)
					})
					uni.setStorage({
						key: 'shiming',
						data: 1
					})
				} else {
					uni.hideLoading()
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
				}
			},
			async getuserinfo () {
				const { data } = await this.Request({
					method: 'POST',
					url: '/Userforeign/user_query',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id
					}
				})
				console.log(data);
				if (data.status === 1) {
					this.bank_name = data.bank_name
					this.bank_card = data.bank_phone
				} else if (data.status === 4) {
					this.baseLogout()
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
				}
			}
		}
		
}
</script>

<style lang="scss" scoped>
.Certification {
	box-sizing: border-box;
	padding: 0 50rpx 0 50rpx;
	// height: 100%;
	.title {
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		margin-bottom: 20rpx;
		// background-color: #8E8787;
		color: #ecab1f;
	}
	.shiming_box {
		.input_text {
				box-sizing: border-box;
				margin-bottom: 20rpx;
				.text {
					font-size: 30rpx;
					margin-left: 10rpx;
					
				}
				input {
					margin-top: 10rpx;
					border-radius: 40rpx;
					background-color: #E8E8E8 !important;
					padding: 20rpx 15rpx;
					.input-placeholder {
						padding-right: 10rpx;
					}
				}
			}
			.uni-list {
				display: flex;
				justify-content: space;
				align-items: center;
			}
			.pickeybox{
				.picker {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 30rpx 0rpx;
					font-size: 28rpx;
				}
				.picketname{
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.btn {
				width: 90%;
				margin: 30rpx auto;
				border-radius:40rpx;
				background:linear-gradient(to right, #04BEFE,#005BEA);
				color: #fff;
				font-size: 28rpx;
			}
	}
}
</style>
