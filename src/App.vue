<template>
	<body>
		<site-head></site-head>
		<navi></navi>
		<router-view class="view"></router-view>
	</body>
</template>

<style lang="scss">
@font-face {
    font-family: 'Gotham HTF';
    src: url('/public/fonts/gotham/GothamHTF-BookCondensed.woff2') format('woff2'),
        url('/public/fonts/gotham/GothamHTF-BookCondensed.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Gotham HTF';
    src: url('/public/fonts/gotham/GothamHTF-BoldCondensed.woff2') format('woff2'),
        url('/public/fonts/gotham/GothamHTF-BoldCondensed.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

body {
	margin: 50px auto;
	max-width: 960px;
}
</style>

<script>
import SiteHead from './components/SiteHead.vue';
import Navi from './components/Navi.vue';

export default {
  name: 'main-app',
  components: {
	  SiteHead,
	  Navi
  }
}
</script>
