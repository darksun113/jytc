<template>
	<video 
		@click="control"
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
		<view class="play-box" v-show="isPause" @click.self="control">
			<image src="../../../../static/images/play_icon.svg" mode=""></image>
		</view>
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
				videoNode:null,
				isPause:false
			}
		},
		mounted() {
			this.setVideo()
		},
		methods: {
			setVideo(){
				this.videoNode = document.getElementById("player").childNodes[0].childNodes[0]
				if(this.videoData.loadType==1)return
				this.videoNode.addEventListener('timeupdate',()=>{
					if(this.videoNode.currentTime>5){
						this.videoNode.currentTime=0
					}
				})
			},
			control(){
				if(this.videoNode.paused){
					this.play()
					this.isPause=false
				}else{
					this.pause()
					this.isPause=true
					
				}
			},
			pause(){
				this.videoNode.pause()
				this.isPause=true
			},
			play(){
				this.videoNode.play()
				this.isPause=false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		width: 100% ;
		height: 100% ;
		position: relative;
		.play-box{
			width: 80rpx;
			height: 80rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			border-radius: 50%;
			overflow: hidden;
			background: #28D8E5;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	::v-deep .uni-video-cover{
		// display: none;
	}
</style>
