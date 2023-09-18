<template>

	<div class="h-screen  w-screen relative"  :style="{maxHeight:`${windowSize.height - 0}px`}"   v-if="video">
		<div class=" w-full h-full  overflow-hidden  " v-if="video" >

			<div class="bg-gra-v w-full h-full absolute z-[98] " @click="playStart" v-if="!shortScrollStart"></div>
			<Transition name="fade">
				<div class="bg-gra-v w-full  h-full absolute z-[99] text-white " :style="{'background':`url(${video.thumb_url}) center / contain no-repeat`,'backgroundColor':'#000'}"  v-show="shortScrollStart">
					<!--								<UiPlayerShortsThumbHlsjs class="h-full"  ref="uiPlayerShortsThumbHlsjs" :playUrl="video.hls_play_url" :id="video.video_id"   v-if="SHORTS_IDX == idx || SHORTS_IDX == (idx+1) || SHORTS_IDX == (idx-1)"/>-->
				</div>
			</Transition>

			<div class=" absolute bottom-0  z-[999999] flex text-white p-3 mb-2">
				<div>

					<div class="p-3  text-sm">
						{{$util.titleMake(video.title)}}
					</div>
					<div class="flex items-center ">
						<div class="pr-3 pl-2 w-18 ">

							<UAvatar :src="video.channel_profile_image_url" v-if="video.channel_profile_image_url" size="sm" :alt="video.channel_name" class="profileThumb" />
							<UAvatar src="/image/non-profile.png" v-else  :alt="video.channel_name" class="profileThumb object-contain" size="sm"/>

						</div>
						<div>
							<div>{{ video.channel_name }}</div>

						</div>
					</div>
				</div>
			</div>
			<div class="fixed right-[15px] min-[720px]:right-[20px] bottom-[25px] min-[980px]:hidden  z-[999999]" v-if="SHORTS_IDX == idx" >
				<UiShortsBtns :video="video" :isMobile="true"/>
			</div>

		</div>
	</div>

</template>

<script setup>
import ua from "ua-parser-js";
import axios from "axios";

const props = defineProps({
	video: {
		type: Object,
		required: true
	},
	active: {
		type: Boolean,
		default: false
	},
	aspectRatio: {
		type: String,
		default: null
	},
	shortItemHeight: {
		type: Number,
		default: 0
	},
	shortItemWidth: {
		type: Number,
		default: 0
	},
	SHORTS_IDX: {
		type: Number,
		default: 0
	},
	idx: {
		type: Number,
		default: 0
	}
});
const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const windowSize = useWindowSize();
const shortScrollStart = useState('shortScrollStart');
const UUID = useUuid();
const {$util} = useNuxtApp();
const isMuted = useState('isMuted');
const isIOS = useState('isIOS');
const isPlay = useState('isPlay');

const uiPlayerShortsThumbHlsjs = ref(null);

const toggleMuted = ()=>{
	if(isMuted.value) {
		window.miniPlayer.mute();
	}
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

const setIosPlayer = () =>{

}
const playStart = ()=>{
	console.log('playStart')
	if(isPlay.value) {
		if(isMuted.value) {
			window.miniPlayer.mute();
		}else {
			window.miniPlayer.pause();
		}
	}else{
		window.miniPlayer.play();
	}
}


onMounted(()=>{

	let parser = ua(window.navigator.userAgent);

	if(parser.os.name == 'iOS'){
		isIOS.value = true;
	}

	if(!props.video) return false;

	if(props.active) {
		vodViewCountUpdate(props.video);
	}

})


</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
	opacity: 0;
}

.bg-gra-v{
	background: rgb(0,0,0);
	background: linear-gradient(180deg, rgba(0,0,0,0.3435968137254902) 0%, rgba(0,0,0,0) 7%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.24555759803921573) 89%, rgba(0,0,0,0.5424763655462185) 100%);
	height:calc(100% - 3px) !important;
}

</style>
