// const baseUrl = "http://192.168.2.50:18940";
const baseUrl =process.env.NODE_ENV=="development"?"http://120.197.126.61:18940" : "http://api.penglainft.com:81";	
const pathArr=[
	baseUrl+"/series/getSeriesList"
]
const request = (url = '', date = {}, type = 'POST', header = {}) => {
	uni.showLoading()
	const token = getToken()
	return new Promise((resolve, reject) => {
		let data = {
			method: type,
			url: baseUrl + url,
			data: date,
			header: {
				'Content-Type': 'application/json',
				header,
			},
			dataType: 'json',
		}
		pathArr.forEach(item=>{
			if(data.url!==item){
				data.header.Authorization = token
				return
			}
		})
		uni.request({ ...data }).then((response) => {
			let [error, res] = response;
			if(res.data.code==1000){
				uni.removeStorageSync("token")
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
