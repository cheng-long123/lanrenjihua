<template>
	<view :class="contentClass" id="content" v-if="isShow" :animation="animData" :style="root + contentStyle">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * wybTransition 过渡
	 * @description 基于uni.createAnimation()进行封装的，简单过渡动画组件
	 * @property {Boolean} isContentShow = [false|true] 控制组件显示或隐藏
	 * @property {Array} typeList = ['fade', 'slide-up', 'rotate-aw'] 过渡动画类型
	 *  @value fade 渐隐渐现
	 *  @value slide-up         向上滑出
	 *  @value slide-right      向右滑出
	 *  @value slide-down       向下滑出
	 *  @value slide-left       向左滑出
	 * 	@value slide-up-left    向左上方滑出
	 * 	@value slide-up-right   向右上方滑出
	 * 	@value slide-down-left  向左下方滑出
	 * 	@value slide-down-right 向右下方滑出
	 *  @value zoom-largen      缩放（由小到大）
	 *  @value zoom-lesson      缩放（由大到小）
	 *  @value rotate-cw        顺时针旋转而出
	 *  @value rotate-aw        逆时针旋转而出
	 *  @value bounce           弹簧弹出
	 * @property {Number} duration 过渡动画持续时间
	 * @property {String} mode 动画演出模式
	 *  @value linear 		动画从头到尾的速度是相同的
	 *  @value ease 		动画以低速开始，然后加快，在结束前变慢
	 *  @value ease-in 		动画以低速开始
	 *  @value ease-in-out 	动画以低速开始和结束
	 *  @value ease-out 	动画以低速结束
	 *  @value step-start 	动画第一帧就跳至结束状态直到结束
	 *  @value step-end 	动画一直保持开始状态，最后一帧跳到结束状态
	 * @property {String} origin 动画演出中心 例如：'50% 50%'，第一个是控制水平方向的，第二个是控制垂直方向的
	 * @property {Number} multi 所有slide-*动画的平移倍数（对于自身宽高的倍数，默认一倍，即平移本身宽高的距离）
	 * @property {Number} zoomLessenMulti 当type包含zoom-lessen（从大到小缩放）时的基础放大倍数，默认1.5倍
	 * @property {Number} delay 动画演出延迟，默认为0，单位ms
	 * @property {String} contentClass 可放入css样式类，因为组件本身就是一个view容器
	 * @property {String} contentStyle 可放入css样式，因为组件本身就是一个view容器
	 * @event {Function} onComeIn     入场动画开始事件
	 * @event {Function} onGoOut      退场动画开始事件
	 * @event {Function} finishComeIn 入场动画完成事件
	 * @event {Function} finishGoOut  退场动画完成事件
	 */
	var width = 0
	var height = 0
	export default {
		data() {
			return {
				animData: {}, // 动画对象
				isShow: false, // 组件内部的显隐开关，在动画结束时，改变值的时候，比isContentShow晚1ms（防止动画无法演出）
				root: '', // 组件的基础样式，给动画演出提供基础环境。例如在演出fade时，先将opacity设为0
			}
		},
		props: {
			isContentShow: {
				type: Boolean,
				default: false
			},
			duration: {
				type: Number,
				default: 400
			},
			typeList: {
				type: Array,
				default () {
					return ['fade']
				}
			},
			mode: {
				type: String,
				default: 'ease'
			},
			origin: {
				type: String,
				default: '50% 50%'
			},
			multi: {
				type: Number,
				default: 1
			},
			zoomLessenMulti: {
				type: Number,
				default: 1.5
			},
			delay: {
				type: Number,
				default: 0
			},
			contentClass: {
				type: String,
				default: ''
			},
			contentStyle: {
				type: String,
				default: ''
			}
		},
		watch: {
			// 监视isContentShow值的改变，演出相应动画
			isContentShow(val) {
				// 处理动画的函数
				this.processAll(val)
			}
		},
		created() {
			// 创建动画
			this.animation = uni.createAnimation({
				duration: this.duration,
				timingFunction: this.mode,
				transformOrigin: this.origin,
				delay: this.delay
			})
		},
		methods: {
			// 处理动画的函数
			processAll(val) {
				/**
				 * 判断isContentShow的值
				 * true：内部开关isShow设为true，然后注册入场动画开始事件，并延时1ms启动入场动画（防止动画无法演出），演出完成后，注册入场动画完成事件
				 * false: 注册退场动画开始事件，并启动退场动画，然后延时（动画演出时间 + 10）ms的时间，再将内部开关isShow设为false，演出完成后，注册退场动画完成事件
				 */
				if (val) {
					this.isShow = true
					this.root = this.processStyle(this.typeList)
					setTimeout(function() {
						this.$emit('onComeIn')
						this.processIn(this.typeList)
						this.animation.step()
						this.animData = this.animation.export()
						setTimeout(function() {
							this.$emit('finishComeIn')
						}.bind(this), this.duration + 1)
					}.bind(this), 10)

				} else {
					this.$emit('onGoOut')
					this.processOut(this.typeList)
					this.animation.step()
					this.animData = this.animation.export()
					setTimeout(function() {
						this.isShow = false
						this.$emit('finishGoOut')
						this.$forceUpdate()
					}.bind(this), this.duration + 1)
				}
			},
			/**
			 * @param {Array} typeList 动画类型列表
			 * 函数作用：将root处理为 "opacity: 0; transform: scale(1.5) translateY(-100%);" 的形式
			 */
			processStyle(typeList) {
				let root = ''
				let transform = 'transform:'
				const hundred = 100

				if (typeList.includes('fade'))
					root += 'opacity: 0;'

				if (typeList.includes('zoom-largen') || typeList.includes('bounce')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' scale(0)'
					} else {
						root += ' scale(0)'
					}

				} else if (typeList.includes('zoom-lessen')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' scale(' + this.zoomLessenMulti + ')'
					} else {
						root += ' scale(' + this.zoomLessenMulti + ')'
					}
				}

				if (typeList.includes('slide-down')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' translateY(-' + hundred * this.multi + '%)'
					} else {
						root += ' translateY(-' + hundred * this.multi + '%)'
					}

				} else if (typeList.includes('slide-up')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' translateY(' + hundred * this.multi + '%)'
					} else {
						root += ' translateY(' + hundred * this.multi + '%)'
					}

				} else if (typeList.includes('slide-left')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' translateX(-' + hundred * this.multi + '%)'
					} else {
						root += ' translateX(-' + hundred * this.multi + '%)'
					}

				} else if (typeList.includes('slide-right')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' translateX(' + hundred * this.multi + '%)'
					} else {
						root += ' translateX(' + hundred * this.multi + '%)'
					}

				} else if (typeList.includes('slide-up-left')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' translate(' + hundred * this.multi + '%, ' + hundred * this.multi + '%)'
					} else {
						root += ' translate(' + hundred * this.multi + '%, ' + hundred * this.multi + '%)'
					}

				} else if (typeList.includes('slide-up-right')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' translate(-' + hundred * this.multi + '%, ' + hundred * this.multi + '%)'
					} else {
						root += ' translate(-' + hundred * this.multi + '%, ' + hundred * this.multi + '%)'
					}

				} else if (typeList.includes('slide-down-left')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' translate(' + hundred * this.multi + '%, -' + hundred * this.multi + '%)'
					} else {
						root += ' translate(' + hundred * this.multi + '%, -' + hundred * this.multi + '%)'
					}

				} else if (typeList.includes('slide-down-right')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' translate(-' + hundred * this.multi + '%, -' + hundred * this.multi + '%)'
					} else {
						root += ' translate(-' + hundred * this.multi + '%, -' + hundred * this.multi + '%)'
					}
				}

				if (typeList.includes('rotate-cw')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' rotate(-180deg)'
					} else {
						root += ' rotate(-180deg)'
					}

				} else if (typeList.includes('rotate-aw')) {
					if (root.indexOf(transform) === -1) {
						root += transform + ' rotate(180deg)'
					} else {
						root += ' rotate(180deg)'
					}
				}

				let rootList = root.split('')
				if (rootList[root.length - 1] !== ';') {
					root += ';'
				}
				return root
			},
			/**
			 * @param {Array} typeList 动画类型列表
			 * 函数作用：设置退场动画
			 */
			processOut(typeList) {
				if (typeList.includes('fade'))
					this.animation.opacity(0)

				if (typeList.includes('zoom-largen'))
					this.animation.scale(0)

				else if (typeList.includes('zoom-lessen'))
					this.animation.scale(this.zoomLessenMulti)

				else if (typeList.includes('bounce')) {
					this.animation.scale(1.2).step({
						duration: this.duration * 1 / 3
					})
					this.animation.scale(0).step({
						duration: this.duration * 2 / 3
					})
				}

				if (typeList.includes('slide-down'))
					this.animation.translateY(0 - height)

				else if (typeList.includes('slide-up'))
					this.animation.translateY(height)

				else if (typeList.includes('slide-left'))
					this.animation.translateX(0 - width)

				else if (typeList.includes('slide-right'))
					this.animation.translateX(width)

				else if (typeList.includes('slide-up-left'))
					this.animation.translate(width, height)

				else if (typeList.includes('slide-up-right'))
					this.animation.translate(0 - width, height)

				else if (typeList.includes('slide-down-left'))
					this.animation.translate(width, 0 - height)

				else if (typeList.includes('slide-down-right'))
					this.animation.translate(0 - width, 0 - height)

				if (typeList.includes('rotate-cw'))
					this.animation.rotate(-180)

				else if (typeList.includes('rotate-aw'))
					this.animation.rotate(180)
			},
			/**
			 * @param {Array} typeList 动画类型列表
			 * 函数作用：设置入场动画
			 */
			processIn(typeList) {
				// 查询放进组件slot节点元素的宽高，用于后面的平移距离
				this.getRect('#content').then(res => {
					width = parseFloat(res.width) * this.multi,
						height = parseFloat(res.height) * this.multi
				})

				if (typeList.includes('fade'))
					this.animation.opacity(1)

				if (typeList.includes('zoom-largen') || typeList.includes('zoom-lessen'))
					this.animation.scale(1)

				else if (typeList.includes('bounce')) {
					this.animation.scale(1.2).step({
						duration: this.duration * 1 / 3
					})
					this.animation.scale(1).step({
						duration: this.duration * 2 / 3
					})
				}

				if (typeList.includes('slide-up') || typeList.includes('slide-down')) {
					this.animation.translateY(0)
				} else if (typeList.includes('slide-left') || typeList.includes('slide-right')) {
					this.animation.translateX(0)
				} else if (typeList.includes('slide-up-left') || typeList.includes('slide-up-right') ||
					typeList.includes('slide-down-left') || typeList.includes('slide-down-right'))
					this.animation.translate(0, 0)

				if (typeList.includes('rotate-cw') || typeList.includes('rotate-aw'))
					this.animation.rotate(0)
			},
			/**
			 * @param {Object} selector 选择器
			 * 函数作用：查询元素的宽高、位置等信息
			 */
			getRect(selector) {
				return new Promise(resolve => {
					uni.createSelectorQuery().in(this)['select'](selector).boundingClientRect(rect => {
						if (rect) {
							resolve(rect)
						}
					}).exec()
				})
			}
		}
	}
</script>
