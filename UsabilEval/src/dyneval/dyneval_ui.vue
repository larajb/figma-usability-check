<template>
  	<div class="dyneval-ui">
		<div style="display: flex; margin-bottom: 20px;">
			<div class="tooltip">
				<div id="select-aufgaben" class="type--pos-medium-normal menu menu-first" @click="setCurrentPage('TaskDefinition')">Aufgaben</div>
				<span class="type--pos-small-normal tooltiptext">Aufgabendefinition</span>
			</div>
			<div class="tooltip">
				<div id="select-szenarien" class="type--pos-medium-normal menu" @click="setCurrentPage('ScenarioDefinition')">Szenarien</div>
				<span class="type--pos-small-normal tooltiptext">Szenariendefinition</span>
			</div>
			<div class="tooltip">
				<div id="select-evaluation" class="type--pos-medium-normal menu" :class="{'disabled': (tasks.length === 0) && (scenarios.length === 0)}" @click="setCurrentPage('Evaluation')">Evaluation</div>
				<span class="type--pos-small-normal tooltiptext">Auswahl der Aufgaben/Szenarien zur Evaluation</span>
			</div>
			<div class="tooltip">
				<div id="select-ergebnisse" class="type--pos-medium-normal menu" :class="{'disabled': ($store.getters.currentTaskEvaluation === undefined) && ($store.getters.currentScenarioEvaluation === undefined)}" @click="setCurrentPage('Results')">Ergebnisse</div>
				<span class="type--pos-small-normal tooltiptext">Darstellung der Evaluationsergebnisse</span>
			</div>
		</div>
		<div style="display:flex">
			<p class="type--pos-large-bold">
				Dynamische Evaluation
			</p>
			<div class="tooltip">
				<div class="icon icon--info"></div>
				<span class="type--pos-small-normal tooltiptext">Erläuterungen zur dynamischen Evaluation</span>
			</div>
		</div>
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

	.menu {
		margin-right: 20px
	}

	.menu-first {
		margin-left: 5px;
	}

	.icon--info {
		background-image: url('../img/information-outline.svg');
	}

	/* Tooltip container */
	.tooltip {
		position: relative;
		display: inline-block;
	}

	/* Tooltip text */
	.tooltip .tooltiptext {
		visibility: hidden;
		width: 120px;
		top: 100%;
		left: 50%;
		margin-left: -60px;
		background-color: rgba(0, 0, 0, 0.6);
		color: #fff;
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;
		
		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltiptext {
		visibility: visible;
	}
</style>