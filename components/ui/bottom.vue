<template>
  <div class="flex items-center h-full border-t border-[#eeeeee] dark:border-[#252424] bg-white dark:bg-neutral-900 ">
	  <div v-for="( m , i) in leftMenu" class="flex-1">
		  <div v-for="(mm , ii) in m.subs">
			 <NuxtLink :to="mm.to">
				 <div class="flex justify-center items-center">
					 <div class="text-center">
						 <div :class="{'dark' : isDark , 'light' : !isDark}">
							 <i
								 :class=" route.path == mm.to ? 'ph-fill '+mm.icon : 'ph '+mm.icon"
								 class="self-center text-2xl "
							 />
						 </div>
						 <div class="text-sm" :class="{'dark' : isDark , 'light' : !isDark}">
							 {{mm.title}}
						 </div>
					 </div>
				 </div>
			  </NuxtLink>
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
const route = useRoute();
const leftMenu = useState('leftMenu');
const leftMenuOpen = useState('leftMenuOpen');
const menus = ref();

const appConfig = useAppConfig();
menus.value = appConfig.mobileBottomMenu;

leftMenu.value = menus.value;
</script>

<style scoped>
.router-link-exact-active  .light {
	color: #ff4b5f;
}

.router-link-exact-active  .dark {
	color: #fa132c;
}

</style>
