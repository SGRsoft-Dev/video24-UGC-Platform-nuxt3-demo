<template>
	<div class="sticky top-0 bg-white/100 backdrop-blur border-b">
		<div class="p-4 ">
			<div class="pl-56 flex">
				<div class="flex-1"></div>
				<div class="w-4/12">
					<UInput icon="i-heroicons-magnifying-glass-20-solid  " size="sm" color="white" :trailing="false" placeholder="검색하기" />
				</div>
				<div class="flex-1"></div>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	name: "Gnb"
}
</script>

<style scoped>

</style>
