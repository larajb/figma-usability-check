<template>
  	<div class="metricEval-ui">
		<div style="display: flex">
			<div class="tooltip--bottom">
				<IconButton @click="backToStart" :icon="'back'" style="margin-top: -8px; margin-bottom: 0px;" />
				<span class="type--pos-small-normal tooltiptext--bottom">Back to start</span>
			</div>
			<div class="tooltip--bottom">
				<div id="select-metriken" style="margin-left: 5px; margin-right: 20px" class="type--pos-medium-normal" @click="setCurrentPage('MetricsSelection')">Metrics</div>
				<span class="type--pos-small-normal tooltiptext--bottom">Selection of metrics for the evaluation</span>
			</div>
			<div class="tooltip--bottom">
				<div id="select-evaluation" style="margin-left: 5px; margin-right: 20px" class="type--pos-medium-normal" :class="{'metricEval-ui--disabled': selectedMetrics.length === 0 }" @click="setCurrentPage('Evaluation')">Evaluation</div>
				<span class="type--pos-small-normal tooltiptext--bottom">Determining the frames for the evaluation</span>
			</div>
			<div class="tooltip--bottom">
				<div id="select-ergebnisse" style="margin-right: 20px" class="type--pos-medium-normal" :class="{'metricEval-ui--disabled': evaluationReady === false }" @click="setResultsPage">
					Results
					<div :class="{ 'metricEval-ui__notification': showNotification }"></div>
				</div>
				<span class="type--pos-small-normal tooltiptext--bottom">Presentation of the evaluation results</span>
			</div>
			<div class="tooltip--bottom">
				<IconButton id="select-dokumentation" @click="setCurrentPage('Documentation')" :icon="'library'" style="margin-top: -8px; margin-bottom: 0px;" />
				<span class="type--pos-small-normal tooltiptext--bottom">Documentation/help for using the plugin</span>
			</div>
		</div>
		<div>
			<p class="type--pos-large-bold">
				Metrics evaluation
			</p>
			<metric-selection v-show="currentPage === 'MetricsSelection'"  class="scrollable" :metrics="metrics" />
			<evaluation v-show="currentPage === 'Evaluation'"  class="scrollable" @results="setResults($event)" />
			<results v-show="currentPage === 'Results'"  class="scrollable" :results="results" />
			<documentation v-show="currentPage === 'Documentation'"  class="scrollable" />
		</div>
	</div>
</template>

<script>
import { dispatch } from '../uiMessageHandler';
import { mapState } from 'vuex';
import { IconButton } from 'figma-plugin-ds-vue';

import { metricsArray } from './metrics/metricsArray.js';
import MetricSelection from './components/MetricSelection.vue';
import Evaluation from './components/Evaluation.vue';
import Results from './components/Results.vue';
import Documentation from './components/Documentation.vue';

export default {
	components: {
		IconButton,
		MetricSelection,
		Evaluation,
		Results,
		Documentation,
	},
	data() {
		return {
			metrics: metricsArray,
			results: [],
			showNotification: false,
		};
	},
	computed: {
		...mapState(['currentPage', 'selectedMetrics', 'evaluationReady']),
	},
	watch: {
		currentPage() {
			var metricsSelectionValue = '';
			var evaluationValue ='';
			var resultsValue = '';
			var documentationValue = '';
			switch(this.currentPage) {
				case 'MetricsSelection':
					metricsSelectionValue = '2px solid black';
					break;
				case 'Evaluation':
					evaluationValue = '2px solid black';
					break;
				case 'Results':
					resultsValue ='2px solid black';
					break;
				case 'Documentation':
					documentationValue = '2px solid black';
			}
			document.getElementById('select-metriken').style.borderBottom = metricsSelectionValue;
			document.getElementById('select-evaluation').style.borderBottom = evaluationValue;
			document.getElementById('select-ergebnisse').style.borderBottom = resultsValue;
			document.getElementById('select-dokumentation').style.borderBottom = documentationValue;
		},
		evaluationReady() {
			this.showNotification = true;
		},
	},
	mounted() {
		this.showMetrics = true;
		document.getElementById('select-metriken').style.borderBottom = '2px solid black';
	},
	methods: {
		setCurrentPage(page) {
			this.$store.commit('currentPage', page);
		},
		backToStart() {
			dispatch('backToStart');
		},
		setResults(results) {
			this.results = results;
		},
		setResultsPage() {
			this.setCurrentPage('Results');
			this.showNotification = false;
		},
	},
};
</script>

<style lang='scss'>
	@import "../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";
	@import "../tooltips.scss";

	html, body {
        overflow-y: hidden;
    }

	.metricEval-ui {
		padding: 10px;
	}

	.metricEval-ui--disabled {
		pointer-events: none;
		opacity: 0.4;
	}

	.metricEval-ui__notification {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #0084f8;
		position: absolute;
		top: -5px;
		right: 10px;
	}

	.scrollable {
        max-width: 100%;
        overflow-x: hidden;
        max-height: 85%;
        overflow-y: scroll;
	}
</style>