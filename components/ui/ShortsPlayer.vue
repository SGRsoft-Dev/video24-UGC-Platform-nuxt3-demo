<template>

	<div class="h-screen pt-5 md:max-h-[88vh] "   v-if="video">



		<div class="mx-auto md:w-[40vw] md:max-w-[520px] md:max-h-[85vh] h-full  ">
			<div class="md:flex h-full md:gap-4">

				<div class="rounded-xl dark:dark:bg-neutral-800 bg-gray-100 h-full flex-auto shadow-md relative">
					<div class="absolute w-full h-full rounded-xl overflow-hidden" v-if="video" :style="{'background':`url(${video.thumb_url}) center / cover`}">

						<div >
							{{video.video_id}}
						</div>
					</div>

				</div>

				<div class="h-full min-w-[30px] ">
					<div class="flex flex-col-reverse h-full items-end text-center gap-4">

						<div class="space-y-1">
							<button class=""  type="button">
								<img :src="video.channel_profile_image_url" class="w-[40px] h-[40px] rounded object-cover" alt="">
							</button>
						</div>

						<div class="space-y-1">
							<button class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-800 bg-gray-200 flex items-center justify-center"  type="button">
								<i class="ph-fill ph-dots-three-outline"></i>
							</button>

						</div>

						<div class="space-y-1">
							<button class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-800 bg-gray-200 flex items-center justify-center"  type="button">
								<i class="ph-fill ph-share-fat"></i>
							</button>
							<div class="text-sm">공유</div>
						</div>

						<div class="space-y-1">
							<button class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-800 bg-gray-200 flex items-center justify-center"  type="button">
								<i class="ph-fill ph-chat-text"></i>
							</button>
							<div class="text-sm">291</div>
						</div>

						<div class="space-y-1">
							<button class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-800 bg-gray-200 flex items-center justify-center"  type="button">
								<i class="ph-fill ph-thumbs-down"></i>
							</button>
							<div class="text-sm">싫어요</div>
						</div>

						<div class="space-y-1">
							<button class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-800 bg-gray-200 flex items-center justify-center"  type="button">
								<i class="ph-fill ph-thumbs-up"></i>
							</button>
							<div class="text-sm">1.0천</div>
						</div>


					</div>
				</div>
			</div>
		</div>




	</div>

</template>

<script setup>

defineProps({
	video: {
		type: Object,
		required: true
	}
})

</script>

<style scoped>

</style>
