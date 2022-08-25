
var localURL = getLocal()
function getLocal(){
	const reg_url="https://h5.jialex.cn/subpageB/OrderPage/OrderPage"
	const pay_local_test = window.location.href.split("?")[0]; //获取当前页面地址作为回调地址
	const payLocal = window.location.href.split("&code")[0]; //获取当前页面地址作为回调地址
	const proLocal = "https://h5.jialex.cn/pages/login/QuickLoginTemp/QuickLoginTemp"; //获取当前页面地址作为回调地址
	if(reg_url == pay_local_test){
		return payLocal
	}else{
		return proLocal
	}
}

//请求微信接口，用来获取授权code
export function getWeChatAuthorization() {
	let appid = 'wx54ab5619521ee3b0'
	//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + localURL + "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
}

//方法:用来提取code
function getUrlCode(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [,''])[1].replace(/\+/g, '%20')) || null
}

//检查浏览器地址栏中微信接口返回的code
export function checkWeChatCode() {
	let code = getUrlCode('code')
	if (code) {
		getOpenidAndUserinfo(code)
	}
}

//把code传递给后台接口，静默登录
async function getOpenidAndUserinfo(code) {
	try{
		const res = await uni.$http("/user/wechatAuthorizedLogin", {
			code
		})
		if (res.code == 0) {
			afterAuthorization(res,code)
		} else {
			uni.showToast({
				title:res.errorMsg,
				icon:"none"
			})
		}
	}catch(e){
		//TODO handle the exception
	}
}

// 授权后
function afterAuthorization(res,code) {
	if(res.data.token){
		uni.setStorageSync("token",res.data.token)
		const reg_url="https://h5.jialex.cn/subpageB/OrderPage/OrderPage"
		if(reg_url == localURL){
			// 授权支付
			setPay()
		}else{
			// 授权登录
			afterLogin()
		}
	}else{
		uni.redirectTo({
			url:`/pages/login/BindingPhone/BindingPhone?code=${code}&type=1`
		})
	}
}

// 进行支付的相关设置
function setPay(){
	uni.setStorageSync("isWxPay","wxPay")
}

// 授权登录处理
function afterLogin(){
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
}
