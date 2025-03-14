<template>
	<div class="p-0 md:p-5  pt-5 md:pr-0">


		<div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5" v-if="loading">
			<div v-for="(v , i) in skelCnt" class=" px-0 md:px-3 mb-10">
				<SkeletonVideoCard  />
			</div>
		</div>


		<div v-else class="space-y-5 ">

			<div class="px-2 ">
				<strong class="text-2xl">Shorts</strong>
			</div>

			<div class="">
				<div class="grid grid-cols-1 md:grid-cols-7 slickBody gap-1 "  >

					<div  class=" px-0 md:px-3 mb-10 videoItems "  v-for="(v , i) in SHORTS" >
						<UiVideoCardShortForm :v="v" />
					</div>
				</div>
			</div>

			<div class="px-2 ">
				<strong class="text-2xl">VOD</strong>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-3  sm:px-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5  sm:gap-5 mainVodArea" >
				<template v-for="(v , i) in VOD">
					<div class=" px-0 mb-10  overflow-auto" v-if="v.height < v.width">
						<UiVideoCard :v="v" />
					</div>
				</template>
			</div>
		</div>



		<div class="moreLoader videoRoot pt-5" >
			<!--Observer-->
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

.slickBody{
	display: flex;
	flex-wrap: nowrap;
	scroll-snap-type: x mandatory;
	overflow-x: scroll;
	overflow-y: hidden;

	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar {
		display: none;
	}
	& > div {
		scroll-snap-align: start;

	}

}
.slickBody > div:first-child {

}
.slickBody .videoItems{
	max-width:240px;
	min-width:180px;
	padding-left: 5px;
	padding-right: 5px;

	scroll-snap-align: start;

}
</style>

<script setup>
import axios from "axios";

const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const {$util} = useNuxtApp();

const loading = ref(true);
const skelCnt = ref(50);
const initLoad = ref(false);

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
const VOD = useVod();
const SHORTS = useMainShorts();
const SHORTS_VIDEO = useShortVideo();
const TOTAL = useTotal();
const pageNo = ref(1);
const endPage = ref(false);

const shuffle =  (array) =>{
	array.sort(() => Math.random() - 0.5);
}


const getShortList = async ()=>{

	let {data} = await axios.get('https://video24.app/openApi/v1/content',{
		params:{
			type:'vod',
			pageNo:pageNo.value,
			limit:20,
			portrait:true,

		},
		headers:{
			'Authorization':mpKey
		}
	});

	if(data.code == 200){
		for (let i = 0; i < data.result.data.length; i++) {
			let v = data.result.data[i];
			if(i==0){
				SHORTS_VIDEO.value = v
			}
			v.created_at = $util.dateFormat2(v.created_at);
			v.view_cnt = $util.numberToKorean(v.view_cnt);
			SHORTS.value.push(v);
		}

		shuffle(SHORTS.value);
	}


}

const getVodList = async ()=>{
	if(endPage.value) return;

	let {data} = await axios.get('https://video24.app/openApi/v1/content',{
		params:{
			type:'vod',
			pageNo:pageNo.value,
			limit:60,
			landscape:true,

		},
		headers:{
			'Authorization':mpKey
		}
	});

	if(data.code == 200){

		TOTAL.value = data.result.totalCnt;

		if(TOTAL.value >0){
			for (let i = 0; i < data.result.data.length; i++) {
				let v = data.result.data[i];
				v.created_at = $util.dateFormat2(v.created_at);
				v.view_cnt = $util.numberToKorean(v.view_cnt);
				if(pageNo.value > 1){
					VOD.value.push(v);
				}
			}

			if(pageNo.value == 1){
				VOD.value = data.result.data;
				shuffle(VOD.value);
			}

			setTimeout(()=>{
				loading.value = false;

				initLoad.value = true;
				setObserver();
			},500)

		}else{
			loading.value = false;
		}

		if(pageNo.value > 1 && data.result.data.length == 0){
			endPage.value = true;
		}



	}


}

useAsyncData(async ()=>{
	if(VOD.value.length == 0){
		await getShortList();
		await getVodList();
	}else{
		loading.value = false;
	}
});

const setObserver = ()=>{
	try {
		const io = new IntersectionObserver(ioCallback, {threshold: 0.9});
		io.observe(document.querySelector('.moreLoader'));
	}catch (e) {

	}
}
const ioCallback = async ()=>{
	pageNo.value++;
	await getVodList();
}


onMounted(()=>{


})
</script>
