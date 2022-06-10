import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {
	getFilePath
} from "@/utils/tools.js"
export default new Vuex.Store({
	state: {
		filePath: {},
		// 用于登录倒计时
		second: 60,
		isCount: false,
		userInfo: {}
	},
	mutations: {
		saveFilePath(state, data) {
			const {
				uuid,
				path
			} = data
			state.filePath[uuid] = path
		},
		resetFilePath(state) {
			state.filePath = {}
		},
		countdown(state) {
			const timer = setInterval(() => {
				state.isCount = true
				if (state.second > 0) {
					state.second--
				} else {
					state.isCount = false
					this.second = 60
					clearInterval(timer)
				}
			}, 1000);
		},
		resetCount(state) {
			state.second = 60
		},
		setUserInfo(state, userInfo) {
			state.userInfo = {
				...state.userInfo,
				...userInfo
			}
		}
	},
	actions: {
		async getUserInfo(context) {
			try {
				const res = await uni.$http("/user/webGetAccountInfo", {})
				if (res.code == 0) {
					const avatar = await getFilePath(res.data.avatar)
					res.data.avatar = avatar
					context.commit("setUserInfo", res.data)
					getMineInfo(res.data.buyerId)
				}
				async function getMineInfo(viewBuyerId) {
					try {
						const res = await uni.$http("/user/buyerBasicInfo", {
							viewBuyerId
						})
						if (res.code == 0) {
							const avatar = await getFilePath(res.data.avatar)
							res.data.avatar = avatar
							context.commit("setUserInfo", res.data)
						} else {
							uni.showToast({
								title: res.errorMsg,
								icon: "error"
							})
						}
					} catch (e) {
						//TODO handle the exception
					}
				}
			} catch (e) {
				//TODO handle the exception
			}
		},
		async getBuyerBasicInfo(context, viewBuyerId) {
			try {
				const res = await ("/user/buyerBasicInfo", {
					viewBuyerId
				})
				if (res.code == 0) {
					const avatar = await getFilePath(res.data.avatar)
					res.data.avatar = avatar
					context.commit("setUserInfo", res.data)
				} else {
					uni.showToast({
						title: res.errorMsg,
						icon: "error"
					})
				}
			} catch (e) {
				//TODO handle the exception
			}
		}
	}
})
