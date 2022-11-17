import store from "../store/index.js"
export async function count(){
	const time = Date.now()
	const res = await uni.$http("/tracking/report",{
		eventCode: 'access',
		eventTimestamp: parseInt(time/1000),
		data: "",
	})
}

export function heartOfGetMsg(){
	if(checkLogin()){
		store.dispatch("getMsgOfUnread")
	}
	setInterval(()=>{
		if(checkLogin()){
			store.dispatch("getMsgOfUnread")
		}
	},60000)
}
function checkLogin() {
	const token = uni.getStorageSync("token") || ''
	return token ? true : false
}