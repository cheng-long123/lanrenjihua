import Vue from 'vue'
import App from './App'
import { myRequest } from './api/request.js'
import { baselogout,checklogin } from './utils/index.js'
import {RouterMount} from 'uni-simple-router'
// import './static/iconfont/iconfont.css'
import './static/iconfont/iconfont.ttf'
import wybButton from '@/components/wyb-button/wyb-button.vue' // 引入
Vue.prototype.Request = myRequest
Vue.prototype.baseLogout = baselogout
Vue.prototype.checkLogin = checklogin
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
 // #ifdef H5
RouterMount(app,'#app');
 // #endif
app.$mount()
