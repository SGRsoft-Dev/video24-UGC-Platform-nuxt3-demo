<template>

	<div :class="{ 'md:container md:mx-auto  ' : !fullMode , 'md:pt-5' : !fullMode && watchMode}">
		<div :class="{'fullMode ' : fullMode && watchMode , 'basicMode ' : !fullMode && watchMode}">
			<div class="leftWrap" >
				<div class="playerWrap relative">
					<div class="playerBody  flex items-center justify-center aspect-video"  >
						<USkeleton class="playerBody mb-2 w-full h-full"  />
					</div>

				</div>

				<div v-if="watchMode" class=" mt-3" :class="{'md:container md:mx-auto' : fullMode   }">
					<div class="px-4 md:px-0 space-y-5">
						<USkeleton class=" w-full h-[20px]" />

						<div class="flex    ">
							<USkeleton class="h-8 w-8 " :ui="{ rounded: 'rounded-full' }" />
							<div class="space-y-2 pl-2 ">
								<USkeleton class="h-4 w-[250px]" />
								<USkeleton class="h-4 w-[200px]" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="rightWrap px-5 space-y-2 pt-10 " v-if="!fullMode && watchMode">

				<div class="flex " v-for="i in 10">
					<USkeleton class="h-[80px] w-[140px] "  />
					<div class="space-y-2 pl-2 ">
						<USkeleton class="h-4 w-[150px]" />
						<USkeleton class="h-4 w-[100px]" />
						<USkeleton class="h-4 w-[80px]" />
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<style scoped>
.playerWrap{
	width: 100%;

	color:#fff;

}
.playerBody{
	width:100%;
	aspect-ratio: 16/9;

}

.fullMode{
	display: block;
}
.fullMode .playerBody{
	max-height:80vh;
	aspect-ratio: 16/9;
}
.basicMode{
	display:flex
}
.basicMode .rightWrap{
	width:380px;

}
.basicMode .leftWrap{

	width:calc(100% - 320px);
}
.basicMode .playerWrap{
	aspect-ratio: 16/9;
}

@media (max-width: 980px) {
	.fullMode  , .basicMode{
		display:inline;
	}

	.fullMode .leftWrap , .basicMode .leftWrap{
		width:100%;
	}

}
</style>
<script setup>

const colorMode = useColorMode();
const watchMode = useWatchMode();
const fullMode = useFullMode();
</script>
