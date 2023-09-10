export default defineAppConfig({
    ui: {
        primary: 'green',
        gray: 'cool',
        input:{
            rounded:'rounded-full'
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
