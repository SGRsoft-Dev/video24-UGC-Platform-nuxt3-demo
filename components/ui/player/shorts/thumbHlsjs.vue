

<template>
	<div class="relative w-full h-full bg-black bg-gra-v">
		<video class="w-full h-full object-contain bg-black" preload="none" :id="`thumbHlsJs_${id}`" playsinline muted></video>
	</div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: opacity .2s;
}
.fade-enter, .fade-leave-active {
	opacity: 0;
}

.bg-gra-v{
	background: rgb(0,0,0);
	background: linear-gradient(180deg, rgba(0,0,0,0.3435968137254902) 0%, rgba(0,0,0,0) 9%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.24555759803921573) 69%, rgba(0,0,0,0.5424763655462185) 100%);
}
</style>

<script setup>
import Hls from 'hls.js';

const props = defineProps({
	playUrl: {
		type: String,
		required: true
	},
	id: {
		type: String,
		default: ''
	},
})


const mounted = ()=>{
	let video = document.getElementById(`thumbHlsJs_${props.id}`);
	try{
		hls.destroy();
	}catch (e) {

	}

	let hls = new Hls();
	if(Hls.isSupported()) {

		hls.loadSource(props.playUrl);
		hls.attachMedia(video);

	} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = props.playUrl;
	}
}

onMounted(()=>{
	mounted();
})

onUnmounted(()=>{
	try{
		//hls.destroy();
	}catch (e) {
	}
})
</script>
