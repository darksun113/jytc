<template>
	<view class="pre-box">
		<image class="close_icon" src="@/static/images/close_preview_icon.svg" mode="" @click="$emit('close')"></image>
		<view class="pre">
			<view id="mui-pre-player"></view>
		</view>
	</view>
</template>

<script>
	import 'mui-player/dist/mui-player.min.css'
	import MuiPlayer from 'mui-player'
	export default {
		props: {
			videoData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				player: null,
			}
		},
		mounted() {
			this.initVideo()
		},
		destroyed() {
			this.player.destory()
		},
		methods: {
			initVideo() {
				this.player = new MuiPlayer({
					container: '#mui-pre-player',
					src: this.videoData.url,
					autoplay: true,
					muted: false,
					loop: true,
					autoOrientaion:true,
					pageHead:false,//非全屏模式下，是否显示播放器头部操作控件
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#mui-pre-player {
		width: 100% !important;
		height: 100% !important;
	}
	.pre-box{
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .8);
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		.close_icon {
			width: 64rpx;
			height: 64rpx;
			position: absolute;
			right: 60rpx;
			top: 120rpx;
			z-index: 999999;
		}
		.pre{
			width: 630rpx;
			height: 356rpx;
			position: relative;
			
		}
	}
	
</style>
