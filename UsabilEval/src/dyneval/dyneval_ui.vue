<template>
  	<div class="dyneval-ui">
		<div style="display: flex; margin-bottom: 20px;">
			<div id="select-aufgaben" style="margin-left: 5px; margin-right: 20px" class="type--pos-medium-normal" @click="setCurrentPage('TaskDefinition')">Aufgaben</div>
			<div id="select-szenarien" style="margin-right: 20px" class="type--pos-medium-normal" @click="setCurrentPage('ScenarioDefinition')">Szenarien</div>
			<div id="select-evaluation" style="margin-right: 20px" class="type--pos-medium-normal" :class="{'disabled': (tasks.length === 0) && (scenarios.length === 0)}" @click="setCurrentPage('Evaluation')">Evaluation</div>
			<div id="select-ergebnisse" style="margin-right: 20px" class="type--pos-medium-normal" :class="{'disabled': ($store.getters.currentTaskEvaluation === undefined) && ($store.getters.currentScenarioEvaluation === undefined)}" @click="setCurrentPage('Results')">Ergebnisse</div>
			<!-- <div id="select-ergebnisse" style="margin-right: 20px" class="type--pos-medium-normal" @click="setCurrentPage('Results')">Ergebnisse</div> -->
		</div>
		<p class="type--pos-large-bold">
			Dynamische Evaluation
		</p>
		<task-definition v-show="currentPage === 'TaskDefinition'" />
		<scenario-definition v-show="currentPage === 'ScenarioDefinition'" />
		<evaluation v-show="currentPage === 'Evaluation'" />
		<results v-show="currentPage === 'Results'" />
	</div>
</template>

<script>

import { selectMenu } from 'figma-plugin-ds';

import { mapState } from 'vuex'

import TaskDefinition from './components/TaskDefinition.vue';
import ScenarioDefinition from './components/ScenarioDefinition.vue';
import Evaluation from './components/Evaluation.vue';
import Results from './components/Results.vue';

export default {
	components: {
		TaskDefinition,
		ScenarioDefinition,
		Evaluation,
		Results
	},
	data() {
		return {
			storage: '',
		};
	},
	computed: {
		...mapState(['tasks', 'scenarios', 'currentPage', 'currentTaskname']),
	},
	watch: {
		currentPage() {
			var taskDefinitionValue ='';
			var scenarioDefinitionValue = '';
			var evaluationValue ='';
			var resultsValue = '';
			switch(this.currentPage) {
				case 'TaskDefinition':
					taskDefinitionValue ='2px solid black';
					break;
				case 'ScenarioDefinition':
					scenarioDefinitionValue ='2px solid black';
					break;
				case 'Evaluation':
					evaluationValue ='2px solid black';
					break;
				case 'Results':
					resultsValue ='2px solid black';
					break;
			}
			document.getElementById('select-aufgaben').style.borderBottom = taskDefinitionValue;
			document.getElementById('select-szenarien').style.borderBottom = scenarioDefinitionValue;
			document.getElementById('select-evaluation').style.borderBottom = evaluationValue;
			document.getElementById('select-ergebnisse').style.borderBottom = resultsValue;
		},
	},
	mounted() {
		selectMenu.init();
		this.showTasks = true;
		document.getElementById('select-aufgaben').style.borderBottom = '2px solid black';
	},
	destroyed() {
		selectMenu.destroy();
	},
	methods: {
		setCurrentPage(page) {
			this.$store.commit('currentPage', page);
		},
	},
};
</script>

<style lang='scss'>
	@import "../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

	.dyneval-ui {
		padding: 10px;
	}

	.disabled {
		pointer-events: none;
		opacity: 0.4;
	}
</style>