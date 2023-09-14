<template>
	<div class=" relative  w-full  dark:bg-neutral-900 " v-if="!loading">
		<slot/>
	</div>
</template>

<script setup>
import ua from "ua-parser-js";

const windowSize = useWindowSize();
const route = useRoute();
const router = useRouter();

const isMobile = useIsMobile();
const colorMode = useColorMode();
const loading = ref(true)


const isIOS = useOsIOS();


watch(colorMode,()=>{
	if(colorMode.value == 'dark'){
		document.body.classList.add('bg-neutral-900')
	}else{
		document.body.classList.remove('bg-neutral-900')
	}
})



watch(()=>route.path,(path , oldPath)=>{
	checkOS();


});

const checkOS = ()=>{
	try {
		let parser = ua(window.navigator.userAgent);
		if (parser.os.name == 'iOS') {
			isIOS.value = true;
		} else {
			isIOS.value = false;
		}

		if (parser.device.type == 'mobile' || parser.device.type == 'tablet') {
			document.body.classList.add('isMobile');
			document.body.classList.remove('isPc');
			isMobile.value = true;
		} else {
			document.body.classList.add('isPc')
			document.body.classList.remove('isMobile');
			isMobile.value = false;
		}
	}catch (e) {

	}

}

onMounted(()=>{

	windowSize.value.width = window.innerWidth;
	windowSize.value.height = window.innerHeight;

	checkOS();



	if(colorMode.value == 'dark'){
		document.body.classList.add('bg-neutral-900')
	}else{
		document.body.classList.remove('bg-neutral-900')
	}

	loading.value = false;
});

</script>

<style scoped>


</style>
