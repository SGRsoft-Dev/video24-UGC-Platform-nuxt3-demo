

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
const route = useRoute();

const VOD = useState('PLAYLIST_LIST',()=>[]);
const TOTAL = useState('PLAYLIST_TOTAL',()=>0);
const VIDEO = useState('VIDEO');

const shuffle =  (array) =>{
	array.sort(() => Math.random() - 0.5);
}



//비디오 중복 체크
const chkDuvideo = (video_id)=>{
	for (let i = 0; i < VOD.value.length; i++) {
		let v = VOD.value[i];
		if (v.video_id == video_id) {
			return true;
		}
	}
	return false;
}

const getVodList = async (params)=>{
	try {
		let {data} = await axios.get('https://mediaplus.co.kr/openApi/v1/content', {
			params: params,
			headers: {
				'Authorization': mpKey
			}
		});

		if (data.code == 200) {

			for (let i = 0; i < data.result.data.length; i++) {
				let v = data.result.data[i];
				v.created_at = $util.dateFormat2(v.created_at);
				v.view_cnt = $util.numberToKorean(v.view_cnt);

				if (route.query.v != v.video_id) {
					if(chkDuvideo(v.video_id) == false){
						VOD.value.push(v);
					}
				}
			}



			TOTAL.value = data.result.totalCnt;
		}
	}catch (e) {

	}
}



onMounted(async ()=>{

	VOD.value = [];
	await getVodList({
		channelId:VIDEO.value.channel_id,
		limit:20,
		type:'vod',
	});

	shuffle(VOD.value);

	await getVodList({
		limt:10,
	});





});

</script>

<style scoped>

</style>
