<template>
	<u-popup :show="show" @close="close" @open="open" :closeable="true" bgColor="transparent">
		<view class="winner-pop">
			<view class="title-rules">
				获奖名单
			</view>
			<scroll-view scroll-y="true" @scrolltolower="updateList" class="activity-pop-container">
				<ListItem v-for="i in 15" :key="i"></ListItem>
				<IsEnd></IsEnd>
			</scroll-view>
		</view>
	</u-popup>
</template>
<script>
	
	export default {
		props:['isShow'],
		data() {
			return {
				show: this.isShow,
			}
		},
		mounted() {
		},
		destroyed() {
		},
		methods: {
			updateList(){
				console.log(456)
			},
			open() {
				// console.log('open');
			},
			close() {
				this.$emit("close")
				// console.log('close');
			}
		},
		watch:{
			isShow(newState){
				this.show=newState
			}
		}
	}
</script>

<style lang="scss" scoped>
	.winner-pop{
		height: 70vh;
		width: 100%;
		background: #0A0C47;
		color: #FFFFFF;
		.title-rules{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 32rpx;
			padding: 36rpx;
			text-align: center;
			border-bottom: 2rpx solid rgba(255, 255, 255, .1);
		}
		.activity-pop-container{
			box-sizing: border-box;
			width: 100%;
			height: calc(100% - 104rpx);
			padding: 40rpx;
			overflow: auto;
			.activity-timer-box{
				
			}
		}
	}
</style>
