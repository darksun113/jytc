<template>
	<PageTemp class="sign-page">
		<Calendar />
		<SignProgressBar />
		<AwardList />
	</PageTemp>
</template>

<script>
	import Calendar from "./components/Calendar"
	import SignProgressBar from "./components/SignProgressBar"
	import AwardList from "./components/AwardList"
	export default {
		data() {
			return {
				show:true
			};
		},
		components:{
			Calendar,
			SignProgressBar,
			AwardList
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
.sign-page{
	padding: 30rpx;
	padding-bottom: 44rpx;
	// color: #000;
}
</style>
