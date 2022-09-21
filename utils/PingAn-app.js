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

export function PingAn_authorize(){
	pabank.authorize({
	    scopeId: 'phoneNumber',
	    success: function (res) {
	        console.log(res, 'authorize succcess')
			alert("success+++ "+JSON.stringify(res))
	    },
		complete(res){
			alert("complete+++ "+JSON.stringify(res))
		}
	})
}

// 登录
/**
 * @params loadType 0 初次授权登录  1 
 **/ 
export function PingAn_login(loadType) {
	// 获取随机base64
	const base64 = window.btoa(unescape(encodeURIComponent(getRandomString(30))))
	alert("(0)++base64 "+base64)
	pabank.login({
		bizContent: {
			state: base64
		},
		success: function(data){
			let { authCode, state } = data
			const fn = async (state,authCode)=>{
				alert("(1)++state "+state)
				alert("(2)++authCode "+authCode)
				const res = await uni.$http("/user/pinganXcxAuthLogin", {
					authCode,
					state
				})
				alert("(3) "+JSON.stringify(res))
				if (res.code == 0) {
					alert("(4) "+res.data)
					if (res.data.token) {
						uni.setStorageSync("token", res.data.token)
						store.dispatch("getUserInfo")
						uni.showToast({
							title: "登录成功",
							icon: "success",
							duration: 2000
						})
						const timer = setTimeout(() => {
							clearTimeout(timer)
							if(loadType == 1){
								uni.navigateBack({delta:1})
							}else if(loadType != 2){
								uni.reLaunch({
									url: "/pages/home/home"
								})
							}
						}, 2000)
					} else {
						uni.redirectTo({
							url: `/pages/login/BindingPhone/BindingPhone?code=${authCode}&type=3`
						})
					}
				} else {
					alert("(5) "+res)
					uni.showToast({
						title: res.errorMsg,
						icon: "error"
					})
				}
			}
			fn(state,authCode)
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
	alert("(001): "+orderNo)
	const res = await uni.$http("/payment/prepay", {
		orderNo,
		appType: 'PAXCX',
		payType: "BANK",
	})
	alert("(002): "+res)
	if(res.code == 0){
		alert("(003): "+res.data)
		const {appId,payOrderNo,source,outerSource}=res.data.paxcxBank
		const testURL=`https://test-b-fat.pingan.com.cn/is/mpcoms/pay/index.html#/?appId=${appId}&payOrderNo=${payOrderNo}&source=${source}&outerSource=${outerSource}`
		const proURL=`https://b.pingan.com.cn/is/mpcoms/pay/index.html#/?appId=${appId}&payOrderNo=${payOrderNo}&source=${source}&outerSource=${outerSource}`
		const url=testURL
		pabank.navigateTo({url})
	}else{
		alert("(004): "+res.errorMsg)
		uni.showToast({
			title:res.errorMsg,
			icon:"none"
		})
	}
}