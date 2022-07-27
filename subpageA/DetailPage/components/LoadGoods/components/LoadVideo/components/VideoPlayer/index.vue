<template>
	<video 
		class="video"
		id="player"
		webkit-playsinline="true"
		playsinline="true"
		x5-playsinline="true"
		x5-video-player-fullscreen="true"
		x5-video-player-type="h5" 
		:enable-progress-gesture="false"
		:controls="false"
		preload="auto"
		:muted="videoData.loadType==1?false:true" 
		autoplay
		loop
		:poster="videoData.image"
		:src="videoData.url">
	</video>
</template>

<script>
	export default {
		props: {
			videoData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				video:null
			}
		},
		mounted() {
			this.isWeiXin()
			this.setVideo()
		},
		destroyed() {
		},
		methods: {
			//判断是否微信环境
			isWeiXin() {
			    var ua = window.navigator.userAgent.toLowerCase();
			    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					document.addEventListener('WeixinJSBridgeReady', function(){
					    this.video = document.getElementById("player");
					    this.video.play();
					}, false);
			    } else {
			        return false; // 普通浏览器中打开
			    }
			},
			setVideo(){
				if(this.videoData.loadType==1)return
				const videoNode = document.getElementById("player").childNodes[0].childNodes[0]
				videoNode.addEventListener('timeupdate',()=>{
					if(videoNode.currentTime>5){
						videoNode.currentTime=0
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		width: 100% ;
		height: 100% ;
	}
	::v-deep .uni-video-cover{
		// display: none;
	}
</style>
