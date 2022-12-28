<template>
  <div class="header-section" :class="{header_fixed: this.isFixedHeader}">
    <img src="../../static/images/header/logo.png"
         class="header-section__logo"
         alt="logo"
         @click="handleBackToHome()"/>
    <div class="header-section__search">
      <div class="input-group">
        <input type="text" class="form-control search-input" aria-label="Text input with dropdown button"
               v-model="searchValue"
               @input="handleSearch"
               placeholder="Search...">
        <div class="input-group-append">
          <button class="dropdown-toggle dropdown-custom" type="button" data-toggle="dropdown-menu"
                  aria-haspopup="true" aria-expanded="false" id="dropdownMenu2">All categories
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </div>
      </div>
    </div>
    <div class="header-section__option">
      <div class="option_item contact">
        <div class="contact__logo">
          <font-awesome-icon :icon="['fas', 'phone']"/>
        </div>
        <div class="contact__info">
          <span>+84 70360 9971</span>
        </div>
      </div>
      <div class="option_item account">
        <font-awesome-icon :icon="['fas', 'user']"/>
      </div>
      <div class="option_item cart">
        <div class="cart__logo" @click="handleShowCart()">
          <font-awesome-icon :icon="['fa-solid', 'cart-shopping']"/>
        </div>
        <div class="cart__section" :class="{active: enableCart}">
          <span class="close_btn" @click="handleCloseCart()">
            <font-awesome-icon class="minus-action" :icon="['fa-solid', 'xmark']"/>
          </span>
          <span class="cart_title">Items in your cart</span>
          <div v-if="searchCartList.length === 0" class="empty_cart">
            <img class="empty_cart__img" src="../../static/images/product/empty-cart.png" alt=""/>
            <span>Nothing in your cart</span>
          </div>
          <div v-else>
            <div v-for="(item, index) in searchCartList" class="cart_item">
              <img :src="item.imgSrc" alt=""/>
              <div class="item_info">
                <div class="item_name"> {{ item.name }}</div>
                <div class="item_quantity">
                  <font-awesome-icon class="minus-action" :icon="['fa-regular', 'square-minus']"
                                     @click="handleReduceItemQuantity(item)"/>
                  <input :value="item.quantity ? item.quantity : 0"
                         class="form-control"
                         type="text"
                         data-toggle="tooltip"
                         data-placement="top"
                         :title="item.quantity"
                         @input="handleInputQuantity(item, $event)"
                  />
                  <font-awesome-icon class="plus-action" :icon="['fa-regular', 'square-plus']"
                                     @click="handleIncreaseItemQuantity(item)"/>
                </div>
                <div class="item-price"> Total: {{ item.totalPrice }}</div>
              </div>
            </div>
            <button class="view_cart" @click="handleViewCart()">View shopping cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {
    window.addEventListener( 'scroll', ( event ) => {
      if (document.documentElement.scrollTop >= 50) {
        this.isFixedHeader = true;
      } else {
        this.isFixedHeader = false;
      }
    } )
  },
  computed: {
    searchCartList() {
      this.cartList = this.$store.getters[`products/all`] || [];
      return this.cartList;
    }
  },
  methods: {
    handleShowCart() {
      this.enableCart = true;
      this.$emit( 'showCart', this.enableCart )
    },
    handleCloseCart() {
      this.enableCart = false;
      this.$emit( 'showCart', this.enableCart )
    },
    handleSearch() {
      this.$emit( 'inputSearch', this.searchValue )
    },
    handleReduceItemQuantity( item ) {
      const newItem = _.cloneDeep(item);
      newItem.quantity = newItem.quantity > 0 ? --newItem.quantity : 0;
      newItem.totalPrice = parseFloat( newItem.price ) * newItem.quantity;
      this.$store.dispatch('products/updateCartItem', newItem);
    },
    handleIncreaseItemQuantity( item ) {
      const newItem = _.cloneDeep(item);
      newItem.quantity++;
      newItem.totalPrice = parseFloat( newItem.price ) * newItem.quantity;
      this.$store.dispatch('products/updateCartItem', newItem);
    },
    handleInputQuantity( item, event ) {
      const newItem = _.cloneDeep(item);
      newItem.quantity = newItem.target.value ? newItem.target.value : 0;
      newItem.totalPrice = parseFloat( newItem.price ) * newItem.quantity;
      this.$store.dispatch('products/updateCartItem', newItem);
    },
    handleViewCart() {
      this.$router.replace( "/cart" );
    },
    handleBackToHome() {
      this.$router.replace( '/home' );
    },
  },
  data() {
    return {
      searchValue: '',
      enableCart: false,
      isFixedHeader: false,
      cartList: [],
    }
  },
  name: "index"
}
</script>

<style scoped lang="scss">
.header-section {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 56px;
  padding: 6px 0;
  background: #0099FF;

  &.header_fixed {
    position: fixed;
    z-index: 3;
  }

  &__logo {
    flex: 1;
    padding-left: 4px;
    cursor: pointer;

    img {
      width: 154px;
      height: 48px;
      object-fit: contain;
    }
  }

  &__search {
    flex: 4.5;

    .input-group {
      max-width: 800px;
      background: #FFFFFF;
      border-radius: 8px;

      .search-input {
        //max-width: 648px;
        border: none;
        border-radius: 8px 0 0 8px;
        background: #EEEEEE;

        &:focus {
          box-shadow: none;
        }
      }

      .dropdown-custom {
        background: #EEEEEE;
        border: none;
        cursor: default;
        border-radius: 0 8px 8px 0;
      }
    }
  }

  &__option {
    display: flex;
    flex: 2;

    .option_item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;

      &:nth-child(n + 2) {
        padding-left: 4px;
      }
    }

    .contact {
      display: flex;
      flex-direction: row;
      flex: 2;

      &__logo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;

        svg {
          font-size: 24px;

          path {
            fill: #FFFFFF;
          }
        }
      }

      &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 2;

        span {
          font-weight: 700;
          font-size: 15px;
        }
      }
    }

    .account {
      svg {
        font-size: 24px;

        path {
          fill: #FFFFFF;
        }
      }
    }

    .cart {
      &__section {
        position: fixed;
        top: 0;
        right: -300px;
        height: 100%;
        width: 300px;
        background: #FFFFFF;
        transform: translate(300px, 0);
        transition-duration: 0.7s;
        transition-timing-function: linear;
        opacity: 0;
        z-index: 4;
        overflow: auto;

        &.active {
          right: 0;
          transform: translate(0, 0);
          transition-duration: 0.5s;
          transition-timing-function: linear;
          opacity: 1;
          z-index: 4;
          background: rgba(252, 247, 247, 1);
        }


        .close_btn {
          margin-left: 4px;
          font-size: 24px;
          cursor: pointer;
        }

        .cart_title {
          margin-left: 16px;
          font-size: 24px;
        }

        .cart_item {
          display: flex;
          margin-bottom: 16px;

          img {
            width: 120px;
            height: 120px;
            object-fit: contain;
          }

          .item_info {
            display: flex;
            flex-direction: column;

            .item_name {
              flex: 1;
            }

            .item_quantity {
              justify-content: center;
              flex: 1;
              display: flex;

              .minus-action {
                font-size: 20px;
                margin-top: 8px;
                margin-right: 12px;
              }

              .plus-action {
                font-size: 20px;
                margin-top: 8px;
                margin-left: 12px;
              }

              input {
                text-align: center;
                width: 56px;
              }
            }
          }
        }

        .empty_cart {
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #999999;
          font-size: 20px;

          &__img {
            width: 108px;
            height: 98px;
            margin-left: 96px;
            object-fit: contain;
          }

          span {
            text-align: center;
          }
        }

        .view_cart {
          display: block;
          margin: 10px;
          padding: 15px 48px;
          border: none;
          text-align: center;
          text-transform: uppercase;
          color: white;
          background-image: linear-gradient(to right, #003973 0%, #f8f872 51%, #003973 100%);
          transition: 0.7s;
          background-size: 200% auto;
          box-shadow: 0 0 4px #0eeeee;
          border-radius: 10px;

          &:hover {
            background-position: right center; /* change the direction of the change here */
            color: #fff;
            text-decoration: none;
          }
        }
      }

      &__logo {
        cursor: pointer;

        svg {
          font-size: 24px;

          path {
            fill: #FFFFFF;
          }
        }
      }
    }
  }
}
</style>
