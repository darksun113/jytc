<template>
	<view class="w100 min100 sign pb-40">
		<view class="bg-white mlr-20 radius-10 ptb-20">
			<model-calendar 
				:sendYear="toYear" 
				:sendMonth="toMonth" 
				:signIn = "signIn"
				:dataSource="signData" @signUp="signUp" />
		</view>
	</view>
</template>

<script>
	import modelCalendar from './components/Calendar.vue';

	export default {
		props:{
			signDetail:{
				type:Object,
				default:()=>{}
			},
			signInId:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				toYear: parseInt(new Date().getFullYear()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				// signData: ["2022-10-12", "2022-10-10", "2022-10-11"], 
				signData: this.signDetail.signInDays || [], 
				signIn:this.signDetail.signIn || 0,//今日是否签到 0=未签到，1=已签到
				month: '',
			};
		},
		components: {
			modelCalendar
		},
		onLoad() {
			this.init()
		},
		methods: {
			getData(data){
				this.signData = data.signInDays;
				this.signIn = data.signIn
			},
			async signUp() {
				const res = await uni.$http("/signIn/do",{
					signInId:this.signInId
				})
				if(res.code == 0){
					this.$toast("签到成功","success")
					this.$emit("signSuccess",this.signInId)
				}else{
					this.$toast(res.errorMsg)
				}
			}
		},
		watch:{
			signDetail(data){
				this.getData(data)
			}
		}
	}
</script>

<style lang='scss'>
</style>

