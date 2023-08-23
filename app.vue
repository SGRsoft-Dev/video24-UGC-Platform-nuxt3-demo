<template>
	<NuxtLayout>
		<NuxtLoadingIndicator :color="'red'"/>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import lscache from 'lscache';
window.player = null;
const VOD = useState('VOD',()=>[]);
const TOTAL = useState('TOTAL',()=>0);
const VIDEO = useState('VIDEO',);
const fullMode = useState('fullMode',()=>false);
const floatPlayer = useState('floatPlayer',()=>false);
const windowSize = useState('windowSize',()=> {
		return {
			width:0,
			height:0
		}
});

watch(fullMode,(v)=>{
	if(v){
		lscache.set('fullMode',true);
	}else{
		lscache.set('fullMode',false);
	}
});
if(lscache.get('fullMode')){
	fullMode.value = true;
}

windowSize.value.width = window.innerWidth;
windowSize.value.height = window.innerHeight;

document.addEventListener('resize',()=>{
	windowSize.value.width = window.innerWidth;
	windowSize.value.height = window.innerHeight;
});

</script>
