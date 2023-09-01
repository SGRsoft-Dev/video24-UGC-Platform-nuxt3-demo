export default defineNuxtConfig({
    experimental: {
        viewTransition: true
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/app-union.png' }
            ],
            script: [
                { src: 'https://unpkg.com/@phosphor-icons/web' },
                { src: 'https://player.vpe.naverncp.com/ncplayer.1.1.1.dev.beta.js?access_key=17e49e099ea78c1f1ae159fc1647316c&beta=1114' },


            ],
        },
    },
    css:[
        '~/assets/css/base.css',
        '~/assets/css/bootstrap_dnone.css',
        '~/assets/css/bootstrap_grids.css',
    ],
    devtools: { enabled: process.env.NODE_ENV === 'development' ? true : false },
    modules: ['@nuxthq/ui'],

    runtimeConfig:{
        public:{
            appName:'My UGC app',
            mediaPlusApiKey:'f507591002f8fd5a39db1a98fdf68c7b10fd0168b771d3ff244e2812e5cc57a5',
        },

    },
    colorMode: {
        preference: 'light',
    },

    nitro: {
        routeRules: {
            '/api/**' : {cors : true},
        },
        preset: "firebase",
    },
})
