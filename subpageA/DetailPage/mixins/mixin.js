import {getFilesPath} from "@/utils/tools.js"
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
					this.goodsData.goodsType=this.goodsType
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
		async init(){
			
			this.getGoodsDetail()
		}
	},
	mounted(){
		this.init()
	}
}