

<template>
	<div class="pl-2 pr-2">

		<div v-for="(v ,i) in VOD">
			<UiVideoCardCol :v="v" />
		</div>

		<div class="md:hidden h-[100px]" >
			<!--margin-->
		</div>
	</div>

</template>

<script setup lang="ts">
import axios from "axios";
const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const {$util} = useNuxtApp();

const VOD = useState('PLAYLIST_LIST');
const TOTAL = useState('PLAYLIST_TOTAL');
const VIDEO = useState('VIDEO');

const playerAddNextSource = (data)=>{
	try {
		let source = {
			file: data.file,
			poster: data.poster,
			description: {
				"title": data.title,
			},
			video_id: data.video_id,
		}
		window.player.addNextSource(source);
	} catch (e) {
		console.log(e);
	}
}

const getVodList = async ()=>{
	let {data} = await axios.get('https://mediaplus.co.kr/openApi/v1/vod',{
		params:{
			channelId:VIDEO.value.channel_id
		},
		headers:{
			'Authorization':mpKey
		}
	});

	if(data.code == 200){
		VOD.value = data.result.data;
		TOTAL.value = data.result.totalCnt;
	}

	/*setTimeout(()=>{
		playerAddNextSource({
			file: VOD.value[0].hls_play_url,
			poster: VOD.value[0].thumb_url,
			title: VOD.value[0].title,
			video_id: VOD.value[0].video_id,
		});
	},500);*/
}

onMounted(async ()=>{
	await getVodList();
});

</script>

<style scoped>

</style>
