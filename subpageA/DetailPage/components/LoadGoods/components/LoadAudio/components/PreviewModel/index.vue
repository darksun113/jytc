<template>
	<view class="pre-box">
		<img class="close_icon" src="@/static/images/close_preview_icon.svg" alt="" @click="$emit('close')">
		<view class="pre">
			<image :src="audioData.image" mode="aspectFill"></image>
			<view class="play-box" v-show="isPlay" @click="pause">
				<image src="../../../../static/images/pause_icon.svg" mode=""></image>
			</view>
			<view class="play-box" v-show="!isPlay" @click="play">
				<image src="../../../../static/images/play_icon.svg" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			audioData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				audioDom: null,
				isPlay:false
			}
		},
		mounted() {
			this.init()
			
		},
		methods: {
			init(){
				this.audioDom = uni.createInnerAudioContext();
				this.audioDom.src=this.audioData.url
				this.audioDom.onEnded(() => {
				  this.isPlay=false
				});
			},
			play(){
				this.audioDom.play()
				this.isPlay=!this.isPlay
			},
			pause(){
				this.audioDom.pause()
				this.isPlay=!this.isPlay
			},
			destroy(){
				this.audioDom.pause()
				this.audioDom.destroy()
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			background-color: pink;
			position: relative;
			image{
				width: 100%;
				height: 100%;
			}
			.audio{
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 40rpx;
			}
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
	}
	::v-deep .uni-audio-default{
		min-width: 100%;
		background: rgba(0, 0, 0, .5);
		border: none;
		height: 40rpx;
		.uni-audio-left{
			height: 100%;
			background: transparent;
			.uni-audio-button{
				margin: 0 auto;
			}
		}
		.uni-audio-right{
			height: 100%;
			padding: 0;
			padding-right: 20rpx;
			.uni-audio-info{
				height: 100%;
			}
		}
	}
</style>
