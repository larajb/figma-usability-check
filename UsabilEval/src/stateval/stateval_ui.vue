<template>
  	<div class="stateval-ui">
		<div style="display: flex; margin-bottom: 20px;">
			<div id="select-metriken" style="margin-left: 5px; margin-right: 20px" class="type--pos-medium-normal" @click="handleClickSetMetrics">Metriken</div>
			<div id="select-ergebnisse" style="margin-right: 20px" class="type--pos-medium-normal" @click="handleClickSetResults">Ergebnisse</div>
		</div>
		<p class="type--pos-large-bold">
			Statische Evaluation
		</p>
		<metric-selection v-show="showMetrics" @clicked="handleClickSetMetrics" :metrics="metrics" />
		<results v-show="showResults" @clicked="handleClickSetResults" />
	</div>
</template>

<script>
import { dispatch, handleEvent } from '../uiMessageHandler';

import { selectMenu, iconInput, disclosure } from 'figma-plugin-ds';

import { metricsArray } from './metrics/metricsArray.js';
import MetricSelection from './components/MetricSelection.vue';
import Results from './components/Results.vue';

export default {
	components: {
		MetricSelection,
		Results
	},
	data() {
		return {
			metrics: metricsArray,
			showMetrics: false,
			showResults: false,
		};
	},
	watch: {
		showMetrics(newValue, oldValue) {
			if (newValue) {
				document.getElementById('select-metriken').style.borderBottom = '2px solid black';
			} else {
				document.getElementById('select-metriken').style.borderBottom = '';
			}
		},
		showResults(newValue, oldValue) {
			if (newValue) {
				document.getElementById('select-ergebnisse').style.borderBottom = '2px solid black';
			} else {
				document.getElementById('select-ergebnisse').style.borderBottom = '';
			}
		},
	},
	mounted() {
		selectMenu.init();
    	// window.iconInput.init();
    	// window.disclosure.init();
		this.showMetrics = true;

		dispatch('loadMetrics');
	},
	destroyed() {
		selectMenu.destroy();
	},
	methods: {
		handleClickSetMetrics() {
			this.showMetrics = true;
			this.showResults = false;
		},
		handleClickSetResults() {
			this.showMetrics = false;
			this.showResults = true;
		},
	},
};
</script>

<style lang='scss'>
	@import "../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

	.stateval-ui {
		padding: 10px;
	}
</style>