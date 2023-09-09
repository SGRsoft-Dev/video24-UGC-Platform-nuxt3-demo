<template>

	<div class="relative">
		<div class="absolute top-0 right-0 z-[10]">
			{{startFlag}} / {{shortScroll}} / {{shortItemHeight}} / {{SHORTS_IDX}} / {{shortMode}}
		</div>
		<div class="absolute top-0 left-0 z-[9] p-3 md:hidden">
			<NuxtLink to="/">
				<img src="/image/logo_dark.svg" class="h-[24px]" alt="">
			</NuxtLink>
		</div>

		<div class="absolute top-0 right-0 p-4" v-if="shortScroll > 0">
			<button class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-800 bg-gray-200 flex items-center justify-center"  type="button" @click="shortsPrev">
				<i class="ph ph-arrow-up"></i>
			</button>
		</div>

		<div class="absolute bottom-0 right-0 p-4 ">
			<button class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-800 bg-gray-200 flex items-center justify-center"  type="button" @click="shortsNext">
				<i class="ph ph-arrow-down"></i>
			</button>
		</div>

		<div class="h-screen max-h-[100vh] md:max-h-[calc(100vh_-_75px)] snap-y snap-mandatory overflow-y-auto " id="shortsBody" tabindex="0" @scroll="shortsScrollRun">
			<div v-for="(s , i) in ShortsList" >
				<div>
					<UiShortsPlayer :video="s" class="snap-always snap-start shortItems" :active="i==SHORTS_IDX ? true : false"/>
				</div>
			</div>
		</div>
	</div>

</template>

<style scoped>
	#shortsBody:focus{
		outline: none;
	}
</style>

<script setup>
import axios from "axios";
import _ from "lodash";
const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);

const windowSize = useState('windowSize');
const loading = useState('loading',()=>true);
const UUID = useState('UUID');

const colorMode = useColorMode();

const {$util} = useNuxtApp();

const SHORTS = useState('SHORTS');
const SHORTS_VIDEO = useState('SHORTS_VIDEO');
const SHORTS_IDX = useState('SHORTS_IDX');
const ShortsList = useState('ShortsList',()=>[]);
const shortsInitLoad = useState('shortsInitLoad');
const shortMode = useState('shortMode');

const route = useRoute();
const router = useRouter();

const shortScroll = ref(0);
const shortItemHeight = ref(0)

const startFlag = useState('startFlag');

//쇼츠 높이 구하기
let setShortItemHeightTimer = null;
const setShortItemHeight = ()=>{
	clearTimeout(setShortItemHeightTimer);
	setShortItemHeightTimer = setInterval(()=>{
		let shortItems = document.getElementsByClassName('shortItems');
		if(shortItems.length > 0){
			shortItemHeight.value = shortItems[0].clientHeight - 30;
			clearTimeout(setShortItemHeightTimer);
		}
	},200)

}

const shortsPrev = ()=>{
	document.getElementById('shortsBody').scrollTo({
		top:shortScroll.value - shortItemHeight.value,
		behavior:'smooth'
	});
	SHORTS_IDX.value = SHORTS_IDX.value - 1;
}

const shortsNext = ()=>{
	document.getElementById('shortsBody').scrollTo({
		top:shortScroll.value + shortItemHeight.value,
		behavior:'smooth'
	});
	SHORTS_IDX.value = SHORTS_IDX.value + 1;
}

const shortsScrollRun = (e)=>{
	shortScroll.value = e.target.scrollTop;
	SHORTS_IDX.value = Math.floor(shortScroll.value / shortItemHeight.value);
}

const shuffle =  (array) =>{
	array.sort(() => Math.random() - 0.5);
}



const getShortList = async ()=>{

	console.log('!@!@! getShortList');

	let {data} = await axios.get('https://mediaplus.co.kr/openApi/v1/content',{
		params:{
			type:'vod',
			pageNo:1,
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

			v.created_at = $util.dateFormat2(v.created_at);
			v.view_cnt = $util.numberToKorean(v.view_cnt);
			SHORTS.value.push(v);
		}

		shortsInitLoad.value = true;


	}
}


const setShortsList = ()=>{


	if(route.params.shortsVideoId){

		for (let i = 0; SHORTS.value.length > i; i++) {
			let v = SHORTS.value[i];
			if (route.params.shortsVideoId != v.video_id) {
				ShortsList.value.push(v);
			}
		}

		shuffle(ShortsList.value);

		let find = SHORTS.value.find(v=>v.video_id == route.params.shortsVideoId);
		ShortsList.value.unshift(find);

	}else{
		for (let i = 0; SHORTS.value.length > i; i++) {
			let v = SHORTS.value[i];
			ShortsList.value.push(v);
		}
	}

	setShortItemHeight();

}


const chageShortsVideo = (video_id)=>{
	try{
		_.debounce(()=>{
			router.replace('/shorts/'+video_id);
		},1000)()
	}catch (e) {

	}

}

watch(()=>SHORTS_IDX.value , (to , from)=>{
	setShortItemHeight();
	if(to != from) {
		try {
			chageShortsVideo(ShortsList.value[to].video_id);
		}catch (e) {

		}
	}
})

/*watch(()=>route.params , (to,from)=>{
	console.log(to,from)
})*/

onMounted(async ()=>{
	if(ShortsList.value.length==0) {
		await getShortList();

		setShortsList();
		startFlag.value = true;

	}

	document.getElementById("shortsBody").focus()
})
onUnmounted(()=>{
	//ShortsList.value = [];

});

</script>
