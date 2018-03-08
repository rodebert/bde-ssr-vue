<template>
	<main>
		<teaser v-for="item in items" v-bind:key="item.id" :item="item"></teaser>
	</main>
</template>

<script>
import Teaser from './Teaser.vue';

export default {
	name: 'stage',
	components: {
		Teaser,
	},
	computed: {
		items() {
			return this.$store.getters.getItems;
		}
	},
	asyncData: ({ store, route }) => store.dispatch('fetchItems', route.meta.ids),
}
</script>
