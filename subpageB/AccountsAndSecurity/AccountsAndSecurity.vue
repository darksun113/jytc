<template>
	<PageTemp class="user-account">
		<Menu @changeAvatar="changeAvatar" @reName="reName" @exit="exit"></Menu>
		<Rename :isShow="isRename" @close="isRename=false"></Rename>
		<Exit :isShow="isExit" @close="isExit=false"></Exit>
		<ChangeAvatar :isShow="isChangeAvatar" @close="isChangeAvatar=false"></ChangeAvatar>
	</PageTemp>
</template>

<script>
	import Rename from "./components/Rename/index.vue"
	import Exit from "./components/Exit/index.vue"
	import Menu from "./components/Menu/index.vue"
	import ChangeAvatar from "./components/ChangeAvatar/index.vue"
	export default {
		components:{
			Rename,
			Exit,
			Menu,
			ChangeAvatar
		},
		data() {
			return {
				isRename:false,
				isExit:false,
				isChangeAvatar:false
			};
		},
		onShow() {
			this.$updateUserInfo()
		},
		methods:{
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
