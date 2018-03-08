<template>
 	<router-link :to="{ name: 'article', params: { id: item.id }}" class="teaser" :style="`background-image: url(${item.teaserImg})`">
		 <h2 className="theme-teaser--heading">{{item.title}}</h2>
	</router-link>
</template>

<style lang="scss" scoped>
	.teaser {

		background: center center;
		background-size: cover;

		padding: 40px;
		margin: 10px 0;
		min-height: 400px;

		text-decoration: none;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	h2 {
		align-self: flex-end;
		color: #fff;
		font: bold 21px/.93em "Gotham HTF", sans-serif;
		font-size: 6.25rem;
		padding: 0;
		margin: 0;
		text-align: center;
		text-shadow: 1px 2px 8px rgba(0,0,0,.6);
	}

</style>

<script>
export default {
  name: 'teaser',
  props: ['item']
}
</script>
