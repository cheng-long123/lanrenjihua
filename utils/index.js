
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
export const checkLogin = function(){
	 var usertoken = uni.getStorageSync('usertoken')
	if(usertoken === ''){ // 本地没有token表示未登录
	
		uni.showToast({
			title: '未登录返回登录页面',
			duration: 2000,
			icon: 'none'
		})
		setTimeout( () => {
			uni.reLaunch({url:'/pages/login/index'})
		},2000)
		// uni.showModal({
		//     title: '提示',
		//     content: '你还没有登录，是否登录？',
		//     success: function (res) {
		//         if (res.confirm) {
		//            uni.reLaunch({url:'/pages/login/index'})
		//         } else if (res.cancel) {
		//             console.log('用户点击取消');
		//         }
		//     }
		// });
		return false
		}
	}

//校验手机格式
function checkMobile(mobile){
	return RegExp(/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/).test(mobile)
}
function checkPassword(password){
	return RegExp(/^\d{6}$/).test(password)
}

module.exports = {
	checkMobile : checkMobile,
	checkPassword : checkPassword
	
}
