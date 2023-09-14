<template>
	<NuxtLink style="cursor: pointer"  @click="goShort(v.video_id)"  @mouseover="mouseOverActive" @mouseleave="mouseOverDeActive" @mouseout="mouseOverDeActive">
		<div class="w-full max-w-full scale-95 hover:scale-100 duration-200">
			<div class="videoThumbSf  shortsThumbArea rounded-lg dark:shadow-sm overflow-hidden bg-gray-200/15 relative" :style="{background:`url(${v.thumb_url}) `}">
				<div class="backdrop-blur-cu1 aspect-[9/20]" >
					<img :src="v.thumb_url ? v.thumb_url : '/image/b.png'" :alt="v.title" class="w-full h-full min-h-[100px] aspect-[9/16] object-cover " placeholder loading="lazy"/>

					<Transition name="fade" mode="out-in">
						<UiPlayerPreview :v="v"  class="w-full h-full object-contain absolute top-0 left-0 z-[2]"  aspect="" @mouseOverInEndActive="mouseOverInEndActive" v-if="mouseOverIn "></UiPlayerPreview>
					</Transition>
				</div>
			</div>
			<div class="text-base pt-2 px-1 md:px-0 ">
				<div class="w-full  line-clamp-2 max-h-[60px] " >
					{{$util.titleMake(v.title)}}
				</div>

				<div class="text-xs text-gray-400 pt-1">
					조회수 {{v.view_cnt || 0}}회<i class="ph ph-dot "></i>{{$util.textTime(v.created_at)}}
				</div>

			</div>
		</div>
	</NuxtLink>
</template>

<script setup>



const props = defineProps({
	v: {
		type: Object,
		required: true
	}
})
const ShortsList = useShortsList();
const {$util} = useNuxtApp();
const router = useRouter();
const isMobile = useIsMobile();

const goShort = (video_id)=>{
	ShortsList.value = [];
	//router.push('/shorts/'+video_id);
	location.href='/shorts/'+video_id;
}



const isThumbPlayVideoId = useState('isThumbPlayVideoId',()=>null);
const mouseOver = ref(false);
const mouseOverIn = ref(false);
const mouseOverInEnd = ref(false);
let mouseInTimer = null
let mouserTimer = null;

const mouseOverActive = ()=>{
	if(!isMobile.value) {
		clearTimeout(mouseInTimer);
		mouseInTimer = setTimeout(()=>{
			mouseOver.value = true;
		},200)

	}
}

const mouseOverDeActive = ()=>{
	if(!isMobile.value) {
		clearTimeout(mouseInTimer);
		mouseOver.value = false;
	}
}

const mouseOverInEndActive = ()=>{
	setTimeout(()=>{
		mouseOverInEnd.value = true;

	},200);
}

watch(()=>mouseOver.value , ()=>{
	if(mouseOver.value){
		clearTimeout(mouserTimer);
		mouserTimer = setTimeout(()=>{
			if(mouseOver.value) {
				mouseOverIn.value = true;
				isThumbPlayVideoId.value = props.v.video_id;

			}
		},200)

	}else{
		mouseOverIn.value = false;
		mouseOverInEnd.value = false;
		if(isThumbPlayVideoId.value == props.v.video_id){
			isThumbPlayVideoId.value = null;
		}

	}
})
</script>

<style scoped>
	.shortsThumbArea video {
		object-fit: cover;
		width:100%;
		height:100%;
	}
</style>
