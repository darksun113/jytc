<template>
	<view class="code-box">
		<view class="" style="width: 120rpx;"></view>
		<view class="goodsCode_box">
			<view class="goodsCode">#{{goodsData.goodsCode}}/{{goodsData.totalNumber}}</view>
		</view>
		<view class="level-tags" v-if="goodsData.labelType">
			<image v-if="goodsData.labelType=='热销'" src="@/static/levelTags/level_01.png" mode=""></image>
			<image v-else-if="goodsData.labelType=='稀有'" src="@/static/levelTags/level_02.png" mode=""></image>
			<image v-else-if="goodsData.labelType=='史诗'" src="@/static/levelTags/level_03.png" mode=""></image>
			<image v-else-if="goodsData.labelType=='传说'" src="@/static/levelTags/level_04.png" mode=""></image>
			<image v-else-if="goodsData.labelType=='神话'" src="@/static/levelTags/level_05.png" mode=""></image>
			<image v-else-if="goodsData.labelType=='不朽'" src="@/static/levelTags/level_06.png" mode=""></image>
		</view>
		<view v-else class="" style="width: 120rpx;"></view>
	</view>
</template>

<script>
	export default {
		props:{
			// materialType 类型 0 模型  1 图片  2 视频  3 音频
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.code-box{
		display: flex;
		align-items: center;
		padding: 40rpx 40rpx;
		width: 100%;
		justify-content: space-between;
		position: absolute;
		z-index: 2;
		.goodsCode_box{
			font-size: 24rpx;
			padding: 6rpx 10rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #000000;
			line-height: 34rpx;
			background: linear-gradient(90deg, #70D0FF 0%, #D575FF 100%);
			border-radius: 2px;
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