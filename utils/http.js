const devBaseUrl = "http://120.197.126.61:18940";
const proBaseUrl = "http://api.jialex.cn"
const baseUrl =process.env.NODE_ENV=="development"?proBaseUrl : proBaseUrl;	

const request = (url = '', date = {}, type = 'POST', header = {}) => {
	uni.showLoading()
	const token = getToken()
	// console.log(url)
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
			console.log(res)
			console.log(url,'url')
			if(res.data.code==1000){
				if(url!=="/goods/getGoodsInstanceDetail"){
					uni.showToast({
						title:"用户token过期，请重新登录",
						icon:"error"
					})
					const timer_=setTimeout(()=>{
						clearTimeout(timer_)
						uni.reLaunch({
							url:"/pages/home/home"
						})
					},2000)
				}
				uni.removeStorageSync("token")
				uni.hideLoading()
				return
			}
			const timer=setTimeout(()=>{
				clearTimeout(timer)
				uni.hideLoading()
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

export default request
