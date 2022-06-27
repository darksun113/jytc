<template>
	<view id="mui-player"></view>
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
					// src: this.videoData.url,
					src: "https://cdn.uviewui.com/uview/resources/video.mp4",
					// src: "https://taxi-test001.oss-cn-hangzhou.aliyuncs.com/videos/New%203D%20video-10-13-2.m4v?versionId=CAEQHRiBgMCs6szj4xciIGM4MTYyYjk5ZjExNzRiZTJiMTIxZTFhNWQ5NWJmYjZm",
					autoplay: true,
					preload:"auto",
					muted: true,
					loop: true,
					pageHead:false,//非全屏模式下，是否显示播放器头部操作控件
					videoAttribute:[
						{
							attrKey:'webkit-controlslist',
							attrValue:"nodownload"
						}
					]
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
