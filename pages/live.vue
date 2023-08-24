<template>
	<div class="p-5">
		<div class="px-1">
			<strong class="text-2xl">LIVE</strong>
		</div>
		<div class=" mt-5">
			<div v-for="(v , i) in VOD" class="  mb-5">
				<UiVideoCardCol :v="v" />

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
const {$util} = useNuxtApp();

/**
 * VOD 리스트 가져오기
 * @type {*[]}
 */
const VOD = useState('VOD');
const TOTAL = useState('TOTAL');

const getVodList = async ()=>{
	let {data} = await axios.get('https://mediaplus.co.kr/openApi/v1/vod',{
		headers:{
			'Authorization':mpKey
		}
	});

	if(data.code == 200){
		VOD.value = data.result.data;
		TOTAL.value = data.result.totalCnt;
	}

}

useAsyncData(async ()=>{
	await getVodList();
});
</script>
