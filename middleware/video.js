
export default defineNuxtRouteMiddleware( async (to, from) => {

    const VIDEO = useVideo()
    const runtimeConfig = useRuntimeConfig();
    const mpKey = runtimeConfig.public.mediaPlusApiKey;
    const videoId = ref(null);
    const loading = useLoading();
    const playUrl = usePlayUrl();
    const watchMode = useWatchMode();
    const shortMode = useShortMode();
    const fullMode = useFullMode();
    videoId.value = to.params.videoId;

    if(to.query.v){
        videoId.value = to.query.v;
        if(to.query.v != from.query.v){
            VIDEO.value = null;
            loading.value = true;
        }
    }

    if(to.path.split('/')[1] == 'watch'){
        watchMode.value = true;
    }else{
        watchMode.value = false;
    }

    if(to.path.split('/')[1] == 'shorts' ){
        shortMode.value = true;
    }else{
        shortMode.value = false;
    }

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
                loading.value = false;
            }
        }

        loading.value = false
    }

})


