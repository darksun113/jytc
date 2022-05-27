import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		filePath: {},
		// 用于登录倒计时
		second:60,
		isCount:false,
		userInfo:{}
	},
	mutations: {
		saveFilePath(state, data) {
			const { uuid, path } = data
			state.filePath[uuid] = path
		},
		resetFilePath(state) {
			state.filePath = {}
		},
		countdown(state){
			const timer = setInterval(() => {
				state.isCount = true
			    if (state.second>0) {
			        state.second--
			    } else {
			        state.isCount = false
			        this.second=60
			        clearInterval(timer) 
			    }
			}, 1000);
		},
		resetCount(state){
			state.second=60
		},
		updateUserInfo(){
			
		}
	},
	actions:{
		
	}
})
