<template>
  <div>
    <Header/>
    <div class="cart_manage">
      <table class="table text-center">
        <caption>List of product</caption>
        <thead>
        <tr>
          <th scope="col">
            <input type="checkbox" @click="handleSelectAll"/>
          </th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total Price</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in searchProductList" :key="index" class="product">
          <th scope="row" class="product__select">
            <input type="checkbox" @click="handleSelectItem(item)"/>
          </th>
          <td class="product_info">
            <img class="product_info__img" :src="item.imgSrc" alt=""/>
            <div class="product_info__name">
              {{ item.name }}
            </div>
          </td>
          <td>
            <div class="product_item product__price">
              <span class=" product__price--old">
                ${{ item.oldPrice }}
              </span>
              <span class=" product__price--new">
                ${{ item.price }}
              </span>
            </div>
          </td>
          <td>
            <div class="product_item product__quantity">
              <font-awesome-icon
                class="minus_action_btn" :icon="['fa-regular', 'square-minus']"
                @click="handleReduceItemQuantity(item)"
              />
              <input :value="item.quantity ? item.quantity : 0"
                     class="form-control"
                     type="text"
                     data-toggle="tooltip"
                     data-placement="top"
                     :title="item.quantity"
                     @input="handleInputQuantity(item, $event)"
              />
              <font-awesome-icon
                class="plus_action_btn" :icon="['fa-regular', 'square-plus']"
                @click="handleIncreaseItemQuantity(item)"
              />
            </div>
          </td>
          <td>
            <div class="product_item product__total_price">
              ${{ item.totalPrice }}
            </div>
          </td>
          <td>
            <div class="product_item product__action action">
              <font-awesome-icon :icon="['fa-solid', 'trash-can']"
                                 class="action__delete"
                                 @click="handleDeleteFromCart(item)"
              />
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div @click="handleBackToHome()">Back to home</div>
  </div>
</template>

<script>
import ProductList from "../../resource/product/ProductList";
import Header from '/components/header'
import _ from 'lodash'

export default {
  components: {
    ProductList,
    Header
  },
  computed: {
    searchProductList() {
      this.cartList = this.$store.getters[`products/all`] || [];
      return this.cartList;
    }
  },
  data() {
    return {
      cartList: this.$store.getters[`products/all`] || [],
      checkSelectAll: false,
    }
  },
  methods: {
    handleSelectItem( item ) {
      const newItem = _.cloneDeep(item)
      newItem.checked = !newItem.checked;
      this.$store.dispatch( 'products/updateCartItem', newItem );
    },
    handleSelectAll() {
      this.checkSelectAll = !this.checkSelectAll;
      const newList = this.cartList.map( ( product ) => {
        product.checked = this.checkSelectAll;
        return product;
      } )
      this.$store.dispatch( 'products/storeCartList', newList );
    },
    handleReduceItemQuantity( item ) {
      const newItem = _.cloneDeep( item );
      // Make sure that item's quantity has minimum at  0
      newItem.quantity = newItem.quantity > 0 ? --newItem.quantity : 0;
      // Calculate total price from real price and quantity
      newItem.totalPrice = parseFloat( newItem.price ) * newItem.quantity;
      this.$store.dispatch( 'products/updateCartItem', newItem );
    },
    handleIncreaseItemQuantity( item ) {
      const newItem = _.cloneDeep( item );
      newItem.quantity++;
      // Calculate total price from real price and quantity
      newItem.totalPrice = parseFloat( newItem.price ) * newItem.quantity;
      this.$store.dispatch( 'products/updateCartItem', newItem );
    },
    handleInputQuantity( item, event ) {
      const newItem = _.cloneDeep( item );
      if (event.target.value) {
        // In case item's quantity not blank and make sure it's less than total quantity
        newItem.quantity = newItem.target.value < newItem.totalQuantity ? newItem.target.value : newItem.totalQuantity;
      } else {
        newItem.quantity = 0;
      }
      newItem.totalPrice = parseFloat( newItem.price ) * newItem.quantity;
      this.$store.dispatch( 'products/updateCartItem', newItem );
    },
    handleBackToHome() {
      this.$router.replace( '/home' );
    },
    handleDeleteFromCart( item ) {
      this.$store.dispatch( 'products/deleteCartItem', item )
    },
  },
  name: "index"
}
</script>

<style scoped lang="scss">
.cart_manage {
  -webkit-user-select: none;
  user-select: none;

  input[type=checkbox] {
    width: 16px;
    height: 16px;
  }

  .product {

    &__select {
      padding-top: 60px;
    }

    .product_info {
      display: flex;

      &__img {
        width: 120px;
        height: 120px;
        object-fit: contain;
      }

      &__name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 10px;
      }
    }

    .product_item {
      margin-top: 48px;
    }

    &__price {

      &--old {
        margin-right: 3px;
        font-size: 14px;
        letter-spacing: 0.005em;
        text-decoration: line-through;
        color: #999;
      }

      &--new {
        color: #222529;
        font-size: 18px;
        line-height: 1;
      }
    }

    &__quantity {
      justify-content: center;
      flex: 1;
      display: flex;

      .minus_action_btn {
        font-size: 20px;
        margin-top: 8px;
        margin-right: 12px;
      }

      .plus_action_btn {
        font-size: 20px;
        margin-top: 8px;
        margin-left: 12px;
      }

      input {
        text-align: center;
        width: 56px;
      }
    }

    &__action {
      .action {
        &__delete {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
