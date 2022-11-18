<template>
	<view>
		<!-- private int goodsStatus; // 状态 0 上架 1下架 2 未发布 新增: 3 已售罄 4 已结束'  5 售卖中 6 预售中 -->
		<!-- 预付支付按钮模块 -->
		<prepayModule v-if="(goodsData.prepayStatus==1 && goodsData.balanceEndTime > curTime && goodsData.goodsStatus == 5) || (goodsData.goodsType == 3 && ![1,3,4,5].includes(goodsData.goodsStatus))" 
			:goodsData="goodsData" @showLoginTip="isShow=true" @showIdentityShow="identityShow=true"></prepayModule>
		<!-- 常规支付按钮模块 -->
		<routineModule v-else :goodsData="goodsData" @showLoginTip="isShow=true" @showIdentityShow="identityShow=true"></routineModule>
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
				identityShow:false,
				curTime:parseInt(Date.now()/1000)
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