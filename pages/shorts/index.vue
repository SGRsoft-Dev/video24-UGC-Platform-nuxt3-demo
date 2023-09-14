<template></template>

<script setup>
import axios from "axios";

const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const colorMode = useColorMode();
const route = useRoute();
const router = useRouter();
const SHORTS = useShorts();
const {$util} = useNuxtApp();


const getShortList = async ()=>{


	let {data} = await axios.get('https://mediaplus.co.kr/openApi/v1/content',{
		params:{
			type:'vod',
			pageNo:1,
			limit:20,
			portrait:true,
		},
		headers:{
			'Authorization':mpKey
		}
	});

	if(data.code == 200){

		for (let i = 0; i < data.result.data.length; i++) {
			let v = data.result.data[i];

			v.created_at = $util.dateFormat2(v.created_at);
			v.view_cnt = $util.numberToKorean(v.view_cnt);
			SHORTS.value.push(v);
		}

	}
}



onMounted(async ()=>{


	if(SHORTS.value.length == 0){
		await getShortList();
	}

	let idValue = route.params.videoId;
	if(!idValue) idValue = SHORTS.value[0].video_id;
	router.replace('/shorts/'+idValue);


})

</script>
