<template>
	<view>
		<!-- 常规支付按钮模块 -->
		<routineModule v-if="false" :goodsData="goodsData" @showLoginTip="isShow=true" @showIdentityShow="identityShow=true"></routineModule>
		<!-- 预付支付按钮模块 -->
		<prepayModule v-else :goodsData="goodsData" @showLoginTip="isShow=true" @showIdentityShow="identityShow=true"></prepayModule>
		<!-- 登录pop -->
		<LoginTipPop name="goodsDetail" @loginSuccess="loginSuccess" :isShow="isShow" @close="isShow=false"></LoginTipPop>
		<!-- 身份实名认证pop -->
		<IdentityAuthPopup :show="identityShow" @close="identityShow=false"></IdentityAuthPopup>
	</view>
</template>

<script>
	import routineModule from "./components/routineModule.vue"
	import prepayModule from "./components/prepayModule.vue"
	export  default {
		props:{
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				isShow:false,
				identityShow:false
			}
		},
		components:{
			prepayModule,
			routineModule
		},
		methods:{
			loginSuccess(){
				uni.showToast({
					title:"登录成功",
					icon:"success",
					duration:2000
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>