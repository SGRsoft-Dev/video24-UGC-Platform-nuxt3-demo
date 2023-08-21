<template>
	<div class="sticky top-0  backdrop-blur ">
		<div class="p-4 ">
			<div class="pl-56 flex items-center">
				<div class="flex-1"></div>
				<div class="w-4/12">
					<UInput icon="i-heroicons-magnifying-glass-20-solid rounded-full " size="lg" color="white" :trailing="false" placeholder="검색하기" />
				</div>
				<div class="flex-1 text-right">
					<i class="ph-fill mr-2" :class="isDark ? 'ph-moon text-white' : 'ph-sun-dim text-dark'"></i>
					<UToggle v-model="isDark" />
				</div>
			</div>

		</div>
	</div>
</template>

<script setup>
const colorMode = useColorMode();
const isDark = computed({
	get () {
		return colorMode.value === 'dark'
	},
	set () {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	}
});
</script>

<style scoped>

</style>
