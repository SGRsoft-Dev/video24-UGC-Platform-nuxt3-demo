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

		SHORTS.value = data.result.data;

	}
}



onMounted(async ()=>{

	SHORTS.value = [];
	await getShortList();

	let idValue = route.params.videoId;
	if(!idValue) idValue = SHORTS.value[0].video_id;
	router.replace('/shorts/'+idValue);


})

</script>
