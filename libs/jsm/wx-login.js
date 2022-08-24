
//请求微信接口，用来获取code
export function getWeChatLogin() {
	// let local = window.location.href.split("&code")[0]; //获取当前页面地址作为回调地址
	const devLocal = "http://192.168.2.27:8081/pages/login/QuickLoginTemp/QuickLoginTemp"; //获取当前页面地址作为回调地址
	const proLocal = "https://h5.jialex.cn/pages/login/QuickLoginTemp/QuickLoginTemp"; //获取当前页面地址作为回调地址
	const local = process.env.NODE_ENV == "development" ? devLocal : proLocal
	let appid = 'wx54ab5619521ee3b0'
	//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
	window.location.href =
		"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + local + "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
}

//方法:用来提取code
function getUrlCode(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [,''])[1].replace(/\+/g, '%20')) || null
}

//把code传递给后台接口，静默登录
async function getOpenidAndUserinfo(code) {
	try {
		const res = await uni.$http("/user/wechatAuthorizedLogin", {
			code
		})
		if (res.code == 0) {
			afterLogin(res,code)
		} else {
			uni.showToast({
				title:res.errorMsg,
				icon:"none"
			})
		}
	} catch (e) {
		//TODO handle the exception
	}
}
//检查浏览器地址栏中微信接口返回的code
export function checkWeChatCode() {
	let code = getUrlCode('code')
	if (code) {
		getOpenidAndUserinfo(code)
	}
}

function afterLogin(res,code) {
	if(res.data.token){
		uni.setStorageSync("token",res.data.token)
		uni.showToast({
			title:"登录成功",
			icon:"success",
			duration:2000
		})
		setTimeout(()=>{
			uni.reLaunch({
				url:"/pages/home/home"
			})
		},1500)
	}else{
		uni.redirectTo({
			url:`/pages/login/BindingPhone/BindingPhone?code=${code}&type=1`
		})
	}
}
