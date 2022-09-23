<template>
	<u-popup :show="show" mode="center" :mask="false" bgColor="transparent">
		<view class="center-pop">
			<view class="notice-box">
				<img class="close_icon" src="@/static/notice/close_notice_icon.svg" alt="" @click="$emit('close')">
				<view class="control-box">
					<image src="@/static/notice/pre_icon.svg" @click="pre" v-show="currentDot!==0"></image>
					<view v-show="currentDot==0"></view>
					<image src="@/static/notice/next_icon.svg" @click="next" v-show="currentDot !== noticeList.length-1"></image>
					<view v-show="currentDot == noticeList.length-1"></view>
				</view>
				<swiper  :autoplay="false" :interval="3000" :duration="100" style="height: 100%;" @change="change" :current="currentDot">
					<swiper-item v-for="(item,idx) in noticeList" :key="idx">
						<view class="swiper-item">
							<scroll-view scroll-y="true" class="content">
								<view class="title"> {{item.title}}</view>
								<view class="info" v-html="translateHtml(item.description)"></view>
							</scroll-view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name:"Preview",
		props:{
			isShow:[Boolean],
			noticeList:{
				type: Array,
				require: true,
			},
		},
		data() {
			return {
				show:this.isShow,
				noticeListAccept:this.noticeList,
				currentDot:0,
			};
		},
		computed:{
			
		},
		methods:{
			translateHtml(htmlText){
				const textArr = htmlText.split("/n").map((item,idx)=>{
					return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+item+"<br/>"
				})
				return textArr.join("")
			},
			change(e){
				this.currentDot=e.detail.current
			},
			next(){
				if(this.currentDot < this.noticeList.length-1){
					this.currentDot++
				}
			},
			pre(){
				if(this.currentDot >0){
					this.currentDot--
				}
			},
			
		},
		watch:{
			isShow(boo){
				this.show=boo
			},
			noticeList(newVal){
				this.noticeListAccept = newVal
			}
		}
	}
</script>

<style lang="scss">
.center-pop{
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, .8);
	position: relative;
	
	.notice-box{
		width: 530rpx;
		height: 600rpx;
		background: linear-gradient(180deg, #F4FBFF 0%, #B6C2CC 100%);
		background-image: url("../../static/notice/notice_bg.png");
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		border-radius: 20rpx;
		position: relative;
		color: #000;
		.close_icon{
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 0;
			top: -100rpx;
			z-index: 2;
		}
		.control-box{
			height: 60rpx;
			width: 220rpx;
			position: absolute;
			left: 50%;
			bottom: -100rpx;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-between;
			image{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}
		}
		.swiper-item{
			padding: 0 40rpx;
			box-sizing: border-box;
			height: 100%;
			.content{
				height: calc(100% - 40rpx);
				padding-bottom: 60rpx;
				font-size: 28rpx;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN;
				font-weight: 400;
				color: #5A5A5A;
				line-height: 42rpx;
				text-align: justify;
				width: 100%;
				.title{
					text-align: center;
					padding: 100rpx 0 28rpx;
					font-size: 36rpx;
					font-family: SourceHanSansCN-Medium, SourceHanSansCN;
					font-weight: 500;
					color: #000000;
					line-height: 54rpx;
				}
				.info{
					word-break: break-word; /* 文本行的任意字内断开，就算是一个单词也会分开 */
					
					word-wrap: break-word; /* IE */
					
					white-space: -moz-pre-wrap; /* Mozilla */
					
					white-space: -hp-pre-wrap; /* HP printers */
					
					white-space: -o-pre-wrap; /* Opera 7 */
					
					white-space: -pre-wrap; /* Opera 4-6 */
					
					white-space: pre; /* CSS2 */
					
					white-space: pre-wrap; /* CSS 2.1 */
					
					white-space: pre-line; /* CSS 3 (and 2.1 as well, actually) */
				}
			}
		}
	}
}
</style>