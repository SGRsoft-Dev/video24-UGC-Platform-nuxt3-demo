

<template>

	<div class="w-full h-full bg-black  text-white  duration-200"   @mouseover="isHover = true" @mouseout="isHover = false">
		<div class="vpeMiniPlayer">
			<video :id="`vpeMiniPlayer`" v-show="uiStart" playsinline class="w-full  bg-black" :loop="loop ? true : false"></video>
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
		object-fit:contain !important;
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

})

window.miniPlayer = null;
const isMuted = useState('isMuted',()=>false);
const windowSize = useWindowSize();
const shortScrollStart = useState('shortScrollStart');
const shortItemHeight = useState('shortItemHeight');
const isPercent = ref(0);
const isPlay = ref(false);
const isInitPlay = ref(false);
const uiStart = ref(false);
const isHover = ref(false);

if(props.muted){
	isMuted.value = true;
}


const playStart = ()=>{
	try {
		window.miniPlayer.play();
	}catch (e) {
		window.miniPlayer.muted = true;
		window.miniPlayer.play();
	}
}

const togglePlay = ()=>{
	if(isPlay.value){
		window.miniPlayer.pause();
	}else{
		window.miniPlayer.play();
	}
}

const toggleMuted = ()=>{

	if(window.miniPlayer.muted){
		window.miniPlayer.muted = false;
	}else{
		window.miniPlayer.muted = true;
	}

}

const playStartEmit = _.debounce(()=>{
	//
},200);

const mounted = ()=>{
	window.miniPlayer = document.getElementById('vpeMiniPlayer');
	try{
		hls.destroy();
	}catch (e) {

	}

	let hls = new Hls();
	window.miniPlayer.destroy = ()=>{
		try{
			hls.destroy();
		}catch (e) {

		}
	}
	if(Hls.isSupported()) {

		hls.loadSource(props.playUrl);
		hls.attachMedia(window.miniPlayer);
		hls.on(Hls.Events.MANIFEST_PARSED,function() {
			playStart();
			playStartEmit();
		});
	} else if (window.miniPlayer.canPlayType('application/vnd.apple.mpegurl')) {
		window.miniPlayer.src = props.playUrl;
		window.miniPlayer.addEventListener('canplay',function() {
			playStart();
			playStartEmit();
		});
	}

	uiStart.value = true;

	window.miniPlayer.removeEventListener('play',()=>{});
	window.miniPlayer.addEventListener('play' , ()=>{
		isPlay.value = true;
		isInitPlay.value = true;

	});

	window.miniPlayer.removeEventListener('pause',()=>{});
	window.miniPlayer.addEventListener('pause',()=>{
		isPlay.value = false;
	});

	window.miniPlayer.removeEventListener('timeupdate',()=>{});
	window.miniPlayer.addEventListener('timeupdate',(res)=>{
		try {
			isPercent.value = (window.miniPlayer.currentTime / window.miniPlayer.duration) * 100;

			isPlay.value = true;

			if (window.miniPlayer.muted) {
				isMuted.value = true;
			} else {
				isMuted.value = false;
			}

		}catch (e) {

		}
		if (isPercent.value >= 0.05) {
			shortScrollStart.value = false;
		}

	})

	window.miniPlayer.removeEventListener('volumechange',()=>{});
	window.miniPlayer.addEventListener('volumechange',()=>{

		if(window.miniPlayer.muted){
			isMuted.value = true;
		}else{
			isMuted.value = false;
		}
	});





}


onMounted(()=>{
	mounted();
})

onUnmounted(()=>{

	try{
		window.miniPlayer.destroy();
	}catch (e) {
	}


})
</script>
