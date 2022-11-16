<template>
	<view >
		<view class="code-box">
			<view class="" style="width: 160rpx;"></view>
			<view class="goodsCode_box" v-if="goodsData.loadType==1">
				<view class="goodsCode">#{{goodsData.goodsCode}}</view>
			</view>
			<donation-and-collection :goodsData="goodsData"  @showLoginTip="isShow=true" />
		</view>
		<!-- 登录pop -->
		<LoginTipPop name="goodsDetail" @loginSuccess="loginSuccess" :isShow="isShow" @close="isShow=false"></LoginTipPop>
	</view>
</template>

<script>
	import DonationAndCollection from "./components/DonationAndCollection"
	export default {
		props:{
			// materialType 类型 0 模型  1 图片  2 视频  3 音频
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				isShow: false
			}
		},
		components:{
			DonationAndCollection
		},
		methods: {
			loginSuccess(){
				uni.showToast({
					title:"登录成功",
					icon:"success",
					duration:2000
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.code-box{
		display: flex;
		align-items: center;
		padding: 0 40rpx;
		width: 100%;
		justify-content: space-between;
		position: absolute;
		top: 40rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		.goodsCode_box{
			font-size: 24rpx;
			padding: 6rpx 10rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 700;
			color: #28D8E5;
			line-height: 34rpx;
			border-radius: 2px;
			align-self: flex-start;
		}
		.level-tags{
			image{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				overflow: hidden;
			}
		}
	}
</style>