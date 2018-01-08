import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user: 'Rex',
		groups: [
			{
				id: 0,
				content: 'Какая-то группа'
			}
		],
		items: [
			{
				id: 0,
				group: 0,
				content: '<span style="color:#97B0F8;">(Anchor)</span>',
				start: '2018-01-08',
				type: 'box'
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

