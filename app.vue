<template>
	<NuxtLayout>
		<NuxtLoadingIndicator />
		<NuxtPage />
	</NuxtLayout>
</template>


<script setup>
import lscache from 'lscache';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

lscache.setExpiryMilliseconds(1000);


const UUID = useState('UUID',()=>null);
const VOD = useState('VOD',()=>[]);
const TOTAL = useState('TOTAL',()=>0);
const VIDEO = useState('VIDEO',);
const fullMode = useState('fullMode',()=>false);
const floatPlayer = useState('floatPlayer',()=>false);
const windowSize = useState('windowSize',()=> {
		return {
			width:0,
			height:0,
			scroll:0,
		}
});

const scrollState = useState('scrollState',()=>'up');

watch(fullMode,(v)=>{
	if(v){
		lscache.set('fullMode',true);
	}else{
		lscache.set('fullMode',false);
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

	window.uuid = lscache.get('UUID') ? lscache.get('UUID') : uuidv4();
	lscache.set('UUID', window.uuid, 3600);


	windowSize.value.width = window.innerWidth;
	windowSize.value.height = window.innerHeight;

	document.addEventListener('resize',()=>{
		windowSize.value.width = window.innerWidth;
		windowSize.value.height = window.innerHeight;
	});

	document.addEventListener('scroll',()=>{

		if(windowSize.value.scroll > window.scrollY){
			scrollState.value = 'up';
		}else{
			scrollState.value = 'down';
		}
		if(window.scrollY < 100){
			scrollState.value = 'up';
		}
		_.debounce(()=>{
			windowSize.value.scroll = window.scrollY;
		},300)();
	});

	if(lscache.get('fullMode')){
		if(windowSize.value.width > 640) {
			fullMode.value = true;
		}
	}

})
</script>
