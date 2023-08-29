<template>
	<div class="p-5 md:p-5 space-y-5">
		<div class="px-1 ">
			<strong class="text-2xl">LIVE</strong>
		</div>

		<div v-for="(v , i) in LIST" class="">
			<UiVideoCardCol :v="v" />
		</div>

		<div v-if="TOTAL <1" class="h-full flex justify-center items-center h-[500px]">
			<div class="text-center" v-if="!loading">
				<div class="mb-4">
					<i class="ph ph-selection-slash text-[40px]"></i>
				</div>
				<div>
					진행중인 LIVE가 없습니다.
				</div>
			</div>
			<div v-else>

				<div :class="colorMode.value == 'dark' ? 'loader-dark' : 'loader-light'"></div>
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
</style>

<script setup>
import axios from "axios";

const colorMode = useColorMode();
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
const LIST = useState('LIVE_LIST');
const TOTAL = useState('LIVE_TOTAL',()=>0);
const pageNo = ref(1);
const endPage = ref(false);

const getVodList = async ()=>{
	if(endPage.value) return;

	let {data} = await axios.get('https://mediaplus.co.kr/openApi/v1/live',{
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
					LIST.value.push(v);
				}
			}

			if(pageNo.value == 1){
				LIST.value = data.result.data;
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
	await getVodList();
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
