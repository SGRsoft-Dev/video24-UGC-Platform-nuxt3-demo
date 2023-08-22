<template>

</template>

<style scoped>

</style>

<script setup>
import axios from "axios";

const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;

const config = ref(runtimeConfig);
const {$util} = useNuxtApp();
const route = useRoute();

const VIDEO = useState('VIDEO');


const pageTitle = computed(()=>{
	try {
		return VIDEO.value.title ? VIDEO.value.title : 'MediaPlus';
	}catch (e) {
		return runtimeConfig.public.appName;
	}
});
const pageDescription = computed(()=>{
	try {
		return VIDEO.value.description ? VIDEO.value.description : '';
	}catch (e) {
		return '';
	}
});

useHead({
	title: pageTitle,
	meta:[
		{
			name:'description',
			content:pageDescription,
		}
	],
})


/**
 * VOD 가져오기
 * @type {*[]}
 */
const getVodList = async ()=>{

	let {data} = await axios.get(`https://mediaplus.co.kr/openApi/v1/vod/${route.query.v}`,{
		headers:{
			'Authorization':mpKey
		}
	});

	if(data.code == 200){
		if(VIDEO.value) {
			//console.log('!!', VIDEO.value.video_id, data.result.data.video_id);
			if(VIDEO.value.video_id != data.result.data.video_id){
				VIDEO.value = data.result.data;
			}
		}else {
			VIDEO.value = data.result.data;
		}
	}
}

useAsyncData(async ()=>{
	await getVodList();
});



</script>
