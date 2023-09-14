<template>
	<NuxtLink :to="`/watch?v=${v.video_id}`" @mouseover="mouseOverActive" @mouseleave="mouseOverDeActive" @mouseout="mouseOverDeActive">


		<div class="videoThumb relative md:rounded-xl md:overflow-hidden bg-gray-200/30 md:hover:scale-105 duration-200"  :id="`videoCard_${v.video_id}`" :style="{background:`url(${v.thumb_url})  `}">
			<div class="backdrop-blur-cu1">

				<img :src="v.thumb_url ? v.thumb_url :  '/image/b.png'" :alt="v.title" class="w-full h-full object-cover   " :class="{'absolute top-0 left-0 z-[3]' : mouseOver , 'opacity-0' : mouseOverIn && mouseOverInEnd && isThumbPlayVideoId == v.video_id  }"  loading="lazy"/>
				<Transition name="fade" mode="out-in">
					<UiPlayerPreview :v="v"  class="w-full h-full object-contain absolute top-0 left-0 z-[2]"  @mouseOverInEndActive="mouseOverInEndActive" v-if="mouseOverIn && isThumbPlayVideoId == v.video_id "></UiPlayerPreview>
				</Transition>

			</div>
		</div>
		<div class="text-base pt-2 px-4 md:px-0">
			<div class="flex">
				<div class="pr-3  ">
					<UAvatar :src="v.channel_profile_image_url" v-if="v.channel_profile_image_url"  :alt="v.channel_name" class="profileThumb" />
					<UAvatar  src="~/assets/image/non-profile.png" v-else  :alt="v.channel_name" class="profileThumb object-contain"/>
				</div>
				<div>
					<div class="   ">
						<div class=" overflow-hidden text-ellipsis w-full " >
							{{$util.titleMake(v.title)}}
						</div>

					</div>
					<div class="text-sm text-gray-400 pt-1">
						{{v.channel_name}}
					</div>
					<div class="text-xs text-gray-400 pt-1">
						조회수 {{v.view_cnt || 0}}회<i class="ph ph-dot "></i>{{$util.textTime(v.created_at)}}
					</div>

				</div>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup>
import _ from 'lodash';

const props = defineProps({
	v: {
		type: Object,
		required: true
	}
})

const {$util} = useNuxtApp();
const isMobile = useIsMobile();
const isThumbPlayVideoId = useIsThumbPlayVideoId();
const observerVideos = useObserverVideos();
const windowSize = useWindowSize();
const mouseOver = ref(false);
const mouseOverIn = ref(false);
const mouseOverInEnd = ref(false);
let mouseInTimer = null
let mouserTimer = null;

const mouseOverActive = ()=>{
	clearTimeout(mouseInTimer);
	//if(isThumbPlayVideoId.value) return;

	mouseInTimer = setTimeout(()=>{
		mouseOver.value = true;
	},200)
}

const mouseOverDeActive = ()=>{
	clearTimeout(mouseInTimer);
	mouseOver.value = false;
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



let isDomScrollOffset = ref(0);
const inScrollTopSt = ref(0);
const isObView = ref(false);


//옵져버로 감시해서 보이는 비디오카드는 배열에 추가, 안보이는 요소는 제거
const handleIntersection = (entries) =>{
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			observerVideos.value.push(props.v.video_id);
		} else {
			observerVideos.value = observerVideos.value.filter((v)=>v != props.v.video_id);
		}
	});
}

//스크롤 감시
watch(()=>windowSize.value.scroll , (to)=>{
	inScrollTopSt.value = Math.round(isDomScrollOffset.value - windowSize.value.scroll) ;
	if(isObView.value ) {
		mouseOverTriggle(inScrollTopSt.value);
	}
})

//조건이 맞으면 마우스 올린것 처럼 작동
const mouseOverTriggle = _.debounce((thisScroll)=>{
	if(isObView.value  && thisScroll < 250){
		mouseOverActive();
	}
},300)

//옵져버는 모바일만 동작
watch(()=>observerVideos.value , (to)=>{
	if(isMobile.value){
		if(to[0] == props.v.video_id){
			isObView.value = true;
		}else{
			isObView.value = false;
			mouseOverDeActive();
		}
	}
})

const setObserver = ()=>{
	if(isMobile.value){
		let options = {
			root: null, // 기본적으로 뷰포트를 root로 사용합니다.
			rootMargin:'0px',
			threshold: .8, // 스크롤 영역과 얼마나 교차해야 할지를 설정합니다.
		};
		const observer = new IntersectionObserver(handleIntersection, options);
		observer.observe(document.getElementById(`videoCard_${props.v.video_id}`));
	}
}

onMounted(()=>{
	setObserver();
	isDomScrollOffset.value = document.getElementById(`videoCard_${props.v.video_id}`).offsetTop || 0;
	inScrollTopSt.value = Math.round(isDomScrollOffset.value - windowSize.value.scroll) ;
})

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
	opacity: 0;
}
</style>
