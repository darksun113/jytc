import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		filePath: {},
		
	},
	mutations: {
		saveFilePath(state, data) {
			const { uuid, path } = data
			state.filePath[uuid] = path
		},
		resetFilePath(state) {
			state.filePath = {}
		},
	},
})
