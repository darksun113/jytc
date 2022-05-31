<template>
	<view>
		<view class="active-tip" v-if="true">
			<view class="active-tip-info">
				<view class="active-tip-info-title">
					预购活动已开启
				</view>
				<view class="active-tip-info-count">
					889850人参与
				</view>
			</view>
			<view class="active-btn-box">
				<view class="custom-style" @click="toJoin">
					{{joinStatus == 0?'参与':'已参与'}}
				</view>
			</view>
		</view>
		<view class="active-tip" v-else>
			<view class="active-tip-info">
				<view class="active-tip-info-title">
					查看获得预购资格名单
				</view>
				<view class="active-tip-info-count">
					889850人参与
				</view>
			</view>
			<view class="active-btn-box">
				<view class="custom-style" @click="toViewWinnerList">
					查看
				</view>
			</view>
		</view>
		<ActivityPop @close="isJoinShow=false" :isShow="isJoinShow"></ActivityPop>
		<WinnerList @close="isWinnerOpen=false" :isShow="isWinnerOpen"></WinnerList>
	</view>
</template>

<script>
	import ActivityPop from "./components/ActivityPop/index.vue"
	import WinnerList from "./components/WinnerList/index.vue"
	export default{
		data(){
			return {
				joinStatus:0,
				isJoinShow:false,
				isWinnerOpen:false
			}
		},
		components:{
			ActivityPop,
			WinnerList
		},
		methods:{
			toJoin(){
				this.isJoinShow=true
				this.joinStatus==0?this.joinStatus=1:this.joinStatus=0
			},
			toViewWinnerList(){
				this.isWinnerOpen=true
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-button__text{
		font-size: 28rpx !important;
	}
	.active-tip{
		padding: 40rpx;
		margin-top: 40rpx;
		background: #0A0C47;
		border-radius: 8rpx;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.active-tip-info{
			.active-tip-info-title{
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				line-height: 44rpx;
			}
			.active-tip-info-count{
				margin-top: 20rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				line-height: 34rpx;
			}
		}
		.active-btn-box{
			.custom-style {
				color: #000000;
				width: 200rpx;
				height: 72rpx;
				border-radius: 16rpx;
				font-size: 28rpx;
				text-align: center;
				font-family: PingFangSC-Medium, PingFang SC;
				line-height: 72rpx;
				font-weight: 500;
				background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
			}
		}
	}
	
</style>