<template>
	<div class="mb-5">
		<div class="px-0">
			<div class="p-3 mb-2 text-xl">
				{{$util.titleMake(VIDEO.title)}}
			</div>

			<div class="md:flex justify-between items-center">
				<div>
					<div class="flex items-center">
						<div class="pr-3 pl-2 w-18 ">

							<UAvatar :src="VIDEO.channel_profile_image_url" v-if="VIDEO.channel_profile_image_url" size="lg" :alt="VIDEO.channel_name" class="profileThumb" />
							<UAvatar src="/image/non-profile.png" v-else  :alt="VIDEO.channel_name" class="profileThumb object-contain" size="lg"/>

						</div>
						<div>
							<div>{{ VIDEO.channel_name }}</div>
							<div class="text-xs text-gray-400">
								@{{ VIDEO.channel_adm_id}}
							</div>
						</div>
					</div>
				</div>
				<div class="px-2 md:px-0 pt-3 md:pt-0 pb-3 md:pb-0">
					<div class="flex items-center gap-2">
						<div class=" rounded-full px-2 pl-1 pr-1 pt-1 pb-1 text-sm  flex items-center " :class="{'bg-gray-700/40' : colorMode.value=='dark', 'bg-gray-200' : colorMode.value=='light'}">

							<div class="px-3">
								<button type="button" onclick="alert('데모에서 제공하지 않습니다.')"><i class="ph ph-thumbs-up"></i> 1.3천</button>
							</div>
							<div class="border-l border-gray-300 px-4">
								<button type="button" onclick="alert('데모에서 제공하지 않습니다.')"><i class="ph ph-thumbs-down"></i></button>
							</div>

						</div>
						<div class=" rounded-full px-2 pl-3 pr-3 pt-1 pb-1 text-sm " :class="{'bg-gray-700/40' : colorMode.value=='dark', 'bg-gray-200' : colorMode.value=='light'}">
							<button type="button" @click="sharePopup = true">
								<i class="ph ph-share-fat"></i> 공유
							</button>


						</div>
						<div class=" rounded-full px-2 pl-3 pr-3 pt-1 pb-1 text-sm " :class="{'bg-gray-700/40' : colorMode.value=='dark', 'bg-gray-200' : colorMode.value=='light'}">
							<button type="button" onclick="alert('데모에서 제공하지 않습니다.')">
								<i class="ph ph-list-plus"></i> 보관
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-3">
				<div class=" text-sm p-3   md:rounded-lg min-h-100  " style="max-width:100vw" :class="{'bg-gray-700/20' : colorMode.value == 'dark' , 'bg-gray-100' : colorMode.value == 'light'}">
					조회수 {{VIDEO.view_cnt || 0}}회 업로드 {{$util.dateFormat2(VIDEO.created_at) }}
					<span v-html="$util.nl2br(VIDEO.description)" class="px-3 break-words"></span>
				</div>
			</div>

			<div class="mt-5 px-2 space-y-5">

				<div class="flex gap-5">
					<div>
						<strong class="text-xl">댓글 1,000개</strong>
					</div>
					<div>
						<button type="button" class="flex items-center">
							<i class="ph ph-text-align-left text-2xl"></i>
							<span class="text-sm">
								정렬 기준
							</span>
						</button>
					</div>
				</div>

				<div class="flex items-center">
					<div class="pr-4">
						<UAvatar :src="VIDEO.channel_profile_image_url" v-if="VIDEO.channel_profile_image_url" size="lg" :alt="VIDEO.channel_name" class="profileThumb" />
						<UAvatar src="/image/non-profile.png" v-else  :alt="VIDEO.channel_name" class="profileThumb object-contain" size="lg"/>
					</div>
					<div class="flex-auto">
						<input type="text" placeholder="댓글 추가..." class="border-b w-full" style="outline: none">
					</div>
				</div>

				<div class="space-y-6">

					<div class="flex items-center" v-for="i in 30">
						<div class="pr-4">
							<UAvatar :src="`https://picsum.photos/100/100/?random&v=${i}`"  class="profileThumb object-contain" size="lg"/>
						</div>
						<div class="flex-auto space-y-1">
							<div class="text-sm">
								@{{ $util.randomName() }} <span class="text-gray-300 text-[13px] ml-2">1개월전</span>
							</div>
							<div class="text-sm">
								댓글은 직접 개발 해주세요.
							</div>
							<div class="text-sm flex items-center gap-3  ">
								<button type="button" >
									<i class="ph ph-thumbs-up"></i> 1.3천
								</button>

								<button type="button" >
									<i class="ph ph-thumbs-down"></i>
								</button>
							</div>
						</div>
					</div>

				</div>


			</div>
		</div>


		<!-- 공유팝업-->

		<UModal v-model="sharePopup" class="z-[999999] ">
			<div class="p-5 space-y-5">
				<div>공유</div>
				<div class="flex flex-row gap-6">

					<div class="text-center">
						<button type="button" class="bg-neutral-200 rounded-full w-[60px] h-[60px] flex justify-center items-center">
							<i class="ph ph-code text-3xl"></i>
						</button>
						<div class="text-[13px] mt-2">
							퍼가기
						</div>
					</div>

					<div class="text-center">
						<button type="button" class="bg-neutral-200 rounded-full overflow-hidden w-[60px] h-[60px] bg-[#ffe811] p-2 flex justify-center items-center">
							<img src="https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202309/8d13d66cce0c073d197773a49f8463b5.svg" class="w-full h-full" alt="">
						</button>
						<div class="text-[13px] mt-2">
							카카오톡
						</div>
					</div>

					<div class="text-center">
						<button type="button" class="bg-neutral-200 rounded-full  w-[60px] h-[60px] flex justify-center items-center">
							<img src="https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202309/fd96a0803b6d581f2b3055f8da827b0f.svg" class="w-full h-full" alt="">
						</button>
						<div class="text-[13px] mt-2">
							Facebook
						</div>
					</div>

				</div>
			</div>
		</UModal>

		<!-- 공유팝업-->


	</div>







</template>

<script setup>
const VIDEO =  useVideo();
const colorMode = useColorMode();
const {$util} = useNuxtApp();
const route = useRoute();

const sharePopup = ref(false);

</script>

<style scoped>

</style>
