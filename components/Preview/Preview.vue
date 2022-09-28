<template>
	<u-popup :show="show" mode="center" :mask="false" bgColor="transparent">
		<view class="center-pop">
			<!-- <img v-lazy class="close_icon" src="@/static/images/close_preview_icon.svg" alt="" @click="$emit('close')"> -->
			<slot></slot>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name:"Preview",
		props:{
			isShow:[Boolean]
		},
		data() {
			return {
				show:this.isShow
			};
		},
		methods:{
		},
		watch:{
			isShow(boo){
				this.show=boo
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
	.close_icon{
		width: 64rpx;
		height: 64rpx;
		position: absolute;
		right: 60rpx;
		top: 120rpx;
		z-index: 999999;
	}
}
</style>