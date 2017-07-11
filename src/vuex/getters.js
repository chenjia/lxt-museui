export const getHotProductList = state => {
	return state.productList.map((p) => {
		console.log(p)
		if (p.isHot) {
			return p
		} else {
			return {}
		}
	})
}