import Vue from 'vue';
import Vuex from 'vuex';

import { getArticle, getStage } from './api';

Vue.use(Vuex);

export function createStore() {
	return new Vuex.Store({
		state: {
			items: [],
		},
		getters: {
			getItems: state => state.items,
			getItem: state => id => state.items.find(item => item.id === id),
		},
		actions: {
			fetchItems({ commit }, ids) {
				return getStage(ids).then(items => commit('setItems', items));
			},
			fetchItem({ commit }, id) {
				return getArticle(id).then(item => commit('setItems', [item]));
			},
		},
		mutations: {
			setItems(state, items) {
				state.items = items;
			},
		}
	})
}
