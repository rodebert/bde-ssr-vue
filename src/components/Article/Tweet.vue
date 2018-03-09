<template>
	<div v-html="block.data.html"></div>
</template>

<script>
export default {
	name: 'tweet',
	props: ['block']
}
</script>

<style>
</style>
