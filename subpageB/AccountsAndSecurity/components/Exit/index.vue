<template>
	<u-popup :show="show" @close="close" :closeable="true" mode="center" bgColor="transparent">
		<view class="pop-box">
			<view class="main">
				<view>
					确认要退出登录吗
				</view>
			</view>
			<view class="operate-box" @click="exit">
				确认
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default{
		props:{
			isShow:{
				type:Boolean,
				default:()=>true
			}
		},
		data(){
			return {
				show:this.isShow
			}
		},
		methods:{
			close(){
				this.$emit('close')
			},
			async exit(){
				try{
					const token=uni.getStorageSync("token")
					const res=await uni.$http("/user/webLogout",{
						token
					})
					if(res.code==0){
						uni.removeStorageSync("token")
						uni.removeStorageSync("userId")
						this.$routerTo(1,"back")
					}
				}catch(e){
					//TODO handle the exception
				}
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
			display: flex;
			justify-content: center;
			align-items: center;
			height: 252rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #CCCCCC;
		}
		.operate-box{
			height: 110rpx;
			border-top: 2rpx solid rgba(255, 255, 255, .2);
			text-align: center;
			line-height: 110rpx;
		}
	}
</style>