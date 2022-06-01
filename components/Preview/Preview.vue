<template>
	<u-popup :show="show" mode="center" :mask="false" bgColor="transparent">
		<slot></slot>
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

</style>