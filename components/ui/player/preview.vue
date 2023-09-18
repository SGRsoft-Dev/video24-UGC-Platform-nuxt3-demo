<template>
	<div class="relative w-full h-full">
		<video :id="`video_${v.video_id}`" style="" playsinline autoplay muted :style="{aspectRatio:aspectRatio }" class="w-full h-full" :class="{'object-cover' : objectCover}"></video>
		<div class="absolute bottom-0 left-0 w-full z-[5] bg-white/80  duration-200  ">
			<div class="bg-red-600 h-[3px]" :style="{width:`${isPercent}%`}"></div>
		</div>
	</div>

</template>

<script setup>
import Hls from 'hls.js';
import _ from 'lodash';

const props = defineProps({
	v: {
		type: Object,
		required: true
	},
	aspectRatio: {
		type: String,
		default: '16/9'
	},
	objectCover: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['mouseOverInEndActive']);


const unmounted = ()=>{
	try{
		hls.destroy();
	}catch (e) {

	}
	let video = document.getElementById(`video_${props.v.video_id}`);
	try {
		video.pause();
		video.src = "";
		video.load();
	}catch (e) {

	}
}

const playStartEmit = _.debounce(()=>{
	emit('mouseOverInEndActive');
},200);

const isPercent = ref(0);

const mounted = _.debounce(()=>{
	let video = document.getElementById(`video_${props.v.video_id}`);

	try{
		hls.destroy();
	}catch (e) {

	}

	let hls = new Hls();

	if(Hls.isSupported()) {

		hls.loadSource(props.v.quality_hls[0].url);
		hls.attachMedia(video);
		hls.on(Hls.Events.MANIFEST_PARSED,function() {
			video.play();
			playStartEmit();
		});
	} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = props.v.quality_hls[0].url;
		video.addEventListener('canplay',function() {
			video.play();
			playStartEmit();
		});
	}

	video.addEventListener('timeupdate',(res)=>{
		try {
			isPercent.value = (video.currentTime / video.duration) * 100;
		}catch (e) {

		}


	})
},100);

onMounted(()=>{
	if(!props.v) return;
	mounted();

});
onUnmounted(()=>{
	unmounted();
})
</script>

<style scoped>

</style>
