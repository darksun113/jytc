<template>
	<view class="activity-status">
		<view class="title-count" v-if="prePurchaseInfo_.userList.length < prePurchaseInfo_.peopleNum">
			还差 {{prePurchaseInfo_.peopleNum - prePurchaseInfo_.userList.length}} 人即可参与抽奖
		</view>
		<view class="title-count" v-else></view>
		<PowerNums :powerList="prePurchaseInfo_.userList" :totalNum="prePurchaseInfo_.peopleNum"></PowerNums>
		<view v-if="prePurchaseInfo_.userList.length==prePurchaseInfo_.peopleNum" class="power-success-tip">
			<image src="@/static/images/join_success_icon.svg" mode=""></image>助力已完成
		</view>
		<RegisterAndBindCard v-else-if="!$store.state.userInfo.certificationStatus || $store.state.userInfo.certificationStatus==0" :prePurchaseInfo="prePurchaseInfo_"></RegisterAndBindCard>
		<ToJoinActive v-else :seriesId="prePurchaseInfo_.seriesId"></ToJoinActive>
	</view>
</template>

<script>
	import PowerNums from "./components/PowerNums/index.vue"
	import RegisterAndBindCard from "./components/RegisterAndBindCard/index.vue"
	import ToJoinActive from "./components/ToJoinActive/index.vue"
	import {getFilePath} from "@/utils/tools.js"
	export default{
		props:{
			prePurchaseInfo:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return {
				isJoin:true,
				prePurchaseInfo_:{
					userList:[]
				}
			}
		},
		methods:{
			async getiIcon(data){
				try{
					data.userList=await getFilePath(data.userList,["icon"])
					this.prePurchaseInfo_=data
				}catch(e){
					//TODO handle the exception
				}
			}
		},
		mounted() {
			this.getiIcon(this.prePurchaseInfo)
		},
		components:{
			PowerNums,
			RegisterAndBindCard,
			ToJoinActive
		},
		watch:{
			prePurchaseInfo(data){
				this.getiIcon(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activity-status{
		background: #0A0C47;;
		border-radius: 8rpx;
		padding: 40rpx;
		box-sizing: border-box;
		margin-top: 40rpx;
		position: relative;
		.title-count{
			font-size: 36rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #FFFFFF;
			line-height: 50rpx;
			text-align: center;	
		}
	}
	.power-success-tip{
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
	}
</style>