import Vue from 'vue'
import App from './App'
import { myRequest } from './api/request.js'
import { baselogout } from './utils/index.js'
import {RouterMount} from 'uni-simple-router'
Vue.prototype.Request = myRequest
Vue.prototype.baseLogout = baselogout
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
 // #ifdef H5
RouterMount(app,'#app');
 // #endif
app.$mount()
