<template>
	<PageTemp class="user-account">
		<view class="account-item" @click="changeAvatar">
			<view class="title">头像</view>
			<view class="info" style="display: flex;align-items: center;">
				<image  style="width: 84rpx;height: 84rpx;border-radius: 50%;"  src="/static/images/default_avatar.png"></image>
			</view>
		</view>
		<view class="account-item" @click="reName">
			<view class="title">昵称</view>
			<view class="info" style="display: flex;align-items: center;">
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
		<view class="account-item" style="margin-top: 60rpx;" @click="exit">
			<view class="title">
				退出登录
			</view>
			<view class="info" style="display: flex;align-items: center;">
			</view>
		</view>
		<Rename :isShow="isRename" @close="isRename=false"></Rename>
		<Exit :isShow="isExit" @close="isExit=false"></Exit>
		<ChangeAvatar :isShow="isChangeAvatar" @close="isChangeAvatar=false"></ChangeAvatar>
	</PageTemp>
</template>

<script>
	import Rename from "./components/Rename/index.vue"
	import Exit from "./components/Exit/index.vue"
	import ChangeAvatar from "./components/ChangeAvatar/index.vue"
	export default {
		components:{
			Rename,
			Exit,
			ChangeAvatar
		},
		data() {
			return {
				isRename:false,
				isExit:false,
				isChangeAvatar:false
			};
		},
		methods:{
			toBindCard(){
				if(this.$store.state.userInfo.certificationStatus==0){
					this.$routerTo("/subpageA/BindIdCard/BindIdCard")
				}
			},
			// 修改名字
			reName(){
				this.isRename=true
			},
			exit(){
				this.isExit=true
			},
			changeAvatar(){
				this.isChangeAvatar=true
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-account{
	padding: 40rpx;
	overflow: auto;
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
	}
}
</style>
