

<template>

	<div class="w-full h-full bg-black  text-white  duration-200"   @mouseover="isHover = true" @mouseout="isHover = false">
		<div class="vpeMiniPlayer">
			<video :id="`vpeMiniPlayer_${id}`"  :style="{objectFit: isMobile ? 'contain' : 'cover', }"  playsinline class="w-full h-full  bg-black" object-cover="" :loop="loop ? true : false"></video>
		</div>

		<div class="absolute bottom-0 left-0 w-full h-full z-[9999] bg-neutral-900/10 flex justify-center items-center " v-if="uiStart && isInitPlay" @click="playStart" v-show="!isPlay">
			<button class="rounded-[100px] w-[60px] h-[60px]  flex items-center justify-center bg-neutral-900/20"  >
				<i class="ph-fill ph-play  text-3xl text-white" ></i>
			</button>
		</div>

		<div class="absolute bottom-0 left-0 w-full z-[9999] bg-neutral-400/30  duration-200  ">
			<div class="bg-red-600 h-[2px] md:h-[3px]" :style="{width:`${isPercent}%`}"></div>
		</div>

		<div class="absolute top-0 left-0 w-full z-[9999]   justify-between hidden md:inline-flex" v-show="isHover && isPlay || isMuted">
			<div class="p-4">
				<button type="button" @click="togglePlay"><i class="ph-fill text-2xl " :class="{'ph-pause' : isPlay , 'ph-play' : !isPlay}"></i></button>
			</div>
			<div class="p-4">
				<button type="button" @click="toggleMuted"><i class="ph-fill text-2xl" :class="{'ph-speaker-simple-slash' : isMuted , 'ph-speaker-high' : !isMuted}"></i></button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.vpeMiniPlayer{
		position: absolute;
		width:100%;
		height:100%;
	}

	.vpeMiniPlayer video{
		/*max-height: var(--min-video-height) !important;*/

		max-height:100%;
		width:100%;

	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0;
	}
</style>

<script setup>
import Hls from 'hls.js';
import _ from "lodash";
const props = defineProps({
	playUrl: {
		type: String,
		required: true
	},
	poster: {
		type: String,
		default: ''
	},
	muted: {
		type: Boolean,
		default: false
	},
	aspectRatio: {
		type: String,
		default: '16/9'
	},
	objectFit: {
		type: String,
		default: 'contain'
	},
	width: {
		type: Number,
		default: 0
	},
	height: {
		type: Number,
		default: 0
	},
	loop: {
		type: Boolean,
		default: true
	},
	id: {
		type: String,
		default: ''
	},

})

window.miniPlayer = null;
const isMuted = useState('isMuted',()=>false);
const windowSize = useWindowSize();
const shortScrollStart = useState('shortScrollStart');
const shortItemHeight = useState('shortItemHeight');
const isPercent = ref(0);
const isPlay = useState('isPlay',()=>false);
const isInitPlay = ref(false);
const uiStart = ref(false);
const isHover = ref(false);
const isMobile = useIsMobile();
if(props.muted){
	isMuted.value = true;
}

let video = null
let hls = null

const playStart = (muted)=>{
	try {
		if(muted){
			video.muted = true;
		}
		video.play();
	}catch (e) {
		console.log('!@!@! p1')
		video.muted = true;
		video.play();
	}
}

const togglePlay = ()=>{
	if(isPlay.value){
		video.pause();
	}else{
		video.play();
	}
}

const toggleMuted = ()=>{

	if(video.muted){
		video.muted = false;
	}else{
		video.muted = true;
	}

}

defineExpose({
	togglePlay,
	toggleMuted
})

const playStartEmit = _.debounce(()=>{
	//
},200);

const mounted = ()=>{


	if(Hls.isSupported()) {
		hls.loadSource(props.playUrl);
		hls.attachMedia(video);

		window.addEventListener("unhandledrejection", (event) => {
			playStart(true);
			playStartEmit();
		});


	} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = props.playUrl;

	}

	playStart();



	video.addEventListener('play' , ()=>{
		isPlay.value = true;
		isInitPlay.value = true;

	});


	video.addEventListener('pause',()=>{
		isPlay.value = false;
	});


	video.addEventListener('timeupdate',(res)=>{
		if(!shortScrollStart.value) {
			try {
				isPercent.value = (window.miniPlayer.currentTime / window.miniPlayer.duration) * 100;

				isPlay.value = true;

				if (window.miniPlayer.muted) {
					isMuted.value = true;
				} else {
					isMuted.value = false;
				}

			} catch (e) {


			}
		}




	})


	video.addEventListener('canplay',()=>{
		playStart();
		playStartEmit();

		if (shortScrollStart.value ){
			shortScrollStart.value = false;
			setTimeout(()=>{
				uiStart.value = true;
			},400);

		}
	})
	video.addEventListener('volumechange',()=>{

		if(video.muted){
			isMuted.value = true;
		}else{
			isMuted.value = false;
		}
	});


	window.miniPlayer = video;



}

let options = {
	root: null, // 기본적으로 뷰포트를 root로 사용합니다.
	rootMargin:'0px',
	threshold: 1,
};

const handleIntersection = (entries) =>{
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			video.currentTime = 0;
			playStart();
		} else {
			video.pause();
		}
	});
}

const setObserver = ()=> {
	const observer = new IntersectionObserver(handleIntersection, options);
	observer.observe(video);
}



onMounted(()=>{
	video = document.getElementById(`vpeMiniPlayer_${props.id}`);
	hls = new Hls();
	mounted();


	window.addEventListener("unhandledrejection", (event) => {
		playStart(true);
		playStartEmit();
	});

	//setObserver();



})

onUnmounted(()=>{
	window.removeEventListener("unhandledrejection", (event) => {
		playStart(true);
		playStartEmit();
	});
	try{
		window.miniPlayer.destroy();
	}catch (e) {
	}


})
</script>
