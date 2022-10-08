import request from "./http.js"

export async function count(){
	const time = Date.now()
	const res = await uni.$http("/tracking/report",{
		eventCode: 'access',
		eventTimestamp: parseInt(time/1000),
		data: "",
	})
}