<template>
	<PageTemp class="other-page">
		<UserHeader :userInfo="userInfo"></UserHeader>
		<view class="container">
			<view class="title">他的藏品（{{userInfo.collectionNumber}}）</view>
			<scroll-view v-if="privacyAuth==0 && hasData" class="list-box" scroll-y="true" @scrolltolower="updateList">
				<CardOfObject v-for="(item,index) in goodsList" :key="index" :item="item"></CardOfObject>
				<IsEnd v-if="isLastItem"></IsEnd>
			</scroll-view>
			<SecurityControls v-else-if="privacyAuth==1">
				由于该用户隐私设置，藏品不可见
			</SecurityControls>
			<IsNoObject v-else>
				暂无藏品
			</IsNoObject>
		</view>
	</PageTemp>
</template>

<script>
	import {getFilePath} from "@/utils/tools.js"
	import UserHeader from "./components/UserHeader/index.vue"
	export default {
		components:{
			UserHeader
		},
		data() {
			return {
				viewBuyerId:"",
				privacyAuth:0,
				hasData:true,
				isLastItem:false,
				userInfo:{},
				goodsList:[]
			};
		},
		onLoad(opt) {
			this.viewBuyerId=opt.otherId
		},
		onShow() {
			this.init()
			
		},
		methods:{
			updateList(){
				const startTime = this.goodsList[this.goodsList.length-1].startTime
				this.getGoodsList(startTime,list=>{
					if(list==0){
						this.isLastItem=true
					}else{
						this.goodsList=[...this.goodsList,...list]
					}
				})
			},
			init(){
				this.getUserInfo()
				this.getGoodsList(parseInt(Date.now()/1000),list=>{
					if(list==0){
						this.hasData=false
					}else{
						this.goodsList=list
					}
				})
			},
			async getUserInfo(){
				try{
					const res = await uni.$http("/user/buyerBasicInfo", {
						viewBuyerId:this.viewBuyerId
					})
					if(res.code==0){
						res.data = await getFilePath(res.data,["avatar"])
						this.userInfo=res.data
					}else{
						uni.showToast({
							title:res.errorMsg,
							icon:"error"
						})
						if(res.code==20033){
							let timer=setTimeout(()=>{
								clearTimeout(timer)
								this.$routerTo(1,"back")
							},1000)
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async getGoodsList(startTime,callback){
				try{
					const res=await uni.$http("/goods/antiques",{
						viewBuyerId:this.viewBuyerId,
						size:10,
						type:1,
						startTime
					})
					if(res.code==0){
						this.privacyAuth=res.data.privacyAuth
						if(res.data.list.length==0){
							callback(0)
						}else{
							res.data.list.forEach(async item=>{
								res.data.list=await getFilePath(res.data.list,["image","shopIcon"])
							})
							callback(res.data.list)
						}
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
.other-page{
	padding: 40rpx;
	.container{
		height: calc(100% - 260rpx);
		.title{
			text-align: center;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			padding: 40rpx;
		}
		.list-box{
			box-sizing: border-box;
			height: calc(100% - 126rpx);
			overflow: auto;
		}
	}
}
</style>
