const types = {
	ADD_PRODUCT: 'ADD_PRODUCT'
}

const state = {
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
	}
}

const mutations = {
	[types.ADD_PRODUCT](state, product) {
		state.productList.push(product)
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}