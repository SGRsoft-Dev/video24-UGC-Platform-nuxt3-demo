<template>

	<div :class="{'fullMode' : fullMode && watchMode , 'basicMode' : !fullMode && watchMode}">
		<div class="leftWrap" >
			<div class="playerWrap">
				<div class="playerBody"  v-show="!loading">
					<div id="vpePlayer" ></div>
				</div>
			</div>

			<div v-if="watchMode" class="flex mt-3" :class="{'md:container md:mx-auto' : fullMode   }">
				<UiVideoMeta class="flex3"/>
				<UiPlaylist v-if="fullMode" class="flex1 pt-3 pl-5" style="max-width:420px"/>
			</div>
		</div>
		<div class="rightWrap  " v-if="!fullMode && watchMode">
			<UiPlaylist class="ml-4"/>
		</div>
	</div>
</template>

<script setup>
const VIDEO = useState('VIDEO');
const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const router = useRouter();

const watchMode = useState('watchMode');
const fullMode = useState('fullMode');
const floatPlayer = useState('floatPlayer');
const route = useRoute();
const loading = ref(true);

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
				icon:'/image/frame-corners-off.svg',
				activeIcon:'/image/frame-corners.svg',
				tooltip:'기본 모드',
				activeTooltip:'몰입 모드',
				flow:'left',
				default:fullMode.value ? true : false,
				callback(){
					fullMode.value = fullMode.value ? false : true;
				}
			},
		],
		override:{
			pip:{
				on(){
					floatPlayer.value = true;
					router.push('/')
				},
				off(){
					floatPlayer.value = false;
				}
			}
		}
	});
	window.player.on('ready',()=>{
		loading.value = false;
	});

	window.player.on('error',(e)=>{

		if(e.code){
			loading.value = false;
		}
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

	background-color: #000;
	color:#fff;

}
.playerBody{
	width:100%;

	background-color: rgba(205, 205, 205, 0.09);

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

}

</style>
