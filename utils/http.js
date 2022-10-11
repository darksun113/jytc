const devBaseUrl = "http://120.197.126.61:18940";
const proBaseUrl = "https://api.jialex.cn";
const baseUrl =process.env.NODE_ENV=="development" ? devBaseUrl : devBaseUrl;	
import {isMap_PingAn} from "@/libs/jsm/PingAn-app.js";

const request = (url = '', date = {},loading=true, type = 'POST', header = {}) => {
	loading && uni.showLoading()
	const token = getToken()
	return new Promise((resolve, reject) => {
		let data = {
			method: type,
			url: baseUrl + url,
			data: date,
			header: {
				'Content-Type': 'application/json',
				Authorization : token,
				header,
			},
			dataType: 'json',
		}
		uni.request({ ...data }).then((response) => {
			let [error, res] = response;
			if(res.data.code==1000){
				uni.showToast({
					title:"用户token过期，请重新登录",
					icon:"error"
				})
				routerTo()
			}
			const timer=setTimeout(()=>{
				clearTimeout(timer)
				loading && uni.hideLoading()
			},200)
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}
function getToken() {
	return uni.getStorageSync('token') || ''
}
function routerTo(){
	uni.removeStorageSync("token")
	uni.removeStorageSync("userInfo")
	uni.removeStorageSync("viewBuyerId")
	uni.hideLoading()
	const timer_=setTimeout(()=>{
		clearTimeout(timer_)
		if(isMap_PingAn){
			uni.reLaunch({
				url:"/pages/home/home"
			})
		}else{
			uni.navigateTo({
				url:"/pages/login/LoginByMobile/GetVerifyCode/GetVerifyCode"
			})
		}
	},2000)
}
export default request
