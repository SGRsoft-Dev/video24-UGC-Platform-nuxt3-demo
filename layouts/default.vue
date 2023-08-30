<template>
	<div class=" relative  w-full  dark:bg-neutral-900 " >

		<div class="mb-[72px] " v-show="windowSize.width > 640 || !watchMode">
			<UiGnb/>
		</div>


		<div class=" h-full fixed top-0 left-0  z-20   " :class="{'w-[220px]' : leftMenuOpen , 'w-[60px]' : !leftMenuOpen ,'hidden' : watchMode ,'md:inline hidden' : !watchMode }">
			<UiLnb />
		</div>
		<div class="  px-0" :class="{'md:pl-[220px]' : leftMenuOpen , 'md:pl-[60px]' : !leftMenuOpen && !watchMode}">
			<slot/>
		</div>


		<div class="fixed bottom-0 w-full z-20 h-20 dark:bg-neutral-900 md:hidden" v-if="!watchMode">
			<UiBottom/>
		</div>
		<div class="md:hidden h-[100px]" v-if="!watchMode">
			<!--margin-->
		</div>


	</div>



	<UiFloatPlayer class="tra100"/>
</template>

<script setup>

const leftMenuOpen = useState('leftMenuOpen',()=>true);
const watchMode = useState('watchMode',()=>false);
const floatPlayer = useState('floatPlayer');
const windowSize = useState('windowSize');
const route = useRoute();
const router = useRouter();
const lastRouterPath = useState('lastRouterPath',()=>null);

const colorMode = useColorMode();
const fullMode = useState('fullMode');

watch(()=>route.path,(path , oldPath)=>{

	lastRouterPath.value = oldPath;

	if(path.split('/')[1] == 'watch'  ) {
		leftMenuOpen.value = false;
		watchMode.value = true;
	}else{
		leftMenuOpen.value = true;
		watchMode.value = false;
	}

	try{
		window.player.controlBarDeactive();
	}catch (e) {

	}
});

const VIDEO = useState('VIDEO');


watch(colorMode,()=>{
	if(colorMode.value == 'dark'){
		document.body.classList.add('bg-neutral-900')
	}else{
		document.body.classList.remove('bg-neutral-900')
	}
})

onMounted(()=>{
	if(route.path.split('/')[1] == 'watch'  ) {
		leftMenuOpen.value = false
		watchMode.value = true;
	}else{
		leftMenuOpen.value = true;
		watchMode.value = false;
	}

	if(colorMode.value == 'dark'){
		document.body.classList.add('bg-neutral-900')
	}else{
		document.body.classList.remove('bg-neutral-900')
	}


});

</script>

<style scoped>


</style>
