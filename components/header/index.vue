<template>
  <div class="header-section">
    <div class="header-section__logo">
      <img src="../../static/images/header/logo.png" alt="logo"/>
      LOGO
    </div>
    <div class="header-section__search">
      <div class="input-group">
        <input type="text" class="form-control search-input" aria-label="Text input with dropdown button"
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
        <i class="fa fa-phone contact__logo" aria-hidden="true"></i>
        <div class="contact__info">
          <span>+84 70360 9971</span>
        </div>
      </div>
      <div class="option_item account">Account</div>
      <div class="option_item cart">
        <div class="cart__logo" @click="handleShowCart()">
          Cart
        </div>
        <div ref="cartSection" class="cart__section">
          <span class="close-btn" @click="handleCloseCart()">Close</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    handleShowCart() {
      this.$refs.cartSection.classList.remove( "close-cart" );
      this.$refs.cartSection.classList.add( "active" );
    },
    handleCloseCart() {
      this.$refs.cartSection.classList.remove( "active" );
      this.$refs.cartSection.classList.add( "close-cart" );
    }
  },
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

  &__logo {
    flex: 1;
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
        padding-left: 4px;

        img {
          width: 154px;
          height: 48px;
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

    .cart {
      &__section {
        position: fixed;
        top: 0;
        right: -300px;
        height: 100%;
        width: 300px;
        background: #FFFFFF;

        &.active {
          right: 0;
          transform: translate(0, 0);
          transition-duration: 0.5s;
          transition-timing-function: linear;
          opacity: 1;
        }

        &.close-cart {
          right: -300px;
          transform: translate(300px, 0);
          transition-duration: 0.7s;
          transition-timing-function: linear;
          opacity: 0;
        }
      }

      &__logo {
        cursor: pointer;
      }
    }
  }
}
</style>
