<template>
  <div
    class="min-w-[1320px] relative"
  >
	  <UiGnb/>
    <div
      class="w-[220px] h-full fixed top-0 left-0 bg-white border-r border-[#64646419] z-20"
    >
      <UiLnb />
    </div>
    <div class="pl-[220px] h-full">
      <slot />
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
