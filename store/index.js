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
		// 用户头像uuid
		avatarUuid:'',
		userInfo: {},
		token:""
	},
	mutations: {
		saveFilePath(state, data) {
			const {
				uuid,
				path
			} = data
			state.filePath[uuid] = path
		},
		setAvatarUuid(state,value){
			state.avatarUuid=value
		},
		resetFilePath(state) {
			state.filePath = {}
		},
		countdown(state) {
			state.second=60
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
			uni.setStorageSync("userInfo",state.userInfo)
		},
		getToken(state,token){
			state.token=token
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
						uni.setStorageSync("viewBuyerId",viewBuyerId)
						const res = await uni.$http("/user/buyerBasicInfo", {
							viewBuyerId
						})
						if (res.code == 0) {
							context.commit("setAvatarUuid", res.data.avatar)
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
		}
	}
})
