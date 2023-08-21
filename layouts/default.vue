<template>
  <div
    class="min-w-[1320px] relative"
  >
	  <UiGnb/>
    <div
      class="w-[220px] h-full fixed top-0 left-0  z-20 backdrop-blur"
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
