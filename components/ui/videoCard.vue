<template>
	<NuxtLink :to="`/watch?v=${v.video_id}`">
		<img :src="v.thumb_url" :alt="v.title" class="videoThumb">
		<div class="text-base pt-2">
			<div class="flex">
				<div class="pr-3 w-14 ">
					<UAvatar :src="v.channel_profile_image_url" v-if="v.channel_profile_image_url"  alt="Avatar" class="profileThumb" />
					<UAvatar  src="~/assets/image/non-profile.png" v-else  alt="Avatar" class="profileThumb object-contain"/>

				</div>
				<div>
					<div>
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
