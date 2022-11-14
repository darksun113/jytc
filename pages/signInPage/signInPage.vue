<template>
	<PageTemp class="sign-page">
		<Calendar :signDetail="signDetail" @signSuccess="signSuccess" :signInId="signInId" />
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
					cumulativeDays:5,
					title: "签到活动标题",
					startTime: parseInt(Date.now() / 1000),
					endTime: parseInt(Date.now() / 1000) + 10 * 3600 * 24,
					rewards:[
						{
							rewardId:"asbcs",
							days:7,
							type:1,
							blinkboxId:"451",
							number:1,
							receive:0
						},{
							rewardId:"asbcs",
							days:7,
							type:1,
							blinkboxId:"451",
							number:1,
							receive:0
						},
						
					],
					content: `1.每日签到可得xx积分；/n
							2.连续签到x天，可得x积分和n次抽奖机会；连续签到x天，可得x积分和n次抽奖机会；/n
							此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文
							案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案`
				},
				signInId : ""
			};
		},
		components:{
			Calendar,
			SignProgressBar,
			AwardList
		},
		onLoad({signInId}) {
			this.signInId = signInId
			this.getSignDetail(signInId)
		},
		methods:{
			signSuccess(){
				this.getSignDetail(signInId)
			},
			async getSignDetail(signInId){
				const res = await uni.$http("/signIn/detail",{
					signInId
				})
				if(res.code == 0){
					this.signDetail = res.data;
				}else{
					this.$toast(res.errorMsg)
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
