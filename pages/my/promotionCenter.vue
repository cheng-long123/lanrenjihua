<template>
	<view class="mybankcard">


		<view class="">
			<view class="position-relative ">
				<swiper :indicator-dots="true" :autoplay="false" @change="swiperChange" :interval="3000" :duration="1000" style="height: 1246rpx;">
					<block v-for="(item,index) in imgfromapi" :key='index'>
						<swiper-item>
							<view class="">
								<image :src="'http://dh.weifoupay.com'+item.curl" mode="" class="tuiguang"></image>
								<view class="" v-if="index==0" style="display: flex;width: 100%;justify-content: center;">
									<image class="erweima" aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: -642rpx;"></image>
								</view >
								<view class="" v-if="index==1" style="display: flex;width: 100%;justify-content: center;">
									<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: -380rpx;"></image>
								</view>
								<view class="" v-if="index==2">
									<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: -355rpx;margin-left: 118rpx;"></image>
								</view>
								<view class="" v-if="index==3" style="text-align: center">
									<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: -330rpx;margin-left: -150rpx;"></image>
								</view>
								<view class="" v-if="index==4"  style="text-align: center">
									<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: -440rpx;margin-left: -100rpx; width: 200rpx; height: 200rpx;"></image>
								</view>
								<view class="" v-if="index==5" style="display: flex;width: 100%;justify-content: center;">
									<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: -900rpx; "></image>
								</view>
							</view>
						</swiper-item>
					</block>
				</swiper>
				<!-- <swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" style="height: 1246rpx;">
					<swiper-item>
						<image class="tuiguang" src="../../static/images/baofutong/tuiguang-1.png" alt=""></image>
						<view class="posab w-100 tc-db2935 text-center mterwei">
							<text class="phone" style="margin-top: -250rpx;">{{phone}}</text>
							<view class="">
								<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: -230rpx;"></image>
							</view>

							<p class=" fw-bd fz-16">扫一扫下载APP</p>
							<p class="mt-1">还款/赚钱/办卡/贷款</p>
						</view>
					</swiper-item>
					<swiper-item>
						<image class="tuiguang" src="../../static/images/lrjh/bg5.png" alt=""></image>
						<view class="posab w-100 tc-db2935 text-center mterwei">
							<text class="phone">{{phone}}</text>
							<view class="">
								<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: 20rpx;"></image>
							</view>

							<p class=" fw-bd fz-16">扫一扫下载APP</p>
							<p class="mt-1">还款/赚钱/办卡/贷款</p>
						</view>
					</swiper-item>
					<swiper-item>
						<image class="tuiguang" src="../../static/images/lrjh/bg4.jpg" alt=""></image>
						<view class="posab w-100 tc-db2935 text-center mterwei">
							<text class="phone" style="color: #FFFFFF;margin-left: 10rpx;margin-top: -10rpx;">{{phone}}</text>
							<view class="">
								<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: 10rpx;margin-left: -260rpx;"></image>
							</view>

							<p class=" fw-bd fz-16">扫一扫下载APP</p>
							<p class="mt-1">还款/赚钱/办卡/贷款</p>
						</view>

					</swiper-item>
					<swiper-item>
						<image class="tuiguang" src="../../static/images/lrjh/bg3.jpg" alt=""></image>
						<view class="posab w-100 tc-db2935 text-center mterwei">
							<text class="phone" style="color: #FFFFFF;margin-top: 10rpx;">{{phone}}</text>
							<view class="">
								<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: 38rpx;margin-left: :;rpx;"></image>
							</view>

							<p class=" fw-bd fz-16">扫一扫下载APP</p>
							<p class="mt-1">还款/赚钱/办卡/贷款</p>
						</view>
					</swiper-item>
					<swiper-item>
						<image class="tuiguang" src="../../static/images/lrjh/bg1.jpg" alt=""></image>
						<view class="posab w-100 tc-db2935 text-center" style="margin-top: -700rpx;">
							<text class="phone" style="color: #000000;margin-top: -230rpx;margin-left: 160rpx;">{{phone}}</text>
							<view class="">
								<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: -200rpx;margin-left: 30rpx;"></image>
							</view>

						</view>
					</swiper-item>
					<swiper-item>
						<image class="tuiguang" src="../../static/images/lrjh/bg2.jpg" alt=""></image>
						<view class="posab w-100 tc-db2935 text-center">
							<text class="phone" style="color: #000000;margin-top: -320rpx;margin-left: 370rpx">{{phone}}</text>
							<view class="">
								<image class="erweima " aspectFit :src="erweimaImg" alt="" style="z-index: 1000;margin-top: -300rpx;margin-left: 450rpx"></image>
							</view>
						<p class="mt-1">还款/赚钱/办卡/贷款</p> 
						</view>
					</swiper-item>
				</swiper>
 -->

			</view>
		</view>
		<!-- <view class="hongbaocontain" v-if="showhongbao">
			<image src="../../static/images/index/hidehongbao.png" class="hidehongbao" @click="hidehongbao"></image>
			<image src="../../static/images/index/lijilingqu.png" class="lijilingqu" @click="tohongbaolist"></image>
			<image src="../../static/images/index/hongbao.png" class="hongbao"></image>

		</view> -->

	</view>
</template>

<script>
	export default {
		onLoad() {
			// this.geterweima()
			uni.getStorage({
				key: 'usertoken',
				success: res => {
					this.erweimaImg = 'http://dh.weifoupay.com/payapi/Real/generalize?cre_id=' + res.data.cre_id
					this.phone = res.data.phone
					this.userId = res.data.cre_id
					this.token = res.data.token
					this.cre_id = res.data.cre_id
					// this.geterweima()
				}
			});
			this.getimgformapi()
		},

		onNavigationBarButtonTap(e) {
			this.formSubmit();
		},
		onReady() {
			const that = this;
			//防止切图成白屏
			setTimeout(function() {
				that.toImage();
			}, 1500);
		},

		data() {
			return {
				erweimaImg: "",
				shareImg: '',
				phone: '',
				userId: '',
				//是否展示红包--用于分享后测试-false=>true
				showhongbao: false,
				cre_id: '',
				token: '',
				shareimage: '',
				imgfromapi: [],
			}
		},

		methods: {
			swiperChange (e) {
				this.shareimage = this.imgfromapi[e.target.current].curl
			},
			async getimgformapi() {
				const { data } = await this.Request({
					url: '/Info/advertisement'
				})
				this.$data.imgfromapi = data.data
				console.log(data);
			},
			async geterweima() {
				const { data } = await this.Request({
					url: '/Real/generalize',
					method: 'POST',
					data: {
						cre_id: this.$data.cre_id,
						token: this.$data.token
					},
				})
				console.log(data);
				if (data.status === 4) {
					this.baseLogout()
				} else {
					// console.log(res)
					// let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
					// toBase64Url = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
					let toBase64Url = 'data:image/jpeg;base64,' + data
				
					console.log(toBase64Url);
					this.erweimaImg = 'data:image/jpeg;base64,' + data
					console.log(this.erweimaImg)
					// console.log(GetImageInfoOption(res.data))
					// uni.getImageInfo({
				
					// })
				}
			},
			hidehongbao() {
				this.showhongbao = false
			},
			tohongbaolist() {
				uni.navigateTo({
					url: 'myredpocket'
				})
			},
			formSubmit() {
				//#ifdef H5
				uni.showToast({
					title:'请截屏保存后进行分享!',
					icon:'none',
					duration:1500
				})
				//#endif
				// this.toImage()
				// const that = this
				uni.share({
					title: '懒人计划',
					provider: "weixin",
					scene: "WXSceneSession",
					type: 2,
					imageUrl: 'http://dh.weifoupay.com' + this.shareimage,
					success: (res) => {
						this.shareimage = ''
						uni.showToast({
							title: '已分享',
							duration: 2000
						});
						// that.showhongbao = !that.showhongbao
					},
					//微信需要先授权才能分享，所以第一次会报错，此处待优化
					fail: (err) => {
						uni.share({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 2,
							imageUrl: 'http://dh.weifoupay.com' + this.shareimage,
							success: (res) => {
								uni.showToast({
									title: '已分享',
									duration: 2000
								});
								// that.showhongbao = !that.showhongbao
							},
						});
					}
				});
			},
			// formSubmit() {
			// 	const that = this
			// 	uni.share({
			// 		provider: "weixin",
			// 		scene: "WXSceneSession",
			// 		type: 2,
			// 		imageUrl: this.shareImg,
			// 		success: function(res) {


			// 			uni.showToast({
			// 				title: '已分享',
			// 				duration: 2000
			// 			});
			// 			that.showhongbao = !that.showhongbao


			// 			// console.log(that.showhongbao)
			// 		},
			// 		fail: function(err) {
			// 			console.log(err)
			// 			uni.showToast({
			// 				title: err.errMsg,
			// 				duration: 2000,
			// 				icon: 'none'
			// 			});
			// 		}
			// 	});
			// },
			//获取屏幕截图
			getImage() {
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// console.log(pages.length);
				let ws = page.$getAppWebview();
				let bitmap = null;
				bitmap = new plus.nativeObj.Bitmap('amway_img');
				// console.log(pages,page,ws,bitmap)
				// 将webview内容绘制到Bitmap对象中  
				ws.draw(bitmap, () => {
					// 保存图片到本地  
					bitmap.save("_doc/adrawScreen.jpg", {
						overwrite: true,
					}, res => {
						console.log(res); // 图片地址  
						this.shareimage = res.target 
					}, error => {
						console.log(JSON.stringify(error)); // 保存失败信息  
					});
					bitmap.clear(); // 清除Bitmap对象  
				}, error => {

					console.log(JSON.stringify(error)); // 绘制失败  
				}, {
					check: true, // 设置为检测白屏  
				});
			},

			toImage() {
				const that = this;
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				let bitmap = null;
				/* 获取屏幕信息 */
				let currentWebview  = page.$getAppWebview();
				
				 bitmap = new plus.nativeObj.Bitmap('test');
				// 将webview内容绘制到Bitmap对象中
				currentWebview.draw(
					bitmap,
					function(e) {
						/* 获取base64 */
						that.test = bitmap.toBase64Data();
						/* 加载base64编码 */
						bitmap.loadBase64Data(
							bitmap.toBase64Data(),
							function() {
								// console.log('加载Base64图片数据成功');
								/* 保存图片 */
								bitmap.save(
									'_doc/share.jpg', {},
									async (i) => {
											console.log(i.target)
											
											// console.log('保存图片成功：' + JSON.stringify(i));
											uni.saveImageToPhotosAlbum({
												filePath: i.target,
												success: function() {
													
													/* 清除 */
													bitmap.clear();
													// console.log('保存成功,请到相册中查看')
													that.shareimage = i.target
												},
												fail(e) {
													// console.log('保存失败')
												}
											});
										},
										function(e) {
											// console.log('保存图片失败：' + JSON.stringify(e));
										}
								);
							},
							function() {
								// console.log('加载Base64图片数据失败：' + JSON.stringify(e));
							}
						);
					},
					function(e) {
						// console.log('截屏绘制图片失败：' + JSON.stringify(e));
					}, {
						check: true, // 设置为检测白屏
						clip: {
							top: '70px',
							left: '0px',
							height: '100%',
							width: '100%'
						} // 设置截屏区域
					}
				);
			},

		},
		components: {

		}
	}
</script>

<style lang="scss" scoped>

	.hidehongbao {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		top: 300rpx;
		margin-left: 75%;
	}

	.lijilingqu {
		width: 50%;
		margin-left: 25%;
		height: 100rpx;
		position: absolute;
		top: 800rpx;
		// margin-top: 200rpx;
		z-index: 1002;
	}

	.hongbao {

		margin-top: 400rpx;
		height: 600rpx;
		z-index: 1001;
		width: 95%;
		margin-left: 2.5%;
	}

	.hongbaocontain {
		top: 0;
		position: absolute;
		background-color: rgba(85, 85, 85, 0.8);
		width: 100%;
		height: 1246rpx;
	}

	.mybankcard {
		.erweima {
			width: 300rpx;
			height: 300rpx;
			position: absolute;
			z-index: 1000;
			width: pxToRem(180);
			height: pxToRem(180);
			margin-bottom: 20%;
		}

		.phone {
			position: absolute;
			top: -25rpx;
			color: #333333;
		}

		.mterwei {
			top: 890rpx;
		}

		.posab {
			position: absolute;
			// bottom: 10%;
		}

		.tuiguang {
			width: 100%;
			height: 1246rpx;
		}

		.mtb {
			padding-top: 60%;
			padding-bottom: 40%;
		}

		.liji {
			height: pxToRem(88);
			line-height: pxToRem(88);
		}

		.chuangjian {
			height: pxToRem(88);
			line-height: pxToRem(88);
			margin-bottom: 50%;
		}

		.viewml {
			margin-left: pxToRem(120);
		}

		.header {
			border-bottom: 1px solid #e5e5e5;
		}

		.icon_fanhui2 {
			width: pxToRem(18);
			height: pxToRem(30);
		}

		.append {
			box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.1);
			color: #3691e9;
			height: pxToRem(98);
			line-height: pxToRem(98);
		}

		.bankcard {
			position: relative;

			.wenzi {
				width: 100%;
				position: absolute;
				top: pxToRem(20);
				line-height: pxToRem(22);
				text-align: left;
				color: white;
			}
		}
	}

	.content {
		width: 100%;
		margin: 20px auto;
	}

	.content .uni-input {
		width: 80%;
		height: 45px;
		margin: 8px auto;
		border: 1px solid #ccc;
		margin-bottom: 8px;
		padding-left: 8px;
		border-radius: 10px;
		font-size: 16px;
		color: #333;
	}

	.content button {
		width: 80%;
		height: 45px;
		line-height: 45px;
		margin: 8px auto;
		border: 1px solid #ccc;
		margin-bottom: 8px;
		padding-left: 8px;
		border-radius: 10px;
		font-size: 16px;
		color: #fff;
		background: #56b273;
		border: none;
	}

	button::after {
		border: none;
	}

	.content .banquan {
		text-align: center;
		margin-top: 50px;
		font-size: 15px;
		color: #666;
	}
</style>
