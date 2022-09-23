<template>
	<!-- 音频播放器组件 -->
	<view v-if='url && canPlay' class='flex justify-between align-center audio'>
		<view class='ml-3' @click='start()'>
			<view class="icon-box" v-show='!status'>
				<image :src='startPic' class='icon'></image>
			</view>
			<view class="icon-box rotate" v-show='status'>
				<image :src='endPic' class='icon'></image>
			</view>
		</view>
		<view class='flex-1'>
			<slider @change='changeAudio' :block-size="blockSize" :backgroundColor='backgroundColor'
				:activeColor='activeColor' :min='0' :max='duration.toFixed(0)' :value='currentTime.toFixed(0)'
				:step='0.1'></slider>
		</view>
		<view class='ml-3'>{{getTime(Math.round(currentTime))}} /{{getTime(Math.round(duration))}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				context: null,
				currentTime: 0,
				duration: 0,
				status: false,
				canPlay:false,
				ifSetThis:true
			}
		},
		props: {
			url: String,
			activeColor: { //滑块左侧已选择部分的线条颜色
				type: String,
				default: '#28D8E5'
			},
			backgroundColor: { //滑块右侧背景条的颜色
				type: String,
				default: '#B3B3B3'
			},
			blockSize: { //控制滑块的大小
				type: Number,
				default: 12
			},
			startPic: String, //开始播放的图片
			endPic: String, //暂停播放的图片
		},
		mounted() {
			this.context = uni.createInnerAudioContext(); //初始化音频
			this.context.src = this.url;
			this.onTimeUpdate();
			this.onCanplay();
			this.onEnded();
		},
		methods: {
			destory() {
				this.context.stop();
				this.currentTime=0
				this.status = false;
			},
			start() { //点击播放
				if (this.status) {
					this.context.pause();
					this.status = !this.status;
				} else {
					this.context.play()
					this.status = !this.status;
				}
			},
			onCanplay(cb) { //进入可播放状态
				let platform = uni.getSystemInfoSync().platform;
				if(platform == 'android'){
					this.context.onCanplay(() => {
						this.duration = this.context.duration;
						this.canPlay=true
					})
				}else{
					this.start()
					this.context.onCanplay(() => {
						this.duration = this.context.duration;
						this.canPlay=true
						if(this.ifSetThis){
							this.currentTime=0
							this.context.stop()
							this.status = false;
						}
						this.ifSetThis = false
					})
				}
			},
			onTimeUpdate() { //音频播放进度
				this.context.onTimeUpdate(() => {
					if (!Number.isFinite(this.context.duration)) { //检测当前音频是否为无穷大
						this.context.currentTime = Number.MAX_SAFE_INTEGER;
						this.context.currentTime = 0;
					} else {
						this.duration = this.context.duration;
						this.currentTime = this.context.currentTime;
					}
				})
			},
			onEnded() { //播放结束
				this.context.onEnded(() => {
					this.status = false;
					this.currentTime = 0;
				})
			},
			changeAudio(e) {
				let paused = this.context.paused;
				this.context.pause();
				this.context.seek(e.detail.value)
				console.log(this.context)
				if (!paused) {
					this.context.play();
				}
			},
			getTime(time) {
				let m = parseInt(time / 60);
				let s = time % 60;
				return this.towNum(m) + ':' + this.towNum(s);
			},
			towNum(num) {
				if (num >= 10) {
					return num;
				} else {
					return '0' + num;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.audio {
		background: #4D4D4D;
		padding: 30rpx 32rpx;
		border-radius: 8rpx;
	}

	::v-deep .uni-slider-thumb {
		background: #28D8E5 !important;
	}
	.rotate{
		animation: rotate 5s 0s linear infinite;
		transform: rotate(0deg);
	}
	@keyframes rotate {
		from{
			transform: rotate(0deg);
		}to{
			transform: rotate(360deg);
		}
	}
	.icon-box {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: #28D8E5;
		display: flex;
		align-items: center;
		justify-content: center;

		.icon {
			width: 30rpx;
			height: 30rpx;
		}
	}


	.flex {
		display: flex;
		flex-direction: row;
	}

	.justify-between {
		justify-content: between;
	}

	.align-center {
		align-items: center;
	}

	.flex-1 {
		flex: 1;
	}

	.ml-3 {
		color: #FFFFFF;
		font-size: 24rpx;
	}
</style>
