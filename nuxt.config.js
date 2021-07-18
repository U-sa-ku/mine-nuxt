import axios from 'axios'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mine',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '相棒たち。' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'mine' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://mine-u-saku.netlify.app/' },
      { hid: 'og:title', property: 'og:title', content: 'mine' },
      { hid: 'og:description', property: 'og:description', content: '相棒たち。' },
      { hid: 'og:image', property: 'og:image', content: 'https://mine-u-saku.netlify.app/ogp.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'format-detection', content: 'telephone=no' }


    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/reset.scss',
    '@/assets/scss/global.scss'
  ],

  styleResources: {
    scss: [
      '@/assets/scss/variable.scss',
      '@/assets/scss/mixin.scss'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/swiper', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa'
  ],

  /*
   ** @nuxtjs/pwa Configuration
   ** https://github.com/nuxt-community/pwa-module
   */
  manifest: {
    name: 'mine',
    lang: 'ja',
    short_name: 'mine',
    title: 'mine',
    'og:title': 'mine',
    description: 'mine',
    'og:description': 'mine',
    theme_color: '#252525',
    background_color: '#252525'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: [
      'vue-awesome-swiper'
    ]
  },

  generate: {
    async routes() {
      const sidekicks = await axios
        .get('https://mine.microcms.io/api/v1/sidekick?limit=100', {
          headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' }
        })
        .then((res) =>
          res.data.contents.map((content) => ({
            route: `/sidekick/${content.id}`,
            payload: content
          }))
        )
      return sidekicks
    }
  }
}
