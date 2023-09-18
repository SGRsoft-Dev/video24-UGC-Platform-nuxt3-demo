

<template>

	<div class="w-full h-full bg-black  text-white  duration-200" :style="{'background':`url(${props.poster}) center / cover`,'--min-video-width': windowSize.width+'px','--min-video-height': windowSize.height+'px' }" @mouseover="isHover = true" @mouseout="isHover = false">
		<div class="vpeMiniPlayer h-full">
			<div :id="`vpeMiniPlayer`" v-show="uiStart"></div>
		</div>

		<div class="absolute bottom-0 left-0 w-full h-full z-[9999] bg-neutral-900/10 flex justify-center items-center " v-if="uiStart && isInitPlay" @click="playStart" v-show="!isPlay">
			<button class="rounded-[100px] w-[60px] h-[60px]  flex items-center justify-center bg-neutral-900/20"  >
				<i class="ph-fill ph-play  text-3xl text-white" ></i>
			</button>
		</div>

		<div class="absolute bottom-0 left-0 w-full z-[9999] bg-neutral-400/30  duration-200  ">
			<div class="bg-neutral-700/50 w-full">
				<div class="bg-red-600 h-[3px] md:h-[3px]" :style="{width:`${isPercent}%`}"></div>
			</div>
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
		min-height:var(--min-video-height);
	}

	.vpeMiniPlayer video{
		position: absolute !important;
		top: 0;
		left: 0;
		width: var(--min-video-width) !important;

		object-fit: contain !important;
		z-index:1;
		max-height:100vh;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0;
	}
</style>

<script setup>



const props = defineProps({
	playlist: {
		type: Array,
		default: []
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


const isMuted = useState('isMuted',()=>false);
const windowSize = useWindowSize();
const shortScrollStart = useState('shortScrollStart');
const ShortsList = useShortsList();
const isPercent = ref(0);
const isPlay = useState('isPlay',()=>false);
const isInitPlay = ref(false);
const uiStart = ref(false);
const isHover = ref(false);
const isIos = useOsIOS();
const isMobile = useIsMobile();

if(props.muted){
	isMuted.value = true;
}

watch(()=>shortScrollStart.value , (to)=>{
	isPercent.value = 0;
	if(to){
		window.miniPlayer.pause()
	}else{
		window.miniPlayer.play()
	}
})

const setupVPE = ()=>{

	if(window.miniPlayer) {
		window.miniPlayer.destroy();
	}
	try{
		document.getElementsByTagName('video')[0].remove();
	}catch (e) {

	}

	let options = {
		playlist:props.playlist,
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

	window.miniPlayer= new ncplayer(`vpeMiniPlayer`,options);



	window.miniPlayer.on('ready',()=>{
		document.getElementsByTagName('video')[0].style.width = windowSize.value.width+"px";
		document.getElementsByTagName('video')[0].style.height = windowSize.value.height+"px";
		document.getElementsByTagName('video')[0].style.objectFit = 'contain';
		setTimeout(()=>{
			document.getElementsByTagName('video')[0].style.width = windowSize.value.width+"px";
			document.getElementsByTagName('video')[0].style.height = windowSize.value.height+"px";
			document.getElementsByTagName('video')[0].style.objectFit = 'contain';
			uiStart.value = true;
		},800);
		setTimeout(()=>{
			document.getElementsByTagName('video')[0].style.width = windowSize.value.width+"px";
			document.getElementsByTagName('video')[0].style.height = windowSize.value.height+"px";
			document.getElementsByTagName('video')[0].style.objectFit = 'contain';
			playStart();
		},700);



	});


	window.miniPlayer.on('play',()=>{
		isPlay.value = true;
		isInitPlay.value = true;

	});
	window.miniPlayer.on('pause',()=>{
		isPlay.value = false;
	});
	window.miniPlayer.on('nextTrack',()=>{
		isPercent.value = 0;
		setTimeout(()=>{
			shortScrollStart.value = false;
			console.log('isNext')
		},200);
	});

	window.miniPlayer.on('timeupdate',(res)=>{
		isPercent.value = res.percent;
		isPlay.value = true;
		if(document.getElementsByTagName('video')[0].muted){
			isMuted.value = true;
		}else{
			isMuted.value = false;
		}
		if (res.percent >= 0.5 && shortScrollStart.value) {
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

	if(!window.miniPlayer) {
		setupVPE();
	}

})


onUnmounted(()=>{
	ShortsList.value = [];


});

</script>
