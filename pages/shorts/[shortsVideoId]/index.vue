<template>

</template>
<script setup>



import axios from "axios";
import {useAsyncData} from "#app";
const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const {$util} = useNuxtApp();

const route = useRoute();

const SHORTS = useState('SHORTS');
const SHORTS_VIDEO = useState('SHORTS_VIDEO');
const SHORTS_IDX = useState('SHORTS_IDX');
const ShortsList = useState('ShortsList',()=>[]);
const shortsInitLoad = useState('shortsInitLoad');
const shortMode = useState('shortMode');

const startFlag = useState('startFlag');


</script>
