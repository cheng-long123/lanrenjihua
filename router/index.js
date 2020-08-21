// // router/index.js

// import modules from './modules'
// import Vue from 'vue'
// //这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
// import Router from 'uni-simple-router'

// Vue.use(Router)
// //初始化
// const router = new Router({
//     routes: [...modules]//路由表
// });

// //全局路由前置守卫
// router.beforeEach((to, from, next) => {
// //这里写登录拦截（我没有写全，如果获取到了token就不用跳转到登录页，就直接next()）
//   if (!uni.getStorageSync("usertoken")) {
//   	        if (to.path !== '/pages/login/index') {
//   	            return next({
//                      path:'/pages/login/index',
//                      NAVTYPE:'push'
//                   });
//   	        }
//   	    next()
//   	}else{
//   		next()
//   	}
// })
// // 全局路由后置守卫
// router.afterEach((to, from) => {
// })
// export default router;
import Vue from 'vue';
import Router from 'uni-simple-router';
Vue.use(Router)
//初始化
const router = new Router({
    routes:ROUTES //路由表
});

//全局路由前置守卫
let chushi = '';
router.beforeEach((to, from, next) => {
    if (to.flag) {
        //当前进入的路径
		const usertoken = uni.getStorageSync('usertoken')
		if (usertoken) {
			next()
		} else {
			next({
				path: "../pages/login/index",
				query:{
					redirect:to.name,
					}
			})
		}
        
    } else {
		
	}
     
})
export default router;