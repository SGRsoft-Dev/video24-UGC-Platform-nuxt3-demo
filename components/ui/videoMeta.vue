<template>
	<div class="mb-5">
		<div class="px-0">
			<div class="p-3 mb-2 text-xl">
				{{VIDEO.title}}
			</div>

			<div class="flex justify-between">
				<div>
					<div class="flex items-center">
						<div class="pr-3 pl-2 w-18 ">

							<UAvatar :src="VIDEO.channel_profile_image_url" v-if="VIDEO.channel_profile_image_url" size="lg" alt="Avatar" class="profileThumb" />
							<UAvatar src="/image/non-profile.png" v-else  alt="Avatar" class="profileThumb object-contain" size="lg"/>

						</div>
						<div>
							<div>ChannelName</div>
							<div class="text-xs text-gray-400">
								바로가기
							</div>
						</div>
					</div>
				</div>
				<div class="">
					<div class="flex items-center">
						<div class=" rounded-full px-2 pl-3 pr-3 pt-1 pb-1 text-sm mr-3"
							 :class="{'bg-gray-700/40' : colorMode.value=='dark', 'bg-gray-200' : colorMode.value=='light'}">
							<i class="ph ph-eye mr-1"></i> 조회수 {{VIDEO.view_cnt | 0}}
						</div>
						<div class=" rounded-full px-2 pl-3 pr-3 pt-1 pb-1 text-sm mr-3"
							 :class="{'bg-gray-700/40' : colorMode.value=='dark', 'bg-gray-200' : colorMode.value=='light'}">
							<i class="ph ph-calendar-blank mr-1"></i> 업로드 {{$util.dateFormat2(VIDEO.created_at) }}
						</div>
					</div>
				</div>
			</div>

			<div class="mt-3">
				<div class=" text-sm p-3  rounded-lg min-h-100" v-if="VIDEO.description" :class="{'bg-gray-700/20' : colorMode.value == 'dark' , 'bg-gray-100' : colorMode.value == 'light'}">
					<div v-html="$util.nl2br(VIDEO.description)" class="px-3"></div>
				</div>
			</div>
		</div>
	</div>

</template>

<script setup>
const VIDEO = useState('VIDEO');
const colorMode = useColorMode();
const {$util} = useNuxtApp();
</script>

<style scoped>

</style>
