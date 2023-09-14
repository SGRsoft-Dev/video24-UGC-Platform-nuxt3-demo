<template>


	<div class="main-header fixed  w-full backdrop-blur z-[99999] md:drop-shadow-none  border-b pt-safe  "
		 :class="{
				'bg-neutral-900 border-[#252424]' : setDark ,
				'bg-white ' : !setDark ,
				'top-[-100px] md:top-0' : scrollState == 'down' ,
				'top-0' : scrollState == 'up',
				'drop-shadow-lg' : windowSize.scroll > 50,
		 }"
	>
		<div class="p-2 "  >
			<div class=" flex items-center">
				<div class="w-[220px] flex pl-2">

					<button @click="setLeftMenuOpen" class="ml-2 mr-2 hidden md:inline" type="button" >
						<i class="ph ph-list mr-1 text-2xl" :class="setDark ? 'text-white' : 'text-black'"></i>
					</button>

					<a href="/">
						<img
							:src="logo"
							class="  h-10 object-contain  md:w-full w-40 "
							alt=""
						>
					</a>

				</div>
				<div class="flex-1"></div>
				<div class="w-4/12 gnbSearchInput hidden md:inline">
					<UInput icon="i-heroicons-magnifying-glass-20-solid  "  :ui="{
						rounded:'rounded-full',
					}"  variant="outline" size="lg"  :color="setDark ? 'gray' : 'white'" :trailing="false" placeholder="검색하기" />
				</div>
				<div class="flex-1 text-right">
					<i class="ph-fill mr-2" :class="setDark ? 'ph-moon text-white' : 'ph-sun-dim text-dark'"></i>
					<UToggle v-model="isDark" />
				</div>
			</div>

		</div>
	</div>


	<USlideover v-model="leftMenuPopover" class="z-[99999] max-w-[260px] "  side="left">
		<div class="relative border-r dark:border-[#252424]" :class="{'bg-neutral-900 border-[#252424]' : setDark }">
			<div class="absolute w-full items-center flex z-[3]  h-[56px] border-b dark:border-[#252424] pt-safe" :class="{'bg-neutral-900 border-[#252424]' : setDark }">
				<div class="w-[220px] flex pl-2">

					<button @click="setLeftMenuOpen" class="ml-2 mr-2 hidden md:inline" type="button" >
						<i class="ph ph-list mr-1 text-2xl" :class="setDark ? 'text-white' : 'text-black'"></i>
					</button>

					<a href="/">
						<img
							:src="logo"
							class="  h-10 object-contain  md:w-full w-40 "
							alt=""
						>
					</a>

				</div>
			</div>

			<div class=" overflow-hidden h-[calc(100vh_+_20px)]" :class="{'bg-neutral-900 border-[#252424] text-white' : setDark }">
				<UiLnb />
			</div>
		</div>
	</USlideover>

</template>

<script setup>



const route = useRoute();
const colorMode = useColorMode();
const fullMode = useFullMode();
const windowSize = useWindowSize();
const scrollState = useScrollState();
const watchMode = useWatchMode();
const isThumbPlayVideoId = useIsThumbPlayVideoId();
const observerVideos = useObserverVideos();

const isDark = computed({
	get () {
		return colorMode.value === 'dark'
	},
	set () {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	}
});

const setDark = computed(() => {
	let darkMode =  colorMode.value == 'dark'   ? true : false;
	if(fullMode.value && route.path.split('/')[1] == 'watch'){
		darkMode = true;
	}
	return darkMode
});

const logo = computed(() => {
	let logoFile =  colorMode.value == 'dark'   ? '/image/logo_dark.svg' : '/image/logo.svg';
	if(fullMode.value && route.path.split('/')[1] == 'watch'){
		logoFile = '/image/logo_dark.svg';
	}
	return logoFile

});


const leftMenu = useLeftMenu();
const leftMenuOpen = useLeftMenuOpen();
const leftMenuPopover = useLeftMenuPopover();
const setLeftMenuOpen = () => {

	if(route.path.split('/')[1] == 'watch' ) {
		setLeftMenuPopover();
		return;
	}else {
		leftMenuOpen.value = !leftMenuOpen.value;
	}
};


const setLeftMenuPopover = () => {
	leftMenuPopover.value = !leftMenuPopover.value;
};

watch(()=>route.path,()=>{
	if(route.path.split('/')[1] != 'watch' ) {
		leftMenuPopover.value = false;
	}
})

</script>

<style scoped>

</style>
