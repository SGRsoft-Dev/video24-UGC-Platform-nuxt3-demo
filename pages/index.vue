<template>
	<div class="p-3">

		<div class="videoRoot">
			<div v-for="(v , i) in VOD" class="videoItem">
				<img :src="v.thumb_url" :alt="v.title" class="videoThumb">
				<div class="text-base pt-2">
					<div class="flex">
						<div class="pr-3">
							<img :src="v.channel_profile_image_url" alt="" class="rounded-full w-10 h-10 object-cover">
						</div>
						<div>
							<div>
								{{v.title}}
							</div>
							<div class="text-sm text-gray-400 pt-1">
								{{v.channel_name}}
							</div>
							<div class="text-xs text-gray-400 pt-1">
								조회수 {{v.view_cnt || 0}}<i class="ph ph-dot "></i>{{$util.textTime(v.created_at)}}
							</div>

						</div>
					</div>
				</div>

			</div>




		</div>


	</div>
</template>

<style scoped>

.videoRoot{
	display: flex;
	flex-wrap: wrap;
	margin-left:-5px;
	margin-right:-5px;
	box-sizing: inherit;
}
.videoItem{
	width: 20%;
	padding:10px;
}
.videoThumb{
	aspect-ratio: 16/9;
	object-fit: cover;
}
</style>

<script setup>
import axios from "axios";
const runtimeConfig = useRuntimeConfig();
const mpKey = runtimeConfig.public.mediaPlusApiKey;
const config = ref(runtimeConfig);
const {$util} = useNuxtApp();

/**
 * VOD 리스트 가져오기
 * @type {*[]}
 */
const VOD = useState('VOD');
const TOTAL = useState('TOTAL');

const getVodList = async ()=>{
	let {data} = await axios.get('https://mediaplus.co.kr/openApi/v1/vod',{
		headers:{
			'Authorization':mpKey
		}
	});

	if(data.code == 200){
		VOD.value = data.result.data;
		TOTAL.value = data.result.totalCnt;
	}

}

useAsyncData(async ()=>{
	await getVodList();
});
</script>
