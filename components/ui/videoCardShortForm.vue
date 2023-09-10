<template>
	<NuxtLink style="cursor: pointer"  @click="goShort(v.video_id)">
		<div class="w-full overflow-hidden">
			<div class="videoThumbSf rounded-lg dark:shadow-sm overflow-hidden bg-gray-200/15 relative" :style="{background:`url(${v.thumb_url}) `}">
				<div class="backdrop-blur-cu1 aspect-[9/20]" >
					<img :src="v.thumb_url ? v.thumb_url : '/image/b.png'" :alt="v.title" class="w-full h-full object-cover " placeholder loading="lazy"/>
				</div>


			</div>
			<div class="text-base pt-2 px-1 md:px-0 ">
				<div class="flex">

					<div>
						<div class="el2 w-full break-words overflow-hidden" >
							{{$util.titleMake(v.title)}}
						</div>
						<div class="text-sm text-gray-400 pt-1">
							{{v.channel_name}}
						</div>
						<div class="text-xs text-gray-400 pt-1">
							조회수 {{v.view_cnt || 0}}회<i class="ph ph-dot "></i>{{$util.textTime(v.created_at)}}
						</div>

					</div>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup>

defineProps({
	v: {
		type: Object,
		required: true
	}
})
const ShortsList = useState('ShortsList');
const {$util} = useNuxtApp();
const router = useRouter();

const goShort = (video_id)=>{
	ShortsList.value = [];
	//router.push('/shorts/'+video_id);
	location.href='/shorts/'+video_id;
}
</script>

<style scoped>

</style>
