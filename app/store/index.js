import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user: 'Rex',
		groups: [
			{
				id: 0,
				content: ''
			}
		],
		items: [
			{
				id: 0,
				group: 0,
				content: '<div class="vis-title">Anchor<div class="vis-title-date">(2018-01-08)</div></div>',
				start: '2018-01-08',
				type: 'box',
				fullContent: 'kekan'
			}
		]
	},
	getters: {
		user (state) {
			return state.user;
		},
		items (state) {
			return state.items;
		},
		groups (state) {
			return state.groups;
		}
	},
	mutations: {
		addItem (state, payload) {
			state.items.push(payload)
		}
	}
});

