<template>
	<PageTemp class="other-page">
		<UserHeader></UserHeader>
		<view class="container">
			<view class="title">他的藏品（2）</view>
			<scroll-view v-if="false" class="list-box" scroll-y="true" @scrolltolower="updateList">
				<CardOfObject v-for="i in 15" :key="i"></CardOfObject>
			</scroll-view>
			<SecurityControls v-else-if="false">
				由于该用户隐私设置，藏品不可见
			</SecurityControls>
			<IsNoObject v-else>
				暂无藏品
			</IsNoObject>
		</view>
	</PageTemp>
</template>

<script>
	import UserHeader from "./components/UserHeader/index.vue"
	export default {
		components:{
			UserHeader
		},
		data() {
			return {
				
			};
		},
		methods:{
			updateList(){
				console.log("update")
			}
		}
	}
</script>

<style lang="scss">
.other-page{
	padding: 40rpx;
	.container{
		height: calc(100% - 260rpx);
		.title{
			text-align: center;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			padding: 40rpx;
		}
		.list-box{
			box-sizing: border-box;
			height: calc(100% - 126rpx);
			overflow: auto;
		}
	}
}
</style>
