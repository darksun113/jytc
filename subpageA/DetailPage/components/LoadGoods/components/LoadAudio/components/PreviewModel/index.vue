<template>
	<view class="pre-box">
		<img v-lazy class="close_icon" src="@/static/images/close_preview_icon.svg" alt="" @click="close">
		<view class="pre">
			<image :src="audioData.image" mode="aspectFill"></image>
			<audioDom ref="audioNode" :url="audioData.url" :endPic="endPic" :startPic="stattPic"></audioDom>
		</view>
	</view>
</template>

<script>
	import audioDom from "./components/audioDom"
	export default {
		props: {
			audioData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				isPlay:false,
				endPic:require("../../../../static/images/pause_icon.svg"),
				stattPic:require('../../../../static/images/play_icon.svg')
			}
		},
		components:{audioDom},
		methods: {
			close(){
				this.$refs.audioNode.destory()
				this.$emit('close')
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
			background-color: rgba(0, 0, 0, .8);
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
