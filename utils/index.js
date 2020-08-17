

export const baselogout = function() {
	uni.showToast({
		title: "登录超时，请从新登录！",
		duration: 1500,
		icon: 'none'
	})
	setTimeout( ()=> {
		uni.removeStorage({
			key: 'usertoken',
			success: () => {
				
			}
		})
		uni.reLaunch({
			url: '/pages/login/index'
		})
	},1500)
}