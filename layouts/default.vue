<template>
  <div class=" relative">
	  <UiGnb/>
    <div class=" h-full fixed top-0 left-0  z-20 backdrop-blur  " :class="{'w-[220px]' : leftMenuOpen , 'w-[60px]' : !leftMenuOpen ,'hidden' : watchMode }">
      <UiLnb />
    </div>
    <div class=" h-full  mt-[74px] " :class="{'pl-[240px]' : leftMenuOpen , 'pl-[60px]' : !leftMenuOpen && !watchMode}">
      <slot />
    </div>
  </div>



	<div v-if="VIDEO " class="" :class="{'floatPlayer drop-shadow-md' : !watchMode}">

			<div class="relative">
				<div class="playerFrame">
					<UiPlayer/>
				</div>

				<div class="absolute top-0 bottom-0 left-0 right-0 z-[999999999] cursor-pointer hover:bg-black/50 hoverBtnArea " v-if="!watchMode" >
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

			<div v-if="!watchMode" class="p-3 " :class="{'bg-black' : colorMode.value == 'dark' , 'bg-white' : colorMode.value == 'light' }">
				<div class="text-base">
					{{VIDEO.title}}
				</div>
				<div class="text-sm text-gray-400">
					channelName
				</div>
			</div>

	</div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const leftMenuOpen = useState('leftMenuOpen',()=>true);
const watchMode = useState('watchMode',()=>false);
const route = useRoute();
const router = useRouter();

const colorMode = useColorMode();


watch(()=>route.path,(path)=>{
	if(path.split('/')[1] == 'watch'  ) {
		leftMenuOpen.value = false;
		watchMode.value = true;
	}else{
		leftMenuOpen.value = true;
		watchMode.value = false;
	}
});

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

onMounted(()=>{
	if(route.path.split('/')[1] == 'watch'  ) {
		leftMenuOpen.value = false
		watchMode.value = true;
	}else{
		leftMenuOpen.value = true;
		watchMode.value = false;
	}


});

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
</style>
