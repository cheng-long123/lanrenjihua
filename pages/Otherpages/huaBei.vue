<template>
	<view class="shuokuan">
		<view class="user_info">
			<text @longtap="longtap">输入信息</text>
		</view>
		<view class="form">
			<view class="user_input">
				 <text class="user_text" style="font-size: 32rpx;">姓名</text>
				<input type="text" v-model="username" placeholder="姓名"/>
			</view>
			<view class="user_input">
				 <text class="user_text">身份证</text>
				<input type="text" v-model="identity" placeholder="身份证号"/>
			</view>
			<view class="user_input">
				 <text class="user_text">结算卡号</text>
				<input type="text" v-model="bank_card" placeholder="结算卡号"/>
			</view>
			<view class="user_input">
				 <text class="user_text">收款金额</text>
				<input type="text" v-model="money" placeholder="收款金额"/>
			</view>
			<view class="user_card" @click="getPayType">
				 <text class="user_text" style="font-size: 28rpx; margin-bottom: 15rpx;" >支付类型</text>
				<picker class="picker" :range="typeName"  :value="index"  @change="payType">
					<view>{{typeName[index]}}</view>
				</picker>
				<!-- <view class="add_card">
					+添加信用卡
				</view> -->
			</view>
		</view>
		<wyb-popup ref="pay" z-index="22" type="center" height="400" width="500" radius="6" @maskClose="maskClose" @longtap="longtap">
		    <view class="popup-content" @longtap="longtap">
		      <tki-qrcode
				 class="tki-qrcode"
		         ref="qrcode"
		         :val="tkiqrcode.val"
		         :size="tkiqrcode.size"
		         :unit="tkiqrcode.unit"
		         :background="tkiqrcode.background"
		         :foreground="tkiqrcode.foreground"
		         :pdground="tkiqrcode.pdground"
		         :loadMake="tkiqrcode.loadMake"
		         @result="qrR" />
				 <view class="qrcode-text" @click="longtap">请截屏保存二维码支付</view>
		    </view>
			
		</wyb-popup>
		<button class="btn" @click="confirmSubmit">提交</button>
	</view>
</template>

<script>
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import { pathToBase64, base64ToPath } from '@/api/index.js'
	export default {
		data() {
			return {
				tkiqrcode: {
					val: '',
					img: "", // 生成的图片base64或图片临时地址
					size: 250,// 生成的二维码大小
					unit: 'upx',
					background: '#ffffff',
					foreground: '#4481EB',
					pdground: '#4481EB',
					onval: true, // 监听val值变化自动重新生成二维码
					loadMake: true
				},
				usertoken: '',
				money: '',  // 金额
				username: '', //姓名
				identity: '',// 身份证号
				bank_card: '', //结算卡号
				fee: 0.06, // 费率
				index: 0,
				pay_type: [
					{
					name: '连尚钱包',
					type: 'LS01',
					},{
					name: '微信',
					type: 'TX01',
					},{
					name: '支付宝',
					type: 'ZFB01',
					},{
					name: '银联扫码',
					type: 'CUP01',
					}
					],
				typeName: ['请选择支付类型'],
				Paytype: []
			}
		},
		components:{
			 wybPopup,
			 tkiQrcode
		},
		props:{
		},
		onLoad() {
			uni.getStorage({
				key: 'usertoken',
				success: (res) => {
					this.usertoken = res.data
					this.getUserInfo()
					// this.getXingList()
					// console.log(res);
				},
				
			})
			// console.log(this._saveCode());
		},
		methods: {
			// hhh () {
			// 	console.log(123);
			// },
			payType (e) {
				// console.log(e);
				this.index = e.target.value
				// console.log(this.typeName[this.index]);
				// console.log(this.Paytype[this.index]);
			}, // 遍历类型
			getPayType () {
				this.typeName = []
				for (let i = 0; i < this.pay_type.length; i++) {
					 this.typeName.push(this.pay_type[i].name) 
					 this.Paytype.push(this.pay_type[i].type)
				}
				// console.log(this.typeName,this.Paytype);
			},
			 //用户信息
			async getUserInfo () {
				const { data } = await this.Request({
					method: 'GET',
					url: '/Userforeign/user_query',
					data: {
						token: this.usertoken.token,
						cre_id: this.usertoken.cre_id
					}
				})
				// console.log(data);
				if (data.status == 1) {
					this.username = data.data.bank_name
					this.identity = data.data.identity
					this.bank_card = data.data.bank_card
				}
			}, // 发送请求生成二维码
			async confirmSubmit () {
				// this.$refs.pay.show() // 显示
				if (this.money === '') {
					return uni.showToast({
						title: '金额不能为空',
						icon: 'none'
					})
				} else if (this.typeName[0] == '请选择支付类型') {
					return uni.showToast({
						title: '请选择支付类型',
						icon: 'none'
					})
				}
				uni.showLoading({
					mask: true
				})
				// console.log(this.tkiqrcode.img);
				const { data } = await this.Request({
					method: 'POST',
					url: '/Shengfuapp/scan_shou',
					data: {
						number: this.usertoken.number,
						holder_name: this.username,
						idCard: this.identity,
						settlement: this.bank_card,
						money: this.money,
						fee: this.fee,
						pay_type: this.Paytype[this.index]
					}
				})
				console.log(data)
				if (data.status == 1) {
					uni.hideLoading()
					this.tkiqrcode.val = data.data
					this.$refs.pay.show() // 显示
					this.qrR()
				} else {
					uni.hideLoading()
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
				}
				
			}, //遮罩层关闭提示
			maskClose () {
				uni.showModal({
				    title: '提示',
				    content: '是否关闭此次交易？',
				    success:  (res) => {
				        if (res.confirm) {
				           this.$refs.pay.hide() // 隐藏
				        } else if (res.cancel) {
				            // console.log('用户点击取消');
				        }
				    }
				})
			},
			qrR (res) {
				this.tkiqrcode.img = res;
				// console.log(res);
				// console.log(this.tkiqrcode.val);
			},// 长按保存图片
			longtap (){
				console.log(this.tkiqrcode.img);
				uni.saveImageToPhotosAlbum({
					filePath: this.tkiqrcode.img,
					success: function () {
						uni.showToast({
							title: '二维码保存成功',
							icon: 'success',
							duration: 2000
						});
					}
				});
			},
		}
	}
</script>

<style lang='scss' scoped>
.shuokuan {
	box-sizing: border-box;
	padding: 50rpx;
	/* background-color: #fff; */
	.user_info {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		padding: 40rpx 0;
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
		margin-top: 120rpx;
	}
	.popup-content {
		.tki-qrcode {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			margin: 0 auto;
		}
		.qrcode-text {
			text-align: center;
			font-size: 28rpx;
			margin-top: 10rpx;
		}
	}
	
}
</style>
