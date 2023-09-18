<template>

	<div class="h-screen md:pt-5 md:max-h-[90vh] bg-neutral-300/20 dark:bg-neutral-900/10 "  :style="{height:`${windowSize.height - 0}px` , width:`${windowSize.width - 0}px`}"  v-if="video">

		<div class="mx-auto w-full md:w-[40vw]  md:max-w-[520px]  md:max-h-[95vh] h-full pb-safe pt-safe   " >
			<div class="md:flex h-full md:gap-4">

				<div class=" md:rounded-xl overflow-hidden  h-full flex-auto shadow-md relative  " >
					<div class=" w-full h-full md:rounded-xl overflow-hidden  "  v-if="video" >

						<div class="bg-gra-v w-full h-full absolute z-[101] bg-red-900"  @click="togglePlay"  v-if=" !shortScrollStart"></div>
						<Transition name="fade">
							<div class=" w-full  h-full absolute z-[99] bg-black"  :style="{background:`url(${video.thumb_url}) center / contain no-repeat`,backgroundColor:'#000'}" v-show="shortScrollStart">
								<UiPlayerShortsThumbHlsjs  :poster="video.thumb_url" :playUrl="video.hls_play_url" :id="video.video_id" v-if="!isIOS && ( SHORTS_IDX == idx || SHORTS_IDX == (idx+1) || SHORTS_IDX == (idx-1))"/>
							</div>
						</Transition>

						<UiPlayerShortsHlsjs
							:playUrl="video.hls_play_url"
							:poster="video.thumb_url"

							v-if="active && activeTmp"
							class="w-full h-full absolute z-[100]  "

							v-show="!shortScrollStart"
							ref="uiPlayerShortsHlsjs"
						/>

						<div class="absolute bottom-0  z-[999999] flex text-white p-3 mb-2">
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


					</div>

				</div>

				<div class="h-full min-w-[30px] hidden md:inline">
					<UiShortsBtns :video="video"/>
				</div>
			</div>
		</div>


		<div class="fixed right-[15px] min-[720px]:right-[20px] bottom-[25px] min-[980px]:hidden  z-[999999]" v-if="SHORTS_IDX == idx" >
			<UiShortsBtns :video="video" :isMobile="true"/>
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
	},
});
const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const windowSize = useWindowSize();
const shortScrollStart = useState('shortScrollStart');
const UUID = useUuid();
const {$util} = useNuxtApp();
const isMuted = useState('isMuted');
const isIOS = useState('isIOS');
const activeTmp = useState('activeTmp');

const toggleMuted = ()=>{

	if(isMuted.value) {
		window.miniPlayer.mute();
	}
}

const uiPlayerShortsHlsjs = ref(null);

const togglePlay = ()=>{
	if(isMuted.value){
		uiPlayerShortsHlsjs.value.toggleMuted();
	}else {
		uiPlayerShortsHlsjs.value.togglePlay();
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
	transition: opacity .2s;
}
.fade-enter, .fade-leave-active {
	opacity: 0;
}

.bg-gra-v{
	background: rgb(0,0,0);
	background: linear-gradient(180deg, rgba(0,0,0,0.1435968137254902) 0%, rgba(0,0,0,0) 6%, rgba(0,0,0,0) 86%, rgba(0,0,0,0.24555759803921573) 94%, rgba(0,0,0,0.3424763655462185) 100%);
}

</style>
