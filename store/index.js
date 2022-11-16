import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getFilePath } from "@/utils/tools.js"
export default new Vuex.Store({
	state: {
		filePath: {},
		// 用于登录倒计时
		second: 60,
		isCount: false,
		// 用户头像uuid
		avatarUuid:'',
		userInfo: {},
		token:"",
		isDot:false,
	},
	mutations: {
		//设置信息徽标状态
		setDot(state,boo){
			state.isDot = boo;
		},
		saveFilePath(state, data) {
			const { uuid, path } = data
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
			state.isCount = true
			const timer = setInterval(() => {
				if (state.second > 0) {
					state.second--
				} else {
					state.isCount = false
					this.second = 60
					clearInterval(timer)
				}
			}, 1000);
		},
		changeIsCount(state,boo){
			state.isCount=boo
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
		getUserInfo(state){	
			state.userInfo = uni.getStorageSync("userInfo");
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
					res.data= await getFilePath(res.data,["avatar"])
					context.commit("setUserInfo", res.data)
					getMineInfo(res.data.buyerId)
				}else{
					uni.showToast({
						title: res.errorMsg,
						icon: "error"
					})
				}
				async function getMineInfo(viewBuyerId) {
					try {
						uni.setStorageSync("viewBuyerId",viewBuyerId)
						const res = await uni.$http("/user/buyerBasicInfo", {
							viewBuyerId
						})
						if (res.code == 0) {
							context.commit("setAvatarUuid", res.data.avatar)
							res.data= await getFilePath(res.data,["avatar"])
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
		/**
		 * 获取未读消息count
		 */
		async getMsgOfUnread(context){
			const {code,errorMsg,data:{list}} = await uni.$http("/user/message/list",{
				page:1,
				size:10,
				unread:1
			},false)
			if(list.length > 0){
				context.commit("setDot",true)
			}
		}
	}
})
