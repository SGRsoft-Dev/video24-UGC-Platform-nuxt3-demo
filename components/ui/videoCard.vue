<template>
	<NuxtLink :to="`/watch?v=${v.video_id}`">
		<div class="videoThumb bg-gray-200/15 " :style="{background:`url(${v.thumb_url}) `}">
			<div class="backdrop-blur-cu1">
				<img :src="v.thumb_url" :alt="v.title" class="w-full h-full object-contain " loading="lazy">
			</div>
		</div>
		<div class="text-base pt-2 px-4 md:px-0">
			<div class="flex">
				<div class="pr-3  ">
					<UAvatar :src="v.channel_profile_image_url" v-if="v.channel_profile_image_url"  :alt="v.channel_name" class="profileThumb" />
					<UAvatar  src="~/assets/image/non-profile.png" v-else  :alt="v.channel_name" class="profileThumb object-contain"/>
				</div>
				<div>
					<div class="el">
						{{v.title}}
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
})
</script>

<style scoped>

</style>
