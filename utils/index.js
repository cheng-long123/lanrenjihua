
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
//校验手机格式
// function checkMobile(mobile){
// 	return RegExp(/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/).test(mobile)
// }
// function checkPassword(password){
// 	return RegExp(/^\d{6}$/).test(password)
// }

// module.exports = {
// 	checkMobile : checkMobile,
// 	checkPassword : checkPassword
	
// }