<template>
	<PageTemp>
		<scroll-view class="my-object" scroll-y="true" @scrolltolower="updateList">
			<CardOfObject v-for="i in 15" :key="i"></CardOfObject>
			<IsEnd></IsEnd>
		</scroll-view>
	</PageTemp>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			updateList(){
				console.log('update')
			}
		}
	}
</script>

<style lang="scss">
.my-object{
	box-sizing: border-box;
	padding: 40rpx;
	height: 100%;
	overflow: auto;
}
</style>
