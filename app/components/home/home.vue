<template>
	<div class="home">
		<img v-bind:src='logoImg'>
		<timeline v-if="loaded"
			ref="timeline"
			:items="items"
			:groups="groups"
			:options="options"
			v-on:select="showContent"
			v-on:click="resetContent">
		</timeline>
		<br/>
		<form>
			<v-text-field
              label="title"
              v-model="content"
            ></v-text-field>
            <v-text-field
              label="content"
              v-model="fullContent"
            ></v-text-field>
			<v-layout row wrap>
			<v-flex xs11 sm5>
				<v-menu
				lazy
				:close-on-content-click="false"
				v-model="menu"
				transition="scale-transition"
				offset-y
				full-width
				:nudge-right="40"
				max-width="290px"
				min-width="290px"
				>
				<v-text-field
				slot="activator"
				label="Start date"
				v-model="start"
				prepend-icon="event"
				readonly
				></v-text-field>
				<v-date-picker v-model="start" no-title scrollable actions>
				<template slot-scope="{ save, cancel }">
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn flat color="primary" @click="cancel">Cancel</v-btn>
				<v-btn flat color="primary" @click="save">OK</v-btn>
				</v-card-actions>
				</template>
				</v-date-picker>
				</v-menu>
			</v-flex>
			<v-spacer></v-spacer>
			<v-flex xs11 sm5>
				<v-menu
				lazy
				:close-on-content-click="false"
				v-model="menuF"
				transition="scale-transition"
				offset-y
				full-width
				:nudge-right="40"
				max-width="290px"
				min-width="290px"
				>
				<v-text-field
				slot="activator"
				label="Finish date"
				v-model="finish"
				prepend-icon="event"
				readonly
				></v-text-field>
				<v-date-picker v-model="finish" no-title scrollable actions>
				<template slot-scope="{ save, cancel }">
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn flat color="primary" @click="cancel">Cancel</v-btn>
				<v-btn flat color="primary" @click="save">OK</v-btn>
				</v-card-actions>
				</template>
				</v-date-picker>
				</v-menu>
			</v-flex>
			</v-layout>

			<v-btn color="primary" :disabled="!canAdd" @click.stop.prevent="add()">Add</v-btn>
		</form>
	</div>
</template>

<script>
import logo from '../../outdated-browser.png';
import TimeLine from '../../../node_modules/vue2vis/src/components/timeline.vue';
import moment from 'moment';
import firebase from 'firebase';

export default {
	firebase ()  {
		return {
			items: {
				source: firebase.database().ref('items'),
				readyCallback: function () {
					this.loaded = true;
				}
			}
		}
	},
	data () {
		return {
			user: this.$store.getters.user || 'someone',
			logoImg: logo,
			groups: this.$store.getters.groups,
			content: null,
			fullContent: null,
			start: null,
			finish: null,
			loaded: false,
			date: null,
			menu: null,
			menuF: null,
			options: {
				width: '100%',
				minHeight: '59vh',
				margin: {
					item: 20
				}
			}
		}
	},
	methods: {
		add () {
			let item = {
				group: 0,
				fullContent: this.fullContent,
				content: `<div class="vis-title">${this.content} <div class="vis-title-date">(${this.start})</div></div>`,
				start: this.start,
				type: 'box'
			};

			if (this.finish) {
				item = Object.assign(item, {end: this.finish, type: 'range'});
			}

			this.$firebaseRefs.items.push(item).then((data) => {
				return data.key;
			})
			.then(key => {
				this.$firebaseRefs.items.child(key).set(Object.assign(item, {id: key}));

				setTimeout(() => this.$refs.timeline.fit(), 100);
				this.clear();
			})
			.catch(error => {
				console.log(error);
			});
		},
		clear () {
			this.content = null;
			this.fullContent = null;
		},
		showContent (data) {
			const item = this.findItemByKey(data.items[0]);
			const target = data.event.target;

			if (!item) {
				return;
			}

			const fullContent = item.fullContent;

			if (!fullContent) {
				return;
			}

			const hasContent = $(target).find('.full-content').length > 0
				|| $(target).parents('.vis-item').find('.full-content').length > 0;

			if (hasContent) {
				return;
			}

			$(target).parent().append(`<div class="full-content">${fullContent}</div>`);

			this.resetContent();
		},
		findItemByKey (key) {
			return this.items.find(item => item['.key'] === key);
		},
		resetContent () {
			this.$refs.timeline.redraw();
			this.$refs.timeline.fit();
		}
	},
	computed: {
		canAdd () {
			return Boolean(this.content && this.start);
		},
		filteredItems () {
			console.log(this.items);

			return items;
		}
	},
	components: {
		timeline: TimeLine
	}
}
</script>

<style lang="sass">
	.home
		width: 96%
		margin: 20px auto
		text-align: center
		img
			display: none
			width: 150px
	form
		width: 400px
		margin: 0 auto
	.vis-item
		.full-content
			display: none
			font-size: 12px
		&.vis-selected .full-content
			display: block
	.vis-title
		font-size: 1.2em
	.vis-title-date
		font-size: .7em
		display: inline-block
</style>
