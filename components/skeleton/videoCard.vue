<template>

	<div class="px-2 md:px-0">
		<USkeleton class="videoThumb mb-2" />

		<div class="px-4 md:px-0">
			<div class="flex    ">
				<USkeleton class="h-8 w-8 " :ui="{ rounded: 'rounded-full' }" />
				<div class="space-y-2 pl-2 flex-auto">
					<USkeleton class="h-4 w-[100px]]" />
					<USkeleton class="h-4 w-[70px]" />
				</div>
			</div>
		</div>
	</div>
</template>
