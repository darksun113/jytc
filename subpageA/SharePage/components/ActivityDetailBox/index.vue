<template>
	<view class="activity-status">
		<view class="title-count" v-if="true">还差 4 人即可参与抽奖</view>
		<view class="title-count" v-else>已完成任务，等待开奖吧</view>
		<PowerNums></PowerNums>
		<RegisterAndBindCard v-if="true"></RegisterAndBindCard>
		<ToJoinActive v-else></ToJoinActive>
	</view>
</template>

<script>
	import PowerNums from "./components/PowerNums/index.vue"
	import RegisterAndBindCard from "./components/RegisterAndBindCard/index.vue"
	import ToJoinActive from "./components/ToJoinActive/index.vue"
	export default{
		data(){
			return {
				
			}
		},
		components:{
			PowerNums,
			RegisterAndBindCard,
			ToJoinActive
		},
		methods:{
			
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
</style>