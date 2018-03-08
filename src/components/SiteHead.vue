<template>
	<header>
		<router-link :to="{ name: 'home' }"><img src="/public/images/layout/logo.png" alt="Bild Logo"/></router-link>
	</header>
</template>

<style lang="scss" scoped>
	header {
		position: relative;
	}

	header::after {
		content: '';
		position: absolute;
		height: 3px;
		background: #000;
		left: 113px;
		right: 0;
		bottom: 4px;
	}
</style>

<script>
export default {
  name: 'site-head'
}
</script>

