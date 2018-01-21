import 'normalize.css';
import Vue from 'vue';
import router from './routes';
import {store} from './store';
import Vuetify from 'vuetify';
import VueFire from 'vuefire';
import Firebase from 'firebase';
import '../node_modules/vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(VueFire);

new Vue({
	el: '#app',
	router,
	store,
	created () {
		Firebase.initializeApp({
			apiKey: "AIzaSyBh-amEBTCEDR1IUa5e3et_pbDvz0PZ8RE",
			authDomain: "timeline-ab3a7.firebaseapp.com",
			databaseURL: "https://timeline-ab3a7.firebaseio.com",
			projectId: "timeline-ab3a7",
			storageBucket: "timeline-ab3a7.appspot.com",
			messagingSenderId: "914513038193"
		});
	}
});
