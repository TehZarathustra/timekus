import 'normalize.css';
import Vue from 'vue';
import router from './routes';
import {store} from './store';
import Vuetify from 'vuetify';
import '../node_modules/vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vue({
	el: '#app',
	router,
	store
});
