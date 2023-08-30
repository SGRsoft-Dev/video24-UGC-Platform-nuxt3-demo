<template>
	<div v-if="loading" >
		<SkeletonPlayer/>
	</div>
	<div v-if="!VIDEO" >
		<div class="text-center">
			<div class="flex justify-center items-center h-[500px]">
				<div class="mb-4">
					<i class="ph ph-selection-slash text-[40px]"></i>
				</div>
				<div>
					비디오가 존재하지 않습니다.
				</div>
			</div>
		</div>

	</div>


</template>

<style scoped>

</style>

<script setup>
import axios from "axios";


const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);

const route = useRoute();
const floatPlayer = useState('floatPlayer');
const windowSize = useState('windowSize');
const VIDEO = useState('VIDEO');
const loading = useState('loading',()=>true);
const UUID = useState('UUID');
const lastRouterPath = useState('lastRouterPath');


const colorMode = useColorMode();

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
const getVod = async (video_id)=>{

	if(!video_id && route.query.v){
		video_id = route.query.v;
	}

	let {data} = await axios.get(`https://mediaplus.co.kr/openApi/v1/vod/${route.query.v}`,{
		headers:{
			'Authorization':mpKey
		}
	});

	if(data.code == 200){
		if(VIDEO.value) {

			try {
				if (VIDEO.value.video_id != data.result.data.video_id) {
					VIDEO.value = data.result.data;
				}
			}catch (e) {
				VIDEO.value = data.result.data;
			}
		}else {
			VIDEO.value = data.result.data;
		}

	}

	setTimeout(()=>{
		loading.value = false;
	},200);

}


useAsyncData(async ()=>{
	loading.value = true;
	VIDEO.value = null;
	try{
		window.player.destroy();
	}catch (e) {

	}
	await getVod();
	window.scrollTo(0, 0);
});

const changePlayer = async (video_id)=>{
	loading.value = true;
	VIDEO.value = null;
	window.player.destroy();
	await getVod(video_id);
	window.scrollTo(0, 0);
}
watch(()=>route.query.v, (to,from)=>{
	if(from && to != from) {
		changePlayer(to);
		lastRouterPath.value = null;
	}
});

onMounted(()=>{

	floatPlayer.value = false;
	try{
		window.player.uiVisible();
	}catch (e) {

	}
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
