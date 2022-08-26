<template>
	<PageTemp></PageTemp>
</template>

<script>
	import {checkWeChatCode} from "@/libs/jsm/wx-authorization.js"
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
