<template>
	<view v-if="isShow">
		<wyb-transition :contentStyle="maskRoot" :isContentShow="isPopupShow" :typeList="['fade']" :duration="duration">
			<view :style="maskRoot" @tap="close" />
		</wyb-transition>

		<wyb-transition 
		 mode="ease-out"
		 :contentStyle="root" 
		 :isContentShow="isPopupShow" 
		 :zoomLessenMulti="zoomLessenMulti" 
		 :multi="slideMulti"
		 :typeList="popupAnim" 
		 :duration="duration">
			<view class="close" :style="closeRoot">
				<image
				 v-if="showCloseIcon&&closeIcon"
				 :src="closeIcon"
				 @tap="hide"
				 :style="{
					 position: 'absolute',
					 width: closeIconSize + 'rpx',
					 height: closeIconSize + 'rpx'}" />
				<view v-if="showCloseIcon&&!closeIcon" class="iconfont icon-close" @tap="hide" />
			</view>
			<view class="container" :style="{overflow: overflow}">
				<slot></slot>
			</view>
		</wyb-transition>
	</view>
</template>

<script>
	import wybTransition from '../wyb-transition/wyb-transition.vue'
	export default {
		components: {
			wybTransition
		},
		data() {
			return {
				w: uni.getSystemInfoSync().screenWidth,
				h: uni.getSystemInfoSync().screenHeight,
				root: '',
				maskRoot: '',
				closeRoot: '',
				isShow: false,
				isPopupShow: false,
				popupAnim: ['slide-up']
			}
		},
		props: {
			type: {
				type: String,
				default: 'bottom'
			},
			mode: {
				type: String,
				default: 'size-auto'
			},
			height: {
				type: [String, Number],
				default: 400
			},
			width: {
				type: [String, Number],
				default: 500
			},
			radius: {
				type: [String, Number],
				default: 0
			},
			zIndex: {
				type: [String, Number],
				default: 10076
			},
			maskClickClose: {
				type: Boolean,
				default: true
			},
			maskAlpha: {
				type: Number,
				default: 0.5
			},
			duration: {
				type: Number,
				default: 400
			},
			showCloseIcon: {
				type: Boolean,
				default: false
			},
			closeIconPos: {
				type: String,
				default: 'top-right'
			},
			closeIcon: {
				type: String,
				default: ''
			},
			closeIconSize: {
				type: [String, Number],
				default: '20'
			},
			vertOffset: {
				type: [String, Number],
				default: '22'
			},
			horiOffset: {
				type: [String, Number],
				default: '22'
			},
			centerAnim: {
				type: String,
				default: 'zoom-lessen'
			},
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			zoomLessenMulti: {
				type: Number,
				default: 1.15
			},
			slideMulti: {
				type: Number,
				default: 1
			},
			overflow: {
				type: String,
				default: 'hidden'
			},
			negativeTop: {
				type: Number,
				default: 0
			}
		},
		methods: {
			processStyle() {
				let style = 'z-index: ' + this.zIndex + '; '
				style += 'background-color: ' + this.bgColor + '; position: fixed; '
				switch (this.type) {
					case 'bottom':
						if (this.mode === 'size-fixed') {
							style += 'height: ' + this.height + 'rpx; '
						} else if (this.mode === 'size-auto') {
							style += 'min-height: ' + this.height + 'rpx; '
							style += 'height: auto; '
						}
						style += 'bottom: 0;  left: 0;  right: 0; '
						style += 'border-top-left-radius: ' + this.radius + 'px; '
						style += 'border-top-right-radius: ' + this.radius + 'px; '
						style += 'width: 100%; '
						this.popupAnim = ['slide-up']
						// #ifdef H5
						let winHeight = uni.getSystemInfoSync().windowHeight
						uni.onWindowResize(res => {
							style += 'bottom:' + winHeight - res.size.windowHeight + ';'
							this.root = this.processStyle()
						})
						// #endif
						break

					case 'top':
						if (this.mode === 'size-fixed') {
							style += 'height: ' + this.height + 'rpx; '
						} else if (this.mode === 'size-auto') {
							style += 'min-height: ' + this.height + 'rpx; '
							style += 'height: auto; '
						}
						style += 'top: 0;  left: 0;  right: 0; '
						style += 'border-bottom-left-radius: ' + this.radius + 'px; '
						style += 'border-bottom-right-radius: ' + this.radius + 'px; '
						style += 'width: 100%; '
						this.popupAnim = ['slide-down']
						break

					case 'left':
						if (this.mode === 'size-fixed') {
							style += 'width: ' + this.width + 'rpx; '
						} else if (this.mode === 'size-auto') {
							style += 'min-width: ' + this.width + 'rpx; '
							style += 'width: auto; '
						}
						style += 'height: 100%; '
						style += 'top: 0;  left: 0;  bottom: 0; '
						style += 'border-top-right-radius: ' + this.radius + 'px; '
						style += 'border-bottom-right-radius: ' + this.radius + 'px; '
						this.popupAnim = ['slide-left']
						break

					case 'right':
						if (this.mode === 'size-fixed') {
							style += 'width: ' + this.width + 'rpx; '
						} else if (this.mode === 'size-auto') {
							style += 'min-width: ' + this.width + 'rpx; '
							style += 'width: auto; '
						}
						style += 'height: 100%; '
						style += 'top: 0;  right: 0;  bottom: 0; '
						style += 'border-top-left-radius: ' + this.radius + 'px; '
						style += 'border-bottom-left-radius: ' + this.radius + 'px; '
						this.popupAnim = ['slide-right']
						break

					case 'center':
						style += 'border-radius: ' + this.radius + 'px;'
						style += 'width: ' + this.width + 'rpx; '
						style += 'height: ' + this.height + 'rpx; '
						let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
						let windowHeight = uni.getSystemInfoSync().windowHeight
						style += 'left: ' + (this.w - this.rpxToPx(this.width)) / 2 + 'px; top: ' + (((this.h - this.rpxToPx(this.height)) / 2) -
							44 - statusBarHeight - this.negativeTop) + 'px; '
						// #ifdef H5
						style += 'left: ' + (this.w - this.rpxToPx(this.width)) / 2 + 'px; top: ' + ((windowHeight - this.rpxToPx(this.height)) / 2 - 
						this.negativeTop) + 'px; '
						uni.onWindowResize(res => {
							style += 'left: ' + (this.w - this.rpxToPx(this.width)) / 2 + 'px; top: ' + ((res.size.windowHeight - this.rpxToPx(this.height)) / 
							2 - this.negativeTop) + 'px; '
							this.root = this.processStyle()
						})
						// #endif
						// #ifdef MP-WEIXIN
						let navBarHeight = wx.getMenuButtonBoundingClientRect().bottom
						style += 'left: ' + (this.w - this.rpxToPx(this.width)) / 2 + 'px; top: ' + ((this.h - this.rpxToPx(this.height)) / 2 -
							statusBarHeight - navBarHeight) + 'px; '
						// #endif
						if (this.centerAnim === 'zoom-lessen') {
							this.popupAnim = ['fade', 'zoom-lessen']
						} else if (this.centerAnim === 'zoom-largen') {
							this.popupAnim = ['fade', 'zoom-largen']
						} else if (this.centerAnim === 'fade') {
							this.popupAnim = ['fade']
						} else if (this.centerAnim === 'bounce') {
							this.popupAnim = ['bounce', 'fade']
						} else if (this.centerAnim === 'slide-up') {
							this.popupAnim = ['fade', 'slide-up']
						} else if (this.centerAnim === 'slide-down') {
							this.popupAnim = ['fade', 'slide-down']
						}						
						break
				}
				return style
			},
			processMask() {
				let style = 'z-index: ' + (parseInt(this.zIndex) - 1) + '; '
				style += 'background-color: rgba(0, 0, 0, ' + this.maskAlpha +
					'); position: fixed; top: 0; left: 0; right: 0; bottom: 0;'
				style += 'width: ' + this.w + 'px; '
				style += 'height: ' + this.h + 'px; '
				return style
			},
			processClose() {
				let style = 'position: fixed; font-size: 40rpx; color: #808080;'
				switch (this.closeIconPos) {
					case 'top-right':
						style += 'top: '+this.vertOffset+'rpx; right: '+this.horiOffset+'rpx;'
						break
					case 'top-left':
						style += 'top: '+this.vertOffset+'rpx; left: '+this.horiOffset+'rpx;'
						break
					case 'bottom-left':
						style += 'bottom: '+this.vertOffset+'rpx; left: '+this.horiOffset+'rpx;'
						break
					case 'bottom-right':
						style += 'bottom: '+this.vertOffset+'rpx; right: '+this.horiOffset+'rpx;'
						break
				}
				if (this.closeIcon) {
					style += 'width: ' + this.closeIconSize + 'rpx; height: ' + this.closeIconSize + 'rpx;'
				}
				return style
			},
			close() {
				this.$emit('maskClose')
			},
			show() {
				this.root = this.processStyle()
				this.maskRoot = this.processMask()
				this.closeRoot = this.processClose()
				this.isShow = true
				setTimeout(function() {
					this.isPopupShow = true
					setTimeout(function() {
						this.$emit('show')
					}.bind(this), this.duration + 10)
				}.bind(this), 10)
			},
			hide() {
				this.isPopupShow = false
				setTimeout(function() {
					this.isShow = false
					this.$emit('hide')
				}.bind(this), this.duration + 10)
			},
			rpxToPx(rpx) {
				return rpx / 750 * this.w
			}
		}
	}
</script>

<style>
	@import "./iconfont.css";
	.container {
		width: 100%;
		height: 100%;
	}
</style>
