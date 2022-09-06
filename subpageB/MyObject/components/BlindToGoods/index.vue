<template>
	<u-popup v-model="show" mode="center" @close="close" :mask="false">
		<view class="blind_box_res" @click.self="close">
			<view class="open_res_box" >
				<transition enter-active-class="animated bounceIn">
					<img class="goods_pic" v-show="isOpenResult" 
						style="width:100%;height:100%;object-fit: contain;" 
						crossorigin="anonymous" :src="blindData.image" alt="">
				</transition>
			</view>
			<view style="margin-top:40px">
				<transition enter-active-class="animated flipInY">
					<view v-show="isOpenResultText">
						<view class="blind_tip">恭喜获得</view>
						<view class="blind_tip">{{blindData.goodsName}}</view>
					</view>
				</transition>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import salute from "./libs/salute.js"
	export default {
		props:{
			isShow:[Boolean],
			blindData:{
				type:Object,
				default:()=>{}
			}
		},
		mounted() {
			
		},
		data(){
			return {
				show:this.isShow,
				isOpenResult:false,
				isOpenResultText:false,
			}
		},
		methods:{
			close(){
				this.isOpenResult=false
				this.isOpenResultText=false
				this.$emit("openBlindSuccess")
			},
			// 开盲盒特效
			openSalute(){
			    let timer1 = setTimeout(() => {
			        clearTimeout(timer1)
					this.isOpenResult=true
			        salute(1)
					salute(2)
			        }, 500);
			    let timer2 = setTimeout(() => {
			        clearTimeout(timer2)
					this.isOpenResult=true
					this.isOpenResultText=true
			        salute()
			    }, 1000);
			},
		},
		watch:{
			isShow(boo){
				this.show=boo
				if(boo)this.openSalute()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./libs/animate.min.css";
	.blind_box_res{
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .85);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		overflow: auto;
		.open_res_box{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 648rpx;
			width: 648rpx;
		}
		.blind_tip{
			margin: 0;
			text-align: center;
			line-height: 68rpx;
			font-size: 44rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #EFCE91;
		}
	}
</style>