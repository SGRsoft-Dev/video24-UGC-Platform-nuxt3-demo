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
const floatPlayer = useState('floatPlayer');

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
const getVod = async ()=>{

	let {data} = await axios.get(`https://mediaplus.co.kr/openApi/v1/vod/${route.query.v}`,{
		headers:{
			'Authorization':mpKey
		}
	});

	if(data.code == 200){
		if(VIDEO.value) {

			if(VIDEO.value.video_id != data.result.data.video_id){
				VIDEO.value = data.result.data;
			}
		}else {
			VIDEO.value = data.result.data;
		}
	}
}

useAsyncData(async ()=>{
	await getVod();
	window.scrollTo(0, 0);
});

watch(()=>route.query.v,async ()=>{
	await getVod();
	window.scrollTo(0, 0);
});

onMounted(()=>{
	floatPlayer.value = false;
})
onUnmounted(()=>{

	if(!floatPlayer.value) {
		VIDEO.value = null;
		try {
			window.player.destroy();
		} catch (e) {

		}
	}
});

</script>
