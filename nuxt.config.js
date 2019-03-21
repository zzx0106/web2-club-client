const bodyParser = require('body-parser');
// const session = require('express-session');
var webpack = require('webpack');

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'web2',
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '描述' }],
        link: [{ rel: 'shortcut icon', href: '/favicon.ico' }, { rel: 'stylesheet', href: '//at.alicdn.com/t/font_798445_uuga81pcau.css' }],
    },
    router: {
        middleware: ['auth'],
    },
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#2db7f5' },
    /*
     ** Build configuration
     */
    build: {
        /**
         * 防止插件被二次打包
         */
        vendor: [
            'iview',
            'axios',
            'babel-polyfill',
            'quill-image-drop-module',
            'quill-image-resize-module',
            'highlight.js',
            'vue-quill-editor',
            // 'element-ui'
        ],
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                Quill: 'quill/dist/quill.js',
            }),
            // new webpack.HotModuleReplacementPlugin(),
        ],
        // devServer: {
        //     hot: true,
        // },
        loaders: [
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash].[ext]',
                },
            },
        ],
        // babel配置
        babel: {},
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev }) {
            // if (isDev && isClient) {
            //   config.module.rules.push({
            //     enforce: 'pre',
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     exclude: /(node_modules)/,
            //   });
            // }
            const vueLoader = config.module.rules.find((rule) => {
                return rule.loader === 'vue-loader';
            });
            vueLoader.options.loaders.sass = 'vue-style-loader!css-loader!sass-loader';
        },
    },
    /*
     ** Add server middleware
     ** Nuxt.js uses `connect` module as server
     ** So most of express middleware works with nuxt.js server middleware
     */
    // serverMiddleware: [
    //     // 'redirect-ssl',
    //     // body-parser middleware
    //     bodyParser.json(),
    //     // session middleware
    //     session({
    //         secret: 'super-secret-key',
    //         resave: false,
    //         saveUninitialized: false,
    //         cookie: { maxAge: 60000 },
    //     }),
    //     // Api middleware
    //     // We add /api/login & /api/logout routes
    //     // { path: '/api', handler: '~/api/index.js' },
    //     '~/api',
    // ],
    axios: {
        proxy: true,
    },
    proxy: [
        // ['/api/', { target: 'http://localhost:3000/' }]
    ],
    // // 插件
    plugins: [
        { src: '~plugins/iview.js', ssr: true },
        { src: '~plugins/babelPolyfill.js', ssr: true },
        { src: '~plugins/ajax.js', ssr: true },
        { src: '~plugins/filter.js' },
        { src: '~plugins/common.js' },
        { src: '~plugins/quill-editor.js', ssr: false },
    ],
    css: [{ src: '~assets/css/index.scss', lang: 'scss' }, 'quill/dist/quill.snow.css', 'quill/dist/quill.bubble.css', 'quill/dist/quill.core.css', 'highlight.js/styles/tomorrow-night.css'],
};
