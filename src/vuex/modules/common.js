import utils from '../../utils'

const types = {
	TOGGLE_TAB: 'TOGGLE_TAB',
	LOCK_SCREEN: 'LOCK_SCREEN'
}

const state = {
	lockScreen: false,
	hasFooter: true
}

const getters = {
	isLockScreen: () => {
		return state.lockScreen
	},
	isShowFooter: () => {
		return state.hasFooter
	}
}

const actions = {
	add({
		commit,
		state
	}, product) {
		commit(types.ADD_PRODUCT, product)
	},
	toggleTab({
		commit,
		state
	}, show) {
		alert('toggleTab')
		commit(types.TOGGLE_TAB, show)
	}
}

const mutations = {
	[types.TOGGLE_TAB](state, show) {
		state.hasFooter = show
	},
	[types.LOCK_SCREEN](state, isLock) {
		state.lockScreen = isLock
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}