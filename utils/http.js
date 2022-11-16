
import {isMap_PingAn} from "@/libs/jsm/PingAn-app.js";
import {isWechat} from "../libs/jsm/w-share.js"
const isPingan_env = isMap_PingAn();
const isWechat_env = isWechat();

const request = (url = '', date = {},loading=true, type = 'POST', header = {}) => {
	loading && uni.showLoading();
	const token = getToken();
	const LoginType = getLoginHeader();
	return new Promise((resolve, reject) => {
		let data = {
			method: type,
			url: process.env.VUE_APP_BASE_URL + url,
			data: date,
			header: {
				'Content-Type': 'application/json',
				Authorization : token,
				LoginType,
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
		if(isMap_PingAn()){
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
function getLoginHeader(){
	if(isPingan_env){
		return 1;
	}else if(isWechat_env){
		return 2;
	}else{
		return 3;
	}
}
export default request
