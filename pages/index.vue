<template>
	<div class="p-0 md:p-5">

		<div class="videoRoot">
			<div v-for="(v , i) in VOD" class="videoCol px-0 md:px-3 mb-10">
				<UiVideoCard :v="v" />

			</div>
			<div v-for="(v , i) in VOD" class="videoCol px-0 md:px-3 mb-10">
				<UiVideoCard :v="v" />

			</div>
			<div v-for="(v , i) in VOD" class="videoCol px-0 md:px-3 mb-10">
				<UiVideoCard :v="v" />
			</div>
		</div>
	</div>
</template>

<style scoped>

.videoRoot{
	display: flex;
	flex-wrap: wrap;
	margin-left:-5px;
	margin-right:-5px;
	box-sizing: inherit;
}
.videoItem{
	width: 20%;
	padding:10px;
}
.videoThumb{
	aspect-ratio: 16/9;
	object-fit: cover;
}
</style>

<script setup>
import axios from "axios";

const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const {$util} = useNuxtApp();


useHead({
	title: runtimeConfig.public.appName,
	meta:[
		{
			name:'description',
			content:runtimeConfig.public.appName,
		}
	],
})


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
