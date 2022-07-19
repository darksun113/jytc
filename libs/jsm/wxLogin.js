//方法:用来提取code
function getUrlCode(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [,
		''
	])[1].replace(/\+/g, '%20')) || null
}
//请求微信接口，用来获取code
export function getWeChatCode() {
	let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址
	let appid = 'wx77ab6a9325b8ac8b'
	//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
	window.location.href =
		"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + local +
		"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
}
//把code传递给后台接口，静默登录
async function getOpenidAndUserinfo(code) {
	try {
		const res = await uni.$http("api/login", {
			code
		})
		if (res.code == 0) {
			afterLogin(res)
		} else {
			$toast(res.errorMsg)
		}
	} catch (e) {
		//TODO handle the exception
	}
}
//检查浏览器地址栏中微信接口返回的code
function checkWeChatCode() {
	let code = getUrlCode('code')
	uni.showToast({
		title: `微信code=${code}`,
		icon: "none"
	})
	if (code) {
		getOpenidAndUserinfo(code)
	}
}

function afterLogin(res) {
	let user = res.data.user
	uni.setStorageSync('token', res.data.token);
	let u = {
		avatar: user.avatar ? user.avatar : avatar,
		mobile: user.mobile,
		nickname: user.nickname ? user.nickname : '土肥圆'
	}
	uni.setStorage({
		key: 'u',
		data: u,
		success: () => {
			let url = uni.getStorageSync('redirect')
			uni.reLaunch({
				url: url ? url : '/pages/index'
			})
		}
	});
}
