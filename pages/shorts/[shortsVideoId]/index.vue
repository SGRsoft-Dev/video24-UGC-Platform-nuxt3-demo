<template>

</template>
<script setup>

const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const {$util} = useNuxtApp();

const route = useRoute();

const SHORTS = useShorts();
const SHORTS_VIDEO = useShortVideo();
const SHORTS_IDX = useShortIdx();
const ShortsList = useShortsList();
const shortsInitLoad = useShortsInitLoad();
const shortMode = useShortMode();

const startFlag = useStartFlag();
const activeTmp = useActiveTmp();
const ShortPlayList = useShortPlayList();
const isMobile = useIsMobile();

onMounted(()=>{
	activeTmp.value = true;
})
</script>
