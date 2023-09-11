<template>
	<div id="vpePlayer" class="embedFullBodyTs"></div>
</template>

<script setup>
import lscache from "lscache";

definePageMeta({
	layout:'dark'
});

const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const route = useRoute();
const router = useRouter();

const videoId = ref(route.params.videoId);
const VIDEO = useState('VIDEO',()=>null);
const ERROR = useState('ERROR',()=>null);
const playUrl = useState('playUrl',()=>null);


const vpeSetup = ()=>{

	let options = {
		playlist:[
			{
				"file": playUrl.value,
				"poster": VIDEO.value.thumb_url,
				"description": {
					"title": VIDEO.value.title,
					"created_at": VIDEO.value.created_at,
					"profile_name": VIDEO.value.channel_name,
					"profile_image": VIDEO.value.channel_profile_image_url,
				}

			}
		],
		autostart:route.query.autoplay ? true : false,
		muted:route.query.muted ? true : false,
		keyboardShortcut:true,
		controls:route.query.hidecontrol ? false : true,
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
		repeat:route.query.loop ? true : false,
		lowLatencyMode:true,
		descriptionNotVisible:route.query.hidecontrol ? true : false,

		override:{

			nextSource(){

				if(VIDEO.value.next_video_id) {
					if(watchMode.value) {
						router.replace(`/embed/${VIDEO.value.next_video_id}`);
					}else{

					}
				}
			},
			prevSource(){
				if(VIDEO.value.prev_video_id) {
					if(watchMode.value) {
						router.replace(`/embed/${VIDEO.value.prev_video_id}`);
					}
				}
			},
			error(err){
				ERROR.value = err;
			}
		},
		icon:{

			bigPlay:"/svg/material/play_arrow_white_24dp.svg",
			play:"/svg/material/play_arrow_white_24dp.svg",
			pause:"/svg/material/pause_black_24dp.svg",
			prev:"/svg/material/skip_previous_white_24dp.svg",
			next:"/svg/material/skip_next_white_24dp.svg",
			replay:"/svg/material/replay_white_24dp.svg",
			subtitle:"/svg/material/subtitles_white_24dp.svg",
			subtitleOff:"/svg/material/subtitles_off_white_24dp.svg",
			fullscreen:"/svg/material/fullscreen_white_24dp.svg",
			fullscreenExit:"/svg/material/fullscreen_exit_white_24dp.svg",
			volumeFull:"/svg/material/volume_up_white_24dp.svg",
			volumeMute:"/svg/material/volume_off_white_24dp.svg",
			volumeMid:"/svg/material/volume_down_white_24dp.svg",
			pip:"/svg/material/picture_in_picture_alt_white_24dp.svg",
			setting:"/svg/material/settings_white_24dp.svg",

		}
	};

	if(VIDEO.value.open_datetime && VIDEO.value.visible == 'N'){
		options.setStartTime = VIDEO.value.open_datetime  !='Invalid Date' ? VIDEO.value.open_datetime : null;
	}


	ERROR.value = null;
	window.player = new ncplayer('vpePlayer',options);
	window.player.on('ready',()=>{
		if(route.query.start){
			window.player.currentTime(route.query.start);
		}
	})


}

const getVideoInfo = async ()=>{
	let data = await $fetch(`https://mediaplus.co.kr/openApi/v1/content/${videoId.value}`, {
		headers:{
			'Authorization':mpKey
		}
	});

	if(data){
		if(data.code==200){
			VIDEO.value = data.result;
			playUrl.value = route.query.lowquality ? VIDEO.value.quality_hls[0].url : VIDEO.value.hls_play_url;
		}
	}
}


const { data, pending, error, refresh } = await useAsyncData('video', ()=>{
		getVideoInfo();
	}, {
		watch: [videoId]
	}
)

watch(()=>VIDEO.value, (to)=>{
	if(to){
		vpeSetup();
	}
})

onMounted(()=>{
	document.body.classList.add('bg-black');
})
</script>

<style>
	.embedFullBodyTs .ncp_player_root{
		width:100vw !important;
		height:100vh !important;
	}

</style>
