<template>

	<div class="h-screen md:pt-5 md:max-h-[88vh] "   v-if="video">



		<div class="mx-auto w-full md:w-[100vw] sm:max-w-[55vw] xl:max-w-[40vw] md:max-h-[85vh] h-full  " >
			<div class="md:flex h-full md:gap-4">

				<div class=" md:rounded-xl dark:dark:bg-neutral-800 bg-gray-100 h-full flex-auto shadow-md relative">
					<div class="absolute w-full h-full md:rounded-xl overflow-hidden" v-if="video" :style="{'background':`url(${video.thumb_url}) center / cover`}">

						<div >
							{{video.video_id}}
						</div>


						<div class="absolute right-5 bottom-[120px]">
							<UiShortsBtns :video="video" :isMobile="true"/>
						</div>

					</div>

				</div>

				<div class="h-full min-w-[30px] hidden md:inline">


						<UiShortsBtns :video="video"/>


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
