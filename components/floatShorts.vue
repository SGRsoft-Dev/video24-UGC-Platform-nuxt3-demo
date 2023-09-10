<template>

	<div class="fixed top-0 right-0 z-[99999] debug-info text-white bg-gray-800 p-4 rounded-lg shadow-lg">
	{{IDX}}	/ {{SHORTS_IDX}} / {{ShortsList.length}}
	</div>

	<div class="fixed top-0 left-0 z-[99999] p-3 md:hidden" v-if="isMobile">
		<a href="/">
			<img src="/image/logo_dark.svg" class="h-[24px]" alt="">
		</a>

		<div v-if="isMuted" class="mt-3" @click="toggleMuted">
			<button class="rounded-full  px-3 h-[30px] dark:bg-neutral-800/20 bg-gray-900/20 text-white flex items-center justify-center"  type="button">
				<i class="ph-fill ph-speaker-simple-slash text-xl mr-2"></i>
				<span class="text-[12px] ">터치해서 음소거 해제</span>
			</button>
		</div>

	</div>

	<div class="fixed top-[80px] right-0 z-[99999] p-4 hidden md:inline " v-if="shortScroll > 0">
		<button class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-800 bg-gray-200 flex items-center justify-center"  type="button" @click="shortsPrev">
			<i class="ph ph-arrow-up"></i>
		</button>
	</div>

	<div class="fixed bottom-0 right-0 p-4 z-[99999] hidden md:inline">
		<button class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-800 bg-gray-200 flex items-center justify-center"  type="button" @click="shortsNext">
			<i class="ph ph-arrow-down"></i>
		</button>
	</div>


	<div class="relative h-screen  " :style="{height:`${windowSize.height - 0}px`}"  >

		<div class="absolute top-0 left-0 z-[3] w-full h-full">
			<div class="h-full max-h-[100vh] md:max-h-[calc(100vh_-_75px)] snap-y snap-mandatory overflow-y-auto shortsBody " id="shortsBody" tabindex="0"   @scroll="shortsScrollRun">
				<div v-for="(s , i) in ShortsList" class="shortItemWarps " :id="`shortItem_${i}`" >
					<UiMobileShortsPlayer v-if="isMobile" :video="s" class="snap-always snap-start shortItems" :active="activeTmp && SHORTS_IDX == i && IDX==i" />
					<UiShortsPlayer v-else :video="s" class="snap-always snap-start shortItems" :active="activeTmp && SHORTS_IDX == i " />
				</div>
			</div>
		</div>

		<div v-if="route.params.shortsVideoId && route.path.split('/')[1] == 'shorts' &&  ShortPlayList.length > 0 && isMobile" class="absolute top-0 left-0 z-[2]">

			<UiMobileMiniPlayer
				:playlist="ShortPlayList"
				aspectRatio="9/20"
				objectFit="cover"
			/>
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
import ua from "ua-parser-js";

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
const ShortsList = useState('ShortsList');
const shortsInitLoad = useState('shortsInitLoad');
const shortMode = useState('shortMode');
const isMobile = useState('isMobile');
const ShortPlayList = useState('ShortPlayList');
const IDX = ref(0);

const route = useRoute();
const router = useRouter();

const shortScroll = ref(0);
const shortScrollStart = useState('shortScrollStart',()=>true);

const shortItemHeight = ref(0);
const shortItemWidth = ref(0);

const isMuted = useState('isMuted');
const startFlag = useState('startFlag');

const activeTmp = useState('activeTmp',()=>true);
const toggleMuted = ()=>{
	let videos = document.querySelectorAll('video');
	for (let i = 0; i < videos.length; i++) {
		videos[i].muted = isMuted.value ? false : true;
	}

}

//쇼츠 높이 구하기
let setShortItemHeightTimer = null;
const setShortItemHeight = ()=>{
	clearTimeout(setShortItemHeightTimer);
	setShortItemHeightTimer = setInterval(()=>{
		let shortItems = document.getElementsByClassName('shortItems');
		if(shortItems.length > 0){
			shortItemHeight.value = shortItems[0].clientHeight - 30;
			shortItemWidth.value = shortItems[0].clientWidth;

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
	IDX.value = getCurrentVisibleElementIndex()
}

const shortsNext = ()=>{
	document.getElementById('shortsBody').scrollTo({
		top:shortScroll.value + shortItemHeight.value,
		behavior:'smooth'
	});
	SHORTS_IDX.value = SHORTS_IDX.value + 1;
	IDX.value = getCurrentVisibleElementIndex()
}

const shortsScrollRun = (e)=>{
	window.miniPlayer.pause();
	shortScrollStart.value = true;
	activeTmp.value = false;
	shortScroll.value = e.target.scrollTop;
	shortsScrollEnd();

}
const shortsScrollEnd = _.debounce((e)=>{
	setIdx();
},isMobile.value ? 200 : 600);

const setIdx = ()=>{

	SHORTS_IDX.value = Math.floor(shortScroll.value / shortItemHeight.value);
	IDX.value = getCurrentVisibleElementIndex();


	chageShortsVideo(ShortsList.value[SHORTS_IDX.value].video_id);

	SHORTS_VIDEO.value = ShortsList.value[SHORTS_IDX.value];
	if(isMobile.value) {
		window.miniPlayer.seekSource(SHORTS_IDX.value);
	}
	activeTmp.value = true;
}

const chageShortsVideo = (video_id)=>{
	router.replace('/shorts/'+video_id);

}



const getCurrentVisibleElementIndex = () => {
	const elements = document.querySelectorAll('.shortsBody .shortItems'); // 스크롤 가능한 컨테이너와 그 안에 있는 요소들을 선택해야 합니다.

	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		const rect = element.getBoundingClientRect();

		// 요소가 현재 화면에 보이는지 확인
		if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
			return i; // 현재 화면에 보이면 해당 요소의 인덱스를 반환
		}
	}

	return -1; // 현재 화면에 보이는 요소가 없을 경우 -1 반환
}



/*watch(()=>route.params , (to,from)=>{
	console.log(to,from)
})*/


const getShortList = async ()=>{

	SHORTS.value = [];
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


const shuffle =  (array) =>{
	array.sort(() => Math.random() - 0.5);
}


const setShortsList = (fix)=>{

	if(route.params.shortsVideoId) {

		if(fix) {
			let find = SHORTS.value.find(v => v.video_id == route.params.shortsVideoId);
			ShortsList.value.unshift(find);

			SHORTS_VIDEO.value = find;
		}else{
			for (let i = 0; SHORTS.value.length > i; i++) {
				let v = SHORTS.value[i];
				if (route.params.shortsVideoId != v.video_id) {
					ShortsList.value.push(v);
				}
			}
			//shuffle(ShortsList.value);
		}

	}else{
		for (let i = 0; SHORTS.value.length > i; i++) {
			let v = SHORTS.value[i];
			ShortsList.value.push(v);
		}
	}

}

const startOv = ()=>{
	const elements = document.querySelectorAll('.shortItemWarps'); // 스크롤 가능한 컨테이너 내의 요소 선택

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio >= 0.9) {
				// 요소가 화면에 80% 이상 보이는 경우
				const visibleElementIndex = Array.from(elements).indexOf(entry.target);
				//console.log(`현재 보이는 요소의 인덱스: ${visibleElementIndex}`);
				IDX.value = visibleElementIndex;
			}
		});
	}, { threshold: 0.9 }); // threshold를 0.8로 설정


	// 모든 요소를 감시
	elements.forEach((element) => {
		observer.observe(element);
	});
}


useAsyncData(async ()=>{
	SHORTS_IDX.value = 0;
	await getShortList();
	setShortsList(true);
});


onMounted(async ()=>{
	setShortItemHeight();
	startFlag.value = true;

	document.getElementById('__nuxt').classList.add('no-pull-mode');
	document.body.classList.add('no-scroll');
	document.getElementsByTagName('html')[0].classList.add('no-scroll');

	if(isMobile.value){
		document.body.classList.add('bg-neutral-900')
	}else{
		document.body.classList.remove('bg-neutral-900')
	}

	document.getElementById("shortsBody").focus()

	setTimeout(()=>{
		setShortsList();

		if(isMobile.value) {
			ShortPlayList.value = [];
			try {
				if (ShortsList.value.length > 0) {
					for (let i = 0; i < ShortsList.value.length; i++) {
						ShortPlayList.value.push({
							"file": ShortsList.value[i].hls_play_url,
						})
					}
				}


			} catch (e) {

			}
		}
		setTimeout(()=>{
			startOv();
		},300)
	},1000)
})
onUnmounted(()=>{
	ShortsList.value = [];


});

</script>
