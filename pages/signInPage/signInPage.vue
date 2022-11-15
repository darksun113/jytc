<template>
	<PageTemp class="sign-page">
		<Calendar :signDetail="signDetail" @signSuccess="signSuccess" :signInId="signInId" />
		<SignProgressBar :signDetail="signDetail" :signInId="signInId" @resetPage="signSuccess" />
		<AwardList :rewards="signDetail.rewards" :signInId="signInId" />
	</PageTemp>
</template>

<script>
	import Calendar from "./components/Calendar"
	import SignProgressBar from "./components/SignProgressBar"
	import AwardList from "./components/AwardList"
	import {getFilePath} from "../../utils/tools.js"
	export default {
		data() {
			return {
				show:true,
				signDetail:{
					rewards:[],
					content:""
				}
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
			signSuccess(signInId){
				this.getSignDetail(signInId)
			},
			async getSignDetail(signInId){
				const res = await uni.$http("/signIn/detail",{
					signInId
				})
				if(res.code == 0){
					for (var i = 0; i < res.data.rewards.length; i++) {
						if(res.data.rewards[i].type == 1){
							res.data.rewards[i] = await getFilePath(res.data.rewards[i],["goodsImage"])
						}
					}
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
