<template>

	<div class="fixed top-0 w-full backdrop-blur z-[999999] " :class="{'bg-neutral-900' : setDark , 'bg-white' : !setDark , }">
		<div class="p-4 ">
			<div class=" flex items-center">
				<div class="w-48 flex pl-2">

					<button @click="setLeftMenuOpen" class="mr-2 hidden md:inline" type="button" >
						<i class="ph ph-list mr-1 text-2xl" :class="setDark ? 'text-white' : 'text-black'"></i>
					</button>

					<NuxtLink to="/">
						<img
							:src="logo"
							class="  h-10 object-contain  md:w-full w-40"
							alt=""
						>
					</NuxtLink>

				</div>
				<div class="flex-1"></div>
				<div class="w-4/12 gnbSearchInput hidden md:inline">
					<UInput icon="i-heroicons-magnifying-glass-20-solid  "  variant="outline" size="lg" color="white" :trailing="false" placeholder="검색하기" />
				</div>
				<div class="flex-1 text-right">
					<i class="ph-fill mr-2" :class="setDark ? 'ph-moon text-white' : 'ph-sun-dim text-dark'"></i>
					<UToggle v-model="isDark" />
				</div>
			</div>

		</div>
	</div>
</template>

<script setup>
const route = useRoute();
const colorMode = useColorMode();
const fullMode = useState('fullMode');
const isDark = computed({
	get () {
		return colorMode.value === 'dark'
	},
	set () {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	}
});

const setDark = computed(() => {
	let darkMode =  colorMode.value == 'dark'   ? true : false;
	if(fullMode.value && route.path.split('/')[1] == 'watch'){
		darkMode = true;
	}
	return darkMode
});

const logo = computed(() => {
	let logoFile =  colorMode.value == 'dark'   ? '/image/logo_dark.svg' : '/image/logo.svg';
	if(fullMode.value && route.path.split('/')[1] == 'watch'){
		logoFile = '/image/logo_dark.svg';
	}
	return logoFile

});

const leftMenuOpen = useState('leftMenuOpen');
const setLeftMenuOpen = () => {
	leftMenuOpen.value = !leftMenuOpen.value;
};
</script>

<style scoped>

</style>
