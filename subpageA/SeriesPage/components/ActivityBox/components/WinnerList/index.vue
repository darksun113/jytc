<template>
	<u-popup :show="show" @close="close" @open="open" :closeable="true" bgColor="transparent">
		<view class="winner-pop">
			<view class="title-rules">
				获奖名单
			</view>
			
			<scroll-view v-if="hasData" scroll-y="true" @scrolltolower="updateList" class="activity-pop-container">
				<ListItem v-for="i in 15" :key="i"></ListItem>
				<IsEnd v-if="isLastItem"></IsEnd>
			</scroll-view>
			<IsNoData v-else>
				暂无数据
			</IsNoData>
		</view>
	</u-popup>
</template>
<script>
	import {getFilePath} from "@/utils/tools.js"
	export default {
		props:{
			isShow:[Boolean],
			purchaseId:[String,Number]
		},
		data() {
			return {
				show: this.isShow,
				hasData:true,
				isLastItem:false,
				updatePage:1,
				prePurchaseId:this.purchaseId,
				winnerList:[]
			}
		},
		methods: {
			updateList(){
				this.getWinnerList(list=>{
					if(list==0){
						this.isLastItem=true
					}else{
						this.winnerList=[...this.winnerList,...list]
						this.updatePage++
					}
				})
			},
			open() {
				// console.log('open');
				this.getWinnerList(list=>{
					if(list==0){
						this.hasData=false
					}else{
						this.winnerList=list
					}
				})
			},
			async getWinnerList(callback){
				try{
					const res=await uni.$http("/series/prepurchase/winners",{
						prePurchaseId:this.prePurchaseId,
						page:this.updatePage,
						size:10
					})
					if(res.code==0){
						if(res.data.list.length==0){
							callback(0)
						}else{
							res.data.list.forEach(async item=>{
								item.icon=await getFilePath(item.icon)
							})
							callback(res.data.list)
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			close() {
				this.updatePage=1
				this.$emit("close")
				// console.log('close');
			}
		},
		watch:{
			isShow(newState){
				this.show=newState
			},
			purchaseId(newVal){
				this.prePurchaseId=newVal
			}
		}
	}
</script>

<style lang="scss" scoped>
	.winner-pop{
		height: 70vh;
		width: 100%;
		background: #0A0C47;
		color: #FFFFFF;
		.title-rules{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 32rpx;
			padding: 36rpx;
			text-align: center;
			border-bottom: 2rpx solid rgba(255, 255, 255, .1);
		}
		.activity-pop-container{
			box-sizing: border-box;
			width: 100%;
			height: calc(100% - 104rpx);
			padding: 40rpx;
			overflow: auto;
			.activity-timer-box{
				
			}
		}
	}
</style>
