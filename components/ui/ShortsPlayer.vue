<template>

	<div class="h-screen md:pt-5 md:max-h-[90vh] "   v-if="video">



		<div class="mx-auto w-full md:w-[100vw] sm:max-w-[70vw] xl:max-w-[40vw] md:max-h-[95vh] h-full  " >
			<div class="md:flex h-full md:gap-4">

				<div class=" md:rounded-xl dark:dark:bg-neutral-800 bg-gray-100 h-full flex-auto shadow-md relative md:aspect-[9/20] md:aspect-[9/18]">
					<div class="absolute w-full h-full md:rounded-xl overflow-hidden " v-if="video" :style="{'background':`url(${video.thumb_url}) center / cover`}">

						<div>

								<UiMiniPlayer :playUrl="video.hls_play_url" :poster="video.thumb_url" aspectRatio="9/20" objectFit="cover" v-if="active" :width="shortItemWidth" :height="shortItemHeight" />

						</div>


						<div class="absolute right-5 bottom-[10vh] md:hidden z-[99]">
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

const props = defineProps({
	video: {
		type: Object,
		required: true
	},
	active: {
		type: Boolean,
		default: false
	},
	aspectRatio: {
		type: String,
		default: null
	},
	shortItemHeight: {
		type: Number,
		default: 0
	},
	shortItemWidth: {
		type: Number,
		default: 0
	},
});
const windowSize = useState('windowSize');
const {$util} = useNuxtApp();


</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: opacity .2s;
}
.fade-enter, .fade-leave-active {
	opacity: 0;
}

</style>
