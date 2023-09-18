<template>

	<div v-if="!loading">
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

		<div class="fixed top-[50px] right-0 z-[99999] p-4 hidden md:inline " v-if="SHORTS_IDX>0">
			<button class="rounded-[100px] w-[60px] h-[60px] dark:bg-neutral-700 dark:hover:bg-neutral-600 bg-gray-200 hover:bg-gray-300 flex items-center justify-center"  type="button" @click="shortsPrev">
				<i class="ph ph-arrow-up text-xl"></i>
			</button>
		</div>

		<div class="fixed bottom-0 right-0 p-4 z-[99999] hidden md:inline">
			<button class="rounded-[100px] w-[60px] h-[60px] dark:bg-neutral-700 dark:hover:bg-neutral-600 bg-gray-200 hover:bg-gray-300 flex items-center justify-center"  type="button" @click="shortsNext">
				<i class="ph ph-arrow-down text-xl"></i>
			</button>
		</div>


		<div class="relative h-screen  " :style="{height:`${isMobile ? windowSize.height : windowSize.height - 54}px`}"  @mousewheel="mousewheelRun" @keydown="keydownRun">

			<div class="absolute  top-0 left-0 z-[3] w-full h-full ">
				<div class="h-full w-full max-h-[100vh] md:max-h-[calc(100vh_-_52px)] overflow-hidden  "  id="shortsBody" tabindex="0">
					<Swiper
						direction="vertical"
						effect="slide"
						:loop="false"

						@slideChange="slideChage"
						@slideChangeTransitionStart="slideChangeTransitionStart"
						@slideChangeTransitionEnd="slideChangeTransitionEnd"

						:mousewheel="{
							forceToAxis: true,
							  sensitivity: 1,
							  releaseOnEdges: true,
						}"
						:keyboard="true"
						ref="shortsSwiper"
						:height="isMobile ? windowSize.height : windowSize.height - 90"


					>

						<SwiperSlide v-for="(s , i) in ShortsList" class="shortItemWarps " :id="`shortItem_${i}`"    :key="i">
							<UiBodyShortsPc  :video="s" class="snap-always snap-start shortItems" :active="activeTmp && SHORTS_IDX == i " :SHORTS_IDX="SHORTS_IDX" :idx="i" />
						</SwiperSlide>

						<UiSwiperControls ref="uiSwiperControls"/>
					</Swiper>

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
import ua from "ua-parser-js";

const {$util} = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const windowSize = useWindowSize();
const loading = useLoading();
const UUID = useUuid();
const colorMode = useColorMode();
const SHORTS = useShorts()
const SHORTS_VIDEO = useShortVideo();
const SHORTS_IDX = useShortIdx();
const ShortsList = useShortsList();
const shortsInitLoad = useShortsInitLoad();
const shortMode = useShortMode();
const isMobile = useIsMobile();
const ShortPlayList = useShortPlayList();
const IDX = ref(0);


const route = useRoute();
const router = useRouter();

const shortScroll = ref(0);

const shortScrollStart = useState('shortScrollStart',()=>true);

const shortItemHeight = useState('shortItemHeight',()=>0);
const shortItemWidth = useState('shortItemWidth',()=>0);


const isMuted = useState('isMuted');
const startFlag = useStartFlag();
const activeTmp = useActiveTmp();

const isPlay = useState('isPlay');

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
	uiSwiperControls.value.prevSlide();
}

const shortsNext = ()=>{
	uiSwiperControls.value.nextSlide();
}


//swiper
const uiSwiperControls = ref(null);
const chageShortsVideo = (video_id)=>{
	router.replace('/shorts/'+video_id);
}

const slideChage = (e)=>{

	SHORTS_IDX.value = e.activeIndex
	IDX.value = e.activeIndex

	SHORTS_VIDEO.value = ShortsList.value[SHORTS_IDX.value];
	chageShortsVideo(ShortsList.value[SHORTS_IDX.value].video_id);
}

const slideChangeTransitionStart = (e)=>{

	shortScrollStart.value = true;
	activeTmp.value = false;

	isPlay.value = false;
}
const slideChangeTransitionEnd = (e)=>{

	shortScrollStart.value = false;
	activeTmp.value = true;
}

const mousewheelRun = _.debounce((e)=>{
	if(e.deltaY > 0){
		shortsNext();
	}else{
		shortsPrev();
	}
},200);
const keydownRun = _.debounce((e)=>{
	if(e.key == 'ArrowDown'){
		shortsNext();
	}else if(e.key == 'ArrowUp'){
		shortsPrev();
	}else if(e.key == ' '){
		let videos = document.querySelectorAll('video');
		for (let i = 0; i < videos.length; i++) {
			if(isPlay.value){
				videos[i].pause();
			}else{
				videos[i].play();
			}
		}
	}

},200);





let parser = ref(null);

onMounted(async ()=>{
	setShortItemHeight();
	startFlag.value = true;

	parser = ua(window.navigator.userAgent);


	document.getElementById('__nuxt').classList.add('no-pull-mode');
	document.body.classList.add('no-scroll');
	document.getElementsByTagName('html')[0].classList.add('no-scroll');


	setTimeout(()=>{



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

		loading.value = false;

		setTimeout(()=>{
			document.getElementById("shortsBody").focus();
		},300)
	},1000)
})
onUnmounted(()=>{
	ShortsList.value = [];


});

</script>
