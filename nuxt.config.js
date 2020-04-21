import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],

    title: 'Minha pagina UFES',
    script: [
      {
        src: 'js/config-mathjax2.js',
        async: false,
        defer: true
      },
      {
        type: 'text/javascript',
        async: true,
        defer: true,
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_SVG'
      }
      // {
      //   src: 'js/global-config.js',
      //   //async: true,
      //   defer: true
      // }
      // {
      //   src: 'https://polyfill.io/v3/polyfill.min.js?features=es6',
      //   defer: true
      // }
      // {
      //   type: 'text/javascript',
      //   id: 'MathJax-script',
      //   src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js'
      // }
    ]
    // {
    //   // type: 'text/x-mathjax-config',
    //   src: 'js/drawSurface.js',
    //   defer: true
    // },

    //]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/variables.scss'],
  //'@mdi/font/css/materialdesignicons.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/vue-plotly', mode: 'client' },
    { src: '~plugins/vue-chartjs.js', mode: 'client' }
  ],
  //plugins: [], // ['~/plugins/plotly.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module', // had problems!
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [], // ['~/node_modules/mathjax/es5/tex-mml-chtml.js'],

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        dark: {
          primary: colors.green.darken1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vue-plotly.js'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
