<template>
	<div :style="{height:(contentHeight / 2.5)+'px'}" class="tra200"></div>
	<div v-if="loading" >
		<SkeletonPlayer/>
	</div>

	<div :class="{'fullMode ' : fullMode && watchMode , 'basicMode ' : !fullMode && watchMode }">
		<div class="leftWrap" >
			<div class="playerWrap relative " @touchstart="startResize" @touchmove="resize" @touchend="stopResize">
				<div class="playerBody mobileSeekBarFix"   v-show="!loading">

						<div id="vpePlayer"></div>

				</div>
				<div v-if="ERROR" class="absolute top-0 left-0 z-[9999] w-full h-full flex justify-center items-center backdrop-blur">
					<div class="bg-black text-center p-4 rounded">
						<div>
							<i class="ph-fill text-3xl ph-warning"></i>
						</div>
						<div class="text-[12px] mt-2">
							동영상 재생중 에러가 발생하였습니다.
						</div>
					</div>
				</div>
			</div>

			<div v-if="watchMode && !floatPlayer" class="flex mt-3 UiVideoMeta" :class="{'md:container md:mx-auto' : fullMode   }">
				<UiVideoMeta class="flex3"/>
				<UiPlaylist v-if="fullMode" class="flex1 pt-3 pl-5" style="max-width:420px"/>
			</div>
		</div>
		<div class="rightWrap  UiPlaylist" v-if="!fullMode && watchMode && !floatPlayer">
			<UiPlaylist class="ml-4"/>
		</div>
	</div>
</template>

<script setup>
import axios from "axios";
import lscache from "lscache";
import _ from "lodash";
lscache.setExpiryMilliseconds(1000);

const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const VIDEO = useState('VIDEO');
const router = useRouter();
const watchMode = useState('watchMode');
const fullMode = useState('fullMode');
const autoPlayMode = useState('autoPlayMode');
const floatPlayer = useState('floatPlayer');
const windowSize = useState('windowSize');
const loading = ref(true);
const VOD = useState('PLAYLIST_LIST',()=>[]);
const ERROR = useState('ERROR',()=>null);
const lastRouterPath = useState('lastRouterPath');
const route = useRoute();
const UUID = useState('UUID');


if(lscache.get('autoPlayMode')){
	autoPlayMode.value = lscache.get('autoPlayMode') == 'Y' ? true : false;
}else{
	autoPlayMode.value = true;
}


let options = {
	playlist:[
		{
			"file": VIDEO.value.hls_play_url,
			"poster": VIDEO.value.thumb_url,
			"description": {
				"title": VIDEO.value.title,

			}
		}
	],
	autostart:true,
	muted:false,
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
	customBtns:[
		{
			ui:'pc',
			position:'right-bottom',
			icon:'/image/autoplay-off.svg',
			activeIcon:'/image/autoplay-on.svg',
			tooltip: '자동 재생 사용 설정',
			activeTooltip: '자동 재생 사용 중지',
			flow:'left',
			default:autoPlayMode.value ? true : false,
			callback(res){
				if(res){
					window.player.nextSourceRunOn();
					lscache.set('autoPlayMode','Y');
				}else{
					window.player.nextSourceRunOff();
					lscache.set('autoPlayMode','N');
				}
			}
		},

		{
			ui:'pc',
			position:'right-bottom',
			icon:'/image/frame-corners-off.svg',
			activeIcon:'/image/frame-corners-on.svg',
			tooltip:'몰입 모드',
			activeTooltip:'기본 모드',
			flow:'left',
			default:fullMode.value ? true : false,
			callback(){
				fullMode.value = fullMode.value ? false : true;
			}
		},


		{
			ui:'mobile',
			position:'left-top',
			icon:'/image/caret-left.svg',
			flow:'left',
			callback(){
				if(lastRouterPath.value && lastRouterPath.value.indexOf('/watch') < 1){
					router.go(-1);
				}else {
					router.push('/?floatPlayer=true')
				}
			}
		},
	],
	override:{
		pip:{
			on(){
				pipStart();


			},
			off(){
				pipStart();
			}
		},
		nextSource(){

			if(VIDEO.value.next_video_id) {
				if(watchMode.value) {
					router.replace(`/watch?v=${VIDEO.value.next_video_id}`);
				}else{

				}
			}
		},
		prevSource(){
			if(VIDEO.value.prev_video_id) {
				if(watchMode.value) {
					router.replace(`/watch?v=${VIDEO.value.prev_video_id}`);
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



/**
 * VOD 조회수 업데이트
 * @returns {Promise<void>}
 */
const vodViewCountUpdate = async (vod)=>{

	if(!vod) return false;

	let {data} = await axios.post(`https://mediaplus.co.kr/openApi/v1/analytics`,{
		uid:UUID.value,
		oid:vod.oid,
		ovp_channel_id:vod.channel_id,
		video_id:vod.video_id,
		type:'vod',
		currentTime:0,
		duration:vod.duration,
		viewingTime:0,
		percent:0,


	},{
		headers:{
			'Authorization':mpKey
		}
	});
}



const playerAddNextSource = (data)=>{
	try {
		let source = {
			file: data.file,
			poster: data.poster,
			description: {
				"title": data.title,
			},
			video_id: data.video_id,
		}
		VIDEO.value.next_video_id = data.video_id;
		window.player.addNextSource(source);
	} catch (e) {
		console.log(e);
	}
}


const setupVPE = ()=>{
	ERROR.value = null;
	window.player = new ncplayer('vpePlayer',options);
	window.player.on('ready',()=>{
		loading.value = false;

		setTimeout(()=>{
			playerAddNextSource({
				file: VOD.value[0].hls_play_url,
				poster: VOD.value[0].thumb_url,
				title: VOD.value[0].title,
				video_id: VOD.value[0].video_id,
			});
		},500);

		if(autoPlayMode.value){
			window.player.nextSourceRunOn();
		}else{
			window.player.nextSourceRunOff();
		}

		vodViewCountUpdate(VIDEO.value);



	});


	window.player.on('error',(e)=>{

		if(e.code){
			loading.value = false;
		}
	});




}


const pipStart = ()=>{
	if(watchMode.value){
		floatPlayer.value = true;
		window.player.uiHidden();
		if(lastRouterPath.value && lastRouterPath.value.indexOf('/watch') < 1){
			router.go(-1);
		}else {
			router.push('/?floatPlayer=true')
		}
	}

};

const resizing = ref(false);
const startY = ref(0);
const contentHeight = ref(0);

const startResize = (e)=> {
	if (e.touches.length === 1) {
		resizing.value = true;
		startY.value = e.touches[0].clientY;
	}
}
const resize = (e)=> {
	if (resizing.value && e.touches.length === 1) {
		const deltaY = e.touches[0].clientY - startY.value;
		contentHeight.value += deltaY;
		startY.value = e.touches[0].clientY;



	}
}
const stopResize = ()=> {

	if(contentHeight.value > 150){
		if(!floatPlayer.value){
			pipStart();
		}
	}

	resizing.value = false;
	if(!floatPlayer.value) {
		contentHeight.value = 0;
		setTimeout(() => {
			contentHeight.value = 0;
		}, 300);
	}else{
		contentHeight.value = 0;
	}

}



const nuxtApp = useNuxtApp();

onMounted(()=>{
	setupVPE();
	nuxtApp.$bus.$on('swipe', (direction) => {
		switch (direction) {
			case 'down':
				//pipStart();

				break;
			default:
				break;
		}
	})

});

watch(()=>VIDEO.value,(v)=>{
	if(window.player){
		console.log('change video')
		loading.value = true;
		window.player.on('ready',()=>{});
		window.player.on('error',()=>{});
		window.player.destroy();
		setupVPE();
	}
});

</script>

<style scoped>
.playerWrap{
	width: 100%;
	background-color: #000;
	color:#fff;

}
.playerBody{
	width:100%;
	background-color: #000;
}
#vpePlayer{
	width:100%;
	height:100%;
}
.fullMode{
	display: block;
}
.fullMode .playerBody{
	max-height:80vh;
	aspect-ratio: 16/9;
}
.basicMode{
	display:flex
}
.basicMode .rightWrap{
	width:380px;

}
.basicMode .leftWrap{

	width:calc(100% - 320px);
}
.basicMode .playerWrap{
	aspect-ratio: 16/9;
}

@media (max-width: 640px) {
	.fullMode  , .basicMode{
		display:inline;
	}

	.fullMode .leftWrap , .basicMode .leftWrap{
		width:100%;
	}

	.mobileModeWarp{
		overflow-y: auto;
		width:100vw;
		height:100vh;

	}

}

</style>
