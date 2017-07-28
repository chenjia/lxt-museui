import utils from '../../utils'

const types = {
	COMPUTE_HEIGHT: 'COMPUTE_HEIGHT',
	LOGIN: 'LOGIN',
	TOGGLE_TAB: 'TOGGLE_TAB',
	TOGGLE_TOAST: 'TOGGLE_TOAST',
	LOCK_SCREEN: 'LOCK_SCREEN'
}

const state = {
	contentHeight: 0,
	user: utils.cache.get('user'),
	lockScreen: false,
	hasFooter: true,
	toast: false,
	toastMsg: ''
}

const getters = {
	getUser: () => {
		return state.user
	},
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
	[types.COMPUTE_HEIGHT](state, height) {
		state.contentHeight = height
	},
	[types.LOGIN](state, user) {
		state.user = user
	},
	[types.TOGGLE_TAB](state, show) {
		state.hasFooter = show
	},
	[types.TOGGLE_TOAST](state, params) {
		state.toast = params.toast
		state.toastMsg = params.toastMsg
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