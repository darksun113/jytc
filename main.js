import Vue from 'vue'
import App from './App'

import request from './utils/http.js'
import store from './store'
import uView from "uview-ui"

// 自定义方法
import { routerTo } from '@/utils/routerTo.js' //公共方法
// 引入video.js
import Videojs from 'video.js'
import 'video.js/dist/video-js.min.css' 

Vue.prototype.$video = Videojs //使用video.js时用$video

Vue.prototype.$store = store
Vue.config.productionTip = false
uni.$http = request;
Vue.use(uView);

App.mpType = 'app'


Object.assign(Vue.prototype, {
	'$routerTo': routerTo,
})

Vue.prototype.$checkLogin = function() {
	const token = uni.getStorageSync("token") || ''
	return token ? true : false
}

const app = new Vue({
	...App,
	store
})
app.$mount()
