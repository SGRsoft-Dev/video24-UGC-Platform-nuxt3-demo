<template>
  <div class="relative h-full pl-3">
    <div class="relative h-full overflow-auto pb-[40px]">
      <div class="sticky top-0 backdrop-blur">
        <div class="p-4 text-center flex items-center text-[16px]">

	        <i class="ph ph-list mr-1"></i>

          <NuxtLink to="/dashboard">
            <img
              :src="logo"
              class="px-2 w-full h-10 object-contain"
              alt=""
            >
          </NuxtLink>
        </div>
      </div>
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
            <div v-if="mm.subs">
              <div @click="mm.isOpen = !mm.isOpen; closeOthers(mm)">
                <div
                  class="flex text-[14px] py-3 pl-4 pr-3 transition text-bold"
                  :class="{'text-[#6366f1]' : route.path.indexOf(mm.toPath) > -1}"
                >
                  <i
                    :class="mm.icon"
                    class="self-center mr-2"
                  />
                  <div class="flex-1">
                    {{ mm.title }}
                  </div>
                  <div type="button">
                    <i
                      class="ph"
                      :class="mm.isOpen ? 'ph-caret-up' : 'ph-caret-down'"
                    />
                  </div>
                </div>
              </div>
              <transition name="slide-fade">
                <div
                  v-if="mm.isOpen"
                  class="mb-3 bg-[#f8f8f8] w-full"
                >
                  <div
                    v-for="mmm in mm.subs"
                    :key="mmm.index"
                    class=" transition"
                  >
                    <NuxtLink :to="mmm.to">
                      <div class="pl-4 py-3 text-[13px] flex">
                        <i
                          class="ph ph-dot-outline self-center"
                        />
                        <div class="pl-1.5">
                          {{ mmm.title }}
                        </div>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </transition>
            </div>
            <div v-else>
              <NuxtLink
                :class="{'router-link-exact-active': mm.toPath === '/' + route.path.split('/')[1] + '/' + route.path.split('/')[2]  }"
                :to="mm.to"
              >
                <div
                  class="flex text-[16px] py-2 pl-4 pr-3 mb-2 hover:font-bold transition"
                  :class="{'text-[#6366f1]': mm.toPath === '/' + route.path.split('/')[1] + '/' + route.path.split('/')[2] || route.path.indexOf(mm.toPath) > -1 , 'dark' : isDark , 'light' : !isDark }"
                >
                  <i
                    :class="mm.icon"
                    class="self-center mr-2"
                  />
                  <div class="flex-1">
                    {{ mm.title }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="absolute w-full p-3  bottom-0  backdrop-blur">
      <a
        href="https://ncloud.com"
        target="_blank"
      >
        <img
          src="~/assets/image/ncloud-logo.png"
          class="h-[20px]"
          alt=""
        >
      </a>
    </div>
  </div>
</template>

<script setup>
import darkLogo from '@/assets/image/logo_dark.svg';
import lightLogo from '@/assets/image/logo.svg';
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
// Composable 선언
const route = useRoute();

// 전역 상태 선언
const dashboardLeftMenu = useState('dashboardLeftMenu');

// ref 선언
const menus = ref();

/**
 * @description 하위 메뉴를 제외한 모든 메뉴를 닫는다.
 * @param {Object} menu 클릭한 메뉴
 */
const closeOthers = (menu) => {
  menus.value.forEach((m) => {
    if (m.subs[0] !== menu) {
      // eslint-disable-next-line no-param-reassign
      m.subs[0].isOpen = false;
    }
  });
};

menus.value = [
  {
    subs: [
      {
        title: 'HOME',
        icon: 'ph ph-house-simple',
        to: '/',
      },
    ],
  },

	{
		subs: [
			{
				title: 'LIVE',
				icon: 'ph ph-broadcast',
				to: '/live',
			}
		],
	},
  {
    subs: [
	    {
		    title: 'VOD',
		    icon: 'ph ph-monitor-play',
		    to: '/vod',
	    }
    ],
  },


];

dashboardLeftMenu.value = menus.value;
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
