<template>
	<div class="flex">
		<div class="flex3">
			<div class="px-5">
				<div class="p-3 text-xl">
					{{VIDEO.title}}
				</div>
				<div class="pl-3">
					<div class="bg-gray-700 text-sm p-3 rounded-lg min-h-100" v-if="VIDEO.description">
						{{VIDEO.description}}
					</div>
				</div>
			</div>
		</div>
		<div class="px-5 flex1">
			<div class="p-3 text-xl">
				관련 영상
			</div>
		</div>
	</div>

</template>

<script setup>
const VIDEO = useState('VIDEO');
</script>

<style scoped>

</style>
