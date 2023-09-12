
export default defineNuxtRouteMiddleware( async (to, from) => {

    const VIDEO = useState('VIDEO',()=>null);
    const runtimeConfig = useRuntimeConfig();
    const mpKey = runtimeConfig.public.mediaPlusApiKey;
    const videoId = ref(null);
    const ERROR = useState('ERROR',()=>null);
    const playUrl = useState('playUrl',()=>null);
    videoId.value = to.params.videoId;

    if(to.path.split('/')[1] == 'embed' || to.path.split('/')[1] == 'watch') {


        let data = await $fetch(`https://mediaplus.co.kr/openApi/v1/content/${videoId.value}`, {
            headers:{
                'Authorization':mpKey
            }
        });

        if(data){
            if(data.code==200){
                VIDEO.value = data.result;
                playUrl.value = to.query.lowquality ? VIDEO.value.quality_hls[0].url : VIDEO.value.hls_play_url;
            }
        }

    }

})


