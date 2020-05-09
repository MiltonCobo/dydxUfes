import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,400&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Neucha&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    ],

    title: 'Minha pagina UFES',
    script: [
      {
        type: 'text/javascript', //x-mathjax-config',
        src: 'js/MathJax/mathjax2Config.js',
        async: true
        //defer: true // defer = true is important
      }
      // {
      //   type: 'text/javascript',
      //   async: true,
      //   defer: true, //&delayStartupUntil=configured
      //   src:
      //     'https://cdn.jsdelivr.net/npm/mathjax@2.7.8/MathJax.js?config=TeX-AMS-MML_SVG' // TeX-MML-AM_CHTML' //TeX-AMS-MML_SVG&delayStartupUntil=onLoad'
      // }
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
      //   async: true,
      //   defer: true,
      //   src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js'
      // }
      // {
      //   type: 'text/x-mathjax-config',
      //   src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
      //   async: true,
      //   defer: true
      // }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/variables.scss', '@mdi/font/css/materialdesignicons.css'],
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
  modules: [],

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
    transpile: ['vue-plotly.js', 'vue-chartjs'],

    /*
     ** You can extend webpack config here
     */
    extend(config, {}) {
      config.module.rules.push({
        test: /\.js$/,
        // loader: 'ify-loader',
        enforce: 'post',
        use: [
          'ify-loader'
          //'transform-loader?plotly.js/tasks/util/compress_attributes.js'
        ]
      })
    }
  }
}
