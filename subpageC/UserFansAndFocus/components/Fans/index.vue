<template>
	<scroll-view v-if="true" class="list-box" scroll-y="true" @scrolltolower="updateList">
		<view class="item" v-for="(item,index) in fansList" :key="index" @click="toOtherPage">
			<view class="user-info">
				<image class="avatar" src="@/static/images/demo1.png" mode="aspectFill"></image>
				<view class="info">
					<view class="name">{{item.name}}</view>
					<view class="fans-collection">
						<view class="fans-num">粉丝 183</view>
						<view class="fans-num">藏品数 183</view>
					</view>
				</view>
			</view>
			<view class="operate">
				<view class="btn" @click="focus(0,index)" v-if="item.isFocus">互相关注</view>
				<view class="btn" @click="focus(1,index)" v-else>回粉</view>
			</view>
		</view>
	</scroll-view>
	<SecurityControls v-else-if="true">
		由于该用户隐私设置，粉丝列表不可见
	</SecurityControls>
	<IsNoData v-else>
		暂无粉丝
	</IsNoData>
</template>

<script>
	export default{
		data(){
			return {
				fansList:[
					{
						isFocus:false,
						name:"张晓"
					},
					{
						isFocus:true,
						name:"李丽"
					},
					{
						isFocus:false,
						name:"刘华强"
					},
					{
						isFocus:false,
						name:'赵世泽'
					},
					{
						isFocus:true,
						name:"许华强"
					},
				]
			}
		},
		methods:{
			toOtherPage(){
				this.$emit("toOtherPage")
			},
			focus(type,index){
				// type 0 取消关注  1 关注
				type==0?this.fansList[index].isFocus=false:this.fansList[index].isFocus=true
			},
			updateList(){
				console.log('update')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list-box{
		box-sizing: border-box;
		padding: 40rpx;
		height: 100%;
		overflow: auto;
		.item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid rgba(255, 255, 255, .15);
			padding: 20px 0;
			&:last-child{
				border-bottom: none;
			}
			.user-info{
				display: flex;
				.avatar{
					width: 100rpx;
					min-width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				.info{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					color: #FFFFFF;
					.name{
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						line-height: 44rpx;
					}
					.fans-collection{
						font-size: 24rpx;
						color: #CCCCCC;
						line-height: 34rpx;
						display: flex;
						.fans-num{
							margin-right: 60rpx;
							&:last-child{
								margin-right: 0;
							}
						}
					}
				}
			}
			.operate{
				width: 176rpx;
				height: 60rpx;
				background: #666666;
				border-radius: 30rpx;
				.btn{
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 60rpx;
					text-align: center;
				}
			}
			
		}
	}
</style>