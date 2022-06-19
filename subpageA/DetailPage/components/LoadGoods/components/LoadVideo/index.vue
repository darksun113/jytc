<template>
	<view class="load-video">
		<view class="video-box">
			<VideoPlayer ref="VideoPlayer" videoRef="video"  :videoData="videoData"></VideoPlayer>
		</view>
		<Control v-if="goodsData.loadType==1" @preview="toOpenModelPreVideo" @share="toShare"></Control>
		<view class="lock_text" v-else>购买后可解锁高清观赏模式</view>
		<Preview :isShow="isOpenPre" @close="isOpenPre=false">
			<PreviewModel :videoData="videoData" @close="closePreviewModel"></PreviewModel>
		</Preview>
	</view>
</template>

<script>
	import Control from "../Control/index.vue"
	import PreviewModel from "./components/PreviewModel"
	import VideoPlayer from "./components/VideoPlayer"
	export default {
		props: {
			// goodsData.loadType: 0 未购买 1 已购买
			// materialType 类型 0 模型  1 图片  2 视频  3 音频
			goodsData: {
				type: Object,
				default: () => {}
			}
		},
		components: {
			Control,
			PreviewModel,
			VideoPlayer
		},
		data() {
			return {
				// videoPath:require("@/static/demo.mp4"),
				// 'http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1070/2020-11-25-09-27-59_2020-11-25-09-35-52.m3u8'
				isOpenPre: false,
				videoData: {
					poster:'',
					videoPath:require("@/static/audio.mp3")
				}
			}
		},
		mounted() {
			
		},
		destroyed() {
			
		},
		methods: {
			closePreviewModel() {
				// this.$refs.VideoPlayer.initVideo()
				this.isOpenPre = false
			},
			toOpenModelPreVideo() {
				this.isOpenPre = true
			},
			toShare() {
				uni.$emit("toOpenSharePoster")
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.load-video {
		width: 100%;
		height: 100%;
		position: relative;

		.video-box {
			width: 450rpx;
			height: 252rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}

		.lock_text {
			height: 28rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 28rpx;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 40rpx;
			padding-left: 28rpx;

			&::before {
				width: 20rpx;
				height: 20rpx;
				content: '';
				position: absolute;
				left: 4rpx;
				top: 50%;
				transform: translateY(-50%);
				background: url("@/static/images/lock_model.svg") no-repeat center center;
				background-size: 100% 100%;
			}
		}
	}
</style>
