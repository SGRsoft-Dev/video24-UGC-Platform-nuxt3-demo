

<template>
	<div class="pl-2 pr-2">

		<div v-for="(v ,i) in VOD">
			<UiVideoCardCol :v="v" />
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

}

onMounted(async ()=>{
	await getVodList();
});

</script>

<style scoped>

</style>
