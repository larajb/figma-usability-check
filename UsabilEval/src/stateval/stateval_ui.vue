<template>
  	<div class="stateval-ui">
		<div style="display: flex">
			<div class="tooltip--bottom">
				<IconButton @click="backToStart" :icon="'back'" style="margin-top: -8px; margin-bottom: 0px;" />
				<span class="type--pos-small-normal tooltiptext--bottom">Zurück zum Start</span>
			</div>
			<div class="tooltip--bottom">
				<div id="select-metriken" style="margin-left: 5px; margin-right: 20px" class="type--pos-medium-normal" @click="setCurrentPage('MetricsSelection')">Metriken</div>
				<span class="type--pos-small-normal tooltiptext--bottom">Auswahl der Metriken für die Evaluation</span>
			</div>
			<div class="tooltip--bottom">
				<div id="select-evaluation" style="margin-left: 5px; margin-right: 20px" class="type--pos-medium-normal" :class="{'disabled': selectedMetrics.length === 0 }" @click="setCurrentPage('Evaluation')">Evaluation</div>
				<span class="type--pos-small-normal tooltiptext--bottom">Festlegung der Frames für die Evaluation</span>
			</div>
			<div class="tooltip--bottom">
				<div id="select-ergebnisse" style="margin-right: 20px" class="type--pos-medium-normal" :class="{'disabled': evaluationReady === false }" @click="setResultsPage">
					Ergebnisse
					<div :class="{ 'notification': showNotification }"></div>
				</div>
				<span class="type--pos-small-normal tooltiptext--bottom">Darstellung der Evaluationsergebnisse</span>
			</div>
			<div class="tooltip--bottom">
				<IconButton id="select-dokumentation" @click="setCurrentPage('Documentation')" :icon="'library'" style="margin-top: -8px; margin-bottom: 0px;" />
				<span class="type--pos-small-normal tooltiptext--bottom">Dokumentation/Hilfe zur Nutzung des Plugins</span>
			</div>
		</div>
		<div>
			<p class="type--pos-large-bold">
				Globale Evaluation
			</p>
			<metric-selection v-show="currentPage === 'MetricsSelection'" class="scrollable" :metrics="metrics" />
			<evaluation v-show="currentPage === 'Evaluation'" @results="setResults($event)" />
			<results v-show="currentPage === 'Results'" :results="results" />
			<documentation v-show="currentPage === 'Documentation'" />
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

	.stateval-ui {
		padding: 10px;
	}

	.scrollable {
        max-height: 90%;
        overflow-y: scroll;
    }

	.disabled {
		pointer-events: none;
		opacity: 0.4;
	}

	.notification {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #0084f8;
		position: absolute;
		top: -5px;
		right: 10px;
	}
</style>