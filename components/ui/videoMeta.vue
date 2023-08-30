<template>
	<div class="mb-5">
		<div class="px-0">
			<div class="p-3 mb-2 text-xl">
				{{$util.titleMake(VIDEO.title)}}
			</div>

			<div class="md:flex justify-between">
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
				<div class=" text-sm p-3   md:rounded-lg min-h-100  " style="max-width:100vw" v-if="VIDEO.description" :class="{'bg-gray-700/20' : colorMode.value == 'dark' , 'bg-gray-100' : colorMode.value == 'light'}">
					<div v-html="$util.nl2br(VIDEO.description)" class="px-3 break-words"></div>
				</div>
			</div>
		</div>

		<div class="px-3 mt-5">
			<!-- 라이브리 시티 설치 코드 -->
<!--			<div id="lv-container" data-id="city" data-uid="MTAyMC81ODkyNS8zNTM4Nw==" >

			</div>-->
			<!-- 시티 설치 코드 끝 -->


			<div id="disqus_thread" ></div>
		</div>
	</div>




</template>

<script setup>
const VIDEO = useState('VIDEO');
const colorMode = useColorMode();
const {$util} = useNuxtApp();
const route = useRoute();

//라이브라 댓글 프러그인
const livereCommentPlugin = ()=>{
	window.livereOptions ={
		refer:route.fullPath,
	};
	(function(d, s) {
		var j, e = d.getElementsByTagName(s)[0];

		if (typeof LivereTower === 'function') { return; }

		j = d.createElement(s);
		j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
		j.async = true;

		e.parentNode.insertBefore(j, e);
	})(document, 'script');
}

const disqusPlugin = ()=>{
	(function() { // DON'T EDIT BELOW THIS LINE
		var d = document, s = d.createElement('script');
		s.src = 'https://mediaplus-ugc-demo.disqus.com/embed.js';
		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
	})();
}

onMounted(()=>{

	//livereCommentPlugin();

	disqusPlugin();
})
</script>

<style scoped>

</style>
