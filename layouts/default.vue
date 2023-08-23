<template>
	<div class=" relative h-full  " :class="{'bg-neutral-900' : colorMode.value == 'dark'}">
		<UiGnb/>
		<div class=" h-full fixed top-0 left-0  z-20 md:inline hidden  " :class="{'w-[220px]' : leftMenuOpen , 'w-[60px]' : !leftMenuOpen ,'hidden' : watchMode }">
			<UiLnb />
		</div>
		<div class=" h-full  mt-[72px] " :class="{'md:pl-[240px]' : leftMenuOpen , 'md:pl-[60px]' : !leftMenuOpen && !watchMode}">
			<slot />
		</div>
	</div>



	<UiFloatPlayer/>
</template>

<script setup>


const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const leftMenuOpen = useState('leftMenuOpen',()=>true);
const watchMode = useState('watchMode',()=>false);
const floatPlayer = useState('floatPlayer');
const route = useRoute();
const router = useRouter();

const colorMode = useColorMode();
const fullMode = useState('fullMode');

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


</style>
