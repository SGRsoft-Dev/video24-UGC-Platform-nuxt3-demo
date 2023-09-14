<template>
	<NuxtLayout>
		<NuxtLoadingIndicator />
		<NuxtPage />
	</NuxtLayout>
</template>


<script setup>
import lscache from 'lscache';
import { v4 as uuidv4 } from 'uuid';
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

onMounted(()=>{
	window.player = null;
	window.miniPlayer = null;

	window.uuid = lscache.get('UUID') ? lscache.get('UUID') : uuidv4();
	lscache.set('UUID', window.uuid, 3600);

	UUID.value = window.uuid;

	windowSize.value.width = window.innerWidth;
	windowSize.value.height = window.innerHeight;

	window.addEventListener('resize',()=>{
		windowSize.value.width = window.innerWidth;
		windowSize.value.height = window.innerHeight;
	});

	document.addEventListener('scroll',()=>{
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
