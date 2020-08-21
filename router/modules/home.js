// router/modules/home.js
const home = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/index/index',
      aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
      name: 'index',
      requiresAuth: true, //可选配置 （是否权限路由）（我用来做登录拦截，true时没有登录便会跳转到登录页面）
        meta: {
	        title: '首页',
	    },
    },
    {
	    path: '/pages/notice/index',
        name: 'notice',
        requiresAuth: true, //可选配置 （是否权限路由）
        meta: {
	        title: '公告',
	    },
	},{
		path: "/pages/my/index",
		name: 'my',
		requiresAuth: true,
		meta: {
			title: "我的"
		},{
		path: "/pages/login/index",
		name: 'login',
		requiresAuth: true,
		meta: {
			title: "登录"
		}
	},
]
export default home