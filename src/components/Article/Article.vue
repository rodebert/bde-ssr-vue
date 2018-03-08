<template amp>
	<article>
		<header>
			<h1 class="theme-teaser--heading">{{item.title}}</h1>
			<amp-img v-if="item.teaserImg" :src="item.teaserImg" layout="responsive" />
			<p v-if="item.teaserText" class="teaser">{{item.teaserText}}</p>
		</header>
		<template v-for="block in item.body">
			<component :is="block.type" v-bind:key="block.key" :block="block"></component>
		</template>
	</article>
</template>

<template web>
	<article>
		<header>
			<h1 class="theme-teaser--heading">{{item.title}}</h1>
			<img v-if="item.teaserImg" :src="item.teaserImg" alt="Teaser Bild" />
			<p v-if="item.teaserText" class="teaser">{{item.teaserText}}</p>
		</header>
		<template v-for="block in item.body">
			<component :is="block.type" v-bind:key="block.key" :block="block"></component>
		</template>
	</article>
</template>

<style lang="scss" scoped>
@import '../../scss/themes.scss';

article {
	font: 21px/1.7em "Gotham HTF", sans-serif;
}

header {
	font: bold 100px/1em "Gotham HTF", sans-serif;
	text-align: center;

	.teaser {
		font: 21px/1.7em "Gotham HTF", sans-serif;
	}
}

img {
	max-width: 100%;
	width: 100%;
}

.theme-teaser--heading {
  background: map-get($activeTheme, 'background');
  color: map-get($activeTheme, 'color');
}

</style>

<script>
import Paragraph from './Paragraph.vue';

export default {
	name: 'story',
	components: {
		'unstyled': Paragraph,
	},
	computed: {
		item() {
			return this.$store.getters.getItem(this.$route.params.id);
		}
	},
	asyncData: ({ store, route }) => store.dispatch('fetchItem', route.params.id),
}
</script>
