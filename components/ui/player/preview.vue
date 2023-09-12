<template>
	<video id="video" playsinline autoplay muted ></video>
</template>

<script setup>
import Hls from 'hls.js';
import _ from 'lodash';

const props = defineProps({
	v: {
		type: Object,
		required: true
	}
})

const emit = defineEmits(['mouseOverInEndActive']);


const unmounted = ()=>{
	try{
		hls.destroy();
	}catch (e) {

	}
	let video = document.getElementById('video');
	try {
		video.pause();
		video.src = "";
		video.load();
	}catch (e) {

	}
}

const mounted = _.debounce(()=>{
	let video = document.getElementById('video');
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
			emit('mouseOverInEndActive');
		});
	} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = props.v.quality_hls[0].url;
		video.addEventListener('canplay',function() {
			video.play();
			emit('mouseOverInEndActive');
		});
	}
},200);

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
