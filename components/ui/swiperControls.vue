<script setup lang="ts">
const swiper = useSwiper();

const nextSlide = () => {
	swiper.value.slideNext();
}

const prevSlide = () => {
	swiper.value.slidePrev();
}

defineExpose({
	nextSlide,
	prevSlide
})
</script>

<template>

</template>

<style scoped>

</style>
