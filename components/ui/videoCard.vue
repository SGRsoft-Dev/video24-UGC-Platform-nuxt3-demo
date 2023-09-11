<template>
	<NuxtLink :to="`/watch?v=${v.video_id}`" @mouseenter="mouseOverActive" @mouseleave="mouseOverDeActive" @mouseout="mouseOverDeActive">
		<div class="videoThumb relative md:rounded-xl md:overflow-hidden bg-gray-200/15 md:hover:scale-105 duration-200" :style="{background:`url(${v.thumb_url}) `}">
			<div class="backdrop-blur-cu1">

				<Transition name="fade" mode="out-in">
					<img :src="v.thumb_url ? v.thumb_url : '/image/b.png' " :alt="v.title" class="w-full h-full object-contain  " :class="{'absolute top-0 left-0 z-[3]' : mouseOver}" v-if="!mouseOverIn" loading="lazy"/>
				</Transition>
				<Transition name="fade" mode="out-in">
					<iframe :src="`/embed/${v.video_id}?autoplay=1&lowquality=true&hidecontrol=true&muted=true`" loading="lazy"  class="w-full h-full object-contain absolute top-0 left-0 z-[2]" frameborder="0"   v-if="mouseOver "></iframe>
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

const props = defineProps({
	v: {
		type: Object,
		required: true
	}
})

const {$util} = useNuxtApp();
const isMobile = useState('isMobile');
const isThumbPlayVideoId = useState('isThumbPlayVideoId',()=>null);
const mouseOver = ref(false);
const mouseOverIn = ref(false);

let mouseInTimer = null
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

let mouserTimer = null;

watch(()=>mouseOver.value , ()=>{
	if(mouseOver.value){
		clearTimeout(mouserTimer);
		mouserTimer = setTimeout(()=>{
			if(mouseOver.value) {
				mouseOverIn.value = true;
				isThumbPlayVideoId.value = props.v.video_id;
			}
		},900)

	}else{
		mouseOverIn.value = false;
		if(isThumbPlayVideoId.value == props.v.video_id){
			isThumbPlayVideoId.value = null;
		}
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
</style>
