export const state = () => ({
  cartList: [],
})

export const getters = {
  all( state ) {
    return state.cartList
  },
  progress( state ) {
    return state.cartList.filter( function ( item ) {
      return !item.isComplete
    } )
  },
  done( state ) {
    return state.cartList.filter( function ( item ) {
      return item.isComplete
    } )
  },
}

export const mutations = {
  store(state, data) {
    if (typeof data === 'object') {
      state.cartList = data;
    }
  },
  add( state, data ) {
    state.cartList.push( data )
  },
  update(state, data) {
    state.cartList = state.cartList.map((item) => {
      if (item.id === data.id) {
        item = data;
      }
      return item;
    })
  },
  remove( state, data ) {
    state.cartList = state.cartList.filter((item) => item.id !== data.id)
  },
}

export const actions = {
  storeCartList( vuexContext, list ) {
    vuexContext.commit( 'store', list )
  },
  addCartList( vuexContext, item ) {
    vuexContext.commit( 'add', item )
  },
  updateCartItem(vuexContext, item) {
    vuexContext.commit( 'update', item )
  },
  deleteCartItem( vuexContext, item ) {
    vuexContext.commit( 'remove', item )
  },
}
