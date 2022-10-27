<template>
	<PageTemp class="sign-page">
		<Calendar :signDetail="signDetail" :signInId="signInId" />
		<SignProgressBar :signDetail="signDetail" :signInId="signInId" />
		<AwardList :signDetail="signDetail" :signInId="signInId" />
	</PageTemp>
</template>

<script>
	import Calendar from "./components/Calendar"
	import SignProgressBar from "./components/SignProgressBar"
	import AwardList from "./components/AwardList"
	export default {
		data() {
			return {
				show:true,
				signDetail:{
					cumulativeDays:5
				},
				signInId : ""
			};
		},
		components:{
			Calendar,
			SignProgressBar,
			AwardList
		},
		onLoad(opt) {
			this.signInId = opt.signInId
			// this.getSignDetail()
		},
		methods:{
			async getSignDetail(){
				const res = await uni.$http("/signIn/detail",{})
				if(res.code == 0){
					this.signDetail = res.data;
				}
			}
		}
	}
</script>

<style lang="scss">
.sign-page{
	padding: 30rpx;
	padding-bottom: 44rpx;
}
</style>
