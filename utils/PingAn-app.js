import pabank from "../libs/jsm/ping-an-test-sdk.js"
import store from '../store/index.js'
// 检验环境是否是平安小程序
export const isMap_PingAn = () => {
	var ua = navigator.userAgent;
	var env = {
		/** 鏄惁绉诲姩璁惧 */
		isMobile: /Mobile/i.test(ua),
		/** 鏄惁 Android 璁惧 */
		isAndroid: /Android/i.test(ua),
		/** 鏄惁 iOS 璁惧 */
		isiOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i),
		/** 鏄惁 iPhone 璁惧 */
		isiPhone: /iPhone/i.test(ua),
		/** 鏄惁 iPad 璁惧 */
		isiPad: /iPad/i.test(ua),
		/** 鏄惁 iPod 璁惧 */
		isiPod: /iPod/i.test(ua)
	};
	if (env.isiOS) {
		return (window.webkit && window.webkit.messageHandlers.pabankMiniApp) ? true : false
	} else if (env.isAndroid) {
		return window.pabankMiniApp ? true : false
	} else {
		return false
	}
}

// 登录
export function PingAn_login() {
	// 获取随机base64
	const base64 = window.btoa(unescape(encodeURIComponent(getRandomString(30))))
	pabank.login({
		bizContent: {
			state: base64
		},
		success: async (data) => {
			let { authCode, state } = data
			alert(authCode, state)
			const res = await uni.$http("user/pinganXcxAuthLogin", {
				authCode,
				state
			})
			if (res.code == 0) {
				if (res.data.token) {
					uni.setStorageSync("token", res.data.token)
					store.dispatch("getUserInfo")
					uni.showToast({
						title: "登录成功",
						icon: "success",
						duration: 2000
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/home/home"
						})
					}, 2000)
				} else {
					uni.redirectTo({
						url: `/pages/login/BindingPhone/BindingPhone?code=${authCode}&type=3`
					})
				}
			} else {
				uni.showToast({
					title: res.errorMsg,
					icon: "error"
				})
			}
		},
		
	})
}
/**
 * 随机生成字符串
 * len 指定生成字符串长度
 **/
function getRandomString(len) {
	let _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
		min = 0,
		max = _charStr.length - 1,
		_str = ''; //定义随机字符串 变量
	//判断是否指定长度，否则默认长度为15
	len = len || 15;
	//循环生成字符串
	for (var i = 0, index; i < len; i++) {
		index = (function(randomIndexFunc, i) {
			return randomIndexFunc(min, max, i, randomIndexFunc);
		})(function(min, max, i, _self) {
			let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
				numStart = _charStr.length - 10;
			if (i == 0 && indexTemp >= numStart) {
				indexTemp = _self(min, max, i, _self);
			}
			return indexTemp;
		}, i);
		_str += _charStr[index];
	}
	return _str;
}

export async function PingAn_pay(orderNo){
	const res = await uni.$http("/payment/prepay", {
		orderNo,
		appType: 'PAXCX',
		payType: "BANK",
	})
	if(res.code == 0){
		const {appId,payOrderNo,source,outerSource}=res.data.paxcxBank
		const testURL=`https://test-b-fat.pingan.com.cn/is/mpcoms/pay/index.html#/?appId=${appId}&payOrderNo=${payOrderNo}&source=${source}&outerSource=${outerSource}`
		const proURL=`https://b.pingan.com.cn/is/mpcoms/pay/index.html#/?appId=${appId}&payOrderNo=${payOrderNo}&source=${source}&outerSource=${outerSource}`
		const url=testURL
		pabank.navigateTo({url})
	}else{
		uni.showToast({
			title:res.errorMsg,
			icon:"none"
		})
	}
}