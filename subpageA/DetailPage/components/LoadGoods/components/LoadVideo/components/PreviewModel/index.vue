<template>
	<view class="pre">
		<view id="mui-pre-player"></view>
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
					muted: true,
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
	.pre{
		width: 630rpx;
		height: 356rpx;
		// padding: ;
	}
</style>
