<template>
	<view class="activity-status">
		<view class="title-count" v-if="totalNum_ - powerList.length>0">还差 {{totalNum_ - powerList.length}} 人即可参与抽奖</view>
		<view class="title-count" v-else>已完成任务，等待开奖吧</view>
		<PowerNums :powerList="powerList" :totalNum="totalNum_"></PowerNums>
		<view class="share-poster-btn" @click="toOpenSharePoster" v-if="totalNum_ - powerList.length>0">
			分享我的专属海报
		</view>
	</view>
</template>

<script>
	import PowerNums from "./components/PowerNums/index.vue"
	import {getFilePath} from "@/utils/tools.js"
	export default{
		props:{
			prePurchaseInfo:{
				type:Array,
				default:()=>[]
			},
			// 总数
			totalNum:[Number,String]
		},
		data(){
			return{
				powerList:this.prePurchaseInfo,
				totalNum_:this.totalNum
			}
		},
		components:{PowerNums},
		mounted() {
			this.getIcon(this.prePurchaseInfo)
		},
		methods:{
			toOpenSharePoster(){
				uni.$emit("toOpenSharePoster")
			},
			async getIcon(list){
				try{
					this.powerList=await getFilePath(list,["icon"])
				}catch(e){
					//TODO handle the exception
				}
			}
		},
		watch:{
			prePurchaseInfo(newList){
				this.getIcon(newList)
			},
			totalNum(num){
				this.totalNum_=num
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activity-status{
		background: #2C2E69;
		border-radius: 8rpx;
		padding: 40rpx;
		box-sizing: border-box;
		.title-count{
			font-size: 36rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #FFFFFF;
			line-height: 50rpx;
			text-align: center;	
		}
		.number-of-power{
			margin: 0 auto;
			width: 496rpx;
			margin-top: 20rpx;
			text-align: center;
			overflow: auto;
			white-space: nowrap;
			image{
				width: 80rpx;
				height:80rpx;
				margin-right: 20rpx;
				border-radius: 50%;
				&:last-child{
					margin-right: 0;
				}
			}
		}
		.share-poster-btn{
			margin: 0 auto;
			margin-top: 40rpx;
			width: 496rpx;
			height: 100rpx;
			background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
			border-radius: 8rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 100rpx;
			text-align: center;
		}
	}
</style>