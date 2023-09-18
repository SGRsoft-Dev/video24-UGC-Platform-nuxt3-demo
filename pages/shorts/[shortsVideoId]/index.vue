<template>

</template>
<script setup>

import axios from "axios";
import dayjs from "dayjs";

const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const {$util} = useNuxtApp();

const route = useRoute();

const SHORTS = useShorts();
const SHORTS_VIDEO = useShortVideo();
const SHORTS_IDX = useShortIdx();
const ShortsList = useShortsList();
const shortsInitLoad = useShortsInitLoad();
const shortMode = useShortMode();

const startFlag = useStartFlag();
const activeTmp = useActiveTmp();
const ShortPlayList = useShortPlayList();
const isMobile = useIsMobile();



const setShortsFist = ()=>{
	ShortsList.value = [];

	if(route.params.shortsVideoId){
		let find = SHORTS.value.find((v)=>v.video_id == route.params.shortsVideoId);
		if(find){
			//SHORTS_IDX.value = ShortsList.value.indexOf(find);
			SHORTS_IDX.value = 0
			ShortsList.value.unshift(find);
		}

	}

}

const setShortsList = ()=>{

	for (let i = 0; SHORTS.value.length > i; i++) {
		let v = SHORTS.value[i];
		if(route.params.shortsVideoId) {
			if (v.video_id == route.params.shortsVideoId) {
				//SHORTS_IDX.value = i;
			}else{
				ShortsList.value.push(v);
			}
		}


	}

}


const getShortList = async ()=>{

	SHORTS.value = [];
	let {data} = await axios.get('https://mediaplus.co.kr/openApi/v1/content',{
		params:{
			type:'vod',
			pageNo:1,
			limit:30,
			portrait:true,
			randkey:dayjs().format('YYYYMMDDHHmm')
		},
		headers:{
			'Authorization':mpKey
		}
	});

	if(data.code == 200){

		for (let i = 0; i < data.result.data.length; i++) {
			let v = data.result.data[i];

			v.created_at = $util.dateFormat2(v.created_at);
			v.view_cnt = $util.numberToKorean(v.view_cnt);
			SHORTS.value.push(v);
		}

		shortsInitLoad.value = true;


	}
}



useAsyncData(async ()=>{

	if(SHORTS.value.length > 0){
		return;
	}
	await getShortList();

	setShortsFist();

	setTimeout(()=>{
		setShortsList();
	},1000);
	//shuffle(ShortsList.value);

});



onMounted(()=>{
	activeTmp.value = true;
})


</script>
