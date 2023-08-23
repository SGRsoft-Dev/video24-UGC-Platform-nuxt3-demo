<template>
	<div v-if="VIDEO " class="" :class="{'floatPlayer drop-shadow-md' : !watchMode && floatPlayer , 'md:container md:mx-auto ' : !fullMode , 'bg-neutral-900' : colorMode.value == 'dark'}">

		<div class="relative">
			<div class="playerFrame relative" >
				<div class="absolute top-0 bottom-0 left-0 right-0 z-[999999999] md:hidden inline " @click="goVideo"></div>
				<UiPlayer/>
			</div>

			<div class="absolute top-0 bottom-0 left-0 right-0 z-[999999999] cursor-pointer hover:bg-black/50 hoverBtnArea hidden md:inline" v-if="!watchMode" >
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

		<div v-if="!watchMode" class="p-3 " :class="{'bg-bg-neutral-900' : colorMode.value == 'dark' , 'bg-white' : colorMode.value == 'light' }">
			<div class="md:text-base text-[12px] el">
				{{VIDEO.title}}
			</div>
			<div class="md:text-xs text-[11px] text-gray-400 mt-2 mb-2">
				{{ VIDEO.channel_name }}
			</div>
		</div>

		<div class="md:hidden flex ">

			<div class="p-2">
				<button type="button" @click="closeVideo()">
					<i class="ph ph-x text-white text-xl"></i>
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
const backVideo = ()=>{
	router.replace(`/watch?v=${VIDEO.value.video_id}`);
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
	.floatPlayer  {
		position: fixed;
		bottom:0;
		left:0;
		right:0;
		z-index: 9999;
		max-width:100vw;
		width:100%;
	}

	.floatPlayer{
		display:flex;
	}

	.floatPlayer .playerFrame{
		width:140px;
	}
}
</style>
