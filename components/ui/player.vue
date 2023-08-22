<template>
	<div class="playerWrap">

		<div class="playerBody"  v-show="!loading">
			<div id="vpePlayer"></div>
		</div>
	</div>

	<div v-if="watchMode">
		<UiVideoMeta/>
	</div>
</template>

<script setup>
const VIDEO = useState('VIDEO');
const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
window.player = null;
let loading = ref(true);
const watchMode = useState('watchMode');
const route = useRoute();

const setupVPE = ()=>{
	window.player = new ncplayer('vpePlayer',{
		playlist:[
			{
				"file": VIDEO.value.hls_play_url,
				"poster": VIDEO.value.thumb_url,
				"description": {
					"title": VIDEO.value.title,
					"created_at": VIDEO.value.created_at,
					"profile_name": "네이버클라우드",
					"profile_image": "https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png"
				}
			}
		],
		autostart:true,
		keyboardShortcut:true,
		controls:true,

		controlBtn:{
			play:true,
			fullscreen:true,
			volume:true,
			times:true,
			pictureInPicture:true,
			setting:true,
			subtitle:false,
		},
		progressBarColor:"#ff0000",
		controlActiveTime:3000,
		startMutedInfoNotVisible:false,
		aspectRatio:"16/9",
		objectFit:"contain",
		playRateSetting:[0.5,0.75,1,1.5,2],
		autoPause:false,
		repeat:false,
		lowLatencyMode:true,
		descriptionNotVisible:true,
	});
	window.player.on('ready',()=>{
		loading.value = false;
	});
}

onMounted(()=>{
	setupVPE();
});

watch(()=>VIDEO.value,(v)=>{
	if(window.player){
		console.log('change video')
		loading.value = true;
		window.player.destroy();
		setupVPE();
	}
});

</script>

<style scoped>
.playerWrap{
	width: 100%;
	height: 100%;
	background-color: #000;
	color:#fff;

	max-height:80vh;
	display: flex;
	justify-content: center;
	aspect-ratio: 3/1;

}
.playerBody{
	height: 100%;
	background-color: rgba(205, 205, 205, 0.09);
	aspect-ratio: 16/9;
}
</style>
