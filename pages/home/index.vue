<template>
  <div>
    <Header/>
    <div class="home-page"></div>
    <Footer/>
    <SnowFail/>
  </div>
</template>

<script>
import Header from '/components/header'
import Footer from '/components/footer'
import SnowFail from '/components/snow-fail'

export default {
  components: {
    Header,
    Footer,
    SnowFail
  },
  name: "index"
}
</script>

<style scoped lang="scss">
.home-page {
}

</style>
