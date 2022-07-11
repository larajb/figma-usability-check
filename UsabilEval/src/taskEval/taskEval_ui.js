import Vue from 'vue';
import Vuex from 'vuex';
import App from './taskEval_ui.vue';
import store from './store';
Vue.use(Vuex);
new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
