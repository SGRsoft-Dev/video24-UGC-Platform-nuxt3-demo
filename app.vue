<template>
	<NuxtLayout>
		<NuxtLoadingIndicator />
		<NuxtPage />
	</NuxtLayout>
</template>


<script setup>
import lscache from 'lscache';
import { v4 as uuidv4 } from 'uuid';
import ua from "ua-parser-js";
lscache.setExpiryMilliseconds(1000);


const UUID = useUuid();
const fullMode = useFullMode();
const windowSize = useWindowSize();
const scrollY = ref(0)
const scrollState = useScrollState();
const isMobile = useIsMobile();

watch(fullMode,(v)=>{
	if(v){
		lscache.set('fullMode',true);
	}else{
		lscache.set('fullMode',false);
	}
});



watch(scrollY,(to,from)=>{
	if(to > from){
		scrollState.value = 'down';
	}else{
		scrollState.value = 'up';
	}
	if(to <50){
		scrollState.value = 'up';
	}
});

//ssr , csr 호환을 위한 조치
try{
	windowSize.value.width = window.innerWidth;
	windowSize.value.height = window.innerHeight;
}catch (e) {

}


const checkOS = ()=>{

	let parser = ua(window.navigator.userAgent);


	if (parser.device.type == 'mobile' || parser.device.type == 'tablet' || windowSize.value.width <= 720) {

		document.body.classList.add('isMobile');

		document.body.classList.remove('isPc');
		isMobile.value = true;
	} else {
		document.body.classList.add('isPc')

		document.body.classList.remove('isMobile');
		isMobile.value = false;
	}


}

onMounted(()=>{
	window.player = null;
	window.miniPlayer = null;

	window.uuid = lscache.get('UUID') ? lscache.get('UUID') : uuidv4();
	lscache.set('UUID', window.uuid, 3600);

	UUID.value = window.uuid;

	windowSize.value.width = window.innerWidth;
	windowSize.value.height = window.innerHeight;
	windowSize.value.scroll = window.scrollY;
	scrollY.value = window.scrollY;

	window.addEventListener('resize',()=>{
		windowSize.value.width = window.innerWidth;
		windowSize.value.height = window.innerHeight;
		checkOS();
	});

	document.addEventListener('scroll',(event)=>{

		windowSize.value.scroll = window.scrollY;
		scrollY.value = window.scrollY;
	});



	if(lscache.get('fullMode')){
		if(windowSize.value.width > 640) {
			fullMode.value = true;
		}
	}


})
</script>
