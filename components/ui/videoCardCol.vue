<template>
	<NuxtLink :to="`/watch?v=${v.video_id}`">
		<div class="flex mb-4">
			<div class="thumbWrap" :style="{background:`url(${v.thumb_url}) `}">
				<div class="backdrop-blur-cu1">
					<NuxtImg :src="v.thumb_url ? v.thumb_url : '/image/b.png'" :class="{'bg-gray-100':!v.thumb_url}" :alt="v.title" onerror="this.src='/image/b.png'" class="w-full h-full object-contain " loading="lazy"/>
				</div>
			</div>
			<div class="text-base pl-2  infoWrap">
				<div>
					<div class="el2">
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
	</NuxtLink>
</template>

<script setup>

defineProps({
	v: {
		type: Object,
		required: true
	}
});
const {$util} = useNuxtApp();
</script>

<style scoped>

	.thumbWrap{
		background-repeat: no-repeat;
		background-position: center;
		background-size: 300%;
	}

	.thumbWrap img{
		width:140px;

		object-fit: contain;
		aspect-ratio: 16/9;
	}
	.infoWrap{
		flex:1;
		width:calc(100% - 140px);
	}
</style>
