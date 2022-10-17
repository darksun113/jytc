<template>
	<PageTemp class="sign-page">
		<Calendar></Calendar>
	</PageTemp>
</template>

<script>
	import Calendar from "./components/Calendar"
	export default {
		data() {
			return {
				show:true
			};
		},
		components:{
			Calendar,
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
.sign-page{
	padding: 30rpx;
	// color: #000;
}
</style>
