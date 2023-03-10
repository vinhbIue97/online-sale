export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'online-sale',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // import module fontawesome
    '@nuxtjs/fontawesome',
    'vue-ssr-carousel/nuxt',
  ],
  fontawesome: {
    icons:{
      solid:true,
      brands:true,
      regular: true,
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],

  axios: {
    // proxy: true
  },

  extend(config, {isClient}) {
    const alias = config.resolve.alias = config.resolve.alias || {};
    alias['~image'] = path.join(this.options.rootDir, '/static/images');
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: null,
  }
}
