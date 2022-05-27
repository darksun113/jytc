export default{
	filters:{
		format(stamp){
			if(!stamp){
				return ""
			}else{
				const date = new Date(stamp*1000)
				const Y = date.getFullYear() + '.'
				const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'
				const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
				const H = date.getHours() + ':'
				const M2 = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
				return Y + M + D + H + M2 + "00"
			}
		},
		async handleFavorite(goodsId,isFavorite,action,idx){
			try{
				const res=await uni.$http("/goods/favorite",{goodsId,isFavorite})
				if(res.code == 0){
					this.goodsList[idx].favorites=res.data.count
					this.goodsList[idx].ifFavorite=action
				}
				const timer=setTimeout(()=>{
					clearTimeout(timer)
					this.isRequest=true
				},500)
			}catch(e){
				//TODO handle the exception
			}
		}
	}
}