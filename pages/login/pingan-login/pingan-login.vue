<template>
	<PageTemp></PageTemp>
</template>

<script>
	import {PingAn_login} from "@/utils/PingAn-app.js"
	export default {
		data() {
			return {
				
			};
		},
		mounted() {
			PingAn_login()
		}
	}
</script>

<style lang="scss">

</style>
