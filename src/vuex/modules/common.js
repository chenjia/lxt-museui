import utils from '../../utils'

const types = {
	ADD_PRODUCT: 'ADD_PRODUCT',
	TOGGLE_TAB: 'TOGGLE_TAB'
}

const state = {
	hasFooter: true,
	productList: [{
		name: 'product A',
		price: 18,
		isHot: true
	}, {
		name: 'product B',
		price: 28,
		isHot: false
	}, {
		name: 'product C',
		price: 38,
		isHot: true
	}]
}

const getters = {
	getTab: () => {
		return state.hasFooter
	},
	getHotProductlist: state => {
		return state.productList.map(product => {
			if (product.isHot) {
				return product
			} else {
				return {}
			}
		})
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
	[types.ADD_PRODUCT](state, product) {
		state.productList.push(product)
	},
	[types.TOGGLE_TAB](state, show) {
		state.hasFooter = show
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}