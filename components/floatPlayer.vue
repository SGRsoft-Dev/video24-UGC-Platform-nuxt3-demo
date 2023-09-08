<template>
	<div v-if="VIDEO" class=" pt-0  dark:bg-neutral-900" :class="{' floatPlayer duration-100 delay-100 shadow-sm' : !watchMode && floatPlayer ,' noFloatMode ' : watchMode && !floatPlayer  , 'md:container md:mx-auto  ' : !fullMode , 'md:pt-5' : !fullMode && watchMode} ">

		<div class="relative ">
			<div class="playerFrame relative " >
				<div class="absolute top-0 bottom-0 left-0 right-0 z-[999999999] md:hidden inline  " @click="backVideo"  v-if="!watchMode"></div>
				<UiPlayer/>
			</div>

			<div class="absolute top-0 bottom-0 left-0 right-0 z-[999] cursor-pointer hover:bg-black/50 hoverBtnArea hidden md:inline" v-if="!watchMode" >
				<div class="flex justify-between hoverBtns">
					<div class="p-2">
						<button type="button" @click="backVideo()">
							<i class="ph ph-arrow-square-up-left text-white text-2xl"></i>
						</button>
					</div>
					<div class="p-2">
						<button type="button" @click="closeVideo()">
							<i class="ph ph-x text-white text-2xl"></i>
						</button>
					</div>
				</div>
			</div>
		</div>

		<div v-if="!watchMode" class="p-3 flex-auto border-t dark:border-gray-800 border-gray-100 " :class="{'bg-bg-neutral-900' : colorMode.value == 'dark' , 'bg-white' : colorMode.value == 'light' }">

			<div class="md:text-base text-[12px] el">
				{{VIDEO.title}}
			</div>
			<div class="md:text-xs text-[11px] text-gray-400 mt-2 mb-2">
				{{ VIDEO.channel_name }}
			</div>

		</div>

		<div class="md:hidden flex " v-if="windowSize.width <= 640 && !watchMode" :class="{'bg-bg-neutral-900' : colorMode.value == 'dark' , 'bg-white' : colorMode.value == 'light' }">

			<div class="">
				<button type="button" class=" p-3" @click="closeVideo()">
					<i class="ph ph-x  text-xl"></i>
				</button>
			</div>
		</div>

	</div>

</template>

<script setup>
const watchMode = useState('watchMode',()=>false);
const floatPlayer = useState('floatPlayer');
const route = useRoute();
const router = useRouter();

const colorMode = useColorMode();
const fullMode = useState('fullMode');
const windowSize = useState('windowSize');


const VIDEO = useState('VIDEO');
const {$util} = useNuxtApp();
const backVideo = ()=>{
	floatPlayer.value = false;
	router.push(`/watch?v=${VIDEO.value.video_id}&back=true`);

}
const closeVideo = ()=>{
	VIDEO.value = null;
	try{
		window.player.destroy();
	}catch (e) {

	}
}

const goVideo = ()=>{
	if(windowSize.value.width < 640){
		router.push(`/watch?v=${VIDEO.value.video_id}`);
	}
}




</script>

<style scoped>
.floatPlayer{
	position: fixed;
	bottom:0;
	right:25px;
	z-index: 9999;
	width:500px;
	max-width: 20vw;
}

.floatBackDrop{
	position: fixed;
	bottom:0;
	right:0;
	left:0;
	top:0;
	z-index: 9998;
}

.floatPlayer .playerFrame{
	aspect-ratio: 16/9;
	overflow: hidden;
}

.hoverBtnArea .hoverBtns{
	display: none;
}
.hoverBtnArea:hover .hoverBtns{
	display: flex;
}



@media (max-width: 640px) {

	.playerFrame{
		width:100vw;
	}
	.noFloatMode{
		height:100vh;
	}

	.floatPlayer{
		position: fixed;
		bottom:76px;
		left:0;
		right:0;
		z-index: 9999;
		max-width:100vw;
		width:100%;
		height:80px;

	}

	.floatPlayer{
		display:flex;

	}

	.floatPlayer .playerFrame{
		width:140px;
	}
}


</style>
