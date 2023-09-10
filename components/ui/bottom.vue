<template>
  <div class="flex items-center h-full ">
	  <div v-for="( m , i) in leftMenu" class="flex-1">
		  <div v-for="(mm , ii) in m.subs">
			 <NuxtLink @click="goLink(mm)" :class="{'router-link-active' : route.path == mm.to || (route.path.indexOf('/' + mm.to.split('/')[1]) > -1 && mm.to.split('/')[1] !='') }">
				 <div class="flex justify-center items-center">
					 <div class="text-center">
						 <div :class="{'dark' : isDark , 'light' : !isDark}">
							 <i
								 :class=" route.path == mm.to  || (route.path.indexOf('/' + mm.to.split('/')[1]) > -1 && mm.to.split('/')[1] !='')  ? 'ph-fill '+mm.icon : 'ph '+mm.icon"
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
const router = useRouter();
const leftMenu = useState('leftMenu');
const leftMenuOpen = useState('leftMenuOpen');
const menus = ref();

const appConfig = useAppConfig();
menus.value = appConfig.mobileBottomMenu;

const goLink = (l)=>{
	console.log('!@!@',l);
	if(l.href){
		location.href=l.to;
	}else{
		router.replace(l.to);
	}
}
leftMenu.value = menus.value;
</script>

<style scoped>
.router-link-active  .light ,
.router-link-exact-active  .light {
	color: #ff4b5f;
}

.router-link-active  .dark ,
.router-link-exact-active  .dark {
	color: #fa132c;
}

</style>
