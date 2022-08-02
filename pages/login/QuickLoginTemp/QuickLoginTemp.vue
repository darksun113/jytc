<template>
	<PageTemp></PageTemp>
</template>

<script>
	import {checkWeChatCode} from "@/libs/jsm/wx-login.js"
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			checkWeChatCode()
		},
		onHide() {}
	}
</script>

<style lang="scss">

</style>
