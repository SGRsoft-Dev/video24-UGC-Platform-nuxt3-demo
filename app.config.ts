export default defineAppConfig({
    ui: {
        primary: 'red',
        gray: 'cool',
        input:{
            color: {
                white: {
                    outline: 'shadow-none  bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700  focus:ring-gray-500/20 dark:focus:ring-gray-400/20'
                },
                gray: {
                    outline: 'shadow-none  bg-gray-50 dark:bg-neutral-900 text-neutral-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700  focus:ring-gray-500/20 dark:focus:ring-gray-400/20'
                }
            }
        }
    },
    siteMenu:[
        {
            subs: [
                {
                    title: 'HOME',
                    icon: ' ph-house-simple',
                    to: '/',
                },
            ],
        },

        {
            subs: [
                {
                    title: 'Shorts',
                    icon: ' ph-film-script',
                    to: '/shorts',
                    href:true,
                }
            ],
        },
        {
            subs: [
                {
                    title: 'LIVE',
                    icon: ' ph-broadcast',
                    to: '/live',
                }
            ],
        },
        {
            subs: [
                {
                    title: 'VOD',
                    icon: ' ph-monitor-play',
                    to: '/vod',
                }
            ],
        },


    ],
    mobileBottomMenu:[
        {
            subs: [
                {
                    title: 'HOME',
                    icon: ' ph-house-simple',
                    to: '/',
                },
            ],
        },
        {
            subs: [
                {
                    title: 'Shorts',
                    icon: ' ph-film-script',
                    to: '/shorts',
                    href:true,
                }
            ],
        },
        {
            subs: [
                {
                    title: 'LIVE',
                    icon: ' ph-broadcast',
                    to: '/live',
                }
            ],
        },
        {
            subs: [
                {
                    title: 'VOD',
                    icon: ' ph-monitor-play',
                    to: '/vod',
                }
            ],
        },


    ]
})
