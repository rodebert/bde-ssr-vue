<template>
	<nav>
		<ul>
			<li>BILDplus</li>
			<li>NEWS</li>
			<li>POLITIK</li>
			<li>GELD</li>
			<li>UNTERHALTUNG</li>
			<li>SPORT</li>
			<li>BUNDESLIGA</li>
			<li>LIFESTYLE</li>
			<li>RATGEBER</li>
			<li>REISE</li>
			<li>AUTO</li>
			<li>DIGITAL</li>
			<li>SPIELE</li>
			<li>REGIO</li>
			<li>VIDEO</li>
		</ul>
	</nav>
</template>

<style lang="scss" scoped>
nav {
	font: bold 17px/20px "Gotham HTF", sans-serif;
}

ul {

	list-style: none;
	margin: 0;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0;
	padding-left: 6px;

	&:first-child { padding-left: 0; }
}
</style>

<script>
export default {
  name: 'navi'
}
</script>
