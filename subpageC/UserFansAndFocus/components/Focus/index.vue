<template>
	<scroll-view class="list-box" scroll-y="true" @scrolltolower="updateList">
		<view class="item" v-for="i in 20" :key="i">
			<view class="user-info">
				<image class="avatar" src="@/static/images/demo1.png" mode="aspectFill"></image>
				<view class="info">
					<view class="name">张三</view>
					<view class="fans-collection">
						<view class="fans-num">粉丝 183</view>
						<view class="fans-num">藏品数 183</view>
					</view>
				</view>
			</view>
			<view class="operate">
				<view class="btn">
					已关注
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default{
		methods:{
			updateList(){
				console.log('update')
			}
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