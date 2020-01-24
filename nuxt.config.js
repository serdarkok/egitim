// const bodyParser = require('body-parser');
const env = require('dotenv').config();

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap&subset=latin-ext' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */

 server: {
  // nuxt.js server options ( can be overrided by environment variables )
  port: process.env.PORT,
  host: process.env.BASE_URL,
 },

  css: [
    'bootstrap-scss',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/bundle.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vue-draggable',
    '@/plugins/raw-view',
    {src: '@plugins/socket', ssr: false},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/moment'
  ],
  moment: {
    defaultLocale: 'tr',
    locales: ['tr']
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],
  env: {
      API_KEY: 'Buradasifre-yer-alacak',
      BASE_URL: process.env.BASE_URL,
      PORT: process.env.PORT
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL : 'http://'+process.env.BASE_URL+':'+process.env.PORT+'/api'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    filenames: {
      app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js'
    },

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  serverMiddleware: [
    // { path: '/api', handler: '~/api/auth.js' },
    // bodyParser.json(),
    "~/api/db.js",
    "~/api/auth.js",
    "~/api/user.js",
    "~/api/categories/index.js",
    "~/api/questions/index.js",
    "~/api/quizzes/index.js",
    "~/api/guests/index.js",
    "~/api/answers/index.js"
  ]
}
