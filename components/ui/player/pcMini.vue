

<template>

	<div class="w-full h-full bg-black  text-white  duration-200" :style="{'background':`url(${props.poster}) center / cover`,'--min-video-width':  windowSize.width < 720 ?  windowSize.width+'px' : '100%'}" @mouseover="isHover = true" @mouseout="isHover = false">
		<div class="vpeMiniPlayer">
			<div :id="`vpeMiniPlayer`" v-show="uiStart"></div>
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
		min-width:var(--min-video-width);
	}

	.vpeMiniPlayer video{
		position: absolute !important;
		top: 0;
		left: 0;
		width: 100% !important;
		height: 100% !important;
		object-fit:contain !important;
		z-index:1;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0;
	}
</style>

<script setup>

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

})

window.miniPlayer = null;
const isMuted = useState('isMuted',()=>false);
const windowSize = useState('windowSize');
const shortScrollStart = useState('shortScrollStart');
const isPercent = ref(0);
const isPlay = ref(false);
const isInitPlay = ref(false);
const uiStart = ref(false);
const isHover = ref(false);

if(props.muted){
	isMuted.value = true;
}

const setupVPE = ()=>{



	let options = {
		playlist:[
			{
				"file":props.playUrl,
				"poster":props.poster,
			}
		],
		autostart:true,
		muted:props.muted ? true : false,
		controls:false,
		progressBarColor:"#ff0000",
		startMutedInfoNotVisible:false,
		aspectRatio:props.aspectRatio,
		objectFit:'contain',
		autoPause:false,
		repeat:true,
		descriptionNotVisible:true
	};

	window.miniPlayer = new ncplayer(`vpeMiniPlayer`,options);


	window.miniPlayer.on('ready',()=>{
		setTimeout(()=>{
			uiStart.value = true;
		},200);
		setTimeout(()=>{
			playStart();
		},300);
	});

	window.miniPlayer.on('play',()=>{
		isPlay.value = true;
		isInitPlay.value = true;

	});
	window.miniPlayer.on('pause',()=>{
		isPlay.value = false;
	});



	window.miniPlayer.on('timeupdate',(res)=>{
		isPercent.value = res.percent;
		isPlay.value = true;
		if(document.getElementsByTagName('video')[0].muted){
			isMuted.value = true;
		}else{
			isMuted.value = false;
		}
		if(res.percent >=0.05){
			shortScrollStart.value = false;
		}
	})
	window.miniPlayer.on('volumechange',()=>{

		if(document.getElementsByTagName('video')[0].muted){
			isMuted.value = true;
		}else{
			isMuted.value = false;
		}
	});

	//document.querySelector('.vpeMiniPlayer').style.display = 'flex';
}

const playStart = ()=>{
	window.miniPlayer.play();
}

const togglePlay = ()=>{
	if(isPlay.value){
		window.miniPlayer.pause();
	}else{
		window.miniPlayer.play();
	}
}

const toggleMuted = ()=>{
	window.miniPlayer.mute();
}

onMounted(()=>{
	setupVPE();
})

onUnmounted(()=>{

	try{
		window.miniPlayer.destroy();
	}catch (e) {
	}


})
</script>
