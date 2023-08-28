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
