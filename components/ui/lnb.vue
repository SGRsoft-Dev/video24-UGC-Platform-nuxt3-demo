<template>
  <div class="relative h-full pl-3">
    <div class="relative h-full overflow-auto pb-[40px] pt-[80px]">

      <transition-group name="fade">
        <div
          v-for="m in menus"
          :key="m"
        >
          <div
            v-for="mm in m.subs"
            :key="mm"
            class="cursor-pointer"
          >

            <div >

              <NuxtLink :to="mm.to">
                <div
                  class="flex text-[16px] py-2 pl-4 pr-3 mb-2 hover:font-bold transition"
                  :class="{'text-[#6366f1]': mm.toPath === '/' + route.path.split('/')[1] + '/' + route.path.split('/')[2] || route.path.indexOf(mm.toPath) > -1 , 'dark' : isDark , 'light' : !isDark }"
                >
                  <i
                    :class=" route.path == mm.to ? 'ph-fill '+mm.icon : 'ph '+mm.icon"
                    class="self-center mr-2"
                  />
                  <div class="flex-1 transition" v-show="leftMenuOpen">
                    {{ mm.title }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="absolute w-full p-3  bottom-0  backdrop-blur" v-show="leftMenuOpen">
      <a
        href="https://ncloud.com"
        target="_blank"
      >
        <img
          src="/image/ncloud-logo.png"
          class="h-[20px]"
          alt=""
        >
      </a>
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


// Composable 선언
const route = useRoute();

// 전역 상태 선언
const leftMenu = useState('leftMenu');

const leftMenuOpen = useState('leftMenuOpen');


// ref 선언
const menus = ref();

const appConfig = useAppConfig();
menus.value = appConfig.siteMenu;

leftMenu.value = menus.value;
</script>

<style scoped>
.router-link-exact-active > div {

  font-weight: bold;
	border-radius: 10px;
}

.router-link-exact-active > div.light {
	background-color: rgba(238, 238, 238, 0.5);
	color: #ff4b5f;
}

.router-link-exact-active > div.dark {
	background-color: rgba(238, 238, 238, 0.2);
	color: #fa1029;
}


.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}

.slide-fade-move,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.slide-fade-leave-active {
  position: absolute;
}

</style>
