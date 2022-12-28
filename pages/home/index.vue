<template>
  <div>
    <Header @inputSearch="handleSearch"
            @showCart="handleCartAction"
    />
    <div class="home-page" @scroll="handleScrollPage($event)">
      <div class="home-page__banner">
        <ssr-carousel
          show-arrows
          show-dots
          paginate-by-slide
          :slides-per-page='1'
          :gutter='20'>
          <slide v-for="(item, index) in bannerList" class="slide_item" :index="index">
            <img :src="item.imgSrc" :alt="item.name" class="slide_item__image"/>
            <div ref="bannerContent" id="banner_content"
                 class="banner_content" :class="`slide-${index + 1}`">
            </div>
          </slide>
        </ssr-carousel>
      </div>
      <div class="home-page__product" :class="{open_cart: this.enableCart}">
        <div v-for="(item, index) in searchProductList" class="product">
          <a :href="item.link">
            <img :src="item.imgSrc" alt="" class="product__img"/>
          </a>
          <a :href="item.link" class="product__name">{{ item.name }}</a>
          <div class="product__price">
            <div class="product__price--old"> ${{ item.oldPrice }}</div>
            <div class="product__price--new">${{ item.price }}</div>
          </div>
          <div class="product__action">
            <div class="add-favorite" @click="handleAddFavorite(item)">
              <font-awesome-icon v-if="item.isFavorite" class="favorite" :icon="['fa-solid', 'heart']"/>
              <font-awesome-icon v-else :icon="['fa-regular', 'heart']"/>
            </div>
            <div class="add-cart">
              <button class="btn align-content-center" :class="{enable_add_cart: item.enableAddToCart}"
                      @click="handleAddToCart(item)">Add to cart
              </button>
            </div>
            <div class="quick-view">
              <font-awesome-icon :icon="['fa-regular', 'eye']"/>
            </div>
          </div>
        </div>
      </div>
      <div class="back_to_top"
           @click="handleBackToTop()"
           :class="{hidden: this.disableBackToTop}"
           data-toggle="tooltip"
           data-placement="top"
           title="Back to top"
      >
        <font-awesome-icon :icon="['fa-solid', 'angles-up']"/>
      </div>
      <div class="new_product_btn">
        <font-awesome-icon class="plus-action" :icon="['fa-solid', 'plus']" @click="handleCreateNewProduct()"/>
      </div>
    </div>
    <Footer/>
    <SnowFail/>
  </div>
</template>

<script async>
import Header from '/components/header'
import Footer from '/components/footer'
import SnowFail from '/components/snow-fail'
import $ from 'jquery'
import ProductList from "../../resource/product/ProductList";
import _ from 'lodash'

export default {
  components: {
    Header,
    Footer,
    SnowFail,
  },
  mounted() {
    this.$refs.bannerContent.map( ( slide, index ) => {
      slide.innerHTML = this.bannerList[index].content;
    } ),
      window.addEventListener( 'scroll', this.handleScrollPage )
  },
  computed: {
    searchProductList() {
      return this.productList.filter( product => product.name.toLowerCase().includes( this.searchValue.toLowerCase() ) )
    }
  },
  data() {
    return {
      bannerList: [
        {
          imgSrc: require( '../../static/images/home/banner/banner-1.jpg' ),
          name: 'banner 1',
          content: `<h4 class="text-transform-none m-b-3">Find the Boundaries. Push Through!</h4>
                    <h2 class="text-transform-none mb-0"
                        style="font-family: 'Segoe Script','Savoye LET'; font-size: 48px;">
                        Winter Sale
                    </h2>
                    <h3 class="m-b-3" style="font-size: 100px; font-weight: 700;">70% Off</h3>
                    <div class="mb-0 d-flex">
                        <span style="font-size: 27px; font-weight: 700;">Starting At</span>
                        <div class="coupon-sale-text text-white bg-secondary align-middle"
                             style="transform: rotate(348deg);
                                    margin: 0 10px;
                                    padding-top: 10px;"
                        >
                        <sup>$</sup><em class="align-text-top">199</em><sup>99</sup></div>
                        <div style="width: 172px;">
                            <a style="width: 100%;" href="#" class="btn btn-dark btn-lg">Shop Now!</a>
                        </div>
                    </div>`
        },
        {
          imgSrc: require( '../../static/images/home/banner/banner-2.jpg' ),
          name: 'banner 2',
          content: `<h4 class="m-b-1"
                        style= "color: #999;
                                font-size: 2.125em;
                                font-weight: 500;"
                      >EXTRA</h4>
                      <h3 class="m-b-2" style="font-size: 4.3125em;">20% off</h3>
                      <h3 class="mb-2 heading-border">Accessories</h3>
                      <h2 class="text-transform-none m-b-4"
                           style="font-family: 'Segoe Script','Savoye LET'; font-size: 48px;"
                      >Winter Sale</h2>
                      <a href="#" class="btn btn-block btn-dark">Shop All Sale</a>`,
        },
      ],
      productList: ProductList,
      searchValue: '',
      cart: [],
      enableCart: false,
      disableBackToTop: true,
    }
  },
  methods: {
    handleBackToTop( event ) {
      $( "body, html" ).animate( {scrollTop: 0}, 500 )
    },
    handleSearch( value ) {
      this.searchValue = value || '';
    },
    handleAddToCart( selectedItem ) {
      if (!selectedItem.enableAddToCart) {
        this.addToCart( selectedItem );
      } else {
        this.removeFromCart( selectedItem );
      }
    },
    addToCart( item ) {
      item.enableAddToCart = true;
      if (item.quantity === 0) {
        item.quantity += 1;
      }
      item.totalPrice = parseFloat( item.price ) * item.quantity;
      this.$store.dispatch( 'products/addCartList', _.cloneDeep( item ) );
    },
    removeFromCart( item ) {
      item.enableAddToCart = false;
      this.$store.dispatch( 'products/deleteCartItem', item )
    },
    handleCartAction( value ) {
      this.enableCart = value;
    },
    handleScrollPage( event ) {
      this.disableBackToTop = window.scrollY < 500;
    },
    handleAddFavorite( item ) {
      item.isFavorite = !item.isFavorite;
    },
    handleCreateNewProduct() {
      this.$router.replace('product/new-product');
    },
  },
  name: "index",
}
</script>

<style scoped lang="scss">
.home-page {
  position: relative;
  -webkit-user-select: none;
  user-select: none;

  &__banner {
    position: relative;

    .banner_content {
      position: relative;

      &.slide-1 {
        position: absolute;
        top: 148px;
        left: 200px;
        z-index: 2;
        opacity: 1;
        transition-duration: 0.7s;
        transition-timing-function: linear;
      }

      &.slide-2 {
        position: absolute;
        top: 148px;
        right: -1176px;
        z-index: 2;
      }
    }
  }

  &__product {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .product {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      &__img {
        width: 360px;
        height: 240px;
        object-fit: contain;
      }

      &__name {
        text-align: center;
        color: #514c4c;

        &:hover {
          color: #0099FF;
          text-decoration: none;
        }
      }

      .product__action {
        display: flex;

        .add-favorite {
          flex: 1;
          padding-top: 4px;
          text-align: right;
          cursor: pointer;

          .favorite path {
            fill: #ff0000;
          }
        }

        .add-cart {
          flex: 1;
          text-align: center;

          .btn {
            color: #ffffff;
            border: 1px solid #f4f4f4;
            background-image: linear-gradient(to right, #5C258D 0%, #4389A2 51%, #5C258D 100%);
            box-shadow: 0 0 20px #eee;
            transition: 0.5s;
            background-size: 200% auto;

            &:hover {
              background-position: right center;
              color: #fff;
              text-decoration: none;
            }
          }

          .enable_add_cart {
            content: "Added";
            background-image: linear-gradient(to right, #ef32d9 0%, #89fffd 51%, #ef32d9 100%);
          }
        }

        .quick-view {
          flex: 1;
          padding-top: 4px;
          cursor: pointer;
        }
      }

      &__price {
        display: flex;
        justify-content: center;

        &--old {
          margin-right: 3px;
          font-size: 20px;
          letter-spacing: 0.005em;
          text-decoration: line-through;
          color: #999;
        }

        &--new {
          color: #222529;
          font-size: 24px;
          line-height: 1;
        }
      }
    }

    &.open_cart {
      padding-right: 240px;
    }
  }

  .back_to_top {
    position: fixed;
    bottom: 10px;
    right: 24px;
    width: 64px;
    height: 64px;
    padding: 8px;
    font-size: 30px;
    text-align: center;
    background-image: linear-gradient(to right, #2BC0E4 0%, #EAECC6 51%, #2BC0E4 100%);
    border-radius: 100px;
    cursor: pointer;

    &:hover {
      background-position: right center; /* change the direction of the change here */
      color: #fff;
      text-decoration: none;
    }

    &.hidden {
      display: none;
    }
  }

  .new_product_btn {
    position: fixed;
    bottom: 10px;
    left: 24px;
    cursor: pointer;
    font-size: 30px;
  }
}

</style>
