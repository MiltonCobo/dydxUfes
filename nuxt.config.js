import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  // mode: 'universal',
  // middleware: ['checkMathJax'],

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
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,400&display=swap'
      // },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css2?family=Neucha&display=swap'
      // },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    ],

    title: 'Minha pagina UFES',
    script: [
      // {
      //   type: 'text/javascript',
      //   src: 'https://preview.babylonjs.com/babylon.js"',
      //   sync: false,
      //   defer: false
      // },
      // {
      //   type: 'text/javascript',
      //   src: 'https://preview.babylonjs.com/gui/babylon.gui.min.js',
      //   async: false,
      //   defer: false
      // }
      {
        type: 'text/javascript',
        id: 'MathJax-script',
        src: '../../../js/MathJax/mathjax2Config.js',
        defer: true // defer = true is important
      },
      {
        type: 'text/javascript',
        src: '../../../js/p5/p5.min.js',
        // src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
        async: true,
        defer: false
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
      //   async: true,
      //   defer: true,
      //   src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js'
      // }
      // {
      //   type: 'text/x-mathjax-config',
      //   src: '../../../js/p5/p5.min.js', //'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
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
  css: [
    'vuetify/dist/vuetify.min.css',
    //'~/assets/css/main.css',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/variables.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/globalVariables',
    { src: '~plugins/PlotlyConfig.js' },
    // { src: '~plugins/vue-plotly', mode: 'client' }, // bundle is too big to initial load....

    { src: '~plugins/vue-chartjs.js', mode: 'client' }
    //{ src: '~plugins/babylonjs.js', mode: 'client' }
    //{ src: '~plugins/babylon-gui.js', mode: 'client' }   Not necessary?
  ],

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

  modules: [
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 10240
        }
      }
    ]
  ],

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: {
      directives: ['Touch']
    },
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
    extractCSS: true,
    transpile: ['vue-chartjs', 'vue-plotly.js'],

    /*
     ** You can extend webpack config here
     */

    analyze: false,
    // extend(config, ctx) {
    //   if (ctx && ctx.isClient && ctx.isServer) {
    //     config.optimization.splitChunks.maxSize = 51200
    //   }
    // },

    // optimization: {
    //   splitChunks: {
    //     chunks: 'all',
    //     automaticNameDelimiter: '.',
    //     name: 'test',
    //     maxSize: 256000
    //   }
    // },

    // extend(config, { isClient, isServer }) {
    //   //if (isClient) {
    //   config.optimization.splitChunks.maxSize = 200000
    //}
    // },

    /*
     ** You can extend webpack config here
     */
    extend(config, {}) {
      config.resolve.alias['plotly.js$'] = '~/static/js/customPlotly.js' //'plotly.js/dist/plotly.min.js' //'plotly.js-gl3d-dist/plotly-gl3d.js' // To avoid loading other staff

      // config.node = { __dirname: false }

      config.module.rules.push({
        test: /\.js$/,
        enforce: 'post',
        use: [
          'ify-loader',
          'transform-loader?plotly.js/tasks/compress_attributes.js'
        ]
      })
    }
  }
}
