import Vue from 'vue'
import App from './App'
import { myRequest } from './api/request.js'
import { baselogout } from './utils/index.js'
Vue.prototype.Request = myRequest
Vue.prototype.baseLogout = baselogout
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
