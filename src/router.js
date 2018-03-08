import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Stage from './components/Stage/Stage.vue';
import Article from './components/Article/Article.vue';

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: [
			{ path: '/', component: Stage, name: 'home', meta: { ids: ['5a93e0723195eb0001099411', '5a93e0723195eb0001099411', '5a93e0723195eb0001099411']} },
			{ path: '/article/:id', component: Article, name: 'article' }
		]
	});
};
