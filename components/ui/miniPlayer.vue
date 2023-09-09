

<template>

	<div class="w-full h-full bg-black">
		<div id="vpeMiniPlayer"></div>
	</div>
</template>

<style scoped>
	#vpeMiniPlayer{

	}
	#vpeMiniPlayer video {
		width: 100% !important;
		height: 100% !important;
		aspect-ratio: unset !important;
		object-fit: cover !important;
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
})

window.miniPlayer = null;



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
		startMutedInfoNotVisible:true,
		aspectRatio:props.aspectRatio,
		objectFit:props.objectFit,
		autoPause:true,
		repeat:true,
		descriptionNotVisible:true
	};

	window.miniPlayer = new ncplayer('vpeMiniPlayer',options);
}

onMounted(()=>{
	setupVPE();
	console.log('miniPlayer mounted')
})

onUnmounted(()=>{
	console.log('miniPlayer unmounted')
	try{
		window.miniPlayer.destroy();
	}catch (e) {
	}


})
</script>
