<template>
	<view class="pre-image">
		<img class="close_icon" src="../../../../static/images/close_preview_icon.svg" alt="" @click="close">
		<VideoPlayer ref="VideoPlayer_1" videoRef="video2"  :videoData="videoData"></VideoPlayer>
		<view class="control">
			<view class="btn" @click="startRotate">
				<img src="../../../../static/images/play_icon.svg" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	import VideoPlayer from "../VideoPlayer"
	export default {
		props: {
			goodsData: {
				type: Object,
				default: () => {}
			}
		},
		data(){
			return {
				videoData: {
					poster:'',
					videoPath:"http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1070/2020-11-25-09-27-59_2020-11-25-09-35-52.m3u8",
					autoplay:true,
					muted:false,
					controls: true, //是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
					controlBar:{
						volumePanel: { //声音样式
							inline: true // 不使用水平方式
						},
						timeDivider: true, // 时间分割线
						durationDisplay: true, // 总时间
						progressControl: true, // 进度条
						remainingTimeDisplay: true, //当前以播放时间
						fullscreenToggle: true, //全屏按钮
						pictureInPictureToggle: false, //画中画
					}
				}
			}
		},
		components:{
			VideoPlayer
		},
		methods: {
			close(){
				this.$refs.VideoPlayer_1.player.dispose()
				this.$emit("close")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pre-image {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .8);
		display: flex;
		justify-content: center;
		align-items: center;
		.close_icon {
			width: 64rpx;
			height: 64rpx;
			position: absolute;
			right: 60rpx;
			top: 120rpx;
			z-index: 999999;
		}
		

		.control {
			width: 260rpx;
			height: 80rpx;
			border-radius: 56rpx;
			position: absolute;
			left: 50%;
			bottom: 100rpx;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-around;
			align-items: center;

			.btn {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
				display: flex;
				justify-content: center;
				align-items: center;

				img {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>
