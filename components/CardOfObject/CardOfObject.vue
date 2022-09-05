<template>
	<view class="card-of-object" @click="active">
		<view class="goods-pic-box">
			<image class="goods-pic" :src="item.image || item.seriesImg" mode="aspectFill"></image>
			<view class="icon">
				<image v-if="item.materialType==0" class="goods-type" src="@/static/images/type_3D.svg" mode=""></image>
				<image v-else-if="item.materialType==1" class="goods-type" src="@/static/images/type_pic.svg" mode=""></image>
				<image v-else-if="item.materialType==2" class="goods-type" src="@/static/images/type_video.svg" mode=""></image>
				<image v-else-if="item.materialType==3" class="goods-type" src="@/static/images/type_audio.svg" mode=""></image>
				<image v-else class="goods-type" src="@/static/images/type_audio.svg" mode=""></image>
			</view>
		</view>
		<view class="goods-info" :style="{justifyContent:loadType_==1?'space-around' : 'space-between'}">
			<view class="goods-name nowrap_2">
				{{item.goodsName || "故宫里的中国节-中秋"}}
			</view>
			<view>
				<view class="goods-code-box" v-if="loadType_ == 0 || loadType_ == 2">
					<view class="code" v-if="loadType_ == 0">
						#{{item.goodsCode}}/{{item.totalNumber}}
					</view>
					<view class="limit" v-else>
						限量 10000
					</view>
				</view>
				<view class="author-box">
					<image class="author-icon" :src="item.shopIcon" mode=""></image>
					<view class="author-name nowrap">
						{{item.shopName}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CardOfObject",
		props:{
			item:{
				type:Object,
				default:()=>{}
			},
			//0 普通藏品  1 盲盒 2 日历模式
			loadType:{
				type:[Number,String],
				default:0
			}
		},
		data() {
			return {
				loadType_:this.loadType
			};
		},
		methods:{
			active(){
				if(this.loadType_ == 2)return;
				if(this.loadType_ == 0){
					this.toGoodsDetail()
				}else{
					this.$emit("toOpenBlindBox",this.item.instanceId)
				}
			},
			toGoodsDetail(){
				const url=`/subpageA/DetailPage/DetailPage?loadType=1&instanceId=${this.item.instanceId}&materialType=${this.item.materialType}`
				this.$routerTo(url)
			}
		},
		watch:{
			loadType(type){
				this.loadType_=type
			}
		}
	}
</script>

<style lang="scss" scoped>
.card-of-object{
	background: #333;
	border-radius: 20rpx;
	margin-bottom: 40rpx;
	overflow: hidden;
	padding: 8rpx;
	color: #FFFFFF;
	display: flex;
	.goods-pic-box{
		position: relative;
		width: 236rpx;
		height: 236rpx;
		min-width: 236rpx;
		border-radius: 20rpx;
		.goods-pic{
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
			background: #000000;
		}
		.icon{
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			left: 12rpx;
			bottom: 12rpx;
			background: rgba(0, 0, 0, .4);
			border-radius: 4rpx;
			padding: 0 4rpx;
			.goods-type{
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.goods-info{
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		.goods-name{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 44rpx;
		}
		.goods-code-box{
			margin-top: 20rpx;
			display: flex;
			.code{
				padding: 6rpx 10rpx;
				border-radius: 4rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 700;
				color: #28D8E5;
				line-height: 34rpx;
			}
			.limit{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}
		.author-box{
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			.author-icon{
				width: 36rpx;
				min-width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}
			.author-name{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 34rpx;
			}
		}
	}
	
}
</style>