
var localURL;
function getLocal(){
	// const reg_pay_url="http://h5.jytc-test.binavy.com/subpageB/OrderPage/OrderPage"
	// const loginLocal = "http://h5.jytc-test.binavy.com/pages/login/QuickLoginTemp/QuickLoginTemp"; //获取当前页面地址作为回调地址
	const loginLocal = "https://h5.jialex.cn/pages/login/QuickLoginTemp/QuickLoginTemp"; //获取当前页面地址作为回调地址
	const reg_pay_url="https://h5.jialex.cn/subpageB/OrderPage/OrderPage"
	const local_real = window.location.href.split("?")[0]; //获取当前页面路由
	const payLocal = window.location.href.split("&code")[0]; //获取当前页面地址作为回调地址
	
	if(reg_pay_url == local_real){
		setPay()
		return payLocal
	}else{
		return loginLocal
	}
}

//请求微信接口，用来获取授权code
export function getWeChatAuthorization() {
	localURL = getLocal()
	let appid = 'wx54ab5619521ee3b0'
	//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + localURL + "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
}

//方法:用来提取code
function getUrlCode(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [,''])[1].replace(/\+/g, '%20')) || null
}

//检查浏览器地址栏中微信接口返回的code
export function checkWeChatCode(cb) {
	let code = getUrlCode('code')
	if (code) {
		uni.showLoading()
		getOpenidAndUserinfo(code,cb)
	}
}

//把code传递给后台接口，静默登录
async function getOpenidAndUserinfo(code,cb) {
	try{
		// const reg_url="http://h5.jytc-test.binavy.com/subpageB/OrderPage/OrderPage"
		const reg_url="https://h5.jialex.cn/subpageB/OrderPage/OrderPage"
		const local_real = window.location.href.split("?")[0]
		if(reg_url == local_real){
			weChatPayAuthorizationBind(code,cb)
		}else{
			weChatLogin(code)
		}
	}catch(e){
		//TODO handle the exception
	}
}



// 进行支付的相关设置
function setPay(){
	uni.setStorageSync("isWxPay","wxPay")
}

// 授权登录处理
async function weChatLogin(code){
	try{
		const res = await uni.$http("/user/wechatAuthorizedLogin", { code })
		if (res.code == 0) {
			afterLogin(res,code)
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
function afterLogin(res,code){
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
		uni.navigateTo({
			url:`/pages/login/BindingPhone/BindingPhone?code=${code}&type=1`
		})
	}
}
// 授权支付处理
async function weChatPayAuthorizationBind(code,cb){
	try{
		const res = await uni.$http("/user/wechatAuthorizedLoginBind", { code })
		if (res.code == 0) {
			cb()
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
