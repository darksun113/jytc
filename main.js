import Vue from 'vue'
import App from './App'

import request from './utils/http.js'
import store from './store'
import uView from "uview-ui"

import {isMap_PingAn} from "./utils/PingAn-app.js"

// 自定义方法
import { routerTo } from '@/utils/routerTo.js' //公共方法
import {
	myshare,
	isWechat
} from '@/libs/jsm/w-share.js'
if (isWechat()) {
	Vue.prototype.$wShare = myshare;
} else {
	Vue.prototype.$wShare = () => {}
}
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
Vue.prototype.$toast = function(text, icon = "none") {
	uni.showToast({
		title: text,
		icon,
		duration: 1500
	})
}
Vue.prototype.$isMap_PingAn=isMap_PingAn()
Vue.prototype.$updateUserInfo = function() {
	this.$store.dispatch("getUserInfo")
}
const app = new Vue({
	...App,
	store
})
app.$mount()

Vue.prototype.$checkAI = async function(type) {
	const res1 = uni.getStorageSync('isAI')
	if (res1 == true) {
		try {
			const res2 = await uni.$http('/log/addLog', {
				"type": type
			})
		} catch (e) {
			//TODO handle the exception
		}
	}
}
