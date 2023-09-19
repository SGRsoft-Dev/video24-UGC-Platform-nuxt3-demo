<template></template>

<script setup>
import axios from "axios";
import dayjs from "dayjs";

const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const colorMode = useColorMode();
const route = useRoute();
const router = useRouter();

const {$util} = useNuxtApp();


const getShort = async ()=>{

	let idValue = route.params.videoId;
	if(idValue){
		router.replace('/shorts/' + idValue);
	}else {
		let {data} = await axios.get('https://mediaplus.co.kr/openApi/v1/content', {
			params: {
				type: 'vod',
				pageNo: 1,
				limit: 1,
				portrait: true,
				randkey: dayjs().format("YYYYMMDDHHmm")
			},
			headers: {
				'Authorization': mpKey
			}
		});

		if (data.code == 200) {


			if (!idValue) idValue = data.result.data[0].video_id;
			router.replace('/shorts/' + idValue);
		}
	}
}



onMounted(async ()=>{
	await getShort();

})

</script>
