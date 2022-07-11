import Vue from 'vue';
import App from './metricEval_ui.vue';
import store from './store';
new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
