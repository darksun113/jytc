<template>
	<view class="">
		<view class="account-item" @click="$emit('changeAvatar')">
			<view class="title">头像</view>
			<view class="info" style="display: flex;align-items: center;">
				<image  style="width: 84rpx;height: 84rpx;border-radius: 50%;"  :src="$store.state.userInfo.avatar"></image>
			</view>
		</view>
		<view class="account-item" @click="$emit('reName')">
			<view class="title">昵称</view>
			<view class="info nowrap" style="max-width: 400rpx;">
				{{$store.state.userInfo.name}}
			</view>
		</view>
		<view class="account-item">
			<view class="title">手机号</view>
			<view class="info" style="display: flex;align-items: center;">
				{{$store.state.userInfo.phone}}
			</view>
		</view>
		<view class="account-item">
			<view class="title">
				实名认证
			</view>
			<view @click="toBindCard" class="info" style="display: flex;align-items: center;">
				<text style="color: #888;" v-if="$store.state.userInfo.certificationStatus==1">已认证</text>
				<text v-else>未认证</text>
			</view>
		</view>
		<view class="account-item">
			<view class="title">注册时间</view>
			<view class="info" style="display: flex;align-items: center;color: #888;">
				<!-- {{$store.state.userInfo.phone}} -->
				{{parseInt(Date.now()/1000) | format}}
			</view>
		</view>
		<view class="account-item" style="margin-top: 60rpx;" @click="$emit('exit')">
			<view class="title">
				退出登录
			</view>
			<view class="info" style="display: flex;align-items: center;">
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		filters:{
			format(stamp){
				if(!stamp){
					return ""
				}else{
					const date = new Date(stamp*1000)
					const Y = date.getFullYear() + '-'
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
					const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
					const H = date.getHours() + ':'
					const M2 = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
					const S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
					return Y + M + D + H + M2 + S
				}
			}
		},
		methods:{
			toBindCard(){
				if(this.$store.state.userInfo.certificationStatus==0){
					this.$routerTo("/subpageA/BindIdCard/BindIdCard")
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.account-item{
		height: 124rpx;
		background: #0A0C47;
		border-radius: 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx;
		margin-bottom: 20rpx;
		.title{
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.info{
			padding-right: 32rpx;
			position: relative;
			font-size: 32rpx;
			&::before{
				content: "";
				width: 12rpx;
				height: 20rpx;
				background: url("@/static/images/more_arrows_icon.svg") no-repeat center center;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 0;
				background-size: cover;
			}
		}
		&:nth-last-child(2){
			.info{
				padding-right: 0;
				&::before{
					background:none
				}
			}
		}
	}
</style>