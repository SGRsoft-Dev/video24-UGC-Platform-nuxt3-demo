<template>
	<div class=" relative  w-full  dark:bg-neutral-900 " v-if="!loading">

		<div class="mb-[72px] " v-show="windowSize.width > 640 || !watchMode">
			<UiGnb/>
		</div>


		<div class=" h-full fixed top-0 left-0  z-20   " :class="{'w-[220px]' : leftMenuOpen , 'w-[60px]' : !leftMenuOpen ,'hidden' : watchMode ,'md:inline hidden' : !watchMode }">
			<UiLnb />
		</div>
		<div class="  px-0" :class="{'md:pl-[220px]' : leftMenuOpen , 'md:pl-[60px]' : !leftMenuOpen && !watchMode}">

			<slot/>
			<FloatShorts v-if="route.params.shortsVideoId"/>
		</div>


		<div class="fixed bottom-0 w-full z-20   border-t border-[#eeeeee] dark:border-[#252424] bg-white dark:bg-neutral-900  md:hidden" v-if="!watchMode">
			<div class=" pb-safe" style="min-height:80px">
				<div class="pt-2 ">
					<UiBottom />
				</div>
			</div>
		</div>
		<div class="md:hidden h-[100px]" v-if="!watchMode">
			<!--margin-->
		</div>


	</div>



	<FloatPlayer  :class="{' floatPlayerBody':floatPlayer}"/>




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
const loading = ref(true)

const VIDEO = useState('VIDEO');


watch(colorMode,()=>{
	if(colorMode.value == 'dark'){
		document.body.classList.add('bg-neutral-900')
	}else{
		document.body.classList.remove('bg-neutral-900')
	}
})

const pageChaneInit = (path)=>{


	if(path.split('/')[1] == 'watch'  ) {
		leftMenuOpen.value = false;
		watchMode.value = true;

		document.getElementById('__nuxt').classList.add('no-pull-mode');
		document.body.classList.add('no-scroll');
		document.getElementsByTagName('html')[0].classList.add('no-scroll');
	}else{
		leftMenuOpen.value = true;
		watchMode.value = false;

		document.getElementById('__nuxt').classList.remove('no-pull-mode');
		document.body.classList.remove('no-scroll');
		document.getElementsByTagName('html')[0].classList.remove('no-scroll');
	}
}

watch(()=>route.path,(path , oldPath)=>{

	if(oldPath.split('/')[1] == 'watch'  ) {
		lastRouterPath.value = null;
	}else {
		lastRouterPath.value = oldPath;
	}


	pageChaneInit(path);

	try{
		window.player.controlBarDeactive();
	}catch (e) {

	}
});

onMounted(()=>{

	windowSize.value.width = window.innerWidth;
	windowSize.value.height = window.innerHeight;


	pageChaneInit(route.path);

	if(colorMode.value == 'dark'){
		document.body.classList.add('bg-neutral-900')
	}else{
		document.body.classList.remove('bg-neutral-900')
	}

	loading.value = false;


});

</script>

<style scoped>

@media (max-width: 640px) {
	.floatPlayerBody {
		max-height: 20vh;
		height: 80px;
	}
}

</style>
