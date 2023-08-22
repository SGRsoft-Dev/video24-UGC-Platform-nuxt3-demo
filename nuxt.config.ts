export default defineNuxtConfig({
    ssr: false,
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
            script: [
                { src: 'https://unpkg.com/@phosphor-icons/web' },
                { src: 'https://player.vpe.naverncp.com/ncplayer.js?access_key=37ef75318db7723005e62c4042ad5d59' },
            ],
        },

    },
    css:[
        '~/assets/css/base.css',
    ],
    devtools: { enabled: true },
    modules: ['@nuxthq/ui'],

    runtimeConfig:{
        public:{
            appName:'My broadcast app',
            mediaPlusApiKey:'f507591002f8fd5a39db1a98fdf68c7b10fd0168b771d3ff244e2812e5cc57a5',
        },


    },
    colorMode: {
        preference: 'dark',
    },

})
