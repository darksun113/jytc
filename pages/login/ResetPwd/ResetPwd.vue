<template>
	<PageTemp>
		<First @toRegisterPage="toRegisterPage" v-if="step==1" @checkPhoneSuccess="checkPhoneSuccess"></First>
		<Second @toRegisterPage="toRegisterPage" v-else-if="step==2" :resetPwdProof="resetPwdProof" @resetSuccess="resetSuccess"></Second>
		<Third @toRegisterPage="toRegisterPage" v-else :info="info" @toLoginPage="toLoginPage"></Third>
	</PageTemp>
</template>

<script>
	import Second from "./components/Second.vue"
	import First from "./components/First.vue"
	import Third from "./components/Third.vue"
	export default {
		data(){
			return{
				step:1,
				resetPwdProof:"",
				info:''
			}
		},
		components:{
			Second,
			First,
			Third
		},
		methods:{
			checkPhoneSuccess(resetPwdProof){
				this.resetPwdProof=resetPwdProof
				this.step+=1
			},
			resetSuccess(){
				this.step+=1
			},
			toLoginPage(){
				uni.reLaunch({
					url:"../loginByPwd/loginByPwd"
				})
			}
		}
		
	};
</script>

<style lang="scss">

</style>
