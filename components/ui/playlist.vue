

<template>
	<div class="md:px-2">

		<div class="relative mb-4 duration-200 ">
			<div class="flex-auto overflow-x-auto snap-x snap-mandatory  tagCloudWarp" :class="{'mask' : tagCloudLeft < 10 ,  'maskFull' : tagCloudLeft > 10}">
				<div class=" flex flex-nowrap gap-2  w-[1200px]">
					<div class="snap-start">
						<UButton color="black" size="sm" >모두</UButton>
					</div>
					<div class="snap-start">
						<UButton color="white" size="sm" v-if="VIDEO">{{VIDEO.channel_name}} 제공</UButton>
					</div>
					<div class="snap-start">
						<UButton color="white" size="sm" >관련 콘텐츠</UButton>
					</div>
					<div class="snap-start">
						<UButton color="white" size="sm" >최근 업로드된 동영상</UButton>
					</div>
				</div>
			</div>

			<div class="absolute left-0 top-1" v-if="tagCloudLeft > 10">
				<button type="button" @click="tagPrev"><i class="ph ph-caret-left"></i></button>
			</div>
			<div class="absolute right-0 top-1">
				<button type="button" @click="tagNext"><i class="ph ph-caret-right"></i></button>
			</div>
		</div>


		<div v-for="(v ,i) in VOD">
			<UiVideoCardCol :v="v" />
		</div>

		<div class="md:hidden h-[100px]" >
			<!--margin-->
		</div>
	</div>

</template>

<script setup>
import axios from "axios";
import dayjs from "dayjs";

const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const {$util} = useNuxtApp();
const route = useRoute();

const VOD = usePlayList();
const TOTAL = usePlayListTotal();
const VIDEO = useVideo();

const shuffle =  (array) =>{
	array.sort(() => Math.random() - 0.5);
}

const tagCloudLeft = ref(0);
const tagNext = ()=>{
	let tagCloudWarp = document.querySelector('.tagCloudWarp');
	tagCloudLeft.value = tagCloudLeft.value + 100 ;
	tagCloudWarp.scroll({
		left: tagCloudLeft.value ,
		behavior: 'smooth'
	})

}
const tagPrev = ()=>{
	let tagCloudWarp = document.querySelector('.tagCloudWarp');
	tagCloudLeft.value = tagCloudLeft.value - 100 ;
	if(tagCloudLeft.value < 0){
		tagCloudLeft.value = 0;
	}
	tagCloudWarp.scroll({
		left: tagCloudLeft.value ,
		behavior: 'smooth'
	})

}

//비디오 중복 체크
const chkDuvideo = (video_id)=>{
	for (let i = 0; i < VOD.value.length; i++) {
		let v = VOD.value[i];
		if (v.video_id == video_id) {
			return true;
		}
	}
	return false;
}

const getVodList = async (params)=>{
	try {
		let {data} = await axios.get('https://video24.app/openApi/v1/content', {
			params: params,
			headers: {
				'Authorization': mpKey
			}
		});

		if (data.code == 200) {

			for (let i = 0; i < data.result.data.length; i++) {
				let v = data.result.data[i];
				v.created_at = $util.dateFormat2(v.created_at);
				v.view_cnt = $util.numberToKorean(v.view_cnt);

				if (route.query.v != v.video_id) {
					if(chkDuvideo(v.video_id) == false){
						VOD.value.push(v);
					}
				}
			}

			TOTAL.value = data.result.totalCnt;
		}
	}catch (e) {

	}
}



onMounted(async ()=>{

	VOD.value = [];
/*	await getVodList({
		channelId:VIDEO.value.channel_id,
		limit:20,
		type:'vod',
		//keyword:VIDEO.value.title,
	});*/



	await getVodList({
		limt:10,
		type:'vod',
		landscape:true,
		randkey:dayjs().format('YYYYMMDDHHmm')
	});
	//shuffle(VOD.value);


});

</script>

<style scoped>
	.mask{
		-webkit-mask-image: linear-gradient(to left,transparent 0,transparent 20px,#000 77px,#000 100%);
		mask-image: linear-gradient(to left,transparent 0,transparent 20px,#000 77px,#000 100%);
	}

	.maskFull {
		-webkit-mask-image: linear-gradient(to right,transparent 0,transparent 21px,#000 77px,#000 50%,transparent 50%,transparent 100%),linear-gradient(to left,transparent 0,transparent 21px,#000 77px,#000 50%,transparent 50%,transparent 100%);;
		mask-image: linear-gradient(to right,transparent 0,transparent 21px,#000 77px,#000 50%,transparent 50%,transparent 100%),linear-gradient(to left,transparent 0,transparent 21px,#000 77px,#000 50%,transparent 50%,transparent 100%);
	}
</style>
