<template>
	<view id="mui-player">
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
					container: '#mui-player',
					// title:'标题',
					src: this.videoData.url,
					autoplay: true,
					muted: true,
					loop: true,
					pageHead:false,//非全屏模式下，是否显示播放器头部操作控件
				})
				this.player.toggleControls(false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	#mui-player {
		width: 100% !important;
		height: 100% !important;
	}
	::v-deep .mini-progress{
		display: none;
	}
	::v-deep .mplayer-footer{
		display: none;
	}
</style>
