<template>
	<div class="p-0 md:p-5 ">


		<div class="videoRoot" v-if="loading">
			<div v-for="(v , i) in skelCnt" class="videoCol px-0 md:px-3 mb-10">
				<SkeletonVideoCard  />
			</div>
		</div>

		<div v-else class="space-y-5">

			<div class="px-1 ">
				<strong class="text-2xl">Reels</strong>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-7 slickBody gap-3" >
				<template v-for="(v , i) in VOD">
					<div  class=" px-0 md:px-3 mb-10 videoItems" v-if="v.height > v.width">
						<UiVideoCardShortForm :v="v" />
					</div>
				</template>
			</div>

			<div class="px-1 ">
				<strong class="text-2xl">VOD</strong>
			</div>

			<div class="videoRoot" >
				<template v-for="(v , i) in VOD">
					<div class="videoCol px-0 md:px-3 mb-10" v-if="v.height < v.width">
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
	white-space: nowrap;
	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar {
		display: none;
	}
	& > div {
		scroll-snap-align: start;
	}

}
.slickBody .videoItems{
	max-width:240px;
	min-width:240px;
	padding-left: 5px;
	padding-right: 5px;
	aspect-ratio: 9/10;
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
const VOD = useState('VOD');
const TOTAL = useState('TOTAL');
const pageNo = ref(1);
const endPage = ref(false);

const getVodList = async ()=>{
	if(endPage.value) return;

	let {data} = await axios.get('https://mediaplus.co.kr/openApi/v1/vod',{
		params:{
			pageNo:pageNo.value,
			limit:20,

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
		await getVodList();
	}else{
		loading.value = false;
	}
});

const setObserver = ()=>{
	const io = new IntersectionObserver(ioCallback, { threshold: 0.9 });
	io.observe(document.querySelector('.moreLoader') );
}
const ioCallback = async ()=>{
	pageNo.value++;
	await getVodList();
}


onMounted(()=>{


})
</script>
