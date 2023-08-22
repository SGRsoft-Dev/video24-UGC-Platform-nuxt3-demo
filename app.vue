<template>
	<NuxtLayout>
		<NuxtLoadingIndicator :color="'red'"/>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
const VOD = useState('VOD');
const TOTAL = useState('TOTAL');
</script>
