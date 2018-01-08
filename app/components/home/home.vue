<template>
	<div class="home">
		<img v-bind:src='logoImg'>
		<timeline ref="timeline" :items="items" :groups="groups" :options="options">
		</timeline>
		<br/>
		<form>
			<v-text-field
              label="content"
              v-model="content"
            ></v-text-field>
			<!--  -->
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
			<!--  -->

			<v-btn color="primary" :disabled="!canAdd" @click.stop.prevent="add()">Add</v-btn>
			<v-btn @click="clear()">Clear</v-btn>
		</form>
	</div>
</template>

<script>
import logo from '../../outdated-browser.png';
import TimeLine from '../../../node_modules/vue2vis/src/components/timeline.vue';
import moment from 'moment';

export default {
	data () {
		return {
			user: this.$store.getters.user || 'someone',
			logoImg: logo,
			groups: this.$store.getters.groups,
			items: this.$store.getters.items,
			content: null,
			start: null,
			finish: null,
			date: null,
			menu: null,
			menuF: null,
			options: {
		  width: '100%',
		  minHeight: '200px',
		  margin: {
		    item: 20
		  }
		}		}
	},
	methods: {
		add () {
			let item = {
				id: this.items.length,
				group: 0,
				content: this.content,
				start: this.start,
				type: 'box'
			};

			if (this.finish) {
				item = Object.assign(item, {end: this.finish, type: 'range'});
			}

			this.$store.commit('addItem', item);

			setTimeout(() => this.$refs.timeline.fit(), 100);
		},
		clear () {
			this.content = null;
			this.finish = null;
			this.start = null;
		}
	},
	computed: {
		canAdd () {
			return Boolean(this.content && this.start);
		}
	},
// 	created () {
// 		setTimeout(() => {
// 			this.$refs.timeline.on('select', function (properties) {
//   alert('selected items: ' + properties.items);
// 		}, 2000);

// });
// 	},
	components: {
		timeline: TimeLine
	}
}
</script>

<style scoped lang="sass">
	.home
		padding: 30px
		width: 800px
		margin: 20px auto
		text-align: center
		img
			width: 150px
</style>
