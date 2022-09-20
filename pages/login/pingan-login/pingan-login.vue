<template>
	<PageTemp></PageTemp>
</template>

<script>
	import {PingAn_login} from "@/utils/PingAn-app.js"
	export default {
		data() {
			return {
				loadType:0
			};
		},
		onLoad(opt) {
			this.loadType=opt.type||0
		},
		onShow() {
			PingAn_login(this.loadType)
		}
	}
</script>

<style lang="scss">

</style>
