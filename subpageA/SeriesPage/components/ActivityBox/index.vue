<template>
	<view>
		<!-- 活动未开启 -->
		<view class="active-tip" v-if="seriesInfo_.prePurchaseOpenTime - curTime>0">
			<view class="active-tip-info">
				<view class="active-tip-info-title">
					{{seriesInfo_.prePurchaseOpenTime | format}}
				</view>
				<view class="active-tip-info-count">
					开启预购活动
				</view>
			</view>
			<view class="active-btn-box">
				<view class="custom-style" style="background: #5C5A88;">
					未开启
				</view>
			</view>
		</view>
		<!-- 活动进行中 -->
		<view class="active-tip" v-else-if="seriesInfo_.reward == 0">
			<view class="active-tip-info">
				<view class="active-tip-info-title">
					预购活动已开启
				</view>
				<!-- <view class="active-tip-info-count">
					{{seriesInfo_.joinNumber}}人参与
				</view> -->
			</view>
			<view class="active-btn-box">
				<view class="custom-style" @click="toJoin">
					{{seriesInfo_.join == 0?'参与':'已参与'}}
				</view>
			</view>
		</view>
		<!-- 活动已开奖 -->
		<view class="active-tip" v-else>
			<view class="active-tip-info">
				<view class="active-tip-info-title">
					查看获得预购资格名单
				</view>
				<!-- <view class="active-tip-info-count">
					{{seriesInfo_.joinNumber}}人参与
				</view> -->
			</view>
			<view class="active-btn-box">
				<view class="custom-style" @click="toViewWinnerList">
					查看
				</view>
			</view>
		</view>
		<ActivityPop @close="isJoinShow=false" :isShow="isJoinShow" :joinStatus="joinStatus" :prePurchaseId="seriesInfo_.prePurchaseId" @changeAcitveBoxStatus="changeAcitveBoxStatus"></ActivityPop>
		<WinnerList @close="isWinnerOpen=false" :isShow="isWinnerOpen" :prePurchaseId="seriesInfo_.prePurchaseId"></WinnerList>
	</view>
</template>

<script>
	import ActivityPop from "./components/ActivityPop/index.vue"
	import WinnerList from "./components/WinnerList/index.vue"
	export default{
		props:{
			seriesInfo:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return {
				joinStatus:0,
				isJoinShow:false,
				seriesInfo_:this.seriesInfo,
				isWinnerOpen:false,
				curTime:parseInt(Date.now()/1000)
			}
		},
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
					const M2 = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
					return Y + M + D + H + M2
				}
			},
		},
		components:{
			ActivityPop,
			WinnerList
		},
		methods:{
			toJoin(){
				const login=this.$checkLogin();
				if(login){
					this.joinStatus=this.seriesInfo_.join;
					this.isJoinShow=true;
				}else{
					this.$emit("showLoginTip");
				}
			},
			toViewWinnerList(){
				this.isWinnerOpen=true
			},
			changeAcitveBoxStatus(){
				this.seriesInfo_.join=1
			}
		},
		watch:{
			seriesInfo(val){
				this.seriesInfo_=val
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
		background: #333;
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
				background: #28D8E5;
			}
		}
	}
	
</style>