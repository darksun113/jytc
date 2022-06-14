import {getFilePath, getFilesPath} from "@/utils/tools.js"
export default {
	methods:{
		async getGoodsDetail(){
			try{
				const res= await uni.$http("/goods/getGoodsDetail",{goodsId:this.goodsId})
				if(res.code==0){
					const resData=res.data.goods
					const temp={
						image:resData.image,
						shopIcon: resData.shopIcon,
						description: resData.description,
					}
					resData.mapping?temp.mapping=resData.mapping:''
					resData.threeD?temp.threeD=resData.threeD:''
					resData.mtl?temp.mtl=resData.mtl:''
					const data=await getFilesPath(temp)
					Object.keys(data).forEach(key=>{
						resData[key]=data[key]
					})
					this.goodsData=resData
					this.goodsData.loadType=this.loadType
					this.goodsData.materialType=this.materialType
					this.goodsData.modelType=4
				}else{
					uni.showToast({
						title:res.errorMsg,
						icon:"error"
					})
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		async getGoodsInstanceDetail(){
			try{
				const res= await uni.$http("/goods/getGoodsInstanceDetail",{instanceId:this.instanceId})
				if(res.code==0){
					const temp={
						image:res.data.image,
						shopIcon: res.data.shopIcon,
						goodsDesc: res.data.goodsDesc,
					}
					res.data.mapping?temp.mapping=res.data.mapping:''
					res.data.threeD?temp.threeD=res.data.threeD:''
					res.data.mtl?temp.mtl=res.data.mtl:''
					const objData=await getFilesPath(temp)
					Object.keys(objData).forEach(key=>{
						res.data[key]=objData[key]
					})
					this.goodsData=res.data
					this.goodsData.loadType=this.loadType
					this.goodsData.materialType=this.materialType
					this.goodsData.modelType=4
				}else{
					uni.showToast({
						title:res.errorMsg,
						icon:"none"
					})
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		async getBuyers(callback){
			try{
				const res=await uni.$http("/goods/getBuyers",{goodsId:this.goodsId,size:3})
				if(res.code==0){
					res.data.list.forEach(async item=>{
						item.recipientIcon = await getFilePath(item.recipientIcon) 
						callback(item)
					})
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		async init(){
			if(this.loadType==0){
				this.getGoodsDetail()
				this.getBuyers(item=>{
					this.buyerList.push(item)
					this.buyerList=this.buyerList.sort((a,b)=>b.createTime-a.createTime)
				})
			}else{
				this.getGoodsDetail()
				// this.getGoodsInstanceDetail()
			}
			
		}
	},
	mounted(){
		this.init()
	}
}