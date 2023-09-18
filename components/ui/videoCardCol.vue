<template>
	<div class="overflow-auto">
		<NuxtLink :to="`/watch?v=${v.video_id}`">
			<div class="flex mb-4">
				<div class="thumbWrap rounded-md overflow-hidden shadow-sm" :style="{background:`url(${v.thumb_url}) `}">
					<div class="backdrop-blur-cu1  ">
						<div class="">
							<img :src="v.thumb_url ? v.thumb_url : '/image/b.png'" :class="{'bg-gray-100':!v.thumb_url}" :alt="v.title"  class="w-full h-full object-contain " loading="lazy"/>
						</div>
					</div>
				</div>
				<div class="text-base pl-3  infoWrap">
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
	</div>
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
		width:20%;
		min-width:140px;

	}

	.thumbWrap img{

		object-fit: contain;
		aspect-ratio: 16/9;
	}
	.infoWrap{
		flex:1;
		width:calc(100% - 140px);
	}
</style>
