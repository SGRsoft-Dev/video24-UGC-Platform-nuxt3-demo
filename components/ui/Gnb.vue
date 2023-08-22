<template>
	<div class="fixed top-0 w-full backdrop-blur z-40 " :class="{'bg-black' : colorMode.value == 'dark' , 'bg-white' : colorMode.value == 'light' , }">
		<div class="p-4 ">
			<div class=" flex items-center">
				<div class="w-48 flex">

					<button @click="setLeftMenuOpen" class="mr-2" type="button">
						<i class="ph ph-list mr-1"></i>
					</button>

					<NuxtLink to="/">
						<img
							:src="logo"
							class=" w-full h-10 object-contain"
							alt=""
						>
					</NuxtLink>

				</div>
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
import darkLogo from "assets/image/logo_dark.svg";
import lightLogo from "assets/image/logo.svg";

const colorMode = useColorMode();
const isDark = computed({
	get () {
		return colorMode.value === 'dark'
	},
	set () {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	}
});

const logo = computed(() => {
	return isDark.value ? darkLogo : lightLogo;
});

const leftMenuOpen = useState('leftMenuOpen');
const setLeftMenuOpen = () => {
	leftMenuOpen.value = !leftMenuOpen.value;
};
</script>

<style scoped>

</style>
