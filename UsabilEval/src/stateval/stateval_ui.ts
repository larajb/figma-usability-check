import Vue from 'vue';
import Vuex from 'vuex';
import App from './stateval_ui.vue';
import store from './store';

new Vue({
	el: '#app',
	store,
	render: h => h(App)
});
