<template>
	<view class="model-box">
		<LoadModel></LoadModel>
		<PreviewModel></PreviewModel>
	</view>
</template>

<script>
	import LoadModel from "./components/LoadModel";
	import PreviewModel from "./components/PreviewModel";
	export default {
		components:{
			LoadModel,
			PreviewModel
		}
	}
</script>

<style>
</style>