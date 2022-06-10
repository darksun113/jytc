<template>
	<u-popup :show="show" mode="center" bgColor="transparent">
		<view class="pop-box">
			<view class="main">
				<view class="title">修改昵称</view>
				<view class="author-name">
					<text style="min-width: 160rpx;">收藏家：</text>
					<text class="nowrap">{{$store.state.userInfo.fullName}}</text>
				</view>
				<view class="input-box">
					<u--input placeholder="请输入内容" border="none" color="#FFF" :customStyle="{background:'#2C2E69',padding:'12rpx 26rpx' }" v-model="renameValue"></u--input>
				</view>
			</view>
			<view class="operate-box">
				<view class="left" @click="$emit('close')">
					取消
				</view>
				<view class="right">
					确认
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default{
		props:{
			isShow:{
				type:Boolean,
				default:()=>false
			}
		},
		data(){
			return {
				show:this.isShow,
				renameValue:""
			}
		},
		watch:{
			isShow(boo){
				this.show=boo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-box{
		width: 640rpx;
		background: #0A0C47;
		overflow: hidden;
		border-radius: 16rpx;
		.main{
			padding: 40rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			color: #FFFFFF;
			line-height: 48rpx;
			text-align: center;
			.title{
				font-size: 34rpx;
				font-weight: 500;
				margin-top: 8rpx;
			}
			.author-name{
				font-size: 32rpx;
				margin-top: 20rpx;
				justify-content: center;
				display: flex;
				align-items: center;
				font-family: PingFangSC-Regular, PingFang SC;
			}
			.input-box{
				margin: 0 auto;
				margin-top: 20rpx;
				padding: 0 44rpx;
			}
		}
		.operate-box{
			height: 110rpx;
			border-top: 2rpx solid rgba(255, 255, 255, .2);
			display: flex;
			justify-content: space-between;
			view{
				flex:1;
				text-align:center;
				line-height:110rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-size: 34rpx;
				&:first-child{
					color: #AAAAAA;
					border-right: 2rpx solid rgba(255, 255, 255, .2);
				}
			}
		}
	}
</style>