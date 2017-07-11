import * as types from './mutation-types'

export const addProduct = ({
  commit
}, product) => {
  commit(types.ADD_PRODUCT, product)
}