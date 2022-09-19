import pabank from "../libs/jsm/ping-an-test-sdk.js"


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
